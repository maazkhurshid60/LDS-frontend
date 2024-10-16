import React, { useCallback, useEffect, useRef, useState } from "react";
import TextField from "../../../components/InputFields/TextField/TextField";
import Hints from "../Hints/Hints";
import Dropdown from "../../../components/dropdown/Dropdown";
import CheckBox from "../../../components/CheckBox/CheckBox";
import { addResultFormThunk, getAllResultFormThunk, searchResultFormAddReducer, searchResultFormThunk, updateResultFormThunk } from "../../../redux/slice/resultForm";
import { useDispatch, useSelector } from "react-redux";
import { useGetAllData } from "../../../hooks/getAllDataHook/useGetAllData";
import { RootState } from "../../../redux/store";
import { Controller, useForm } from "react-hook-form";
import { IoMdAdd } from "react-icons/io";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Recepient, clientId, delivery, result, serverId, svcData } from "../../../constdata/ResultForm";
import { format } from 'date-fns';
import { toast } from "react-toastify";
import { handleEnterKeyPress, resultHandleEnterKeyPress } from "../../../utils/moveToNextFieldOnEnter";
import SearchResultData from "../../Service/ServiceForms/ServiceTypeForm/SearchResultData";
import { addDatePairModalReducer, getAllResultServiceFormThunk, getAllServiceFormThunk, getIsSearchServiceForm, isDatePairModalReducer, searchServiceFormThunk, updateServiceFormThunk } from "../../../redux/slice/serviceForm";
import { LTFormSchema } from "../../../schemas/service forms/L&TFormSchema";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TextArea from "../../../components/InputFields/TextArea/TextArea";
import DatePairs from "../../../components/Modal/DatePairsModal";
import DatePairsModal from "../../../components/Modal/DatePairsModal";
import { GoogleMap, LoadScript, DistanceMatrixService, useJsApiLoader } from '@react-google-maps/api';

import FormatedIndexInputField from "../../../components/InputFields/TextField/FormatedIndexInputField";
import BorderButton from "../../../components/Buttons/BorderButton/BorderButton";
export type FormFields = z.infer<typeof LTFormSchema>
const libraries = ["places"]
const ResultForm = () => {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyCVarmzRfQK8gU8fFh6bTmOtThP5iNfYaY",


        libraries: libraries
    })
    const { register, handleSubmit, formState: { errors }, control, setValue, reset, watch, getValues } = useForm<FormFields>({ resolver: zodResolver(LTFormSchema) })
    const { data: clientData } = useGetAllData("/client/all-clients");
    const clientFilteredOptions = clientData?.filter((data, id) => { return data?.isActive })
    const clientIdOptions = clientFilteredOptions?.map((data, id) => { return { value: data?._id, label: data?.code } })
    const { data: serverIdData } = useGetAllData("/server/all-servers");
    const serverIdOptions = serverIdData?.map((data, id) => { return { value: data?._id, label: data?.serverCode } })
    const substituteDeliveredToOptions = [{ value: "jandoe", label: "Jan Doe" }, { value: "johndoe", label: "John Doe" }]
    const corporateReciepientOptions = [{ value: "jandoe", label: "Jan Doe" }, { value: "johndoe", label: "John Doe" }]


    const dispatch = useDispatch()
    const allServiceForm = useSelector((state: RootState) => state.serviceForm.allServiceFormData)
    const serviceFormIndex = useSelector((state: RootState) => state.serviceForm.serviceFormIndex)
    const previousForm = allServiceForm[serviceFormIndex - 1]
    const isSearchResultForm = useSelector((state: RootState) => state.serviceForm.isSearchServiceForm)
    const [isConspicuous, setIsConspicuous] = useState()
    const selectedSearchResultData = useSelector((state: RootState) => state.serviceForm.selectedSearchServicetData)
    const searchResultFormData = useSelector((state: RootState) => state.serviceForm.allSearchServiceFormData)
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const getSearchExistingSelectedClientoption = clientIdOptions?.find((data, index) => data?.value === selectedSearchResultData[0]?.clientId?._id && { value: data?._id, label: data?.fullName })
    const getSearchExistingSelectedServeroption = serverIdOptions?.find((data, index) => data?.value === selectedSearchResultData[0]?.serviceResultServerId?._id && { value: data?._id, label: data?.serverCode })
    const lastestResultFormSaved = JSON.parse(localStorage.getItem("lastResultFormSaved"))
    // console.log("lastestResultFormSaved", lastestResultFormSaved)
    const isDatePairModal = useSelector((state: RootState) => state.serviceForm.isDatePairModal)
    const datepairsData = useSelector((state: RootState) => state.serviceForm.datepairs);
    const lTSFirstNameArray = allServiceForm[serviceFormIndex]?.lTSFirstName?.split(",")
    const resultOptions = [
        {
            value: lTSFirstNameArray?.length > 1 ? "personalplus" : "personal",
            label: lTSFirstNameArray?.length > 1 ? "Personal Plus" : "Personal",
        },
        { value: "substitute", label: "Substitute" },
        { value: "conspicuous", label: "Conspicuous" }
    ];
    const [lTSServed, setLTSServed] = useState<string[]>([])
    const [lTSNotServed, setLTSNotServed] = useState<string[]>([])
    const [suggestedTimeTrip, setSuggestedTimeTrip] = useState<any>()
    const currentYear = new Date().getFullYear().toString().slice(-2);
    const [oLTIndex, setOltIndex] = useState("")
    const [currentServerId, setCurrentServerId] = useState<string>()
    const [resultId, setResultId] = useState<string>(undefined)
    const [datePairsDates, setDatePairsDates] = useState<any>();

    const addMinutesToTime = (timeString, minutesToAdd) => {

        // Add a fallback for when AM/PM is missing (assuming 12-hour format)
        let amPmFallback = "";
        if (!/AM|PM/i?.test(timeString)) {
            amPmFallback = timeString?.includes("12") || parseInt(timeString?.split(":")[0]) < 12 ? "AM" : "PM";
            timeString += amPmFallback;
        }

        // Parse the 12-hour format time string (e.g., "04:50AM" or "11:50PM")
        const timeMatch = timeString?.match(/(\d{1,2}):(\d{2})(AM|PM)/i);

        if (!timeMatch) return null;

        let hours = parseInt(timeMatch[1]);
        const minutes = parseInt(timeMatch[2]);
        const period = timeMatch[3]?.toUpperCase();

        // Convert to 24-hour format
        if (period === "PM" && hours < 12) hours += 12;
        if (period === "AM" && hours === 12) hours = 0;

        // Create a new Date object to handle the addition
        const date = new Date();
        date?.setHours(hours);
        date?.setMinutes(minutes);

        // Add the suggested minutes
        date?.setMinutes(date?.getMinutes() + minutesToAdd);

        // Get the new hours and minutes
        let newHours = date?.getHours();
        let newMinutes = date?.getMinutes();

        // Format hours and minutes as two digits (for 24-hour format)
        const formattedHours = newHours < 10 ? `0${newHours}` : newHours;
        const formattedMinutes = newMinutes < 10 ? `0${newMinutes}` : newMinutes;

        // Return the new time string in 24-hour format (HH:mm)
        return `${formattedHours}:${formattedMinutes}`;
    };
    const updatedTime = addMinutesToTime(previousForm?.serviceResultSecondTimeOfService, suggestedTimeTrip)
    // USEEFFECT FOR SELECTION OF DATE PAIRS STARTS
    const secondHanldetimeChange = () => {
        const watchValuw = watch("serviceResultSecondAttemptDate")
        const seconddatevalue = getValues("serviceResultSecondAttemptDate")
        const firstdatevalue = getValues("serviceResultFirstAttemptDate")

        // toast.success(`${seconddatevalue}`)
        if (seconddatevalue !== "") {
            const secondAttemptDate = new Date(seconddatevalue);
            const formattedSecondAttemptDate = `${secondAttemptDate?.getFullYear()}-${(secondAttemptDate?.getMonth() + 1)?.toString()?.padStart(2, '0')}-${secondAttemptDate?.getDate()?.toString()?.padStart(2, '0')}`;

            setValue("serviceResultDateOfService", formattedSecondAttemptDate);

        } else {
            const firstAttemptDate = new Date(firstdatevalue);
            const formattedFirstAttemptDate = `${firstAttemptDate?.getFullYear()}-${(firstAttemptDate?.getMonth() + 1)?.toString()?.padStart(2, '0')}-${firstAttemptDate?.getDate()?.toString()?.padStart(2, '0')}`;
            setValue("serviceResultDateOfService", formattedFirstAttemptDate);

        }

    }
    useEffect(() => {

        if (datepairsData?.firstAttemptDate) {
            const firstAttemptDate = new Date(datepairsData?.firstAttemptDate);
            const formattedFirstAttemptDate = `${firstAttemptDate?.getFullYear()}-${(firstAttemptDate?.getMonth() + 1)?.toString()?.padStart(2, '0')}-${firstAttemptDate?.getDate()?.toString()?.padStart(2, '0')}`;

            setValue("serviceResultFirstAttemptDate", formattedFirstAttemptDate);
        }

        if (datepairsData?.secondAttemptDate) {
            const secondAttemptDate = new Date(datepairsData?.secondAttemptDate);
            const formattedSecondAttemptDate = `${secondAttemptDate?.getFullYear()}-${(secondAttemptDate?.getMonth() + 1)?.toString()?.padStart(2, '0')}-${secondAttemptDate?.getDate()?.toString()?.padStart(2, '0')}`;


            setValue("serviceResultSecondAttemptDate", formattedSecondAttemptDate);
            setValue("serviceResultDateOfService", formattedSecondAttemptDate);
        }
        // if (seconddatevalue !== "") {
        //     const secondAttemptDate = new Date(datepairsData?.secondAttemptDate);
        //     const formattedSecondAttemptDate = `${secondAttemptDate?.getFullYear()}-${(secondAttemptDate?.getMonth() + 1)?.toString()?.padStart(2, '0')}-${secondAttemptDate?.getDate()?.toString()?.padStart(2, '0')}`;

        //     setValue("serviceResultDateOfService", formattedSecondAttemptDate);

        // } else {
        //     const firstAttemptDate = new Date(datepairsData?.firstAttemptDate);
        //     const formattedFirstAttemptDate = `${firstAttemptDate?.getFullYear()}-${(firstAttemptDate?.getMonth() + 1)?.toString()?.padStart(2, '0')}-${firstAttemptDate?.getDate()?.toString()?.padStart(2, '0')}`;
        //     setValue("serviceResultDateOfService", formattedFirstAttemptDate);

        // }
        // toast.success("call")
    }, [datepairsData, setValue]);

    // USEEFFECT FOR SELECTION OF DATE PAIRS ENDS

    // submitResultFormFunction
    const submitResultFormFunction = (data) => {

        const addingData = {
            lTSFirstName: data?.lTSFirstName,
            datePairs: datepairsData,
            oLTIndexNo: oLTIndex === "" ? null : oLTIndex + "/" + currentYear,
            lTSAddress: data?.lTSAddress,
            lTSState: data?.lTSState,
            lTSApt: data?.lTSApt,
            lTSCity: data?.lTSCity,
            lTSZip: data?.lTSZip,
            lTSDescription: data?.lTSDescription,
            lTSBusinessName: data?.lTSBusinessName,
            inputDate: data?.inputDate,
            sSDDefendants: data?.sSDDefendants,
            sSDPlaintiff: data?.sSDPlaintiff,
            clientId: data?.clientId,
            jobNo: parseInt(data?.jobNo),
            queryInformationLTFullName: data?.queryInformationLTFullName,
            queryInformationLTIndexNo: parseInt(data?.queryInformationLTIndexNo),
            queryInformationLTAddress: data?.queryInformationLTAddress,
            queryInformationLTBusinessName: data?.queryInformationLTBusinessName,
            queryInformationLTInputDate: data?.queryInformationLTInputDate,
            queryInformationStandardServeTo: data?.queryInformationStandardServeTo,
            queryInformationStandardDefendants: data?.queryInformationStandardDefendants,
            queryInformationStandardPlaintiff: data?.queryInformationStandardPlaintiff,
            serviceResultInputDate: data?.serviceResultInputDate,
            serviceResultScvType: data?.serviceResultScvType,
            serviceResultJobNo: parseInt(data?.serviceResultJobNo),
            serviceResultServerId: data?.serviceResultServerId === "" ? null : data?.serviceResultServerId,
            serviceResultResults: data?.serviceResultResults,
            serviceResultDateOfService: data?.serviceResultDateOfService,
            serviceResultTimeOfService: data?.serviceResultTimeOfService === null ? "" : data?.serviceResultTimeOfService,
            serviceResultFirstTimeOfService: data?.serviceResultFirstTimeOfService === null ? "" : data?.serviceResultFirstTimeOfService,
            serviceResultFirstAttemptDate: data?.serviceResultFirstAttemptDate,
            serviceResultSecondTimeOfService: data?.serviceResultSecondTimeOfService === null ? "" : data?.serviceResultSecondTimeOfService,
            serviceResultSecondAttemptDate: data?.serviceResultSecondAttemptDate,
            serviceResultThirdTimeOfService: data?.serviceResultThirdTimeOfService === null ? "" : data?.serviceResultThirdTimeOfService,
            serviceResultThirdAttemptDate: data?.serviceResultThirdAttemptDate,
            serviceResultlTServed: lTSServed?.join(","),
            serviceResultlTNotServed: lTSNotServed && lTSNotServed?.join(","),
            serviceResultRecipientTitle: data?.serviceResultRecipientTitle,
            serviceResultDoor: (data?.serviceResultDoor === undefined || data?.serviceResultDoor === "" || isNaN(data?.serviceResultDoor)) ? null : parseInt(data?.serviceResultDoor),
            serviceResultDoorLocks: (data?.serviceResultDoorLocks === undefined || data?.serviceResultDoorLocks === "" || isNaN(data?.serviceResultDoorLocks)) ? null : parseInt(data?.serviceResultDoorLocks),
            serviceResultEntry: (data?.serviceResultEntry === undefined || data?.serviceResultEntry === "" || isNaN(data?.serviceResultEntry)) ? null : parseInt(data?.serviceResultEntry),
            serviceResultWall: (data?.serviceResultWall === undefined || data?.serviceResultWall === "" || isNaN(data?.serviceResultWall)) ? null : parseInt(data?.serviceResultWall),
            serviceResultFloor: (data?.serviceResultFloor === undefined || data?.serviceResultFloor === "" || isNaN(data?.serviceResultFloor)) ? null : parseInt(data?.serviceResultFloor),
            serviceResultLock: (data?.serviceResultLock === undefined || data?.serviceResultLock === "" || isNaN(data?.serviceResultLock))
                ? null
                : parseInt(data?.serviceResultLock),
            serviceResultOtherDescription: data?.serviceResultOtherDescription,
            serviceResultSex: data?.serviceResultSex,
            serviceResultSkinColor: data?.serviceResultSkinColor,
            serviceResultHair: data?.serviceResultHair,
            serviceResultAge: (data?.serviceResultAge === undefined || data?.serviceResultAge === "" || isNaN(data?.serviceResultAge)) ? null : parseInt(data?.serviceResultAge),
            serviceResultHeight: (data?.serviceResultHeight === undefined || data?.serviceResultHeight === "" || isNaN(data?.serviceResultHeight)) ? null : parseFloat(data?.serviceResultHeight),
            serviceResultWeight: (data?.serviceResultWeight === undefined || data?.serviceResultWeight === "" || isNaN(data?.serviceResultWeight)) ? null : parseFloat(data?.serviceResultWeight),
            serviceResultOtherFeatures: data?.serviceResultOtherFeatures,
            serviceResultDateOfMailing: data?.serviceResultDateOfMailing,
            serviceResultDateOfNotary: data?.serviceResultDateOfNotary,
            serviceResultRecipient: data?.corporateRecipient,
            serviceResultSubstitudeDeliveredTo: data?.substituteDeliveredTo,


        }
        if (isSearchResultForm === true) {
            const formatedStartDate = startDate !== null ? new Date(startDate) : null;
            const formatedEndDate = endDate !== null ? new Date(endDate) : null;
            const formattedDateStart = formatedStartDate?.toLocaleDateString('en-US', {
                weekday: 'long',  // e.g., Thursday
                year: 'numeric',  // e.g., 2024
                month: 'long',    // e.g., September
                day: 'numeric'    // e.g., 13
            });
            const formattedDateEnd = formatedEndDate?.toLocaleDateString('en-US', {
                weekday: 'long',  // e.g., Thursday
                year: 'numeric',  // e.g., 2024
                month: 'long',    // e.g., September
                day: 'numeric'    // e.g., 13
            })

            const searchData = {
                startDate: formattedDateStart,
                endDate: formattedDateEnd,
                lTSAddress: data?.lTSAddress, lTSApt: data?.lTSApt, lTSBusinessName: data?.lTSBusinessName, lTSCity: data?.lTSCity,
                lTSDescription: data?.lTSDescription, lTSFirstName: data?.lTSFirstName, oLTIndexNo: oLTIndex !== "" ? oLTIndex + "/" + currentYear : "", lTSZip: data?.lTSZip, lTSState: data?.lTSState, serviceResultServerId: data?.serviceResultServerId

            }
            // console.log(":result", data)
            dispatch(searchServiceFormThunk(searchData))
        } else {
            if (selectedSearchResultData && selectedSearchResultData?.length > 0) {

                const updatingData = { ...addingData, serviceFormId: selectedSearchResultData[0]?._id }
                // HERE UPDATE SERVICE FORM API WILL BE CALLED
                localStorage.setItem("lastResultFormSaved", JSON.stringify(updatingData))
                const sendingToData = {
                    data: updatingData,
                    isSearch: true
                }
                dispatch(updateServiceFormThunk(sendingToData))
            }
            else {
                const updatingData = { ...addingData, serviceFormId: allServiceForm[serviceFormIndex]?._id }
                // HERE UPDATE SERVICE FORM API WILL BE CALLED
                // console.log(updatingData)
                localStorage.setItem("lastResultFormSaved", JSON.stringify(updatingData))
                const sendingToData = {
                    data: updatingData,
                    isSearch: false
                }
                dispatch(updateServiceFormThunk(sendingToData))

            }

        }
    }
    // SEARCH RESULT FORM
    const searchResultFormFunction = () => {
        setValue("lTSFirstName", "")
        setValue("oLTIndexNo", "")
        setValue("queryInformationLTAddress", "")
        setValue("queryInformationLTBusinessName", "")
        setValue("queryInformationLTInputDate", "")
        setValue("lTSAddress", ""),
            setValue("lTSApt", ""),
            setValue("lTSCity", ""),
            setValue("lTSState", ""),
            setValue("lTSDescription", ""),
            setValue("lTSZip", ""),
            dispatch(searchResultFormAddReducer(true))

    }
    // USE EFFECT WILL GET ALL RESULT FORM
    useEffect(() => {
        dispatch(getAllResultServiceFormThunk())
    }, [serviceFormIndex])
    // USE EFFECT WILL BE CALLED ON PRESSING F10 KEY
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'F10') {
                event.preventDefault();
                handleSubmit(submitResultFormFunction)();

            }
        }
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [submitResultFormFunction])
    // USE EFFECT WILL BE CALLED ON PRESSING F7 KEY
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'F7') {
                event.preventDefault();
                dispatch(getIsSearchServiceForm(true))
                searchResultFormFunction()
                reset()
                setOltIndex("")

            }
        }
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleSubmit, searchResultFormFunction])



    // USE EFFECT TO STORE DATA ON FIRST INDEX OF RESULT FORM
    useEffect(() => {
        if (selectedSearchResultData && selectedSearchResultData?.length > 0) {
            setValue("clientId", getSearchExistingSelectedClientoption?.value);
            setValue("lTSFirstName", selectedSearchResultData[0]?.lTSFirstName)

            if (selectedSearchResultData[0]?.oLTIndexNo === null) setOltIndex("")
            else setOltIndex(selectedSearchResultData[0]?.oLTIndexNo)

            setValue("lTSDescription", selectedSearchResultData[0]?.lTSDescription),
                setValue("lTSCity", selectedSearchResultData[0]?.lTSCity),
                setValue("lTSApt", selectedSearchResultData[0]?.lTSApt),
                setValue("lTSState", selectedSearchResultData[0]?.lTSState),
                setValue("lTSZip", selectedSearchResultData[0]?.lTSZip),
                setLTSServed(selectedSearchResultData[0]?.serviceResultlTServed?.split(","))
            setLTSNotServed(selectedSearchResultData[0]?.serviceResultlTNotServed?.split(","))
            setValue("lTSAddress", selectedSearchResultData[0]?.lTSAddress),
                setValue("lTSBusinessName", selectedSearchResultData[0]?.lTSBusinessName),
                setValue("inputDate", selectedSearchResultData[0]?.inputDate)
            setValue("queryInformationStandardServeTo", selectedSearchResultData[0]?.queryInformationStandardServeTo),
                setValue("sSDDefendants", selectedSearchResultData[0]?.sSDDefendants),
                setValue("sSDPlaintiff", selectedSearchResultData[0]?.sSDPlaintiff)
            // setValue("serviceResultInputDate", selectedSearchResultData[0]?.serviceResultInputDate ?? "")
            const resultInputDate = watch("serviceResultInputDate");
            // if (resultInputDate) {
            // Get the current date
            const currentDate = new Date();
            const formattedCurrentDate = format(currentDate, 'yyyy-MM-dd');
            const currentServiceResultInputDate = selectedSearchResultData[0]?.serviceResultInputDate;

            // Check if currentServiceResultInputDate is empty or undefined
            const valueToStore = (currentServiceResultInputDate === "" || currentServiceResultInputDate === undefined)
                ? formattedCurrentDate
                : currentServiceResultInputDate;
            // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>selected", valueToStore)

            setValue("serviceResultInputDate", valueToStore, {
                shouldValidate: true,
                shouldDirty: true
            });
            // }
            setValue("serviceResultScvType", selectedSearchResultData[0]?.serviceResultScvType ?? "")
            setValue("jobNo", JSON.stringify(selectedSearchResultData[0]?.jobNo ?? ""))
            setValue("serviceResultServerId", getSearchExistingSelectedServeroption?.value)
            setValue("serviceResultResults", selectedSearchResultData[0]?.serviceResultResults ?? "")
            setResultId(selectedSearchResultData[0]?.serviceResultResults ?? "")
            // setValue("serviceResultDateOfService", selectedSearchResultData[0]?.serviceResultDateOfService)
            // setValue("serviceResultFirstTimeOfService", selectedSearchResultData[0]?.serviceResultFirstTimeOfService)
            // setValue("serviceResultFirstAttemptDate", selectedSearchResultData[0]?.serviceResultFirstAttemptDate)
            // setValue("serviceResultSecondAttemptDate", selectedSearchResultData[0]?.serviceResultSecondAttemptDate)
            setValue("serviceResultThirdTimeOfService", selectedSearchResultData[0]?.serviceResultThirdTimeOfService)
            setValue("serviceResultThirdAttemptDate", selectedSearchResultData[0]?.serviceResultThirdAttemptDate)
            setValue("serviceResultlTServed", selectedSearchResultData[0]?.serviceResultlTServed)
            setValue("serviceResultlTNotServed", selectedSearchResultData[0]?.serviceResultlTNotServed)
            setValue("serviceResultRecipientTitle", selectedSearchResultData[0]?.serviceResultRecipientTitle)
            setValue("serviceResultDoor", JSON.stringify(selectedSearchResultData[0]?.serviceResultDoor))
            setValue("serviceResultDoorLocks", JSON.stringify(selectedSearchResultData[0]?.serviceResultDoorLocks))
            setValue("serviceResultEntry", JSON.stringify(selectedSearchResultData[0]?.serviceResultEntry))
            setValue("serviceResultWall", JSON.stringify(selectedSearchResultData[0]?.serviceResultWall))
            setValue("serviceResultFloor", JSON.stringify(selectedSearchResultData[0]?.serviceResultFloor))
            setValue("serviceResultLock", JSON.stringify(selectedSearchResultData[0]?.serviceResultLock))
            setValue("serviceResultOtherDescription", selectedSearchResultData[0]?.serviceResultOtherDescription)
            setValue("serviceResultOtherFeatures", selectedSearchResultData[0]?.otherIdentifyingFeatures)
            setValue("serviceResultSex", selectedSearchResultData[0]?.serviceResultSex)
            setValue("serviceResultSkinColor", selectedSearchResultData[0]?.serviceResultSkinColor)
            // const secondTime = selectedSearchResultData[0]?.serviceResultSecondTimeOfService === "" || selectedSearchResultData[0]?.serviceResultSecondTimeOfService === undefined ? addMinutesToTime(lastestResultFormSaved?.serviceResultSecondTimeOfService, suggestedTimeTrip) : addMinutesToTime(selectedSearchResultData[0]?.serviceResultSecondTimeOfService, suggestedTimeTrip)
            // const firstTime = selectedSearchResultData[0]?.serviceResultFirstTimeOfService === "" || selectedSearchResultData[0]?.serviceResultFirstTimeOfService === undefined ? addMinutesToTime(lastestResultFormSaved?.serviceResultFirstTimeOfService, suggestedTimeTrip) : addMinutesToTime(selectedSearchResultData[0]?.serviceResultFirstTimeOfService, suggestedTimeTrip)

            // setValue("serviceResultSecondTimeOfService", secondTime)
            // setValue("serviceResultFirstTimeOfService", firstTime)
            // setValue("serviceResultTimeOfService", secondTime)
            // setValue("serviceResultTimeOfService", selectedSearchResultData[0]?.serviceResultTimeOfService)
            // setValue("serviceResultFirstTimeOfService", selectedSearchResultData[0]?.serviceResultFirstTimeOfService)
            // setValue("serviceResultSecondTimeOfService", selectedSearchResultData[0]?.serviceResultSecondTimeOfService)
            setValue("serviceResultSecondTimeOfService", selectedSearchResultData[0]?.serviceResultSecondTimeOfService === undefined || selectedSearchResultData[0]?.serviceResultSecondTimeOfService === "" ? lastestResultFormSaved?.serviceResultSecondTimeOfService : selectedSearchResultData[0]?.serviceResultSecondTimeOfService)

            setValue("serviceResultFirstTimeOfService", selectedSearchResultData[0]?.serviceResultFirstTimeOfService === undefined || selectedSearchResultData[0]?.serviceResultFirstTimeOfService === "" ? lastestResultFormSaved?.serviceResultFirstTimeOfService : selectedSearchResultData[0]?.serviceResultFirstTimeOfService)
            setValue("serviceResultTimeOfService", selectedSearchResultData[0]?.serviceResultTimeOfService === undefined || selectedSearchResultData[0]?.serviceResultTimeOfService === "" ? lastestResultFormSaved?.serviceResultTimeOfService : selectedSearchResultData[0]?.serviceResultTimeOfService)


            // setValue("serviceResultSecondTimeOfService", selectedSearchResultData[0]?.serviceResultSecondTimeOfService === "NaN:NaN" || selectedSearchResultData[0]?.serviceResultSecondTimeOfService === "" || selectedSearchResultData[0]?.serviceResultSecondTimeOfService === undefined ? addMinutesToTime(lastestResultFormSaved?.serviceResultSecondTimeOfService, suggestedTimeTrip) : addMinutesToTime(selectedSearchResultData[0]?.serviceResultSecondTimeOfService, suggestedTimeTrip))


            setValue("serviceResultDateOfService", selectedSearchResultData[0]?.serviceResultDateOfService === "" || selectedSearchResultData[0]?.serviceResultDateOfService === undefined ? lastestResultFormSaved?.serviceResultDateOfService : selectedSearchResultData[0]?.serviceResultDateOfService)
            setValue("serviceResultFirstAttemptDate", selectedSearchResultData[0]?.serviceResultFirstAttemptDate === "" || selectedSearchResultData[0]?.serviceResultFirstAttemptDate === undefined ? lastestResultFormSaved?.serviceResultFirstAttemptDate : selectedSearchResultData[0]?.serviceResultFirstAttemptDate)
            setValue("serviceResultSecondAttemptDate", selectedSearchResultData[0]?.serviceResultSecondAttemptDate === "" || selectedSearchResultData[0]?.serviceResultSecondAttemptDate === undefined ? lastestResultFormSaved?.serviceResultSecondAttemptDate : selectedSearchResultData[0]?.serviceResultSecondAttemptDate)
            // if (previousForm?.serviceResultServerId?.serverCode === selectedSearchResultData[0]?.serviceResultServerId?.serverCode) {
            //     const secondTime = addMinutesToTime(previousForm?.serviceResultSecondTimeOfService, suggestedTimeTrip)
            //     const firstTime = addMinutesToTime(previousForm?.serviceResultFirstTimeOfService, suggestedTimeTrip)
            //     setValue("serviceResultSecondTimeOfService", secondTime)
            //     setValue("serviceResultFirstTimeOfService", firstTime)
            //     setValue("serviceResultTimeOfService", secondTime)


            // } else {
            //     setValue("serviceResultTimeOfService", selectedSearchResultData[0]?.serviceResultTimeOfService)
            //     setValue("serviceResultSecondTimeOfService", selectedSearchResultData[0]?.serviceResultSecondTimeOfService)
            //     setValue("serviceResultFirstTimeOfService", selectedSearchResultData[0]?.serviceResultFirstTimeOfService)

            // }
            // // Convert lTSFirstName to an array
            // const lTSFirstNames = selectedSearchResultData[0]?.lTSFirstName?.split(",") || [];
            // // Get the current served and not served arrays
            // const currentServed = selectedSearchResultData[0]?.serviceResultlTServed === undefined || selectedSearchResultData[0]?.serviceResultlTServed === ""
            //     ? []
            //     : selectedSearchResultData[0]?.serviceResultlTServed?.split(",");

            // const currentNotServed = selectedSearchResultData[0]?.serviceResultlTNotServed !== ""
            //     ? selectedSearchResultData[0]?.serviceResultlTNotServed?.split(",")
            //     : [];

            // // Create a new served array that includes names from lTSFirstNames and adds them if not already in served
            // const updatedServed = lTSFirstNames?.filter(name => name && !currentServed?.includes(name));

            // // Remove names from currentServed that are not in lTSFirstNames
            // const filteredServed = currentServed?.filter(name => lTSFirstNames?.includes(name));
            // console.log("lTSFirstNames", selectedSearchResultData[0]?.lTSFirstName)
            // console.log("lTSFirstNames served", filteredServed)


            // // Remove names from currentNotServed that are not in lTSFirstNames
            // const filteredNotServed = currentNotServed?.filter(name => lTSFirstNames?.includes(name));

            // // Combine both arrays
            // const finalServed = [...filteredServed];

            // // Update state
            // setLTSServed(finalServed);
            // setLTSNotServed(filteredNotServed);
            // Convert lTSFirstName to an array
            const lTSFirstNames = selectedSearchResultData[0]?.lTSFirstName?.split(",") || [];
            // Get the current served and not served arrays
            const currentServed = selectedSearchResultData[0]?.serviceResultlTServed === undefined || selectedSearchResultData[0]?.serviceResultlTServed === ""
                ? []
                : selectedSearchResultData[0]?.serviceResultlTServed?.split(",");

            const currentNotServed = selectedSearchResultData[0]?.serviceResultlTNotServed !== ""
                ? selectedSearchResultData[0]?.serviceResultlTNotServed?.split(",")
                : [];

            // Create a new served array that includes names from lTSFirstNames and adds them if not already in served
            const updatedServed = lTSFirstNames?.filter(name => name && !currentServed?.includes(name));

            // Remove names from currentServed that are not in lTSFirstNames
            const filteredServed = currentServed?.filter(name => lTSFirstNames?.includes(name));

            // Remove names from currentNotServed that are not in lTSFirstNames
            const filteredNotServed = currentNotServed?.filter(name => lTSFirstNames?.includes(name));

            // Filter out names that are in filteredNotServed from filteredServed and updatedServed
            const finalServed = [
                ...filteredServed?.filter(name => !filteredNotServed?.includes(name)),
                ...updatedServed?.filter(name => !filteredNotServed?.includes(name))
            ];


            // Set the states
            setLTSServed(finalServed);
            setLTSNotServed(filteredNotServed);
            setDatePairsDates(allServiceForm[serviceFormIndex]?.datePairs?.firstAttemptDate === "" || allServiceForm[serviceFormIndex]?.datePairs?.secondAttemptDate ? previousForm?.datePairs : allServiceForm[serviceFormIndex]?.datePairs)
            setValue("serviceResultHair", selectedSearchResultData[0]?.serviceResultHair)
            setValue("serviceResultAge", JSON.stringify(selectedSearchResultData[0]?.serviceResultAge))
            setValue("serviceResultHeight", JSON.stringify(selectedSearchResultData[0]?.serviceResultHeight))
            setValue("serviceResultWeight", JSON.stringify(selectedSearchResultData[0]?.serviceResultWeight))
            setValue("serviceResultOtherFeatures", selectedSearchResultData[0]?.serviceResultOtherFeatures)
            setValue("serviceResultDateOfMailing", selectedSearchResultData[0]?.serviceResultDateOfMailing)
            setValue("serviceResultDateOfNotary", selectedSearchResultData[0]?.serviceResultDateOfNotary)
            setValue("substituteDeliveredTo", selectedSearchResultData[0]?.serviceResultSubstitudeDeliveredTo)
            setValue("corporateRecipient", selectedSearchResultData[0]?.serviceResultRecipient)
        }


        else {
            // STORE Current DATE OF THE INPUT DATE IN RESULT INPUT DATE STARTS ON NEWREULST FORM

            const resultInputDate = watch("serviceResultInputDate");
            // if (resultInputDate) {
            // Get the current date
            const currentDate = new Date();
            const formattedCurrentDate = format(currentDate, 'yyyy-MM-dd');
            const currentServiceResultInputDate = allServiceForm[serviceFormIndex]?.serviceResultInputDate;

            // Check if currentServiceResultInputDate is empty or undefined
            const valueToStore = (currentServiceResultInputDate === "" || currentServiceResultInputDate === undefined)
                ? formattedCurrentDate
                : currentServiceResultInputDate;


            // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", valueToStore)


            setValue("serviceResultInputDate", valueToStore, {
                shouldValidate: true,
                shouldDirty: true
            });
            // }
            // STORE NEXT DATE OF THE INPUT DATE IN RESULT INPUT DATE ENDS

            if (allServiceForm && Array.isArray(allServiceForm) && serviceFormIndex >= 0 && serviceFormIndex < allServiceForm.length) {

                const data = {
                    // firstAttepmtDate: previousForm?.serviceResultFirstAttemptDate !== "" || previousForm?.serviceResultFirstAttemptDate === undefined ? previousForm?.serviceResultFirstAttemptDate : allServiceForm[serviceFormIndex]?.datePairs?.firstAttepmtDate,
                    // secondAttepmtDate: previousForm?.serviceResultSecondAttemptDate !== "" || previousForm?.serviceResultSecondAttemptDate === undefined ? previousForm?.serviceResultSecondAttemptDate : allServiceForm[serviceFormIndex]?.datePairs?.secondAttepmtDate,
                    firstAttepmtDate: allServiceForm[serviceFormIndex]?.datePairs?.firstAttepmtDate === "" || allServiceForm[serviceFormIndex]?.datePairs?.firstAttepmtDate === undefined || allServiceForm[serviceFormIndex]?.datePairs === undefined ? previousForm?.serviceResultFirstAttemptDate : allServiceForm[serviceFormIndex]?.datePairs?.firstAttepmtDate,
                    secondAttepmtDate: allServiceForm[serviceFormIndex]?.datePairs?.secondAttepmtDate === "" || allServiceForm[serviceFormIndex]?.datePairs?.secondAttepmtDate === undefined || allServiceForm[serviceFormIndex]?.datePairs === undefined ? previousForm?.serviceResultSecondAttemptDate : allServiceForm[serviceFormIndex]?.datePairs?.secondAttepmtDate,
                }
                // console.log(datepairsData)
                dispatch(addDatePairModalReducer(data))

                setValue("lTSFirstName", allServiceForm[serviceFormIndex]?.lTSFirstName)
                if (allServiceForm[serviceFormIndex]?.oLTIndexNo === null) setOltIndex("")
                else setOltIndex(allServiceForm[serviceFormIndex]?.oLTIndexNo)

                setValue("lTSAddress", allServiceForm[serviceFormIndex]?.lTSAddress),
                    setValue("lTSApt", allServiceForm[serviceFormIndex]?.lTSApt),
                    setValue("lTSCity", allServiceForm[serviceFormIndex]?.lTSCity),
                    setValue("lTSState", allServiceForm[serviceFormIndex]?.lTSState),
                    setValue("lTSDescription", allServiceForm[serviceFormIndex]?.lTSDescription),
                    setValue("lTSZip", allServiceForm[serviceFormIndex]?.lTSZip),

                    setCurrentServerId(allServiceForm[serviceFormIndex]?.serviceResultServerId?._id ?? "")


                setValue("lTSBusinessName", allServiceForm[serviceFormIndex]?.lTSBusinessName),
                    setValue("inputDate", allServiceForm[serviceFormIndex]?.inputDate)
                setValue("queryInformationStandardServeTo", allServiceForm[serviceFormIndex]?.queryInformationStandardServeTo),
                    setValue("sSDDefendants", allServiceForm[serviceFormIndex]?.sSDDefendants),
                    setValue("sSDPlaintiff", allServiceForm[serviceFormIndex]?.sSDPlaintiff)
                setValue("serviceResultScvType", allServiceForm[serviceFormIndex]?.serviceResultScvType ?? "")
                setValue("clientId", allServiceForm[serviceFormIndex]?.clientId?._id)
                setValue("jobNo", JSON.stringify(allServiceForm[serviceFormIndex]?.jobNo ?? ""))
                setValue("serviceResultOtherFeatures", allServiceForm[serviceFormIndex]?.otherIdentifyingFeatures)
                setValue("serviceResultSkinColor", allServiceForm[serviceFormIndex]?.serviceResultSkinColor)
                setValue("serviceType", allServiceForm[serviceFormIndex]?.serviceType?.serviceTypeCode)


                setValue("serviceResultServerId", allServiceForm[serviceFormIndex]?.serviceResultServerId?._id ?? "")
                setValue("serviceResultResults", allServiceForm[serviceFormIndex]?.serviceResultResults ?? "")
                setResultId(allServiceForm[serviceFormIndex]?.serviceResultResults ?? "")
                // setValue("serviceResultSecondTimeOfService", allServiceForm[serviceFormIndex]?.serviceResultSecondTimeOfService)

                setValue("serviceResultSecondTimeOfService", allServiceForm[serviceFormIndex]?.serviceResultSecondTimeOfService === undefined || allServiceForm[serviceFormIndex]?.serviceResultSecondTimeOfService === "" ? lastestResultFormSaved?.serviceResultSecondTimeOfService : allServiceForm[serviceFormIndex]?.serviceResultSecondTimeOfService)

                setValue("serviceResultFirstTimeOfService", allServiceForm[serviceFormIndex]?.serviceResultFirstTimeOfService === undefined || allServiceForm[serviceFormIndex]?.serviceResultFirstTimeOfService === "" ? lastestResultFormSaved?.serviceResultFirstTimeOfService : allServiceForm[serviceFormIndex]?.serviceResultFirstTimeOfService)

                setValue("serviceResultTimeOfService", allServiceForm[serviceFormIndex]?.serviceResultTimeOfService === undefined || allServiceForm[serviceFormIndex]?.serviceResultTimeOfService === "" ? lastestResultFormSaved?.serviceResultTimeOfService : allServiceForm[serviceFormIndex]?.serviceResultTimeOfService)


                // if (lastestResultFormSaved?.serviceResultSecondTimeOfService !== "" || lastestResultFormSaved?.serviceResultSecondTimeOfService !== "NaN") {
                //     const secondTime = addMinutesToTime(lastestResultFormSaved?.serviceResultSecondTimeOfService, suggestedTimeTrip)
                //     // const firstTime = addMinutesToTime(previousForm?.serviceResultFirstTimeOfService, suggestedTimeTrip)
                //     console.log("lastestResultFormSaved?.serviceResultSecondTimeOfService !== `` || lastestResultFormSaved?.serviceResultSecondTimeOfService !== `NaN`", secondTime)

                //     setValue("serviceResultSecondTimeOfService", secondTime)
                //     // setValue("serviceResultFirstTimeOfService", firstTime)
                //     // setValue("serviceResultTimeOfService", secondTime)


                // } else {
                //     console.log("lastestResultFormSaved?.serviceResultSecondTimeOfService !== `` || lastestResultFormSaved?.serviceResultSecondTimeOfService !== `NaN` else")

                //     // setValue("serviceResultTimeOfService", allServiceForm[serviceFormIndex]?.serviceResultTimeOfService === "" || allServiceForm[serviceFormIndex]?.serviceResultTimeOfService === undefined ? previousForm?.serviceResultTimeOfService : allServiceForm[serviceFormIndex]?.serviceResultTimeOfService)
                //     setValue("serviceResultSecondTimeOfService", allServiceForm[serviceFormIndex]?.serviceResultSecondTimeOfService === "" || allServiceForm[serviceFormIndex]?.serviceResultSecondTimeOfService === undefined ? lastestResultFormSaved?.serviceResultSecondTimeOfService : allServiceForm[serviceFormIndex]?.serviceResultSecondTimeOfService)
                //     // setValue("serviceResultFirstTimeOfService", allServiceForm[serviceFormIndex]?.serviceResultFirstTimeOfService === "" || allServiceForm[serviceFormIndex]?.serviceResultFirstTimeOfService === undefined ? previousForm?.serviceResultFirstTimeOfService : allServiceForm[serviceFormIndex]?.serviceResultFirstTimeOfService)

                // }

                // const secondTime = allServiceForm[serviceFormIndex]?.serviceResultSecondTimeOfService === "NaN:NaN" || allServiceForm[serviceFormIndex]?.serviceResultSecondTimeOfService === undefined ? addMinutesToTime(lastestResultFormSaved?.serviceResultSecondTimeOfService, suggestedTimeTrip) : addMinutesToTime(allServiceForm[serviceFormIndex]?.serviceResultSecondTimeOfService, suggestedTimeTrip)
                // const firstTime = allServiceForm[serviceFormIndex]?.serviceResultFirstTimeOfService === "NaN:NaN" || allServiceForm[serviceFormIndex]?.serviceResultFirstTimeOfService === undefined ? addMinutesToTime(lastestResultFormSaved?.serviceResultFirstTimeOfService, suggestedTimeTrip) : addMinutesToTime(allServiceForm[serviceFormIndex]?.serviceResultFirstTimeOfService, suggestedTimeTrip)
                // console.log("secondTime", suggestedTimeTrip);
                // setValue("serviceResultSecondTimeOfService", allServiceForm[serviceFormIndex]?.serviceResultSecondTimeOfService === "NaN:NaN" || allServiceForm[serviceFormIndex]?.serviceResultSecondTimeOfService === "" || allServiceForm[serviceFormIndex]?.serviceResultSecondTimeOfService === undefined ? addMinutesToTime(lastestResultFormSaved?.serviceResultSecondTimeOfService, suggestedTimeTrip) : addMinutesToTime(allServiceForm[serviceFormIndex]?.serviceResultSecondTimeOfService, suggestedTimeTrip))
                // setValue("serviceResultTimeOfService", allServiceForm[serviceFormIndex]?.serviceResultTimeOfService === "NaN:NaN" || allServiceForm[serviceFormIndex]?.serviceResultTimeOfService === "" || allServiceForm[serviceFormIndex]?.serviceResultTimeOfService === undefined ? lastestResultFormSaved?.serviceResultTimeOfService : allServiceForm[serviceFormIndex]?.serviceResultTimeOfService)
                // setValue("serviceResultFirstTimeOfService", allServiceForm[serviceFormIndex]?.serviceResultFirstTimeOfService === "NaN:NaN" || allServiceForm[serviceFormIndex]?.serviceResultFirstTimeOfService === "" || allServiceForm[serviceFormIndex]?.serviceResultFirstTimeOfService === undefined ? lastestResultFormSaved?.serviceResultFirstTimeOfService : allServiceForm[serviceFormIndex]?.serviceResultFirstTimeOfService)

                // console.log(allServiceForm[serviceFormIndex]?.serviceResultTimeOfService === "NaN:NaN" || allServiceForm[serviceFormIndex]?.serviceResultTimeOfService === "" || allServiceForm[serviceFormIndex]?.serviceResultTimeOfService === undefined ? lastestResultFormSaved?.serviceResultTimeOfService : allServiceForm[serviceFormIndex]?.serviceResultTimeOfService, lastestResultFormSaved?.serviceResultTimeOfService)
                // setValue("serviceResultSecondTimeOfService", secondTime)
                // setValue("serviceResultFirstTimeOfService", firstTime)



                setValue("serviceResultDateOfService", allServiceForm[serviceFormIndex]?.serviceResultDateOfService === undefined || allServiceForm[serviceFormIndex]?.serviceResultDateOfService === "" ? lastestResultFormSaved?.serviceResultDateOfService : allServiceForm[serviceFormIndex]?.serviceResultDateOfService)
                setValue("serviceResultDateOfNotary", allServiceForm[serviceFormIndex]?.serviceResultDateOfNotary === undefined || allServiceForm[serviceFormIndex]?.serviceResultDateOfNotary === "" ? lastestResultFormSaved?.serviceResultDateOfNotary : allServiceForm[serviceFormIndex]?.serviceResultDateOfNotary)
                setValue("serviceResultDateOfMailing", allServiceForm[serviceFormIndex]?.serviceResultDateOfMailing === undefined || allServiceForm[serviceFormIndex]?.serviceResultDateOfMailing === "" ? lastestResultFormSaved?.serviceResultDateOfMailing : allServiceForm[serviceFormIndex]?.serviceResultDateOfMailing)

                setValue("serviceResultFirstAttemptDate", allServiceForm[serviceFormIndex]?.serviceResultFirstAttemptDate === undefined || allServiceForm[serviceFormIndex]?.serviceResultFirstAttemptDate === "" ? lastestResultFormSaved?.serviceResultFirstAttemptDate : allServiceForm[serviceFormIndex]?.serviceResultFirstAttemptDate)
                setValue("serviceResultSecondAttemptDate", allServiceForm[serviceFormIndex]?.serviceResultSecondAttemptDate === undefined || allServiceForm[serviceFormIndex]?.serviceResultSecondAttemptDate === "" ? lastestResultFormSaved?.serviceResultSecondAttemptDate : allServiceForm[serviceFormIndex]?.serviceResultSecondAttemptDate)
                setValue("serviceResultThirdTimeOfService", allServiceForm[serviceFormIndex]?.serviceResultThirdTimeOfService === undefined ? lastestResultFormSaved?.serviceResultThirdTimeOfService : allServiceForm[serviceFormIndex]?.serviceResultThirdTimeOfService)
                setValue("serviceResultThirdAttemptDate", allServiceForm[serviceFormIndex]?.serviceResultThirdAttemptDate === undefined || allServiceForm[serviceFormIndex]?.serviceResultThirdAttemptDate === "" ? lastestResultFormSaved?.serviceResultThirdAttemptDate : allServiceForm[serviceFormIndex]?.serviceResultThirdAttemptDate)

                // Convert lTSFirstName to an array
                const lTSFirstNames = allServiceForm[serviceFormIndex]?.lTSFirstName?.split(",") || [];
                // Get the current served and not served arrays
                const currentServed = allServiceForm[serviceFormIndex]?.serviceResultlTServed === undefined || allServiceForm[serviceFormIndex]?.serviceResultlTServed === ""
                    ? []
                    : allServiceForm[serviceFormIndex]?.serviceResultlTServed?.split(",");

                const currentNotServed = allServiceForm[serviceFormIndex]?.serviceResultlTNotServed !== ""
                    ? allServiceForm[serviceFormIndex]?.serviceResultlTNotServed?.split(",")
                    : [];

                // Create a new served array that includes names from lTSFirstNames and adds them if not already in served
                const updatedServed = lTSFirstNames?.filter(name => name && !currentServed?.includes(name));

                // Remove names from currentServed that are not in lTSFirstNames
                const filteredServed = currentServed?.filter(name => lTSFirstNames?.includes(name));

                // Remove names from currentNotServed that are not in lTSFirstNames
                const filteredNotServed = currentNotServed?.filter(name => lTSFirstNames?.includes(name));

                // Filter out names that are in filteredNotServed from filteredServed and updatedServed
                const finalServed = [
                    ...filteredServed?.filter(name => !filteredNotServed?.includes(name)),
                    ...updatedServed?.filter(name => !filteredNotServed?.includes(name))
                ];


                // Set the states
                setLTSServed(finalServed);
                setLTSNotServed(filteredNotServed);

                setValue("serviceResultlTNotServed", allServiceForm[serviceFormIndex]?.serviceResultlTNotServed)
                setValue("serviceResultRecipientTitle", allServiceForm[serviceFormIndex]?.serviceResultRecipientTitle)
                setValue("serviceResultDoor", allServiceForm[serviceFormIndex]?.serviceResultDoor === null ? "" : JSON.stringify(allServiceForm[serviceFormIndex]?.serviceResultDoor))
                setValue("serviceResultDoorLocks", allServiceForm[serviceFormIndex]?.serviceResultDoorLocks === null ? "" : JSON.stringify(allServiceForm[serviceFormIndex]?.serviceResultDoorLocks))
                setValue("serviceResultEntry", allServiceForm[serviceFormIndex]?.serviceResultEntry === null ? "" : JSON.stringify(allServiceForm[serviceFormIndex]?.serviceResultEntry))
                setValue("serviceResultWall", allServiceForm[serviceFormIndex]?.serviceResultWall === null ? "" : JSON.stringify(allServiceForm[serviceFormIndex]?.serviceResultWall))
                setValue("serviceResultFloor", allServiceForm[serviceFormIndex]?.serviceResultFloor === null ? "" : JSON.stringify(allServiceForm[serviceFormIndex]?.serviceResultFloor))
                setValue("serviceResultLock", allServiceForm[serviceFormIndex]?.serviceResultLock === null ? "" : JSON.stringify(allServiceForm[serviceFormIndex]?.serviceResultLock))
                setValue("serviceResultOtherDescription", allServiceForm[serviceFormIndex]?.serviceResultOtherDescription)
                setValue("serviceResultSex", allServiceForm[serviceFormIndex]?.serviceResultSex)
                setValue("serviceResultHair", allServiceForm[serviceFormIndex]?.serviceResultHair)
                setValue("serviceResultAge", allServiceForm[serviceFormIndex]?.serviceResultAge === null ? "" : JSON.stringify(allServiceForm[serviceFormIndex]?.serviceResultAge))
                setValue("serviceResultHeight", allServiceForm[serviceFormIndex]?.serviceResultHeight === null ? "" : JSON.stringify(allServiceForm[serviceFormIndex]?.serviceResultHeight))
                setValue("serviceResultWeight", allServiceForm[serviceFormIndex]?.serviceResultWeight === null ? "" : JSON.stringify(allServiceForm[serviceFormIndex]?.serviceResultWeight))
                setValue("serviceResultOtherFeatures", allServiceForm[serviceFormIndex]?.serviceResultOtherFeatures)
                // setValue("serviceResultDateOfMailing", allServiceForm[serviceFormIndex]?.serviceResultDateOfMailing === "" || allServiceForm[serviceFormIndex]?.serviceResultDateOfMailing === undefined ? previousForm?.serviceResultDateOfMailing : allServiceForm[serviceFormIndex]?.serviceResultDateOfMailing)
                // setValue("serviceResultDateOfNotary", allServiceForm[serviceFormIndex]?.serviceResultDateOfNotary === "" || allServiceForm[serviceFormIndex]?.serviceResultDateOfNotary === undefined ? previousForm?.serviceResultDateOfNotary : allServiceForm[serviceFormIndex]?.serviceResultDateOfNotary)
                setValue("serviceResultSubstitudeDeliveredTo", allServiceForm[serviceFormIndex]?.serviceResultSubstitudeDeliveredTo)
                setValue("serviceResultRecipient", allServiceForm[serviceFormIndex]?.serviceResultRecipient)


                setIsConspicuous(allServiceForm[serviceFormIndex]?.serviceResultResults)
                setResultId(allServiceForm[serviceFormIndex]?.serviceResultResults)
            }
        }

    }, [serviceFormIndex, setValue, allServiceForm, selectedSearchResultData])
    // WHEN SELECT DATE OF SERVICE THE NEXT DATE STORE IN NOTRAY AND MAILING DATE LOGIC STARTS 
    // const serviceResultDateOfService = watch("serviceResultDateOfService");

    // useEffect(() => {
    //     if (serviceResultDateOfService) {
    //         const serviceDate = new Date(serviceResultDateOfService);
    //         const nextDay = new Date(serviceDate);
    //         nextDay.setDate(serviceDate.getDate() + 1);

    //         // const formattedNextDay = format(nextDay, 'yyyy-MM-dd');
    //         const formattedNextDay = format(nextDay, 'mm-dd-yyyy');


    //         setValue("serviceResultDateOfMailing", formattedNextDay);
    //         setValue("serviceResultDateOfNotary", formattedNextDay);
    //     }
    // }, [serviceResultDateOfService, setValue]);
    const serviceResultDateOfService = watch("serviceResultDateOfService");

    useEffect(() => {
        // Only proceed if serviceResultDateOfService has a valid date
        if (serviceResultDateOfService) {
            const serviceDate = new Date(serviceResultDateOfService);

            // Check if the date is valid
            if (isNaN(serviceDate)) {
                console.error("Invalid date value: ", serviceResultDateOfService);
                return;
            }

            const nextDay = new Date(serviceDate);
            nextDay.setDate(serviceDate.getDate() + 1);

            // Format the next day
            const formattedNextDay = format(nextDay, 'yyyy-MM-dd'); // Use correct date format
            // toast.success(`if ${formattedNextDay}`)

            // Set the other fields
            setValue("serviceResultDateOfMailing", formattedNextDay);
            setValue("serviceResultDateOfNotary", formattedNextDay);
        } else {
            // Handle empty value case: If serviceResultDateOfService is empty, fallback to firstResultDateOfService
            const serviceResultDateOfService = watch("serviceResultDateOfService");
            if (serviceResultDateOfService) {
                const serviceDate = new Date(serviceResultDateOfService);

                // Check if serviceResultDateOfService is a valid date
                if (isNaN(serviceDate)) {
                    console.error("Invalid serviceResultDateOfService date: ", serviceResultDateOfService);
                    return;
                }

                const nextDay = new Date(serviceDate);
                nextDay.setDate(serviceDate.getDate() + 1);

                const formattedNextDay = format(nextDay, 'MM-dd-yyyy');
                // toast.success(`else${formattedNextDay}`)
                setValue("serviceResultDateOfMailing", formattedNextDay);
                setValue("serviceResultDateOfNotary", formattedNextDay);
            }
        }
    }, [serviceResultDateOfService, setValue, watch]); // Re-run effect when serviceResultDateOfService changes

    // WHEN SELECT DATE OF SERVICE THE NEXT DATE STORE IN NOTRAY AND MAILING DATE LOGIC ENDS 



    // Manually set the values for startDate and endDate in the form
    const handleStartDateChange = (date) => {
        setStartDate(date);
        setValue("startDate", date ? date.toISOString() : "");
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
        setValue("endDate", date ? date.toISOString() : "");
    };

    const convertDurationToMinutes = (duration) => {
        let totalMinutes = 0;

        // Extract hours and minutes using regex
        const hourMatch = duration.match(/(\d+)\s*hour/); // Matches "X hour" or "X hours"
        const minuteMatch = duration.match(/(\d+)\s*min/); // Matches "X min" or "X mins"

        // If there are hours, convert them to minutes and add to total
        if (hourMatch) {
            totalMinutes += parseInt(hourMatch[1]) * 60; // Convert hours to minutes
        }

        // If there are minutes, add them to total
        if (minuteMatch) {
            totalMinutes += parseInt(minuteMatch[1]);
        }

        return totalMinutes;
    };

    const removeLTSName = (data: string) => {
        // Ensure prevNotServed is always an array before spreading it
        setLTSNotServed((prevNotServed) => (prevNotServed ? [...prevNotServed, data] : [data]));

        setLTSServed((prevServed) => prevServed.filter((serve) => serve !== data));
    };

    const removeLTSNotName = (data: string) => {
        // Ensure prevServed is always an array before spreading it
        setLTSServed((prevServed) => (prevServed ? [...prevServed, data] : [data]));

        setLTSNotServed((prevNotServed) => prevNotServed.filter((serve) => serve !== data));
    };



    const updateTimes = (timeTripValue) => {
        const totalMinutes = parseInt(timeTripValue, 10);
        // Only run if totalMinutes is a valid number
        if (!isNaN(totalMinutes) && timeTripValue !== '') {
            const secondTime = addMinutesToTime(lastestResultFormSaved?.serviceResultSecondTimeOfService, totalMinutes);
            const firstTime = addMinutesToTime(lastestResultFormSaved?.serviceResultFirstTimeOfService, totalMinutes);
            // Confirm update for the first time
            const confirmFirstTime = window.confirm(`Do you want to add ${totalMinutes} minutes to 1st Time Attempt?`);
            if (confirmFirstTime) {
                setValue("serviceResultFirstTimeOfService", firstTime);

            }
            // Confirm update for the second time
            const confirmSecondTime = window.confirm(`Do you want to add ${totalMinutes} minutes to 2nd Time Attempt?`);
            if (confirmSecondTime) {
                setValue("serviceResultSecondTimeOfService", secondTime);
                setValue("serviceResultTimeOfService", secondTime);

            }
        }
    };


    // Call updateTimes whenever timeTripValue changes
    const handleTimeTripChange = (event) => {
        const newValue = event.target.value;
        setValue("timeTrip", newValue); // Update the form state
        // const totalMinutes = parseInt(newValue, 10);
        // if (!isNaN(totalMinutes)) {
        //     updateTimes(totalMinutes); // Call the function to update times
        // }

    };
    const handleTimeTripServerIdChange = () => {
        // if (previousForm?.serviceResultServerId?._id === currentServerId && currentServerId !== undefined && currentServerId !== "") {
        const { timeTrip } = getValues()
        updateTimes(timeTrip);
        // }
    };

    const moveToNextFieldFromTimeTrip = (event) => {
        // Check if Enter key is pressed
        if (event.key === 'Enter') {
            const timeTripValue = event.target.value;
            updateTimes(timeTripValue);
            resultHandleEnterKeyPress(event, "timetrip", 19);

        }
    }


    // USEEFFECT FOR TRACKNG SERVVER ID AND CALCULATE TIMETRIP
    const serverId = watch("serviceResultServerId");
    const { serviceResultServerId } = getValues()
    const [previousAddress, setPreviousAddress] = useState<string | undefined>("")


    const handleServerIdChange = (selectedValue) => {
        // This function is called when the server ID changes
        setValue("serviceResultServerId", selectedValue);
        setCurrentServerId(selectedValue);


    };

    const handleDistanceMatrixResponse = (response) => {
        // console.log("response", response)

        if (response && response?.rows[0]?.elements[0].status === "OK") {
            // toast.success("cl")
            const distance = response?.rows[0]?.elements[0]?.distance;
            const duration = response?.rows[0]?.elements[0]?.duration?.text; // e.g., "2hr 40mins"
            const totalMinutes = convertDurationToMinutes(duration);
            setValue("timeTrip", JSON.stringify(totalMinutes));
            // console.log("totalMinutes>>>>", totalMinutes)
            setSuggestedTimeTrip(duration);

        }
    };
    const [selectedResultOrigins, setOrigins] = useState([]);
    const [selectedResultDestinations, setDestinations] = useState([]);
    const [mapKey, setMapKey] = useState(0); // Add a key to force re-rendering

    const fetchDistanceMatrix = () => {
        const newOrigins = [
            lastestResultFormSaved?.lTSAddress || ''
        ];

        const newDestinations = [selectedSearchResultData[0]?.lTSAddress || ''];

        if (newOrigins[0] && newDestinations[0]) {
            // console.log("selectedSearchResultData[0]?.lTSAddress", newDestinations);
            // Update the state with new origins and destinations
            setOrigins(newOrigins);
            setDestinations(newDestinations);
            setMapKey(prevKey => prevKey + 1);

        }
    };

    // Add this useEffect hook to trigger `fetchDistanceMatrix` when necessary
    useEffect(() => {
        fetchDistanceMatrix();
    }, [selectedSearchResultData[0]]);
    // // Fetch the Distance Matrix
    // const fetchDistanceMatrix = () => {
    //     const origins = [lastestResultFormSaved?.lTSAddress, lastestResultFormSaved?.lTSCity, lastestResultFormSaved?.lTSState || ''];
    //     // const destinations = [allServiceForm[serviceFormIndex]?.lTSAddress, allServiceForm[serviceFormIndex]?.lTSCity, allServiceForm[serviceFormIndex]?.lTSState
    //     //     || ''];

    //     const destinations = [selectedSearchResultData[0]?.lTSAddress || ''];
    //     if (origins[0] && destinations[0]) {
    //         console.log("selectedSearchResultData[0]?.lTSAddress", destinations)
    //         toast.success("useefect called")
    //         // Here, you can either set up the DistanceMatrixService again or trigger it
    //         return (
    //             <LoadScript googleMapsApiKey="AIzaSyCVarmzRfQK8gU8fFh6bTmOtThP5iNfYaY">
    //                 <GoogleMap
    //                     center={{ lat: -34.397, lng: 150.644 }}
    //                     zoom={8}
    //                     onLoad={(map) => console.log("GoogleMap loaded", map)}
    //                 >
    //                     {origins[0] && destinations[0] && (

    //                         <DistanceMatrixService
    //                             options={{
    //                                 origins,
    //                                 destinations,
    //                                 travelMode: "DRIVING",
    //                             }}
    //                             callback={handleDistanceMatrixResponse}
    //                         />
    //                     )}
    //                 </GoogleMap>
    //             </LoadScript>
    //         );
    //     }
    // };
    // useEffect(() => {
    //     setPreviousAddress(serviceResultServerId)
    //     fetchDistanceMatrix();
    //     handleTimeTripServerIdChange()

    // }, [selectedSearchResultData[0]]);

    const [googleLoaded, setGoogleLoaded] = useState(false);
    const onLoad = useCallback(() => {
        // This will be called once the library has fully loaded
        setGoogleLoaded(true);

    }, []);
    const handleZipChange = (event) => {
        const { value } = event.target;
        const sanitizedValue = value.replace(/[^a-zA-Z0-9]/g, ''); // Allow only letters and numbers

        // Limit to a maximum of 9 characters
        const limitedValue = sanitizedValue.slice(0, 9);

        let formattedValue = limitedValue;
        if (limitedValue.length > 5) {
            formattedValue = `${limitedValue.slice(0, 5)}-${limitedValue.slice(5)}`;
        }

        setValue("lTSZip", formattedValue); // Update the form state
    };
    const handleResultIdChange = (selectedValue) => {
        // This function is called when the server ID changes
        setValue("serviceResultResults", selectedValue);
        setResultId(selectedValue);


    };
    const serviceResultSectionRef = useRef(null);
    const [isGotToServiceForm, setIsGotToServiceForm] = useState(false)
    const goToServiceResultForm = (data: any) => {
        if (data === 'service result') {
            setIsGotToServiceForm(true)
            serviceResultSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    };


    const [isOpenResult, setIsOpenResult] = useState(false)
    const handleServerSelect = (event) => {
        // toast.success("l")

        if (event.key === 'Enter' || event.key === 'Tab') {
            setIsOpenResult(true);
        }


    };
    const ltServedRef = useRef(null)
    const ltNotServedRef = useRef(null)

    const [isHightLIghtedLTServed, setIsHightLIghtedLTServed] = useState(false)
    const [isHightLIghtedLTNotServed, setIsHightLIghtedLTNotServed] = useState(false)


    const moveToNextField = (event) => {
        const { serviceResultResults } = getValues()
        if (event.key === 'Enter') {

            if (serviceResultResults === "substitute") {
                resultHandleEnterKeyPress(event, "_", 24)
            }

            else if (serviceResultResults === "conspicuous") {
                resultHandleEnterKeyPress(event, "conspicuous", 28)

            } else if (serviceResultResults === "personal" || serviceResultResults === "personalplus") {
                resultHandleEnterKeyPress(event, "personal", 27)
                // ltServedRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // setIsHightLIghtedLTServed(true)

            }
            // else if (serviceResultResults !== "substitute" && serviceResultResults !== "conspicuous") {
            //     toast.success("s")
            //     ltServedRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            //     setIsHightLIghtedLTServed(true)

            // }
        }

    }
    const moveToNotServed = (event) => {

        if (event.key === 'Enter') {
            ltNotServedRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        setIsHightLIghtedLTServed(false)

        setIsHightLIghtedLTNotServed(true)
        const { serviceResultResults } = getValues()
        if (serviceResultResults === "personal" || serviceResultResults === "personalPlus") {
            resultHandleEnterKeyPress(event, "personal", 34)

        }

    }

    const moveFromLtNotServed = (event) => {

        if (event.key === "Enter") {

        }


        // toast.success("notserved")


    }

    // setDatePairsDates(allServiceForm[serviceFormIndex]?.datePairs?.firstAttemptDate === "" || allServiceForm[serviceFormIndex]?.datePairs?.secondAttemptDate ? previousForm?.datePairs : allServiceForm[serviceFormIndex]?.datePairs)
    // console.log("selectedResultOrigins[0] && selectedResultDestinations[0]", selectedResultOrigins, selectedResultDestinations)
    // allServiceForm[serviceFormIndex]?.datePairs?.firstAttemptDate === "" || allServiceForm[serviceFormIndex]?.datePairs?.secondAttemptDate ? previousForm?.datePairs : allServiceForm[serviceFormIndex]?.datePairs)

    const [map, setMap] = useState(null);

    const center = {
        lat: -3.745,
        lng: -3.523
    }

    const onMount = useCallback(function (map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        // console.log('MAP Setting: ', map);

        setMap(map);
    }, []);

    const onUnmount = useCallback(() => {
        // console.log('MAP: ', map);

        setMap(null);
    }, [])

    useEffect(() => {
        return () => {
            // console.log('/////////////////////////// Cleaned Up');
            onUnmount()
        }
    }, [])
    const [isLoading, setIsLoading] = useState(true);
    // console.log('/////////////////////////// Cleaned Up', lastestResultFormSaved);

    const handleMapLoad = () => {
        setIsLoading(false);
        // console.log("GoogleMap loaded");
    };
    if (!isLoaded) {
        return <h1>Loading....</h1>;
    };
    return <>
        {/* <LoadScript googleMapsApiKey="AIzaSyCVarmzRfQK8gU8fFh6bTmOtThP5iNfYaY"> */}
        {/* {isLoading && <div>Loading...</div>} */}

        {searchResultFormData?.length > 0 && isSearchResultForm ? <SearchResultData /> : isDatePairModal ?
            <DatePairsModal /> :
            <>

                <form onSubmit={handleSubmit(submitResultFormFunction)}>

                    {/* QUERY INFORMATION (L&T) FORM STARTS */}
                    <div className="mt-6  ">
                        <div className="flex items-center flex-wrap gap-x-4 mb-4">

                            <h1 className="font-semibold  text-base
                                    md:text-md 
                                    lg:text-xl">Query Information (L&T)</h1>
                            <BorderButton buttonText="Go to Service Result" onClick={() => goToServiceResultForm("service result")} />
                        </div>


                        <div className="flex items-start w-full flex-wrap gap-x-8 gap-y-4 justify-start ">
                            <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                                <TextField register={register} label="full Name" error={errors.lTSFirstName} name="lTSFirstName" onKeyDown={handleEnterKeyPress}
                                />
                            </div>
                            <div className="w-[100%] md:w-[46%] lg:w-[30%]">

                                {/* <FormatedIndexInputField
                                onKeyDown={handleEnterKeyPress} register={register} label="Index Number" error={errors.oLTIndexNo} name="oLTIndexNo" oltIndexValue={oLTIndex}
                                onChange={setOltIndex} year={currentYear}
                            /> */}

                                <FormatedIndexInputField
                                    onKeyDown={handleEnterKeyPress}
                                    register={register}
                                    label="Index Number"
                                    error={errors.oLTIndexNo}
                                    name="oLTIndexNo"
                                    oltIndexValue={oLTIndex} // Provide the value to split
                                    onChange={setOltIndex}
                                    year={currentYear} // Pass current year
                                />

                            </div>
                            <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                                <TextField register={register} label="address" error={errors.lTSAddress} name="lTSAddress" onKeyDown={handleEnterKeyPress}
                                />
                            </div>
                            <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                                <TextField register={register} label="Business Name" error={errors.lTSBusinessName} name="lTSBusinessName" onKeyDown={handleEnterKeyPress}
                                />
                            </div>
                            <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                                <TextField onKeyDown={handleEnterKeyPress} register={register} label="apt" error={errors.lTSApt} name="lTSApt" />
                            </div>
                            <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                                <TextField onKeyDown={handleEnterKeyPress} register={register} label="city" error={errors.lTSCity} name="lTSCity" />
                            </div>
                            <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                                <TextField onKeyDown={handleEnterKeyPress} register={register} label="state" error={errors.lTSState} name="lTSState" />
                            </div>

                            <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                                <TextField onKeyDown={handleEnterKeyPress} register={register} label="zip" error={errors.lTSZip} name="lTSZip" maxLength={12} onChange={handleZipChange} />
                            </div>
                            <div className="w-[30%]">
                                {/* <TextArea row={1} register={register} label="description" error={errors.lTSDescription} name="lTSDescription" /> */}
                                <TextField
                                    // onKeyDown={handleEnterKeyPress} 
                                    register={register} label="description" error={errors.lTSDescription} name="lTSDescription" />
                            </div>
                            <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                                {isSearchResultForm ?
                                    <div className="flex items-center gap-x-6">
                                        <div className="w-full flex items-center">
                                            <label className="w-[180px]">Start Date</label>
                                            <DatePicker
                                                selected={startDate}
                                                selectsStart
                                                startDate={startDate}
                                                endDate={endDate}
                                                onChange={handleStartDateChange}

                                                className="w-full border-[1px] border-borderColor/10 bg-grayColorLight/50 border-solid rounded-lg px-2  py-1
                                        focus:border-primaryColor focus:outline-primaryColor"
                                                placeholderText="Start Date"
                                            />
                                        </div>
                                        <div className="w-full flex items-center">
                                            <label className="w-[180px]">End Date</label>
                                            <DatePicker
                                                selected={endDate}
                                                selectsEnd
                                                startDate={startDate}
                                                endDate={endDate}
                                                onChange={handleEndDateChange}

                                                className="w-full border-[1px] border-borderColor/10 bg-grayColorLight/50 border-solid rounded-lg px-2  py-1
                                        focus:border-primaryColor focus:outline-primaryColor"
                                                placeholderText="End Date"
                                            />
                                        </div>
                                    </div>
                                    : <TextField register={register} label="Input Date" readOnly error={errors.inputDate} name="inputDate" onKeyDown={handleEnterKeyPress}
                                        type="date" />
                                }


                            </div>
                        </div>
                    </div>
                    {/* QUERY INFORMATION (L&T) FORM ENDS */}
                    {/* QUERY INFORMATION (STANDARD) FORM STARTS */}
                    <div className="mt-6">
                        <h1 className="font-semibold  mb-4 text-base
    md:text-md
    lg:text-xl">Query Information (Standard)</h1>

                        <div className="flex items-start w-full flex-wrap gap-x-8 gap-y-4 justify-start ">
                            <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                                <TextField onKeyDown={handleEnterKeyPress}
                                    register={register} label="serve To" error={errors.queryInformationStandardServeTo} name="queryInformationStandardServeTo" />
                            </div>
                            <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                                <TextField onKeyDown={handleEnterKeyPress}
                                    register={register} label="plaintiff" error={errors.sSDPlaintiff} name="sSDPlaintiff" />
                            </div>
                            <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                                <TextField onKeyDown={handleEnterKeyPress}
                                    register={register} label="defendants" error={errors.sSDDefendants} name="sSDDefendants" />
                            </div>
                        </div>
                    </div>
                    {/* QUERY INFORMATION (STANDARD) FORM ENDS */}
                    {/* SERVICE RESULT SECTION STARTS */}
                    <div className="mt-6 flex items-center gap-x-6" ref={serviceResultSectionRef}>

                        <h1 className="font-semibold  text-base
    md:text-md
    lg:text-xl">Service Result</h1>

                        <label className="italic">
                            {allServiceForm[serviceFormIndex]?.standardServiceType?.name ? (
                                <>
                                    {allServiceForm[serviceFormIndex]?.standardServiceType?.name}
                                    <span className=" ml-2">
                                        ({allServiceForm[serviceFormIndex]?.oSSTDescription})
                                    </span>
                                </>
                            ) : (
                                allServiceForm[serviceFormIndex]?.lTServiceType?.name
                            )}
                        </label>


                    </div>
                    {/* SERVICE RESULT SECTION STAENDRTS */}
                    {/* SHOW RESULT  FORM STARTS */}
                    <div className="mt-6">
                        <div>
                            <h1 className="  font-semibold text-base
    md:text-md
    lg:text-xl ">Hints</h1>
                            <div className="flex flex-row gap-x-4 mt-2 flex-wrap gap-y-4">
                                <Hints keyName="Esc" label="Cancel" />
                                <Hints keyName="f7 " label="Find" />
                                <Hints keyName="f10" label="Save" />
                            </div>

                        </div>
                        <div className="flex items-start w-full flex-wrap gap-x-8 gap-y-4 justify-start mt-4">
                            <div className="flex items-center justify-between w-[96%]">
                                <div className="w-[100%] md:w-[46%] lg:w-[30%]">

                                    <TextField onKeyDown={handleEnterKeyPress}
                                        register={register} label="Result Input Date" error={errors.serviceResultInputDate} name="serviceResultInputDate" type="date"
                                    />
                                </div>
                                <div className="w-[100%] md:w-[46%] lg:w-[30%] ">

                                    <TextField onKeyDown={handleEnterKeyPress}
                                        register={register} label="svc Type" error={errors.serviceType} name="serviceType" defaultValue="L&T Residential"
                                        readOnly />

                                </div>
                            </div>
                            <div className="flex items-center flex-wrap w-[96%] justify-between">
                                <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                                    <p className="text-primaryColor/80 text-sm cursor-pointer mt-1 font-medium" onClick={() => { dispatch(isDatePairModalReducer(true)) }}>Select Date Pairs</p>
                                    <p className="text-primaryColor/80 text-sm cursor-pointer mt-1 font-medium" >{datepairsData?.firstAttemptDate === "" || datepairsData?.firstAttemptDate === undefined ? allServiceForm[serviceFormIndex]?.datePairs?.firstAttemptDate : datepairsData?.firstAttemptDate}-{datepairsData?.secondAttemptDate === undefined || datepairsData?.secondAttemptDate === "" ? allServiceForm[serviceFormIndex]?.datePairs?.secondAttemptDate : datepairsData?.secondAttemptDate}</p>

                                </div>
                                <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                                    <Controller name="clientId" control={control} render={({ field }) => (
                                        <Dropdown
                                            options={clientIdOptions}
                                            value={field.value}
                                            // onChange={() => field.onChange}
                                            onChange={(value) => {
                                                field.onChange(value);
                                                setIsGotToServiceForm(false)
                                            }}
                                            label="Client id"
                                            error={errors.clientId?.message as string}

                                        />
                                    )} />
                                </div>
                                <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                                    <TextField onKeyDown={handleEnterKeyPress}
                                        register={register} label="Job" error={errors.jobNo} name="jobNo" required readOnly />

                                </div>
                            </div>
                            <div className="flex items-center w-[100%] flex-wrap gap-x-10">
                                <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                                    <Controller name="serviceResultServerId" control={control} render={({ field }) => (
                                        <Dropdown
                                            options={serverIdOptions}
                                            value={field.value}
                                            onChange={(option) => {
                                                field.onChange(option); // Call the function to update form state
                                                handleServerIdChange(option); // Call your additional logic
                                                setIsGotToServiceForm(false)
                                                setIsOpenResult(true);

                                            }}
                                            label="server Id" error={errors.serviceResultServerId?.message as string}
                                            isOpenOption={isGotToServiceForm}
                                            onKeyDown={handleServerSelect}
                                        />
                                    )} />


                                </div>
                                <div className="w-[60%]">
                                    <div className="w-[100%] md:w-[46%] lg:w-[100%] flex flex-col w-full items-start gap-1">
                                        <label className="font-normal sm:font-medium text-sm capitalize">
                                            Previous Address:</label>
                                        {/* {(previousForm?.serviceResultServerId?._id !== undefined && allServiceForm[serviceFormIndex]?.serviceResultServerId?._id !== undefined && previousForm?.serviceResultServerId?._id === allServiceForm[serviceFormIndex]?.serviceResultServerId?._id || previousForm?.serviceResultServerId?._id === previousAddress) && */}
                                        <label
                                            className="w-full border-[1px] border-borderColor/10 bg-grayColorLight/50 border-solid rounded-lg px-2 py-1 focus:border-primaryColor focus:outline-primaryColor"

                                        >
                                            {lastestResultFormSaved?.lTSAddress}
                                        </label>
                                        {/* } */}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center w-[100%] flex-wrap gap-x-10">
                                <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                                    <Controller name="serviceResultResults" control={control} render={({ field }) => (
                                        <Dropdown
                                            options={resultOptions}
                                            value={field.value}
                                            onChange={(option) => {
                                                field.onChange(option); // Call the function to update form state
                                                handleResultIdChange(option); // Call your additional logic
                                                setIsOpenResult(false)
                                                const simulatedEvent = {
                                                    target: {
                                                        form: document.querySelector("form"), // Assuming the dropdown is in a form
                                                    },
                                                };
                                                // if (previousForm?.serviceResultServerId?._id !== undefined && allServiceForm[serviceFormIndex]?.serviceResultServerId?._id !== undefined && previousForm?.serviceResultServerId?._id === allServiceForm[serviceFormIndex]?.serviceResultServerId?._id || previousForm?.serviceResultServerId?._id === previousAddress) {
                                                //     resultHandleEnterKeyPress(simulatedEvent, "suggested", 20);
                                                // }
                                                // else {
                                                resultHandleEnterKeyPress(simulatedEvent, option, 20);

                                                // }
                                            }

                                            }


                                            onValueChange={(value) => setIsConspicuous(value)} // Update state
                                            isOpenOption={isOpenResult}
                                            label="result" error={errors.serviceResultResults?.message as string}
                                        // onKeyDown={resultHandleEnterKeyPress}
                                        />
                                    )} />
                                </div>
                                <div>
                                    {isLoading && <div>Loading...</div>}

                                    <GoogleMap
                                        center={{ lat: -34.397, lng: 150.644 }} // Dummy center, adjust based on your requirements
                                        zoom={8}

                                        onLoad={handleMapLoad}

                                    >
                                        <DistanceMatrixService
                                            options={{
                                                origins: (selectedResultOrigins[0] && selectedResultDestinations[0]) ?
                                                    selectedResultOrigins :
                                                    [lastestResultFormSaved?.lTSAddress, lastestResultFormSaved?.lTSCity, lastestResultFormSaved?.lTState || ''],
                                                destinations: (selectedResultOrigins[0] && selectedResultDestinations[0]) ?
                                                    selectedResultDestinations :
                                                    [allServiceForm[serviceFormIndex]?.lTSAddress, allServiceForm[serviceFormIndex]?.lTSCity, allServiceForm[serviceFormIndex]?.lTSState || ''],
                                                // destinations: [selectedSearchResultData[0]?.lTSAddress || ''],
                                                travelMode: "DRIVING",
                                            }}
                                            callback={handleDistanceMatrixResponse}
                                        />

                                    </GoogleMap>
                                    {/* {selectedResultOrigins[0] && selectedResultDestinations[0] && (
                                            <>
                                                {console.log("run", selectedResultOrigins[0], selectedResultDestinations[0])}
                                                <GoogleMap
                                                    center={{ lat: -34.397, lng: 150.644 }} // Dummy center, adjust based on your requirements
                                                    zoom={8}
                                                    // key={mapKey} // Use the key prop to force re-render
                                                    // key={`${selectedResultOrigins.join('-')}-${selectedResultDestinations.join('-')}`}

                                                    onLoad={(map) => console.log("GoogleMap loaded", map)}
                                                >
                                                    <DistanceMatrixService
                                                        options={{
                                                            origins: selectedResultOrigins,
                                                            destinations: selectedResultDestinations,
                                                            travelMode: "DRIVING",
                                                        }}
                                                        callback={(response) => {
                                                            console.log("DistanceMatrixService is being called");
                                                            handleDistanceMatrixResponse(response);
                                                        }}
                                                    />
                                                </GoogleMap>
                                            </>
                                        )} */}
                                    <TextField onKeyDown={moveToNextFieldFromTimeTrip} onChange={handleTimeTripChange} register={register} label="Suggested Time Trip (mins)" error={errors.timeTrip} name="timeTrip" />




                                </div>
                            </div>





                            <div className="w-[100%] md:w-[46%] lg:w-[100%]">
                                <div className="w-[30%]">
                                    <TextField onKeyDown={handleEnterKeyPress}
                                        register={register} label="Date of service" error={errors.serviceResultDateOfService} name="serviceResultDateOfService" type="date" />
                                </div>
                            </div>
                            <div className="w-[100%] md:w-[46%] lg:w-[100%]">
                                <div className="w-[30%]">
                                    <TextField onKeyDown={handleEnterKeyPress}
                                        register={register} label="Time of service" error={errors.serviceResultTimeOfService} name="serviceResultTimeOfService" type="time" />
                                </div>
                            </div>
                            {/* 1st attempt starts */}
                            <div className="flex items-center flex-wrap gap-x-8 w-full">

                                <div className="w-[100%] md:w-[46%] lg:w-[100%]">
                                    <div className="w-[30%]">
                                        <TextField onKeyDown={handleEnterKeyPress}
                                            register={register} label="1st date Attempt" error={errors.serviceResultFirstAttemptDate} name="serviceResultFirstAttemptDate" type="date" />

                                    </div> </div>
                                <div className="w-[100%] md:w-[46%] lg:w-[100%]">
                                    <div className="w-[30%]">
                                        <TextField onKeyDown={(event) => event.key === "Tab" && event.shiftKey ? handleEnterKeyPress : resultHandleEnterKeyPress(event, "_", 21)}
                                            register={register} label="1st time Attempt" error={errors.serviceResultFirstTimeOfService} name="serviceResultFirstTimeOfService" type="time" />

                                    </div>
                                </div>
                            </div>
                            {/* 1st attempt ends */}
                            {/* 2nd attempt starts */}
                            <div className="flex items-center flex-wrap gap-x-8 w-full">
                                <div className="w-[100%] md:w-[46%] lg:w-[100%]">
                                    <div className="w-[30%]">
                                        <TextField onKeyDown={handleEnterKeyPress}
                                            register={register} label="2nd date Attempt" error={errors.serviceResultSecondAttemptDate} name="serviceResultSecondAttemptDate" type="date" onChange={secondHanldetimeChange} />
                                    </div>
                                </div>
                                <div className="w-[100%] md:w-[46%] lg:w-[100%]">
                                    <div className="w-[30%]">
                                        <TextField onKeyDown={moveToNextField}
                                            register={register} label="2nd time Attempt" error={errors.serviceResultSecondTimeOfService} name="serviceResultSecondTimeOfService" type="time" />
                                    </div>
                                </div>
                            </div>
                            {/* 2nd attempt ends */}
                            {/* 3rd attempt starts */}
                            <div className="flex items-center flex-wrap gap-x-8 w-full">
                                <div className="w-[100%] md:w-[46%] lg:w-[100%]">
                                    <div className="w-[30%]">
                                        <TextField onKeyDown={handleEnterKeyPress}
                                            register={register} label="3rd date Attempt" error={errors.serviceResultThirdAttemptDate} name="serviceResultThirdAttemptDate" type="date" />
                                    </div>
                                </div>
                                <div className="w-[100%] md:w-[46%] lg:w-[100%]">
                                    <div className="w-[30%]">
                                        <TextField onKeyDown={handleEnterKeyPress}
                                            register={register} label="3rd time Attempt" error={errors.serviceResultThirdTimeOfService} name="serviceResultThirdTimeOfService" type="time" />
                                    </div>
                                </div>
                            </div>
                            {/* 3rd attempt ends */}


                            <div className={`w-[100%] md:w-[46%] lg:w-[70%]
                           
                            `} ref={ltServedRef}
                                tabIndex={28}

                                onKeyDown={moveToNotServed}>

                                <label>LT Served</label>
                                <div className={`flex items-center h-8 flex-wrap gap-x-2 w-full border-[1px]  bg-grayColorLight/50 border-solid rounded-lg px-2 py-1
                                 ${isHightLIghtedLTServed ? "border-primaryColor border-[2px]" : "border-borderColor/10"}
                                `}>
                                    {(resultId === "personal" || resultId === "personalplus") &&
                                        lTSServed?.map(data => { return <div className="flex items-center gap-x-2 "><p>{data}</p> <IoMdAdd onClick={() => { removeLTSName(data) }} className="p-[2px] cursor-pointer  rotate-45 rounded-full bg-whiteColor text-redColor border-[1px] border-redColor" size={20} />  </div> })

                                    }
                                </div>
                            </div>
                            <div className="w-[100%] md:w-[46%] lg:w-[70%]" ref={ltNotServedRef} tabIndex={29} onKeyDown={moveFromLtNotServed}>
                                <div className="w-[30%]"></div>
                                <label>LT Not Served</label>
                                <div className={`flex items-center h-8 flex-wrap gap-x-2 w-full border-[1px]  bg-grayColorLight/50 border-solid rounded-lg  
                                ${isHightLIghtedLTNotServed ? "border-primaryColor border-[2px]" : "border-borderColor/10"}
                                `}
                                >
                                    {(resultId === "personal" || resultId === "personalplus") &&
                                        (lTSNotServed?.length === 0 ? (
                                            <div className="h-8">
                                            </div>
                                        ) : (
                                            Array?.isArray(lTSNotServed) &&
                                            lTSNotServed?.map((data) => (
                                                <div key={data} className="flex items-center gap-x-2 px-2 py-1">
                                                    <p>{data}</p>
                                                    <IoMdAdd
                                                        onClick={() => { removeLTSNotName(data) }}
                                                        className="p-[2px] cursor-pointer rotate-45 rounded-full bg-whiteColor text-redColor border-[1px] border-redColor"
                                                        size={20}
                                                    />
                                                </div>
                                            ))
                                        ))
                                    }


                                </div>


                            </div>

                            <div className="w-[100%] md:w-[46%] lg:w-[100%]">
                                <div className="w-[30%]">

                                    <TextField onKeyDown={handleEnterKeyPress}
                                        register={register} label="substitute delivered To" error={errors.substituteDeliveredTo} name="substituteDeliveredTo" />
                                </div>
                            </div>
                            <div className="w-[100%] md:w-[46%] lg:w-[100%]">
                                <div className="w-[30%]">

                                    <TextField onKeyDown={handleEnterKeyPress}
                                        register={register} label="corporate Recipient" error={errors.corporateRecipient} name="corporateRecipient" />
                                </div>
                            </div>
                            <div className="w-[100%] md:w-[46%] lg:w-[100%]">
                                <div className="w-[70%]">
                                    <TextField onKeyDown={handleEnterKeyPress}
                                        register={register} label="recipient Title" error={errors.serviceResultRecipientTitle} name="serviceResultRecipientTitle" />
                                </div>
                            </div>


                        </div>
                    </div>
                    {/* SHOW RESULT  FORM ENDS */}

                    {isConspicuous === "conspicuous" && <div className="w-full mt-6 border-[1px] border-solid border-borderColor rounded-lg">
                        <h1 className="px-6 py-2 bg-cyanColor rounded-t-lg text-whiteColor font-semibold text-lg">Description</h1>
                        <div className="flex items-start w-full flex-wrap gap-x-8 gap-y-4 justify-start px-8 py-4">
                            <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                                <TextField onKeyDown={handleEnterKeyPress}
                                    register={register} label="door" error={errors.serviceResultDoor} name="serviceResultDoor" />
                            </div>
                            <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                                <TextField onKeyDown={handleEnterKeyPress}
                                    register={register} label="door Locks" error={errors.serviceResultDoorLocks} name="serviceResultDoorLocks" />
                            </div>
                            <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                                <TextField onKeyDown={handleEnterKeyPress}
                                    register={register} label="entry" error={errors.serviceResultEntry} name="serviceResultEntry" />
                            </div>
                            <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                                <TextField onKeyDown={handleEnterKeyPress}
                                    register={register} label="wall" error={errors.serviceResultWall} name="serviceResultWall" />
                            </div>
                            <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                                <TextField onKeyDown={handleEnterKeyPress}
                                    register={register} label="floor" error={errors.serviceResultFloor} name="serviceResultFloor" />
                            </div>
                            <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                                <TextField onKeyDown={handleEnterKeyPress}
                                    register={register} label="lock" error={errors.serviceResultLock} name="serviceResultLock" />
                            </div>
                            <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                                <CheckBox onKeyDown={handleEnterKeyPress} register={register} label="Other Description" error={errors.serviceResultOtherDescription?.message} name="serviceResultOtherDescription" />
                            </div>
                        </div>
                    </div>}
                    {(isConspicuous === "substitute" || isConspicuous === "personal" || isConspicuous === "personalplus") &&

                        <div className="flex items-start w-full flex-wrap gap-x-8 gap-y-4 justify-start py-4">
                            <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                                <TextField onKeyDown={handleEnterKeyPress}
                                    register={register} label="sex" error={errors.serviceResultSex} name="serviceResultSex" />
                            </div>
                            <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                                <TextField onKeyDown={handleEnterKeyPress}
                                    register={register} label="skin Color" error={errors.serviceResultSkinColor} name="serviceResultSkinColor" />
                            </div>
                            <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                                <TextField onKeyDown={handleEnterKeyPress}
                                    register={register} label="hair" error={errors.serviceResultHair} name="serviceResultHair" />
                            </div>
                            <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                                <TextField onKeyDown={handleEnterKeyPress}
                                    register={register} label="age" error={errors.serviceResultAge} name="serviceResultAge" />
                            </div>
                            <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                                <TextField onKeyDown={handleEnterKeyPress}
                                    register={register} label="height" error={errors.serviceResultHeight} name="serviceResultHeight" />
                            </div>
                            <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                                <TextField onKeyDown={handleEnterKeyPress}
                                    register={register} label="weight" error={errors.serviceResultWeight} name="serviceResultWeight" />
                            </div>
                        </div>
                    }
                    {/* DESCRIPTION FORM STARTS */}

                    {/* DESCRIPTION FORM ENDS */}
                    {/* OTHER  FORM STARTS */}
                    <div className="mt-6">
                        <div className="flex items-start w-full flex-wrap gap-x-8 gap-y-4 justify-start ">
                            <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                                <TextField onKeyDown={handleEnterKeyPress}
                                    register={register} label="Other Identifying Features" error={errors.serviceResultOtherFeatures} name="serviceResultOtherFeatures" />
                            </div>
                            <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                                <TextField onKeyDown={handleEnterKeyPress}
                                    register={register} label="Date of Mailing" error={errors.serviceResultDateOfMailing} name="serviceResultDateOfMailing" type="date" />
                            </div>
                            <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                                <TextField onKeyDown={handleEnterKeyPress}
                                    register={register} label="Notary Date" error={errors.serviceResultDateOfNotary} name="serviceResultDateOfNotary" type="date" />
                            </div>
                        </div>

                        <h1 className="font-semibold text-lg mt-4">
                            Do not Proceed Past This Line
                        </h1>
                    </div>
                    {/* OTHER  FORM ENDS */}

                </form >
            </>
        }
        {/* </LoadScript> */}


    </>
}

export default ResultForm