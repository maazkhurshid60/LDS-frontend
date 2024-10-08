import React, { useCallback, useEffect, useState } from "react";
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
import { handleEnterKeyPress } from "../../../utils/moveToNextFieldOnEnter";
import SearchResultData from "../../Service/ServiceForms/ServiceTypeForm/SearchResultData";
import { addDatePairModalReducer, getAllServiceFormThunk, getIsSearchServiceForm, isDatePairModalReducer, searchServiceFormThunk, updateServiceFormThunk } from "../../../redux/slice/serviceForm";
import { LTFormSchema } from "../../../schemas/service forms/L&TFormSchema";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TextArea from "../../../components/InputFields/TextArea/TextArea";
import DatePairs from "../../../components/Modal/DatePairsModal";
import DatePairsModal from "../../../components/Modal/DatePairsModal";
import { GoogleMap, LoadScript, DistanceMatrixService } from '@react-google-maps/api';

import FormatedIndexInputField from "../../../components/InputFields/TextField/FormatedIndexInputField";
export type FormFields = z.infer<typeof LTFormSchema>

const ResultForm = () => {
    const { register, handleSubmit, formState: { errors }, control, setValue, reset, watch, getValues } = useForm<FormFields>({ resolver: zodResolver(LTFormSchema) })
    const { data: clientData } = useGetAllData("/client/all-clients");
    const clientFilteredOptions = clientData?.filter((data, id) => { return data?.isActive })
    const clientIdOptions = clientFilteredOptions?.map((data, id) => { return { value: data?._id, label: data?.code } })
    const { data: serverIdData } = useGetAllData("/server/all-servers");
    const serverIdOptions = serverIdData?.map((data, id) => { return { value: data?._id, label: data?.serverCode } })
    // console.log("clientIdOptionsclientIdOptionsclientIdOptions", serverIdOptions, clientIdOptions)
    const substituteDeliveredToOptions = [{ value: "jandoe", label: "Jan Doe" }, { value: "johndoe", label: "John Doe" }]
    const corporateReciepientOptions = [{ value: "jandoe", label: "Jan Doe" }, { value: "johndoe", label: "John Doe" }]


    const dispatch = useDispatch()
    const allServiceForm = useSelector((state: RootState) => state.serviceForm.allServiceFormData)
    const serviceFormIndex = useSelector((state: RootState) => state.serviceForm.serviceFormIndex)
    const previousForm = allServiceForm[serviceFormIndex - 1]
    console.log("previousForm", previousForm?.serviceResultServerId?._id, allServiceForm[serviceFormIndex]?.serviceResultServerId?._id, previousForm?.serviceResultServerId?._id === allServiceForm[serviceFormIndex]?.serviceResultServerId?._id && previousForm?.lTSAddress)
    const isSearchResultForm = useSelector((state: RootState) => state.serviceForm.isSearchServiceForm)
    const [isConspicuous, setIsConspicuous] = useState()
    const selectedSearchResultData = useSelector((state: RootState) => state.serviceForm.selectedSearchServicetData)
    const searchResultFormData = useSelector((state: RootState) => state.serviceForm.allSearchServiceFormData)
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const getSearchExistingSelectedClientoption = clientIdOptions?.find((data, index) => data?.value === selectedSearchResultData[0]?.clientId?._id && { value: data?._id, label: data?.fullName })
    const getSearchExistingSelectedServeroption = serverIdOptions?.find((data, index) => data?.value === selectedSearchResultData[0]?.serviceResultServerId?._id && { value: data?._id, label: data?.serverCode })

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
    ];    // debugger;
    const [lTSServed, setLTSServed] = useState<string[]>([])
    const [lTSNotServed, setLTSNotServed] = useState<string[]>([])
    const [suggestedTimeTrip, setSuggestedTimeTrip] = useState<any>()
    const currentYear = new Date().getFullYear().toString().slice(-2);
    const [oLTIndex, setOltIndex] = useState("")
    console.log("selectedResultFormData>>>>>>>>>>>>>>>>>>>>>>>>>>>.", lTSFirstNameArray?.length)
    const [currentServerId, setCurrentServerId] = useState<string>()
    const [resultId, setResultId] = useState<string>(undefined)

    const addMinutesToTime = (timeString, minutesToAdd) => {
        console.log("timestring", timeString);

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
    console.log("selectedResultFormData>>>>>>>>>>>>>>>>>>>>>>>>>>>.", updatedTime, previousForm?.serviceResultSecondTimeOfService, suggestedTimeTrip)


    // USEEFFECT FOR SELECTION OF DATE PAIRS STARTS
    useEffect(() => {
        if (datepairsData?.firstAttemptDate) {
            const firstAttemptDate = new Date(datepairsData.firstAttemptDate);
            const formattedFirstAttemptDate = `${firstAttemptDate.getFullYear()}-${(firstAttemptDate.getMonth() + 1).toString().padStart(2, '0')}-${firstAttemptDate.getDate().toString().padStart(2, '0')}`;

            console.log("FirstAttemptDate", datepairsData?.firstAttemptDate);
            console.log("serviceResultFirstAttemptDate", formattedFirstAttemptDate);

            setValue("serviceResultFirstAttemptDate", formattedFirstAttemptDate);
        }

        if (datepairsData?.secondAttemptDate) {
            const secondAttemptDate = new Date(datepairsData.secondAttemptDate);
            const formattedSecondAttemptDate = `${secondAttemptDate.getFullYear()}-${(secondAttemptDate.getMonth() + 1).toString().padStart(2, '0')}-${secondAttemptDate.getDate().toString().padStart(2, '0')}`;

            console.log("SecondAttemptDate", datepairsData?.secondAttemptDate);
            console.log("serviceResultSecondAttemptDate", formattedSecondAttemptDate);

            setValue("serviceResultSecondAttemptDate", formattedSecondAttemptDate);
            setValue("serviceResultDateOfService", formattedSecondAttemptDate);
        }
    }, [datepairsData, setValue]);

    // USEEFFECT FOR SELECTION OF DATE PAIRS ENDS

    // console.log("add new form set true", isConspicuous)
    // console.log(allResultForm[resultFormIndex], resultFormIndex)
    // submitResultFormFunction
    const submitResultFormFunction = (data) => {
        // debugger
        console.log("selected search rsultdata==================================================================", data?.serviceResultTimeOfService,
            data?.serviceResultFirstTimeOfService,
            data?.serviceResultSecondTimeOfService)


        const addingData = {
            lTSFirstName: data?.lTSFirstName,
            oLTIndexNo: oLTIndex + "/" + currentYear,
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
            // serviceResultClientId: data?.clientId,
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
            // serviceResultlTServed: data?.serviceResultlTServed,
            serviceResultlTServed: lTSServed?.join(","),
            serviceResultlTNotServed: lTSNotServed && lTSNotServed?.join(","),
            // serviceResultlTNotServed: data?.serviceResultlTNotServed,
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
            corporateRecipient: data?.corporateRecipient,
            substituteDeliveredTo: data?.substituteDeliveredTo,
        }
        console.log("adding data", addingData)
        // const addingData = { queryInformationLT, queryInformationStandard, serviceResults }
        if (isSearchResultForm === true) {
            // const formatedStartDate = startDate !== null ? new Date(startDate) : null;
            // const formatedEndDate = endDate !== null ? new Date(endDate) : null;
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
                lTSDescription: data?.lTSDescription, lTSFirstName: data?.lTSFirstName, oLTIndexNo: oLTIndex !== "" ? oLTIndex + "/" + currentYear : "", lTSZip: data?.lTSZip, lTSState: data?.lTSState
                // queryInformationLTAddress: data?.queryInformationLTAddress,
                //     // queryInformationLTBusinessName: data?.queryInformationLTBusinessName,
                //     // queryInformationLTFullName: data?.queryInformationLTFullName,
                //     // queryInformationLTIndexNo: parseInt(data?.queryInformationLTIndexNo),
                //     // queryInformationLTInputDate: data?.queryInformationLTInputDate,
            }

            console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<search>>>>>>>>>>>>>>>>>>>>>>>>>>>", searchData
            )
            // dispatch(searchResultFormThunk(searchData))
            dispatch(searchServiceFormThunk(searchData))
            // dispatch(searchResultFormAddReducer(false))
            // toast.success("Search Result Form will be applied")
        } else {
            if (selectedSearchResultData && selectedSearchResultData?.length > 0) {
                // const addingData = {
                //     lTSFirstName: selectedSearchResultData[0]?.lTSFirstName,
                //     oLTIndexNo: parseInt(selectedSearchResultData[0]?.oLTIndexNo),
                //     lTSAddress: selectedSearchResultData[0]?.lTSAddress,
                //     lTSBusinessName: selectedSearchResultData[0]?.lTSBusinessName,
                //     inputDate: selectedSearchResultData[0]?.inputDate,
                //     sSDDefendants: selectedSearchResultData[0]?.sSDDefendants,
                //     sSDPlaintiff: selectedSearchResultData[0]?.sSDPlaintiff,
                //     clientId: selectedSearchResultData[0]?.clientId,
                //     jobNo: parseInt(selectedSearchResultData[0]?.jobNo),
                //     queryInformationLTFullName: selectedSearchResultData[0]?.queryInformationLTFullName,
                //     queryInformationLTIndexNo: parseInt(selectedSearchResultData[0]?.queryInformationLTIndexNo),
                //     queryInformationLTAddress: selectedSearchResultData[0]?.queryInformationLTAddress,
                //     queryInformationLTBusinessName: selectedSearchResultData[0]?.queryInformationLTBusinessName,
                //     queryInformationLTInputDate: selectedSearchResultData[0]?.queryInformationLTInputDate,
                //     queryInformationStandardServeTo: selectedSearchResultData[0]?.queryInformationStandardServeTo,
                //     queryInformationStandardDefendants: selectedSearchResultData[0]?.queryInformationStandardDefendants,
                //     queryInformationStandardPlaintiff: selectedSearchResultData[0]?.queryInformationStandardPlaintiff,
                //     serviceResultInputDate: selectedSearchResultData[0]?.serviceResultInputDate,
                //     serviceResultScvType: selectedSearchResultData[0]?.serviceResultScvType,
                //     // serviceResultClientId: selectedSearchResultData[0]?.clientId,
                //     serviceResultJobNo: parseInt(selectedSearchResultData[0]?.serviceResultJobNo),
                //     serviceResultServerId: selectedSearchResultData[0]?.serviceResultServerId === "" ? null : selectedSearchResultData[0]?.serviceResultServerId,
                //     serviceResultResults: selectedSearchResultData[0]?.serviceResultResults,
                //     serviceResultDateOfService: selectedSearchResultData[0]?.serviceResultDateOfService,
                //     serviceResultTimeOfService: selectedSearchResultData[0]?.serviceResultTimeOfService,
                //     serviceResultFirstTimeOfService: selectedSearchResultData[0]?.serviceResultFirstTimeOfService,
                //     serviceResultFirstAttemptDate: selectedSearchResultData[0]?.serviceResultFirstAttemptDate,
                //     serviceResultSecondTimeOfService: selectedSearchResultData[0]?.serviceResultSecondTimeOfService,
                //     serviceResultSecondAttemptDate: selectedSearchResultData[0]?.serviceResultSecondAttemptDate,
                //     serviceResultThirdTimeOfService: selectedSearchResultData[0]?.serviceResultThirdTimeOfService,
                //     serviceResultThirdAttemptDate: selectedSearchResultData[0]?.serviceResultThirdAttemptDate,
                //     // serviceResultlTServed: selectedSearchResultData[0]?.serviceResultlTServed,
                //     serviceResultlTServed: lTSServed?.join(","),
                //     serviceResultlTNotServed: lTSNotServed?.join(","),
                //     // serviceResultlTNotServed: selectedSearchResultData[0]?.serviceResultlTNotServed,
                //     serviceResultRecipientTitle: selectedSearchResultData[0]?.serviceResultRecipientTitle,
                //     serviceResultDoor: (selectedSearchResultData[0]?.serviceResultDoor === undefined || selectedSearchResultData[0]?.serviceResultDoor === "" || isNaN(selectedSearchResultData[0]?.serviceResultDoor)) ? null : parseInt(selectedSearchResultData[0]?.serviceResultDoor),
                //     serviceResultDoorLocks: (selectedSearchResultData[0]?.serviceResultDoorLocks === undefined || selectedSearchResultData[0]?.serviceResultDoorLocks === "" || isNaN(selectedSearchResultData[0]?.serviceResultDoorLocks)) ? null : parseInt(selectedSearchResultData[0]?.serviceResultDoorLocks),
                //     serviceResultEntry: (selectedSearchResultData[0]?.serviceResultEntry === undefined || selectedSearchResultData[0]?.serviceResultEntry === "" || isNaN(selectedSearchResultData[0]?.serviceResultEntry)) ? null : parseInt(selectedSearchResultData[0]?.serviceResultEntry),
                //     serviceResultWall: (selectedSearchResultData[0]?.serviceResultWall === undefined || selectedSearchResultData[0]?.serviceResultWall === "" || isNaN(selectedSearchResultData[0]?.serviceResultWall)) ? null : parseInt(selectedSearchResultData[0]?.serviceResultWall),
                //     serviceResultFloor: (selectedSearchResultData[0]?.serviceResultFloor === undefined || selectedSearchResultData[0]?.serviceResultFloor === "" || isNaN(selectedSearchResultData[0]?.serviceResultFloor)) ? null : parseInt(selectedSearchResultData[0]?.serviceResultFloor),
                //     serviceResultLock: (selectedSearchResultData[0]?.serviceResultLock === undefined || selectedSearchResultData[0]?.serviceResultLock === "" || isNaN(selectedSearchResultData[0]?.serviceResultLock))
                //         ? null
                //         : parseInt(selectedSearchResultData[0]?.serviceResultLock),
                //     serviceResultOtherDescription: selectedSearchResultData[0]?.serviceResultOtherDescription,
                //     serviceResultSex: selectedSearchResultData[0]?.serviceResultSex,
                //     serviceResultSkinColor: selectedSearchResultData[0]?.serviceResultSkinColor,
                //     serviceResultHair: selectedSearchResultData[0]?.serviceResultHair,
                //     serviceResultAge: (selectedSearchResultData[0]?.serviceResultAge === undefined || selectedSearchResultData[0]?.serviceResultAge === "" || isNaN(selectedSearchResultData[0]?.serviceResultAge)) ? null : parseInt(selectedSearchResultData[0]?.serviceResultAge),
                //     serviceResultHeight: (selectedSearchResultData[0]?.serviceResultHeight === undefined || selectedSearchResultData[0]?.serviceResultHeight === "" || isNaN(selectedSearchResultData[0]?.serviceResultHeight)) ? null : parseFloat(selectedSearchResultData[0]?.serviceResultHeight),
                //     serviceResultWeight: (selectedSearchResultData[0]?.serviceResultWeight === undefined || selectedSearchResultData[0]?.serviceResultWeight === "" || isNaN(selectedSearchResultData[0]?.serviceResultWeight)) ? null : parseFloat(selectedSearchResultData[0]?.serviceResultWeight),
                //     serviceResultOtherFeatures: selectedSearchResultData[0]?.serviceResultOtherFeatures,
                //     serviceResultDateOfMailing: selectedSearchResultData[0]?.serviceResultDateOfMailing,
                //     serviceResultDateOfNotary: selectedSearchResultData[0]?.serviceResultDateOfNotary,
                //     corporateRecipient: selectedSearchResultData[0]?.corporateRecipient,
                //     substituteDeliveredTo: selectedSearchResultData[0]?.substituteDeliveredTo,

                // }
                const updatingData = { ...addingData, serviceFormId: selectedSearchResultData[0]?._id }

                console.log("selected search rsultdata", updatingData)
                // HERE UPDATE SERVICE FORM API WILL BE CALLED
                dispatch(updateServiceFormThunk(updatingData))
            }
            else {
                const updatingData = { ...addingData, serviceFormId: allServiceForm[serviceFormIndex]?._id }

                console.log("selected search rsultdata==================================================================", updatingData)

                // HERE UPDATE SERVICE FORM API WILL BE CALLED
                dispatch(updateServiceFormThunk(updatingData))

            }

            // dispatch(updateResultFormThunk(updatingData))
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
            // dispatch(searchResultFormThunk(true))
            dispatch(searchResultFormAddReducer(true))

    }
    // USE EFFECT WILL GET ALL RESULT FORM
    useEffect(() => {
        dispatch(getAllServiceFormThunk())
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
                // handleSubmit(searchResultFormFunction)();
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
            // setValue("serviceType", getSearchExistingSelectedServiceType?.value);
            console.log("inputDate", selectedSearchResultData[0]?.inputDate)
            setValue("lTSFirstName", selectedSearchResultData[0]?.lTSFirstName)
            // setValue("oLTIndexNo", selectedSearchResultData[0]?.oLTIndexNo);

            if (selectedSearchResultData[0]?.oLTIndexNo === null) setOltIndex("")
            else setOltIndex(selectedSearchResultData[0]?.oLTIndexNo)

            console.log('SPLIT: ', selectedSearchResultData[0]?.serviceResultlTServed?.split(","));

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
            setValue("serviceResultInputDate", selectedSearchResultData[0]?.serviceResultInputDate ?? "")
            setValue("serviceResultScvType", selectedSearchResultData[0]?.serviceResultScvType ?? "")
            // setValue("clientId", selectedSearchResultData[0]?.clientId ?? "")
            setValue("jobNo", JSON.stringify(selectedSearchResultData[0]?.jobNo ?? ""))
            setValue("serviceResultServerId", getSearchExistingSelectedServeroption?.value)
            setValue("serviceResultResults", selectedSearchResultData[0]?.serviceResultResults ?? "")
            setResultId(selectedSearchResultData[0]?.serviceResultResults ?? "")
            setValue("serviceResultDateOfService", selectedSearchResultData[0]?.serviceResultDateOfService)
            // setValue("serviceResultTimeService", selectedSearchResultData[0]?.serviceResultTimeService)
            setValue("serviceResultFirstTimeOfService", selectedSearchResultData[0]?.serviceResultFirstTimeOfService)
            setValue("serviceResultFirstAttemptDate", selectedSearchResultData[0]?.serviceResultFirstAttemptDate)
            // setValue("serviceResultSecondTimeOfService", selectedSearchResultData[0]?.serviceResultSecondTimeOfService)
            setValue("serviceResultSecondAttemptDate", selectedSearchResultData[0]?.serviceResultSecondAttemptDate)
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
            if (previousForm?.serviceResultServerId?.serverCode === selectedSearchResultData[0]?.serviceResultServerId?.serverCode) {
                const secondTime = addMinutesToTime(previousForm?.serviceResultSecondTimeOfService, suggestedTimeTrip)
                const firstTime = addMinutesToTime(previousForm?.serviceResultFirstTimeOfService, suggestedTimeTrip)

                console.log("seond time", secondTime)
                setValue("serviceResultSecondTimeOfService", secondTime)
                setValue("serviceResultFirstTimeOfService", firstTime)
                setValue("serviceResultTimeOfService", secondTime)


            } else {
                setValue("serviceResultTimeOfService", selectedSearchResultData[0]?.serviceResultTimeOfService)
                setValue("serviceResultSecondTimeOfService", selectedSearchResultData[0]?.serviceResultSecondTimeOfService)
                setValue("serviceResultFirstTimeOfService", selectedSearchResultData[0]?.serviceResultFirstTimeOfService)

            }

            // if (resultId === "personal" || resultId === "personalplus") {
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

            // Combine both arrays
            // const finalServed = [...filteredServed, ...updatedServed];
            const finalServed = [...filteredServed];

            // Update state
            setLTSServed(finalServed);
            setLTSNotServed(filteredNotServed);
            // }
            setValue("serviceResultHair", selectedSearchResultData[0]?.serviceResultHair)
            setValue("serviceResultAge", JSON.stringify(selectedSearchResultData[0]?.serviceResultAge))
            setValue("serviceResultHeight", JSON.stringify(selectedSearchResultData[0]?.serviceResultHeight))
            setValue("serviceResultWeight", JSON.stringify(selectedSearchResultData[0]?.serviceResultWeight))
            setValue("serviceResultOtherFeatures", selectedSearchResultData[0]?.serviceResultOtherFeatures)
            setValue("serviceResultDateOfMailing", selectedSearchResultData[0]?.serviceResultDateOfMailing)
            setValue("serviceResultDateOfNotary", selectedSearchResultData[0]?.serviceResultDateOfNotary)
            setValue("substituteDeliveredTo", selectedSearchResultData[0]?.substituteDeliveredTo)
            setValue("corporateRecipient", selectedSearchResultData[0]?.corporateRecipient)
        }
        else {
            // STORE NEXT DATE OF THE INPUT DATE IN RESULT INPUT DATE STARTS
            const resultInputDate = watch("inputDate");
            if (resultInputDate) {
                const serviceDate = new Date(resultInputDate);
                const nextDay = new Date(serviceDate);
                nextDay.setDate(serviceDate.getDate() + 1);

                const formattedNextDay = format(nextDay, 'yyyy-MM-dd');
                console.log("result input date", formattedNextDay)
                const currentServiceResultInputDate = allServiceForm[serviceFormIndex]?.serviceResultInputDate;
                setValue("serviceResultInputDate", currentServiceResultInputDate ? currentServiceResultInputDate : formattedNextDay, {
                    shouldValidate: true,
                    shouldDirty: true
                });
            }
            // STORE NEXT DATE OF THE INPUT DATE IN RESULT INPUT DATE ENDS


            if (allServiceForm && Array.isArray(allServiceForm) && serviceFormIndex >= 0 && serviceFormIndex < allServiceForm.length) {
                // alert("called")

                const data = {
                    firstAttepmtDate: allServiceForm[serviceFormIndex]?.serviceResultFirstAttemptDate,
                    secondAttepmtDate: allServiceForm[serviceFormIndex]?.serviceResultSecondAttemptDate,
                }
                dispatch(addDatePairModalReducer(data))
                console.log("queryInformationLTInputDate", allServiceForm[serviceFormIndex]?.lTSFirstName)
                setValue("lTSFirstName", allServiceForm[serviceFormIndex]?.lTSFirstName)
                // setValue("queryInformationLTIndexNo", JSON.stringify(allServiceForm[serviceFormIndex]?.queryInformationLTIndexNo, 10));
                // setValue("oLTIndexNo", allServiceForm[serviceFormIndex]?.oLTIndexNo);
                if (allServiceForm[serviceFormIndex]?.oLTIndexNo === null) setOltIndex("")
                else setOltIndex(allServiceForm[serviceFormIndex]?.oLTIndexNo)

                setValue("lTSAddress", allServiceForm[serviceFormIndex]?.lTSAddress),
                    setValue("lTSApt", allServiceForm[serviceFormIndex]?.lTSApt),
                    setValue("lTSCity", allServiceForm[serviceFormIndex]?.lTSCity),
                    setValue("lTSState", allServiceForm[serviceFormIndex]?.lTSState),
                    setValue("lTSDescription", allServiceForm[serviceFormIndex]?.lTSDescription),
                    setValue("lTSZip", allServiceForm[serviceFormIndex]?.lTSZip),




                    setValue("lTSBusinessName", allServiceForm[serviceFormIndex]?.lTSBusinessName),
                    setValue("inputDate", allServiceForm[serviceFormIndex]?.inputDate)
                setValue("queryInformationStandardServeTo", allServiceForm[serviceFormIndex]?.queryInformationStandardServeTo),
                    setValue("sSDDefendants", allServiceForm[serviceFormIndex]?.sSDDefendants),
                    setValue("sSDPlaintiff", allServiceForm[serviceFormIndex]?.sSDPlaintiff)
                // setValue("serviceResultInputDate", allServiceForm[serviceFormIndex]?.serviceResultInputDate ?? "")
                setValue("serviceResultScvType", allServiceForm[serviceFormIndex]?.serviceResultScvType ?? "")
                setValue("clientId", allServiceForm[serviceFormIndex]?.clientId?._id)
                setValue("jobNo", JSON.stringify(allServiceForm[serviceFormIndex]?.jobNo ?? ""))
                setValue("serviceResultOtherFeatures", allServiceForm[serviceFormIndex]?.otherIdentifyingFeatures)
                setValue("serviceResultSkinColor", allServiceForm[serviceFormIndex]?.serviceResultSkinColor)
                setValue("serviceType", allServiceForm[serviceFormIndex]?.serviceType?.serviceTypeCode)


                setValue("serviceResultServerId", allServiceForm[serviceFormIndex]?.serviceResultServerId?._id ?? "")
                setValue("serviceResultResults", allServiceForm[serviceFormIndex]?.serviceResultResults ?? "")
                setResultId(allServiceForm[serviceFormIndex]?.serviceResultResults ?? "")
                setValue("serviceResultDateOfService", allServiceForm[serviceFormIndex]?.serviceResultDateOfService)
                // const updatedTime = addMinutesToTime(previousForm?.serviceResultTimeOfService, 50);
                // setValue("serviceResultFirstTimeOfService", allServiceForm[serviceFormIndex]?.serviceResultFirstTimeOfService)

                if (previousForm?.serviceResultServerId?.serverCode === allServiceForm[serviceFormIndex]?.serviceResultServerId?.serverCode) {
                    const secondTime = addMinutesToTime(previousForm?.serviceResultSecondTimeOfService, suggestedTimeTrip)
                    const firstTime = addMinutesToTime(previousForm?.serviceResultFirstTimeOfService, suggestedTimeTrip)

                    console.log("seond time", secondTime)
                    setValue("serviceResultSecondTimeOfService", secondTime)
                    setValue("serviceResultFirstTimeOfService", firstTime)
                    setValue("serviceResultTimeOfService", secondTime)


                } else {
                    setValue("serviceResultTimeOfService", allServiceForm[serviceFormIndex]?.serviceResultTimeOfService)
                    setValue("serviceResultSecondTimeOfService", allServiceForm[serviceFormIndex]?.serviceResultSecondTimeOfService)
                    setValue("serviceResultFirstTimeOfService", allServiceForm[serviceFormIndex]?.serviceResultFirstTimeOfService)

                }
                setValue("serviceResultFirstAttemptDate", allServiceForm[serviceFormIndex]?.serviceResultFirstAttemptDate)
                setValue("serviceResultSecondAttemptDate", allServiceForm[serviceFormIndex]?.serviceResultSecondAttemptDate)
                setValue("serviceResultThirdTimeOfService", allServiceForm[serviceFormIndex]?.serviceResultThirdTimeOfService)
                setValue("serviceResultThirdAttemptDate", allServiceForm[serviceFormIndex]?.serviceResultThirdAttemptDate)

                // setLTSServed(allServiceForm[serviceFormIndex]?.serviceResultlTServed === undefined || allServiceForm[serviceFormIndex]?.serviceResultlTServed === "" ?
                //      allServiceForm[serviceFormIndex]?.lTSFirstName?.split(",") 
                //      : allServiceForm[serviceFormIndex]?.serviceResultlTServed?.split(","))

                // Convert lTSFirstName to an array
                const lTSFirstNames = allServiceForm[serviceFormIndex]?.lTSFirstName?.split(",") || [];
                console.log('LT FIRST NAMES: ', lTSFirstNames);


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

                // // Combine both arrays
                // const finalServed = [...filteredServed, ...updatedServed];

                // // const finalServed = [...filteredServed];


                // // Update state
                // setLTSServed(finalServed);
                // setLTSNotServed(filteredNotServed);
                // Filter out names that are in filteredNotServed from filteredServed and updatedServed
                const finalServed = [
                    ...filteredServed?.filter(name => !filteredNotServed?.includes(name)),
                    ...updatedServed?.filter(name => !filteredNotServed?.includes(name))
                ];

                console.log('FINAL SERVED: ', finalServed);


                // Set the states
                setLTSServed(finalServed);
                setLTSNotServed(filteredNotServed);
                // console.log("allServiceForm[serviceFormIndex]?.serviceResultlTServed?.split", allServiceForm[serviceFormIndex]?.serviceResultlTServed === undefined || allServiceForm[serviceFormIndex]?.serviceResultlTServed === "" ? allServiceForm[serviceFormIndex]?.lTSFirstName?.split(",") : allServiceForm[serviceFormIndex]?.serviceResultlTServed?.split(","))


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
                setValue("serviceResultDateOfMailing", allServiceForm[serviceFormIndex]?.serviceResultDateOfMailing)
                setValue("serviceResultDateOfNotary", allServiceForm[serviceFormIndex]?.serviceResultDateOfNotary)
                setValue("substituteDeliveredTo", allServiceForm[serviceFormIndex]?.substituteDeliveredTo)
                setValue("corporateRecipient", allServiceForm[serviceFormIndex]?.corporateRecipient)



                // setValue("height", allServiceForm[serviceFormIndex]?.serviceResults?.description?.height)

                setIsConspicuous(allServiceForm[serviceFormIndex]?.serviceResultResults)
                setResultId(allServiceForm[serviceFormIndex]?.serviceResultResults)
            }
        }

    }, [serviceFormIndex, setValue, allServiceForm, selectedSearchResultData])
    // WHEN SELECT DATE OF SERVICE THE NEXT DATE STORE IN NOTRAY AND MAILING DATE LOGIC STARTS 
    const serviceResultDateOfService = watch("serviceResultDateOfService");
    useEffect(() => {
        if (serviceResultDateOfService) {
            const serviceDate = new Date(serviceResultDateOfService);
            const nextDay = new Date(serviceDate);
            nextDay.setDate(serviceDate.getDate() + 1);

            const formattedNextDay = format(nextDay, 'yyyy-MM-dd');

            setValue("serviceResultDateOfMailing", formattedNextDay);
            setValue("serviceResultDateOfNotary", formattedNextDay);
        }
    }, [serviceResultDateOfService, setValue]);
    // WHEN SELECT DATE OF SERVICE THE NEXT DATE STORE IN NOTRAY AND MAILING DATE LOGIC ENDS 


    // INPUT DATE THE NEXT DATE STORE IN RESULT INPUT DATE LOGIC STARTS 
    // Watch the inputDate field
    // const resultInputDate = watch("inputDate");

    // useEffect(() => {
    //     if (resultInputDate) {
    //         const serviceDate = new Date(resultInputDate);
    //         const nextDay = new Date(serviceDate);
    //         nextDay.setDate(serviceDate.getDate() + 1);

    //         const formattedNextDay = format(nextDay, 'yyyy-MM-dd');
    //         console.log("result input date", formattedNextDay)
    //         // Set the value of serviceResultInputDate to the next day
    //         setValue("serviceResultInputDate", formattedNextDay);
    //     }
    // }, [resultInputDate, setValue]);
    // INPUT DATE THE NEXT DATE STORE IN RESULT INPUT DATE LOGIC ENDS 

    // const handleEnterKeyPress = (event) => {
    //     if (event.key === 'Enter') {
    //         event.preventDefault(); // Prevent the form from submitting
    //         const formElements = Array.from(event.target.form.elements);
    //         const index = formElements.indexOf(event.target);
    //         formElements[index + 1]?.focus(); // Focus the next input
    //     }
    // };


    // Manually set the values for startDate and endDate in the form
    const handleStartDateChange = (date) => {
        setStartDate(date);
        setValue("startDate", date ? date.toISOString() : "");
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
        setValue("endDate", date ? date.toISOString() : "");
    };

    // const handleDistanceMatrixResponse = (response) => {
    //     toast.success("called")
    //     if (response && response.rows[0].elements[0].status === "OK") {
    //         const distance = response.rows[0].elements[0].distance;
    //         const duration = response.rows[0].elements[0].duration?.text; // e.g., "2hr 40mins"
    //         const totalMinutes = convertDurationToMinutes(duration);
    //         // const totalMinutes = convertDurationToMinutes(duration);
    //         setValue("timeTrip", JSON.stringify(totalMinutes));
    //         setSuggestedTimeTrip(totalMinutes)
    //         toast?.success(`${totalMinutes}`)
    //         console.log("Total Time in Minutes:{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}", duration, totalMinutes); // Output total minutes
    //     }


    // };

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

    // const updateTimes = (timeTripValue) => {
    //     const totalMinutes = parseInt(timeTripValue, 10);

    //     // Only run if totalMinutes is a valid number
    //     if (!isNaN(totalMinutes) && timeTripValue !== '') {
    //         const secondTime = addMinutesToTime(previousForm?.serviceResultSecondTimeOfService, totalMinutes);
    //         const firstTime = addMinutesToTime(previousForm?.serviceResultFirstTimeOfService, totalMinutes);

    //         console.log("Second time:", secondTime);
    //         setValue("serviceResultSecondTimeOfService", secondTime);
    //         setValue("serviceResultFirstTimeOfService", firstTime);
    //         setValue("serviceResultTimeOfService", secondTime);
    //     }
    // };
    const handleDistanceMatrixResponse = (response) => {
        if (response && response?.rows[0]?.elements[0].status === "OK") {
            const distance = response?.rows[0]?.elements[0]?.distance;
            const duration = response?.rows[0]?.elements[0]?.duration?.text; // e.g., "2hr 40mins"
            const totalMinutes = convertDurationToMinutes(duration);
            setValue("timeTrip", JSON.stringify(totalMinutes));
            setSuggestedTimeTrip(totalMinutes);
            // toast.success("called")
            console.log("Total Time in Minutes:", duration, totalMinutes); // Output total minutes
            // toast.success("called");
        }
    };
    // useEffect(() => { handleDistanceMatrixResponse(response) }, [])
    const updateTimes = (timeTripValue) => {
        const totalMinutes = parseInt(timeTripValue, 10);
        // Only run if totalMinutes is a valid number
        if (!isNaN(totalMinutes) && timeTripValue !== '') {
            const secondTime = addMinutesToTime(previousForm?.serviceResultSecondTimeOfService, totalMinutes);
            const firstTime = addMinutesToTime(previousForm?.serviceResultFirstTimeOfService, totalMinutes);
            // Confirm update for the first time
            const confirmFirstTime = window.confirm(`Do you want to add ${totalMinutes} minutes to 1st Time Attempt?`);
            if (confirmFirstTime) {
                console.log("First time:", firstTime);
                setValue("serviceResultFirstTimeOfService", firstTime);
            }
            // Confirm update for the second time
            const confirmSecondTime = window.confirm(`Do you want to add ${totalMinutes} minutes to 2nd Time Attempt?`);
            if (confirmSecondTime) {
                console.log("Second time:", secondTime);
                setValue("serviceResultSecondTimeOfService", secondTime);
                setValue("serviceResultTimeOfService", secondTime);

            }
        }
    };


    // Call updateTimes whenever timeTripValue changes
    const handleTimeTripChange = (event) => {
        const newValue = event.target.value;
        setValue("timeTrip", newValue); // Update the form state
        // updateTimes(newValue); // Call the function to update times
        // Check if Enter key is pressed
        if (event.key === 'Enter') {
            const totalMinutes = parseInt(newValue, 10);
            if (!isNaN(totalMinutes)) {
                updateTimes(totalMinutes); // Call the function to update times
            }
        }
    };
    // USEEFFECT FOR TRACKNG SERVVER ID AND CALCULATE TIMETRIP
    const serverId = watch("serviceResultServerId");
    const { serviceResultServerId } = getValues()
    const [previousAddress, setPreviousAddress] = useState<string | undefined>("")
    // useEffect(() => {
    //     // toast.success("called")
    //     // setValue("serviceResultServerId", serviceResultServerId)
    //     // setValue("")
    //     // handleDistanceMatrixResponse()
    //     setPreviousAddress(serviceResultServerId)
    //     // Fetch the Distance Matrix
    //     const fetchDistanceMatrix = () => {
    //         const origins = [previousForm?.lTSAddress || ''];
    //         const destinations = [allServiceForm[serviceFormIndex]?.lTSAddress || ''];
    //         // toast.success(`${origins[0]} && ${destinations[0]}`)
    //         if (origins[0] && destinations[0]) {
    //             // toast.success("cll")
    //             // Here, you can either set up the DistanceMatrixService again or trigger it
    //             return (
    //                 <DistanceMatrixService
    //                     options={{
    //                         origins,
    //                         destinations,
    //                         travelMode: "DRIVING",
    //                     }}
    //                     callback={handleDistanceMatrixResponse}
    //                 />
    //             );
    //         }
    //     };

    //     fetchDistanceMatrix();
    //     // setValue("serviceResultServerId", serviceResultServerId)
    //     console.log("previousForm?.serviceResultServerId?._id === allServiceForm[serviceFormIndex]?.serviceResultServerId?._id", previousForm?.serviceResultServerId?._id, serviceResultServerId, previousForm?.serviceResultServerId?._id === allServiceForm[serviceFormIndex]?.serviceResultServerId?._id)

    //     // toast.success("Distance matrix fetched");
    //     // toast.success("cll")
    // }, [serverId, previousForm, allServiceForm])

    const handleServerIdChange = (selectedValue) => {
        // This function is called when the server ID changes
        console.log("Selected Server ID:", selectedValue);
        // You can perform any additional actions here
        setValue("serviceResultServerId", selectedValue);
        setCurrentServerId(selectedValue);

        console.log("Updated Server ID:", selectedValue === previousForm?.serviceResultServerId?._id);

    };
    useEffect(() => {
        setPreviousAddress(serviceResultServerId)
        // Fetch the Distance Matrix
        const fetchDistanceMatrix = () => {
            const origins = [previousForm?.lTSAddress || ''];
            const destinations = [allServiceForm[serviceFormIndex]?.lTSAddress || ''];
            // toast.success(`${origins[0]} && ${destinations[0]}`)
            if (origins[0] && destinations[0]) {
                // toast.success("cll")
                // Here, you can either set up the DistanceMatrixService again or trigger it
                return (
                    <DistanceMatrixService
                        options={{
                            origins,
                            destinations,
                            travelMode: "DRIVING",
                        }}
                        callback={handleDistanceMatrixResponse}
                    />
                );
            }
        };

        fetchDistanceMatrix();
        // setValue("serviceResultServerId", serviceResultServerId)
        // console.log("previousForm?.serviceResultServerId?._id === allServiceForm[serviceFormIndex]?.serviceResultServerId?._id", previousForm?.serviceResultServerId?._id, allServiceForm[serviceFormIndex]?.serviceResultServerId?._id, previousForm?.serviceResultServerId?._id === allServiceForm[serviceFormIndex]?.serviceResultServerId?._id)
        // Update the value in the form
        console.log("Updated Server ID:", allServiceForm[serviceFormIndex]?.serviceResultServerId?._id, previousForm?.serviceResultServerId?._id);
    }, [allServiceForm, serviceFormIndex, serverId]);
    const [googleLoaded, setGoogleLoaded] = useState(false);
    const onLoad = useCallback(() => {
        // This will be called once the library has fully loaded
        console.log("Google Maps Loaded", window.google); // Log the google object
        setGoogleLoaded(true);

    }, []);
    // const serverId = watch("serviceResultServerId")
    const handleZipChange = (event) => {
        const { value } = event.target;
        const sanitizedValue = value.replace(/\D/g, ''); // Remove non-digit characters

        let formattedValue = sanitizedValue;
        if (sanitizedValue.length > 3) {
            formattedValue = `${sanitizedValue.slice(0, 3)}-${sanitizedValue.slice(3, 6)}`;
        }


        setValue("lTSZip", formattedValue); // Update the form state
    };
    const handleResultIdChange = (selectedValue) => {
        // This function is called when the server ID changes
        console.log("Selected Server ID:", selectedValue);
        // You can perform any additional actions here
        setValue("serviceResultResults", selectedValue);
        setResultId(selectedValue);


    };

    console.log("nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn", lTSServed)
    return <>
        {searchResultFormData?.length > 0 && isSearchResultForm ? <SearchResultData /> : isDatePairModal ?
            <DatePairsModal /> :
            <form onSubmit={handleSubmit(submitResultFormFunction)}>
                {/* QUERY INFORMATION (L&T) FORM STARTS */}
                <div className="mt-6">
                    <h1 className="font-semibold  mb-4 text-base
                                    md:text-md 
                                    lg:text-xl">Query Information (L&T)</h1>

                    <div className="flex items-start w-full flex-wrap gap-x-8 gap-y-4 justify-start ">
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="full Name" error={errors.lTSFirstName} name="lTSFirstName" onKeyDown={handleEnterKeyPress}
                            />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            {/* <TextField register={register} label="index no" error={errors.oLTIndexNo} name="oLTIndexNo" onKeyDown={handleEnterKeyPress}
                            /> */}
                            <FormatedIndexInputField
                                onKeyDown={handleEnterKeyPress} register={register} label="Index Number" error={errors.oLTIndexNo} name="oLTIndexNo" oltIndexValue={oLTIndex}
                                onChange={setOltIndex} year={currentYear}
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
                            <TextField onKeyDown={handleEnterKeyPress} register={register} label="zip" error={errors.lTSZip} name="lTSZip" maxLength={7} onChange={handleZipChange} />
                        </div>
                        <div className="w-[30%]">
                            <TextArea row={1} register={register} label="description" error={errors.lTSDescription} name="lTSDescription" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            {isSearchResultForm ?
                                <div className="flex items-center gap-x-6">
                                    <div className="w-full flex items-center">
                                        <label className="w-[180px]">Start Date</label>
                                        <DatePicker
                                            selected={startDate}
                                            // onChange={(date) => setStartDate(date)}
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
                                            // onChange={(date) => setEndDate(date)}
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
                <div className="mt-6 flex items-center gap-x-6">

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
                {/* allServiceForm[serviceFormIndex]?.serviceResultDateOfNotary */}
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
                            {/* <Hints keyName="f4" label="ditto field" /> */}
                        </div>

                    </div>
                    <div className="flex items-start w-full flex-wrap gap-x-8 gap-y-4 justify-start mt-4">
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField onKeyDown={handleEnterKeyPress}
                                register={register} label="Result Input Date" error={errors.serviceResultInputDate} name="serviceResultInputDate" type="date" />


                            <p className="text-primaryColor/80 text-sm cursor-pointer mt-1 font-medium" onClick={() => { dispatch(isDatePairModalReducer(true)) }}>Select Date Pairs</p>
                            <p className="text-primaryColor/80 text-sm cursor-pointer mt-1 font-medium" >{datepairsData?.firstAttemptDate}-{datepairsData?.secondAttemptDate}</p>

                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%] ">

                            {/* <Controller name="svcType" control={control} render={({ field }) => (
                    <Dropdown
                        options={svcData}
                        value={field.value}
                        onChange={field.onChange}
                        label="Svc Type" error={errors.svcType?.message as string}
                    />
                )} /> */}
                            <TextField onKeyDown={handleEnterKeyPress}
                                register={register} label="svc Type" error={errors.serviceType} name="serviceType" defaultValue="L&T Residential"
                                readOnly />

                        </div>



                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">


                            <Controller name="clientId" control={control} render={({ field }) => (
                                <Dropdown
                                    options={clientIdOptions}
                                    // singleOption={getSelectedClientoption}
                                    value={field.value}
                                    onChange={field.onChange}
                                    label="Client id" error={errors.clientId?.message as string}
                                />
                            )} />
                            {/* CALCULATING TIME STARTS  */}
                            {/* {previousForm?.serviceResultServerId?._id === allServiceForm[serviceFormIndex]?.serviceResultServerId?._id && */}

                            {/* } */}
                            {/* CALCULATING TIME ENDS  */}
                            {/* < LoadScript googleMapsApiKey="AIzaSyBfvS4dtfUAJ1yTsXYd6VCI39Ktod98rUg">
                                <GoogleMap
                                    center={{ lat: -34.397, lng: 150.644 }} // Dummy center, adjust based on your requirements
                                    zoom={8}
                                >
                                    <DistanceMatrixService
                                        options={{
                                            origins: [previousForm?.lTSAddress],
                                            destinations: [allServiceForm[serviceFormIndex]?.lTSAddress],
                                            travelMode: 'DRIVING',  // You can change this to WALKING, BICYCLING, etc.
                                        }} i
                                        callback={handleDistanceMatrixResponse}
                                    />
                                </GoogleMap>

                            </LoadScript> */}

                            {/* <LoadScript googleMapsApiKey="AIzaSyBfvS4dtfUAJ1yTsXYd6VCI39Ktod98rUg" onLoad={onLoad}
                            >
                                <GoogleMap
                                    center={{ lat: -34.397, lng: 150.644 }} // Dummy center, adjust based on your requirements
                                    zoom={8}
                                >
                                    {googleLoaded && previousForm?.serviceResultServerId?._id !== undefined && allServiceForm[serviceFormIndex]?.serviceResultServerId?._id !== undefined && previousForm?.serviceResultServerId?._id === allServiceForm[serviceFormIndex]?.serviceResultServerId?._id || previousForm?.serviceResultServerId?._id === previousAddress && (
                                        <DistanceMatrixService
                                            options={{
                                                origins: [previousForm?.lTSAddress || ''], // Fallback to empty string if undefined
                                                destinations: [allServiceForm[serviceFormIndex]?.lTSAddress || ''], // Same fallback
                                                travelMode: google?.maps?.TravelMode?.DRIVING, // Use the enum value
                                            }}
                                            callback={handleDistanceMatrixResponse}
                                        />
                                    )}
                                </GoogleMap>
                            </LoadScript> */}
                            {/* <LoadScript
                                googleMapsApiKey="AIzaSyBfvS4dtfUAJ1yTsXYd6VCI39Ktod98rUg"
                                loadingElement={<div>Loading...</div>} // Optional loading element
                                onLoad={onLoad}
                            >
                                <GoogleMap
                                    center={{ lat: -34.397, lng: 150.644 }} // Dummy center
                                    zoom={8}
                                >
                                    {previousForm?.serviceResultServerId?._id !== undefined && allServiceForm[serviceFormIndex]?.serviceResultServerId?._id !== undefined && previousForm?.serviceResultServerId?._id === allServiceForm[serviceFormIndex]?.serviceResultServerId?._id || previousForm?.serviceResultServerId?._id === previousAddress && (
                                        <DistanceMatrixService
                                            options={{
                                                origins: [previousForm?.lTSAddress || ''],
                                                destinations: [allServiceForm[serviceFormIndex]?.lTSAddress || ''],
                                                travelMode: google?.maps?.TravelMode?.DRIVING,
                                            }}
                                            callback={handleDistanceMatrixResponse} // Make sure this is correctly assigned
                                        />
                                    )}
                                </GoogleMap>
                            </LoadScript> */}
                            <LoadScript googleMapsApiKey="AIzaSyBfvS4dtfUAJ1yTsXYd6VCI39Ktod98rUg">
                                <GoogleMap
                                    center={{ lat: -34.397, lng: 150.644 }} // Dummy center, adjust based on your requirements
                                    zoom={8}
                                >
                                    <DistanceMatrixService
                                        options={{
                                            origins: [previousForm?.lTSAddress || ''],
                                            destinations: [allServiceForm[serviceFormIndex]?.lTSAddress || ''],
                                            travelMode: "DRIVING",
                                        }}
                                        callback={handleDistanceMatrixResponse}
                                    />
                                </GoogleMap>

                            </LoadScript>
                            {/* <TextField onKeyDown={handleTimeTripChange} onChange={handleTimeTripChange} register={register} label="Suggested Time Trip (mins)" error={errors.timeTrip} name="timeTrip" /> */}

                            {/* {previousForm?.serviceResultServerId?._id !== undefined && allServiceForm[serviceFormIndex]?.serviceResultServerId?._id !== undefined && previousForm?.serviceResultServerId?._id === allServiceForm[serviceFormIndex]?.serviceResultServerId?._id || previousForm?.serviceResultServerId?._id === previousAddress && */}
                            {previousForm?.serviceResultServerId?._id === currentServerId &&
                                <TextField onKeyDown={handleTimeTripChange} onChange={handleTimeTripChange} register={register} label="Suggested Time Trip (mins)" error={errors.timeTrip} name="timeTrip" />

                                // <div className="flex flex-col w-full items-start gap-1">
                                //     <label className="font-normal sm:font-medium text-sm capitalize">
                                //         Suggested Time Trip (mins)
                                //     </label>
                                //     <input
                                //         // ref={ref}
                                //         type="text"
                                //         className="w-full border-[1px] border-borderColor/10 bg-grayColorLight/50 border-solid rounded-lg px-2 py-1 focus:border-primaryColor focus:outline-primaryColor"

                                //         {...register?.("timeTrip")}
                                //         // defaultValue={defaultValue}
                                //         onKeyDown={handleEnterKeyPress}

                                //         onChange={handleTimeTripChange}
                                //     />
                                // </div>

                            }
                            {/* <TextField onKeyDown={handleTimeTripChange} onChange={handleTimeTripChange} register={register} label="Suggested Time Trip (mins)" error={errors.timeTrip} name="timeTrip" /> */}


                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField onKeyDown={handleEnterKeyPress}
                                register={register} label="Job" error={errors.jobNo} name="jobNo" required readOnly />

                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <Controller name="serviceResultServerId" control={control} render={({ field }) => (
                                <Dropdown
                                    options={serverIdOptions}
                                    value={field.value}
                                    // onChange={field.onChange}
                                    onChange={(option) => {
                                        console.log(option);
                                        field.onChange(option); // Call the function to update form state
                                        handleServerIdChange(option); // Call your additional logic
                                    }}
                                    label="server Id" error={errors.serviceResultServerId?.message as string}
                                />
                            )} />


                        </div>
                        {previousForm?.serviceResultServerId?._id !== undefined && allServiceForm[serviceFormIndex]?.serviceResultServerId?._id !== undefined && previousForm?.serviceResultServerId?._id === allServiceForm[serviceFormIndex]?.serviceResultServerId?._id || previousForm?.serviceResultServerId?._id === previousAddress && <div className="w-[100%] md:w-[46%] lg:w-[30%] flex flex-col w-full items-start gap-1">
                            <label className="font-normal sm:font-medium text-sm capitalize">
                                Previous Address:</label>
                            <label
                                className="w-full border-[1px] border-borderColor/10 bg-grayColorLight/50 border-solid rounded-lg px-2 py-1 focus:border-primaryColor focus:outline-primaryColor"

                            >{previousForm?.lTSAddress}</label>
                        </div>}
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <Controller name="serviceResultResults" control={control} render={({ field }) => (
                                <Dropdown
                                    options={resultOptions}
                                    value={field.value}
                                    // onChange={field.onChange}
                                    onChange={(option) => {
                                        console.log(option);
                                        field.onChange(option); // Call the function to update form state
                                        handleResultIdChange(option); // Call your additional logic
                                    }}
                                    onValueChange={(value) => setIsConspicuous(value)} // Update state

                                    label="result" error={errors.serviceResultResults?.message as string}
                                />
                            )} />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField onKeyDown={handleEnterKeyPress}
                                register={register} label="Date of service" error={errors.serviceResultDateOfService} name="serviceResultDateOfService" type="date" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField onKeyDown={handleEnterKeyPress}
                                register={register} label="Time of service" error={errors.serviceResultTimeOfService} name="serviceResultTimeOfService" type="time" />
                        </div>
                        {/* 1st attempt starts */}
                        <div className="flex items-center flex-wrap gap-x-8 w-full">

                            <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                                <TextField onKeyDown={handleEnterKeyPress}
                                    register={register} label="1st date Attempt" error={errors.serviceResultFirstAttemptDate} name="serviceResultFirstAttemptDate" type="date" />
                            </div>
                            <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                                <TextField onKeyDown={handleEnterKeyPress}
                                    register={register} label="1st time Attempt" error={errors.serviceResultFirstTimeOfService} name="serviceResultFirstTimeOfService" type="time" />
                            </div>
                        </div>
                        {/* 1st attempt ends */}
                        {/* 2nd attempt starts */}
                        <div className="flex items-center flex-wrap gap-x-8 w-full">
                            <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                                <TextField onKeyDown={handleEnterKeyPress}
                                    register={register} label="2nd date Attempt" error={errors.serviceResultSecondAttemptDate} name="serviceResultSecondAttemptDate" type="date" />
                            </div>
                            <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                                <TextField onKeyDown={handleEnterKeyPress}
                                    register={register} label="2nd time Attempt" error={errors.serviceResultSecondTimeOfService} name="serviceResultSecondTimeOfService" type="time" />
                            </div>
                        </div>
                        {/* 2nd attempt ends */}
                        {/* 3rd attempt starts */}
                        <div className="flex items-center flex-wrap gap-x-8 w-full">
                            <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                                <TextField onKeyDown={handleEnterKeyPress}
                                    register={register} label="3rd date Attempt" error={errors.serviceResultThirdAttemptDate} name="serviceResultThirdAttemptDate" type="date" />
                            </div>
                            <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                                <TextField onKeyDown={handleEnterKeyPress}
                                    register={register} label="3rd time Attempt" error={errors.serviceResultThirdTimeOfService} name="serviceResultThirdTimeOfService" type="time" />
                            </div>
                        </div>
                        {/* 3rd attempt ends */}


                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            {/* <TextField onKeyDown={handleEnterKeyPress}
                                register={register} label="L&T Served" error={errors.serviceResultlTServed} name="serviceResultlTServed" /> */}
                            <label>LT Served</label>
                            <div className="flex items-center h-8 flex-wrap gap-x-2 w-full border-[1px] border-borderColor/10 bg-grayColorLight/50 border-solid rounded-lg px-2 py-1">
                                {(resultId === "personal" || resultId === "personalplus") &&
                                    lTSServed?.map(data => { return <div className="flex items-center gap-x-2 "><p>{data}</p> <IoMdAdd onClick={() => { removeLTSName(data) }} className="p-[2px] cursor-pointer  rotate-45 rounded-full bg-whiteColor text-redColor border-[1px] border-redColor" size={20} />  </div> })

                                }
                                {/* {lTSServed?.map(data => { return <div className="flex items-center gap-x-2"><p>{data}</p> <IoMdAdd onClick={() => { removeLTSName(data) }} className="p-[2px] cursor-pointer  rotate-45 rounded-full bg-whiteColor text-redColor border-[1px] border-redColor" size={20} />  </div> })} */}
                            </div>
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            {/* <TextField onKeyDown={handleEnterKeyPress}
                                register={register} label="L&T Not Served" error={errors.serviceResultlTNotServed} name="serviceResultlTNotServed" /> */}
                            <label>LT Not Served</label>
                            <div className="flex items-center h-8 flex-wrap gap-x-2 w-full border-[1px] border-borderColor/10 bg-grayColorLight/50 border-solid rounded-lg ">
                                {(resultId === "personal" || resultId === "personalplus") &&
                                    (lTSNotServed?.length === 0 ? (
                                        <div className="h-8">
                                        </div>
                                    ) : (
                                        Array.isArray(lTSNotServed) &&
                                        lTSNotServed.map((data) => (
                                            <div key={data} className="flex items-center gap-x-2 px-2 py-1">
                                                <p>{data}</p>
                                                <IoMdAdd
                                                    onClick={() => removeLTSNotName(data)}
                                                    className="p-[2px] cursor-pointer rotate-45 rounded-full bg-whiteColor text-redColor border-[1px] border-redColor"
                                                    size={20}
                                                />
                                            </div>
                                        ))
                                    ))
                                }

                                {/* {lTSNotServed?.length === 0 ? (
                                    <div className="h-8">
                                    </div>
                                ) : (
                                    Array.isArray(lTSNotServed) &&
                                    lTSNotServed.map((data) => (
                                        <div key={data} className="flex items-center gap-x-2 px-2 py-1">
                                            <p>{data}</p>
                                            <IoMdAdd
                                                onClick={() => removeLTSNotName(data)}
                                                className="p-[2px] cursor-pointer rotate-45 rounded-full bg-whiteColor text-redColor border-[1px] border-redColor"
                                                size={20}
                                            />
                                        </div>
                                    ))
                                )} */}
                            </div>


                        </div>

                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            {/* <Controller name="substituteDeliveredTo" control={control} render={({ field }) => (
                                <Dropdown
                                    options={delivery}
                                    value={field.value}
                                    onChange={field.onChange}
                                    label="substitute delivered To" error={errors.substituteDeliveredTo?.message as string}
                                />
                            )} /> */}
                            <TextField onKeyDown={handleEnterKeyPress}
                                register={register} label="substitute delivered To" error={errors.substituteDeliveredTo} name="substituteDeliveredTo" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            {/* <Controller name="corporateRecipient" control={control} render={({ field }) => (
                                <Dropdown
                                    options={corporateReciepientOptions}
                                    value={field.value}
                                    onChange={field.onChange}
                                    label="Corporate Recipient" error={errors.corporateRecipient?.message as string}
                                />
                            )} /> */}
                            <TextField onKeyDown={handleEnterKeyPress}
                                register={register} label="corporate Recipient" error={errors.corporateRecipient} name="corporateRecipient" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField onKeyDown={handleEnterKeyPress}
                                register={register} label="recipient Title" error={errors.serviceResultRecipientTitle} name="serviceResultRecipientTitle" />
                        </div>
                        {/* {isConspicuous === "substitute" && allResultForm[resultFormIndex]?.serviceResults?.results === "substitute" &&
         */}
                        {isConspicuous === "substitute" &&

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
                    </div>
                </div>
                {/* SHOW RESULT  FORM ENDS */}

                {isConspicuous !== "substitute" && <div className="w-full mt-6 border-[1px] border-solid border-borderColor rounded-lg">
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
        }

    </>
}

export default ResultForm