import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import TextField from "../../../../components/InputFields/TextField/TextField";
import TextArea from "../../../../components/InputFields/TextArea/TextArea";
import BorderButton from "../../../../components/Buttons/BorderButton/BorderButton"
import Dropdown from "../../../../components/dropdown/Dropdown";
import CheckBox from "../../../../components/CheckBox/CustomCheckBox"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoMdAdd } from "react-icons/io";
import AddMailing from "./AddMailing";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import GetSelectedMailing from "./getSelectedMailing";
import { addMailAddressIntoFormL, getAllMailingAddressThunk, isAddingMailAddressReducer, getFormMailAddress, getFormMailAddressAfterDeletion, getMailAddress, getMailAddressAfterDeletion, isUpdaitngMailAddressReducer, emptyMailingAddressOnNewFormAddReducer } from "../../../../redux/slice/mailingAdresses";
import { IoMdClose } from "react-icons/io";
import { LTFormSchema } from "../../../../schemas/service forms/L&TFormSchema";
import { useGetAllData } from "../../../../hooks/getAllDataHook/useGetAllData";
import Button from "../../../../components/Buttons/Button/Button";
import { addNewFormAddReducer, addServiceFormThunk, getAllServiceFormThunk, getIsSearchServiceForm, isDataSaveReducer, moveToStandardFormReducer, savedLTFormDataReducer, searchServiceFormThunk, updateServiceFormThunk } from "../../../../redux/slice/serviceForm";
import Hints from "../../../Result/Hints/Hints";
import ShowAllAddMailingAddress from "./ShowAllMailingAddress";
import { toast } from "react-toastify";
import { handleEnterKeyPress } from "../../../../utils/moveToNextFieldOnEnter";
import axios from "axios";
import { DeleteIcon } from "../../../../components/Icons/DeleteIcon";
export type FormFields = z.infer<typeof LTFormSchema>
import { RxCross2 } from "react-icons/rx";
import Spinner from "../../../../components/Loader/Spinner"
import CustomCheckBox from "../../../../components/CheckBox/CustomCheckBox";
import DatePicker from "react-datepicker";
import SearchResultData from "../../../Service/ServiceForms/ServiceTypeForm/SearchResultData";
import { MdAdd } from "react-icons/md";
import FormatedIndexInputField from "../../../../components/InputFields/TextField/FormatedIndexInputField";

const StandardTypeForm = () => {
    const mailingAddressData = useSelector((state: RootState) => state.mailingAdress?.mailingAddressData)
    const loadingSpinner = useSelector((state: RootState) => state.showSpinner?.isShowSpinner)
    const isNewFormAdding = useSelector((state: RootState) => state.serviceForm?.isNewFormAdd)
    const getMailingAddressDataOnFormAdding = useSelector((state: RootState) => state.mailingAdress?.getSelectMail)

    const filterMailingAddressDataOnFormAdding = Array.from(
        new Set(getMailingAddressDataOnFormAdding?.map(obj => JSON.stringify({
            _id: obj?._id,
            firstName: obj?.firstName,
            address: obj?.address,
            apt: obj?.apt,
            city: obj?.city,
            zip: obj?.zip,
            state: obj?.state,
        })))
    ).map(item => JSON.parse(item));
    // console.log("getMailingAddressDataOnFormAdding", getMailingAddressDataOnFormAdding)
    const savedLTData = useSelector((state: RootState) => state.serviceForm?.savedLTFormData)
    // GET ALL MAILING ADDRESSES THAT COMMING INSIDE THE FORMS 
    const getFormMailingAdress = useSelector((state: RootState) => state.mailingAdress?.serviceFormMailingAdress?.mailingAdresses)
    const filterExistingFormMailingAdress = getFormMailingAdress?.filter((obj1, i, arr) =>
        arr.findIndex(obj2 => {
            // If _id exists, compare by _id
            if (obj1?._id && obj2?._id) {
                return obj2._id === obj1._id;
            }
            // If _id doesn't exist, compare by firstName
            return obj2?.firstName === obj1?.firstName;
        }) === i
    );

    console.log("filterExistingFormMailingAdress", getFormMailingAdress, filterExistingFormMailingAdress)
    const [checkedName, setCheckedName] = useState<string | null>()

    const allServiceFormData = useSelector((state: RootState) => state.serviceForm.allServiceFormData)
    const serviceFormIndex = useSelector((state: RootState) => state.serviceForm.serviceFormIndex)
    const lastServiceFormIndex = allServiceFormData?.length - 1
    const { data: clientData } = useGetAllData("/client/all-clients");
    const { data: serviceTypeData } = useGetAllData("/service-type/all-service-types");
    const { data: LTServiceData } = useGetAllData("/ltservice-type/all-lt-service-types");
    const { data: holidayData } = useGetAllData("/holiday/all-holidays")

    const clientFilteredOptions = clientData?.filter((data, id) => { return data?.isActive })
    const clientIdOptions = clientFilteredOptions?.map((data, id) => { return { value: data?._id, label: data?.code } })
    const getSelectedClientoption = clientIdOptions?.find((data, index) => data?.value === savedLTData?.clientId && { value: data?._id, label: data?.fullName })
    const getExistingSelectedClientoption = clientIdOptions?.find((data, index) => data?.value === allServiceFormData[serviceFormIndex]?.clientId?._id && { value: data?._id, label: data?.fullName })

    const serviceTypeOptions = serviceTypeData?.map((data, id) => { return { value: data?._id, label: data?.serviceTypeCode } })
    const getSelectedServiceTypeOption = serviceTypeOptions?.find((data, index) => data?.value === savedLTData?.serviceType && { value: data?._id, label: data?.fullName })
    const getExistingSelectedServiceTypeoption = serviceTypeOptions?.find((data, index) => data?.value === allServiceFormData[serviceFormIndex]?.serviceType?._id && { value: data?._id, label: data?.fullName })
    const [serviceType, setServiceType] = useState()
    const dispatch = useDispatch()
    const { register, formState: { errors, isSubmitting }, control, handleSubmit, setValue, reset, getValues, watch } = useForm<FormFields>({ resolver: zodResolver(LTFormSchema) })
    const isAddMail = useSelector((state: RootState) => state.mailingAdress.isAddingMailAddress)
    const isUpdateMail = useSelector((state: RootState) => state.mailingAdress.isUpdatingMailAddress)
    const [jobNo, setJobNo] = useState<any>()
    const [inputFullname, setInputFullname] = useState("");
    const [multipleFullname, setMultipleFullname] = useState<string[]>([]);
    const [joinedFullname, setJoinedFullname] = useState("");
    const userData = useSelector((state: RootState) => state?.userDetail)
    const [headerFormData, setHeaderFormData] = useState<any>()
    const detailSectionRef = useRef(null);

    // SEARCH SERVICE FORM STARTS
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const allSeacrhServiceFormData = useSelector((state: RootState) => state.serviceForm.allSearchServiceFormData)
    const isSearchServiceForm = useSelector((state: RootState) => state.serviceForm.isSearchServiceForm)
    const selectedSearchServiceFormData = useSelector((state: RootState) => state.serviceForm.selectedSearchServicetData)
    const getSearchExistingSelectedClientoption = clientIdOptions?.find((data, index) => data?.value === selectedSearchServiceFormData[0]?.clientId?._id && { value: data?._id, label: data?.fullName })
    const getSearchExistingSelectedServiceType = serviceTypeOptions?.find((data, index) => data?.value === selectedSearchServiceFormData[0]?.serviceType?._id && { value: data?._id, label: data?.fullName })
    const [selectedServiceType, setSelectedServiceType] = useState()
    const currentYear = new Date().getFullYear().toString().slice(-2);
    const [oLTIndex, setOltIndex] = useState("")
    // TAB FUNCTIONALITY STARTS HERE
    const businessNameRef = useRef<HTMLInputElement>(null);
    // TAB FUNCTIONALITY ENDS HERE
    // Manually set the values for startDate and endDate in the form
    const handleStartDateChange = (date) => {
        setStartDate(date);
        setValue("startDate", date ? date.toISOString() : "");
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
        setValue("endDate", date ? date.toISOString() : "");
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'F4') {
                event.preventDefault();
                dispatch(getIsSearchServiceForm(true))

            }
        }
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [])

    // SEARCH SERVICE FORM ENDS

    // handleMoveToStandardForm
    const handleMoveToStandardForm = (value) => {
        // Destructure the required values from the form
        const { clientId, inputDate, caseNo, caption, serviceType } = getValues();

        if (!clientId) {
            // Show error message if any field is empty
            setValue("serviceType", "");
            toast.error("Client Id are required.");
            return;
        }

        const label = serviceTypeOptions?.find(option => option?.value === value)?.label;
        setSelectedServiceType(serviceTypeOptions?.find(option => option?.value === value)?.label)

        if (label === "Standard") {
            // Update the headerFormData state with the required form values
            setHeaderFormData({
                jobNo,
                clientId,
                caption,
                inputDate,
                caseNo,
                serviceType: selectedServiceType
            });
            const LTData = { jobNo, clientId, caption, inputDate, caseNo, serviceType }
            dispatch(savedLTFormDataReducer(LTData))
            dispatch(moveToStandardFormReducer(selectedServiceType))
        }
    };

    // GET LONGITUDE AND LATITUDE ON THE BASIS OF CITY STARTS
    const [coordinates, setCoordinates] = useState({ lat: "", lng: "" });
    const [city, setCity] = useState("Kohat");

    const getCoordinates = async () => {
        try {
            const response = await axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json`,
                {
                    params: {
                        address: city,
                        key: "AIzaSyDfkcgoTZ8x9oDnDcGgNuyV6ivVJGOjzfo", // Replace with your Google Maps API Key
                    },
                }
            );

            if (response?.data?.results && response.data.results.length > 0) {
                const location = response.data.results[0].geometry.location;
                setCoordinates({
                    lat: location.lat,
                    lng: location.lng,
                });
            } else {
                // toast.warn("No results found for the given city name.");
            }
        } catch (error) {
            toast.error("Error fetching the coordinates:");
        }
    };

    useEffect(() => {
        getCoordinates();
    }, [city]);

    // GET LONGITUDE AND LATITUDE ON THE BASIS OF CITY ENDS

    // const [isAddMail, dispatch(isAddingMailAddressReducer] = us)eState(false)
    const handleCheckboxChange = (data: any) => {
        setCheckedName(data?._id);
        // if (data?.name === 'Other L&T') {
        //     detailSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
        // }
    };

    // GET SELECTED VALUES FROM ADD MAILING DROPDOWN
    const GetSelectedMailingFunction = (optionValue: string) => {
        // console.log("optionValue", optionValue)
        isNewFormAdding ? dispatch(getMailAddress(optionValue)) : dispatch(addMailAddressIntoFormL(optionValue))
    }
    // USE EFFECT TO GET ALL SERVICE FORM DATA FROM API WHICH IS STORED IN SLICE
    useEffect(() => {
        if (isNewFormAdding) {
            reset();
            setCheckedName(null);
            dispatch(emptyMailingAddressOnNewFormAddReducer())
            setMultipleFullname([])
            setJoinedFullname("");
            setOltIndex("")

        }
    }, [isNewFormAdding, reset]);

    // USE EFFECT TO GET ALL SERVICE FORM DATA FROM API WHICH IS STORED IN SLICE
    useEffect(() => {
        dispatch(getAllServiceFormThunk())
    }, [])
    // USE EFFECT TO SET VALUES OF INDEX 0 SERVICE FORM DATA FROM API WHICH IS STORED IN SLICE

    useEffect(() => {

        if (selectedSearchServiceFormData?.length > 0) {
            // Set form values
            setValue("clientId", getSearchExistingSelectedClientoption?.value);
            setValue("serviceType", getSearchExistingSelectedServiceType?.value);
            setJobNo(JSON.stringify(selectedSearchServiceFormData[0]?.jobNo));
            setValue("inputDate", selectedSearchServiceFormData[0]?.inputDate);
            setValue("caseNo", JSON.stringify(selectedSearchServiceFormData[0]?.caseNo));
            if (selectedSearchServiceFormData[0]?.oLTIndexNo === null) setOltIndex("");
            else setOltIndex(selectedSearchServiceFormData[0]?.oLTIndexNo);

            setValue("oLTDescription", selectedSearchServiceFormData[0]?.oLTDescription);
            setValue("caption", selectedSearchServiceFormData[0]?.caption);
            setValue("lTSBusinessName", selectedSearchServiceFormData[0]?.lTSBusinessName);
            setValue("lTSAddress", selectedSearchServiceFormData[0]?.lTSAddress);
            setValue("lTSApt", selectedSearchServiceFormData[0]?.lTSApt);
            setValue("lTSCity", selectedSearchServiceFormData[0]?.lTSCity);
            setValue("lTSState", selectedSearchServiceFormData[0]?.lTSState);
            setValue("lTSZip", selectedSearchServiceFormData[0]?.lTSZip);
            setValue("lTSDescription", selectedSearchServiceFormData[0]?.lTSDescription);
            setValue("lTSFirstName", selectedSearchServiceFormData[0]?.lTSFirstName);

            setCheckedName(selectedSearchServiceFormData[0]?.lTServiceType?._id);
            const data = selectedSearchServiceFormData[0]?.mailingAddresses
            const id = selectedSearchServiceFormData[0]?._id
            dispatch(getFormMailAddress({ data, id }))
            // if (selectedSearchServiceFormData[0]?.lTSFirstName) {
            //     setMultipleFullname(selectedSearchServiceFormData[0]?.lTSFirstName.split(','));
            // }
            // else {
            //     setMultipleFullname([]);
            // }
        }
        else if (!isNewFormAdding) {
            const currentData = allServiceFormData[serviceFormIndex];
            const data = allServiceFormData[serviceFormIndex]?.mailingAddresses
            const id = allServiceFormData[serviceFormIndex]?._id
            dispatch(getFormMailAddress({ data, id }))

            if (currentData) {
                // Set form values
                setValue("clientId", getExistingSelectedClientoption?.value);
                setValue("serviceType", getExistingSelectedServiceTypeoption?.value);
                setJobNo(JSON.stringify(currentData?.jobNo));
                setValue("inputDate", currentData?.inputDate);
                setValue("caseNo", JSON.stringify(currentData?.caseNo) === null || currentData?.caseNo === null ? "" : JSON.stringify(currentData?.caseNo));

                if (currentData?.oLTIndexNo === null) setOltIndex("");
                else setOltIndex(currentData?.oLTIndexNo);
                setValue("oLTDescription", currentData?.oLTDescription);
                setValue("caption", currentData?.caption);
                setValue("lTSBusinessName", currentData?.lTSBusinessName);
                setValue("lTSAddress", currentData?.lTSAddress);
                setValue("lTSApt", currentData?.lTSApt);
                setValue("lTSCity", currentData?.lTSCity);
                setValue("lTSState", currentData?.lTSState);
                setValue("lTSZip", currentData?.lTSZip);
                setValue("lTSDescription", currentData?.lTSDescription);
                setValue("lTSFirstName", currentData?.lTSFirstName);

                // if (currentData?.lTSFirstName) {
                //     setMultipleFullname(currentData.lTSFirstName.split(','));
                // }
                // else {
                //     setMultipleFullname([]);
                //     setJoinedFullname(currentData?.lTSFirstName)
                // }
                setCheckedName(allServiceFormData[serviceFormIndex]?.lTServiceType?._id);

            } else {
                // toast.error("No current data found for the form index.");
            }
        }
        else {
            if (savedLTData?.inputDate) {
                setValue("inputDate", savedLTData?.inputDate);

            }
            else {

                const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
                setValue("inputDate", currentDate);
            }

            setValue("clientId", getSelectedClientoption?.value);
            setValue("serviceType", getSelectedServiceTypeOption?.value);
            setValue("oLTIndexNo", savedLTData?.oLTIndexNo);

            setValue("caseNo", savedLTData?.caseNo === null ? "" : savedLTData?.caseNo);
            setValue("caption", savedLTData?.caption);
            setValue("lTSBusinessName", savedLTData?.lTSBusinessName);
            setValue("lTSAddress", savedLTData?.address);
            setValue("lTSApt", savedLTData?.lTSApt);
            setValue("lTSCity", savedLTData?.lTSCity);
            setValue("lTSState", savedLTData?.lTSState);
            setValue("lTSZip", savedLTData?.lTSZip);
            setValue("lTSDescription", savedLTData?.lTSDescription);
            setValue("lTSFirstName", savedLTData?.lTSFirstName);

            // { savedLTData?.lTSFirstName && setMultipleFullname(savedLTData?.lTSFirstName.split(',')); }
            setCheckedName(savedLTData?.lTServiceType?._id);
            setCheckedName(savedLTData?.lTServiceType)
        }

    }, [allServiceFormData, serviceFormIndex, setValue, isNewFormAdding, selectedSearchServiceFormData, isSearchServiceForm]);

    // USE EFFECT TO GET ALL MAILING ADDRESS FROM API WHICH IS STORED IN SLICE
    useEffect(() => {
        dispatch(getAllMailingAddressThunk())
    }, [])
    // USE EFFECT TO CLEAR THE INPUT FIELDS ON NEW DATA ENTRY
    useEffect(() => {
        reset()
        setCheckedName(null)
        const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
        setValue("inputDate", currentDate);
        if (allServiceFormData[lastServiceFormIndex]?.jobNo && parseInt(allServiceFormData[lastServiceFormIndex]?.jobNo) >= 1 && isNewFormAdding) {
            setJobNo(parseInt(allServiceFormData[lastServiceFormIndex]?.jobNo) + 1);
        } else if (savedLTData?.jobNo !== undefined) {
            setJobNo(savedLTData.jobNo);
        }
        else {
            if (allServiceFormData?.length > 0) {
                setJobNo(parseInt(allServiceFormData[0]?.jobNo))
            } else {
                setJobNo(1)
            }

        }
    }, [isNewFormAdding])
    // THIS WILL SEND DATA OF MAILING ADDRESS INSIDE EXISTING FORM TO getFormMailAddress
    useEffect(() => {
        const data = allServiceFormData[serviceFormIndex]?.mailingAddresses
        const id = allServiceFormData[serviceFormIndex]?._id
        dispatch(getFormMailAddress({ data, id }))
    }, [serviceFormIndex])
    // FUNCTION TO SAVE DATA
    const dataSavedFunction = () => {
        dispatch(isDataSaveReducer(true))
    }
    // CHANGING FORMATE 
    const convertDateFormat = (dateString) => {
        if (!dateString) return "";
        const parts = dateString?.split('-');
        if (parts.length !== 3) return "";
        const [day, month, year] = parts;
        return `${year}-${month}-${day}`;
    };

    const StandardTypeFormSubmitFunciton = (data) => {
        //    DATA FOR STANDARD FORM STARTS
        const serviceFormData: any = allServiceFormData[0];
        const standardServiceDetail = {
            sSDCourt: allServiceFormData[serviceFormIndex]?.sSDCourt,
            sSDDefendants: allServiceFormData[serviceFormIndex]?.sSDDefendants,
            sSDPlaintiff: allServiceFormData[serviceFormIndex]?.sSDPlaintiff,
            sSDCountry: allServiceFormData[serviceFormIndex]?.sSDCountry,
            firstNameServe: allServiceFormData[serviceFormIndex]?.firstNameServe,
            addressServe: allServiceFormData[serviceFormIndex]?.addressServe,
            cityServe: allServiceFormData[serviceFormIndex]?.cityServe,
            stateServe: allServiceFormData[serviceFormIndex]?.stateServe,
            aptServe: allServiceFormData[serviceFormIndex]?.aptServe,
            zipServe: allServiceFormData[serviceFormIndex]?.zipServe
        }
        //    DATA FOR STANDARD FORM ENDS

        //    DATA FOR L&T FORM STARTS
        const serviceFormId = allServiceFormData[serviceFormIndex]?._id
        const LTData = {
            jobNo: parseInt(jobNo),
            inputDate: data?.inputDate,
            clientId: data?.clientId,
            serviceType: data?.serviceType,
            caseNo: parseInt(data?.caseNo),
            caption: data?.caption,
            lTServiceType: checkedName,
            noOfAddLMailings: isNewFormAdding ? getMailingAddressDataOnFormAdding?.length : getFormMailingAdress?.length,
            mailingAddresses: isNewFormAdding ? getMailingAddressDataOnFormAdding : getFormMailingAdress,
            // lTSFirstName: joinedFullname === "" ? allServiceFormData[serviceFormIndex]?.lTSFirstName : joinedFullname,
            lTSFirstName: data?.lTSFirstName,

            lTSBusinessName: data?.lTSBusinessName,

            lTSAddress: data?.lTSAddress,
            lTSApt: data?.lTSApt,
            lTSCity: data?.lTSCity,
            lTSState: data?.lTSState,
            lTSZip: data?.lTSZip,

            lTSDescription: data?.lTSDescription,
            // oLTIndexNo: oLTIndex === "" ? null : oLTIndex + "/" + currentYear,
            oLTIndexNo: oLTIndex === "" ? null : oLTIndex,

            oLTDescription: data?.oLTDescription,
            lTSCityLongitude: "",
            lTSCityLatitude: ""
        }

        //    DATA FOR L&T FORM ENDS

        const updatedData = { ...LTData, standardServiceDetail, serviceFormId, standardServiceType: allServiceFormData[serviceFormIndex]?.standardServiceType?._id }

        // if (checkedName === null) setCheckedName("empty")
        // IF SEARCH FORM TRUE
        if (isSearchServiceForm === true) {
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
                endDate: formattedDateEnd
            }
            dispatch(searchServiceFormThunk(searchData))

        }
        else if (!isNewFormAdding && selectedSearchServiceFormData?.length > 0) {
            const sendDataToUpdateApi = {
                ...updatedData, // Spreads all data from the object
                serviceFormId: selectedSearchServiceFormData[0]?._id // Adds serviceFormId field
            };
            const { updatedAt, __v, _id, ...filteredData } = sendDataToUpdateApi;

            dispatch(updateServiceFormThunk(sendDataToUpdateApi))

        }
        else if (!isNewFormAdding && allServiceFormData?.length > 0) {
            const allData = { isDuplicate: false, data: updatedData }

            dispatch(updateServiceFormThunk(allData))
            dispatch(savedLTFormDataReducer(LTData))
        } else {
            dispatch(savedLTFormDataReducer(LTData))
            const allData = { isDuplicate: false, sendDataToAddApi: LTData }
            dispatch(addServiceFormThunk(allData))
        }
    }
    // THIS USEEFECT WILL BE CALLED WHEN CTRL+S IS PRESSED TO SAVE DATA INSIDE SLICE
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.ctrlKey && event.key === 's' || event.key === 'Escape' || event.key === 'F10') {
                event.preventDefault();
                handleSubmit(StandardTypeFormSubmitFunciton)();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleSubmit, StandardTypeFormSubmitFunciton]);
    const onKeyPressForAnotherName = (e) => {
        if (e.key === "Enter") {
            e.preventDefault()
            handleEnterKeyPress(event, "residential", allIndex)
        }
        // if (e.key === 'Enter') {
        //     e.preventDefault();

        //     if (multipleFullname.includes(e.target.value)) {
        //         toast.error("Duplicate data can't be entered");
        //     } else {
        //         const updatedFullname = [...multipleFullname, e.target.value];
        //         setMultipleFullname(updatedFullname);

        //         const joinedNames = updatedFullname.join(',');
        //         setJoinedFullname(joinedNames);
        //     }

        //     setInputFullname("");
        // }

    }
    const deleteName = (data) => {
        const freshData = multipleFullname?.filter(multipleFullname => multipleFullname !== data)
        setMultipleFullname(freshData)
        setJoinedFullname(freshData.join(','));
    }

    // ADD DUPLICATE SERVICE FORM

    const addDuplicateServiceForm = (event) => {
        event.preventDefault();
        const { caption, caseNo,
            clientId,
            lTSAddress,
            lTSBusinessName,
            lTSZip,
            lTSState,
            lTSCity,
            lTSApt,
            lTSFirstName,

            lTSDescription,
            oLTIndexNo,
            oLTDescription,
            serviceType,
            lTServiceType
        } = getValues();
        const caseNooo = parseInt(caseNo ?? '0')
        setJoinedFullname(multipleFullname.join(","))
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];
        const sendDataToAddApi = {
            jobNo: allServiceFormData[allServiceFormData?.length - 1]?.jobNo + 1,
            caption,
            caseNo: caseNo !== "" ? parseInt(caseNo) : 0,
            clientId,
            inputDate: formattedDate,
            lTSFirstName: lTSFirstName,
            oSSTDescription: selectedSearchServiceFormData[0]?.oSSTDescription,
            oSSTIndexNo: selectedSearchServiceFormData[0]?.oSSTIndexNo,
            sSDCourt: selectedSearchServiceFormData[0]?.sSDCourt,
            sSDDefendants: selectedSearchServiceFormData[0]?.sSDDefendants,
            sSDPlaintiff: selectedSearchServiceFormData[0]?.sSDPlaintiff,
            lTSAddress,
            // oLTIndexNo: oLTIndex === "" ? null : oLTIndex + "/" + currentYear,
            oLTIndexNo: oLTIndex === "" ? null : oLTIndex,

            oLTDescription,
            standardServiceType: selectedSearchServiceFormData[0]?.standardServiceType,
            lTSBusinessName,
            lTSZip,
            lTSState,
            lTSCity,
            lTSApt,
            lTSDescription,
            serviceType,
            lTServiceType: checkedName,
            mailingAddresses: filterExistingFormMailingAdress,
            noOfMailingAddres: filterExistingFormMailingAdress?.length
        }
        const allData = { isDuplicate: true, sendDataToAddApi }
        console.log("oLTIndexNo", allData)
        dispatch(addServiceFormThunk(allData))
    }



    const inputeDate = watch("inputDate");
    useEffect(() => {
        const isHoliday = holidayData?.find(data => data?.holidayDate === inputeDate)

        if (!isNewFormAdding && isHoliday) {
            alert("Note: The date you selected is a holiday. Please choose another date.")
            setValue("inputDate", allServiceFormData[serviceFormIndex]?.inputDate)
        } else if (isHoliday) {
            alert("Input date you have selected there is holiday")
            setValue("inputDate", "")
        }
    }, [inputeDate]);

    // Function to convert UTC time string to local 12-hour format
    const convertUtcToLocal12HourFormat = (utcTime: string): string => {
        // Ensure utcTime is defined and is a valid string
        if (!utcTime || typeof utcTime !== 'string') {
            return ''; // return empty if invalid input
        }

        // Create a Date object from the UTC time string
        const date = new Date(utcTime);

        // Convert to local time and then to 12-hour format
        const localTime = date.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });

        return localTime;
    };

    // Example usage
    const createdAtUtc = allServiceFormData[serviceFormIndex]?.createdAt;
    const updatedAtUtc = allServiceFormData[serviceFormIndex]?.updatedAt;

    const createdAtLocal12hr = createdAtUtc ? convertUtcToLocal12HourFormat(createdAtUtc) : '';
    const updatedAtLocal12hr = updatedAtUtc ? convertUtcToLocal12HourFormat(updatedAtUtc) : '';

    // NAVIGATION STARTS
    const captionRef = useRef<HTMLInputElement>(null);
    const checkboxRefs = useRef<(HTMLInputElement | null)[]>([]);
    const serviceTypeRef = useRef<any>(null);
    const [openServiceTypeOptions, setOpenServiceType] = useState(false)
    const [openClientTypeOptions, setOpenClientType] = useState(false)
    const [openMailingAddressOptions, setOpenMailingAddressOptions] = useState(false)


    const [shouldFocusCaption, setShouldFocusCaption] = useState("");
    const [allIndex, setAllIndex] = useState()
    useEffect(() => { setAllIndex(LTServiceData?.length + 2) }, [LTServiceData])
    const firstNameRef = useRef<HTMLInputElement>(null);
    const bussinessnameRef = useRef<HTMLInputElement>(null);
    const desRef = useRef<HTMLInputElement>(null);

    // const handleEnterKeyPressCheckboxFocus = (event: React.KeyboardEvent) => {
    //     const { serviceType } = getValues(); // Assuming this gets the form values
    //     const currentFocusedElement = document.activeElement;
    //     const currentCheckboxIndex = checkboxRefs.current.findIndex(ref => ref === currentFocusedElement);
    //     event.preventDefault();
    //     if (event.key === 'Enter') {
    //         event.preventDefault(); // Prevent default form submission

    //         if (currentCheckboxIndex >= 0) {
    //             const currentCheckbox = checkboxRefs.current[currentCheckboxIndex] as HTMLInputElement;

    //             // Check if the current checkbox is checked
    //             if (currentCheckbox.checked) {
    //                 // If checked, move to the next input based on selected service type
    //                 handleEnterKeyPress(event, "checkbox", allIndex); // Move to the Index Number input
    //             } else {
    //                 // If not checked, focus the next checkbox
    //                 const nextCheckbox = checkboxRefs.current[currentCheckboxIndex + 1];
    //                 if (nextCheckbox) {
    //                     nextCheckbox.focus();
    //                 } else {
    //                     // If no more checkboxes, focus on the first checkbox or another input as needed
    //                     handleEnterKeyPress(event, "checkbox", allIndex); // Fallback to first checkbox
    //                 }
    //             }
    //         } else {
    //             // If focused on caption or any other input, focus the first checkbox
    //             if (currentFocusedElement === captionRef.current) {
    //                 checkboxRefs.current[0]?.focus();
    //             } else {
    //                 checkboxRefs.current[0]?.focus();
    //             }
    //         }
    //     } else if (event.key === 'Tab' && event.shiftKey) {
    //         // Handle Shift + Tab to move focus backward through checkboxes
    //         event.preventDefault(); // Prevent the default tab behavior

    //         if (currentCheckboxIndex > 0) {
    //             // If not on the first checkbox, move focus to the previous checkbox
    //             const prevCheckbox = checkboxRefs.current[currentCheckboxIndex - 1];
    //             if (prevCheckbox) {
    //                 prevCheckbox.focus();
    //             }
    //         } else {

    //             // If already at the first checkbox, call handleEnterKeyPress to handle the form
    //             handleEnterKeyPress("", "", 2); // Call your logic when Shift + Tab reaches the first checkbox
    //         }
    //     }
    // };

    const handleEnterKeyPressCheckboxFocus = (event: React.KeyboardEvent) => {
        const { serviceType } = getValues(); // Assuming this gets the form values
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent default form submission

            const currentFocusedElement = document.activeElement;
            const currentCheckboxIndex = checkboxRefs.current.findIndex(ref => ref === currentFocusedElement);

            if (currentCheckboxIndex >= 0) {
                const currentCheckbox = checkboxRefs.current[currentCheckboxIndex] as HTMLInputElement;

                // Check if the current checkbox is checked
                if (currentCheckbox.checked) {
                    // If checked, move to the next input based on selected service type
                    handleEnterKeyPress(event, "checkbox", allIndex)// Move to the Index Number input
                } else {
                    // If not checked, focus the next checkbox
                    const nextCheckbox = checkboxRefs.current[currentCheckboxIndex + 1];
                    if (nextCheckbox) {
                        nextCheckbox.focus();
                    } else {
                        // If no more checkboxes, focus on the first checkbox or another input as needed
                        handleEnterKeyPress(event, "checkbox", allIndex); // Fallback to first checkbox
                    }
                }
            } else {
                // If focused on caption or any other input, focus the first checkbox
                if (currentFocusedElement === captionRef.current) {
                    checkboxRefs.current[0]?.focus();
                } else {
                    checkboxRefs.current[0]?.focus();
                }
            }
        } else if (event.key === 'Tab' && event.shiftKey) {
            handleEnterKeyPress("", "", 2)
        }
    };

    useEffect(() => { setOpenServiceType(false) }, [isNewFormAdding])

    // const handleClientSelect = (event: React.KeyboardEvent) => {
    //     if (event.key === 'Enter' || event.key === 'Tab') {
    //         // Handle Enter or Tab key press
    //         event.preventDefault(); // Prevent default behavior for Enter or Tab key
    //         toast.success("cal"); // Show toast when Enter or Tab is pressed

    //         // Focus and open the service type dropdown
    //         if (serviceTypeRef.current) {
    //             serviceTypeRef.current.focus(); // Focus the service type dropdown
    //             setOpenServiceType(true); // Open the service type options
    //         }
    //     }
    // };

    const handleClientSelect = (event) => {

        toast.success("cal")
        if (event.key === 'Enter' || event.key === 'Tab') {
            setOpenServiceType(true);
        }

    };

    const backToClientField = (event: React.KeyboardEvent) => {
        toast.success("Shift + Tab detected");
        // Check for Shift + Tab key combination
        if (event.key === 'Tab' && event.shiftKey) {
            setOpenClientType(true);
        }
    };
    // NAVIGATION ENDS

    // Function to handle zip code formatting
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

    const backToPreviousField = (event, index) => {
        event.preventDefault()

        if (event.key !== 'Tab') {
            event.preventDefault()
            handleEnterKeyPress(event.key, "_", index)


        } else {


            handleEnterKeyPress(event, "", index)
        }
    }

    return <>
        {allSeacrhServiceFormData?.length > 0 && isSearchServiceForm ? <SearchResultData /> :
            <div className="w-[100%]">
                <div className="w-full">
                    <form onSubmit={handleSubmit(StandardTypeFormSubmitFunciton)}>
                        <div className="flex items-center justify-between flex-row-reverse  ">
                            <div className="flex items-center gap-x-2">

                                <BorderButton buttonText="Duplicate Form" icon={<MdAdd />} isIcon onClick={addDuplicateServiceForm} />

                                <Hints keyName="Esc" label="Cancel" />
                                <Hints keyName="f4 " label="Find" />
                                <Hints keyName="f10 / Ctrl + S " label="Save" />
                            </div>
                            <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                                {jobNo &&

                                    <div className="flex flex-col w-full items-start gap-1">
                                        <label className=" font-normal sm:font-semibold text-xl capitalize">Job No <span>{jobNo}</span></label>
                                    </div>

                                }
                                {isSearchServiceForm &&
                                    <div>
                                        <div className="flex items-center gap-x-6">
                                            <div className="w-full flex items-center">
                                                <label className="w-[180px] font-semibold">Start Date</label>
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
                                                <label className="w-[180px] font-semibold">End Date</label>
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
                                    </div>}
                            </div>
                        </div>

                        <div className="flex items-start w-full flex-wrap gap-x-8 gap-y-4 mt-2 justify-start">

                            <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                                <TextField onKeyDown={handleEnterKeyPress} register={register} readOnly label="Input date" error={errors.inputDate} name="inputDate" type="date" required />

                            </div>
                            <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                                <Controller name="clientId" control={control} render={({ field }) => (
                                    <Dropdown
                                        options={clientIdOptions}
                                        value={field.value}
                                        label="Client id" error={errors.clientId?.message as string}
                                        required
                                        isOpenOption={isNewFormAdding}
                                        // onChange={(value) => {
                                        //     field.onChange(value);
                                        // }}
                                        onChange={(value) => {
                                            field.onChange(value); // Update the field value
                                            // You can call handleEnterKeyPress with default or context values
                                            const simulatedEvent = {
                                                target: {
                                                    form: document.querySelector("form"), // Assuming the dropdown is in a form
                                                },
                                            };
                                            setOpenServiceType(true);

                                            handleEnterKeyPress(simulatedEvent, value, 0); // Call your function with simulated event
                                        }}
                                        // onKeyDown={handleClientSelect}
                                        id="clientId"

                                    />
                                )} />
                                {/* <Controller
                                    name="clientId"
                                    control={control}
                                    render={({ field }) => (
                                        <Dropdown
                                            options={clientIdOptions}
                                            value={field.value}
                                            label="Client id"
                                            error={errors.clientId?.message as string}
                                            required
                                            isOpenOption={isNewFormAdding || openClientTypeOptions}
                                            onChange={(value) => {
                                                field.onChange(value); // Update the field value
                                                setOpenClientType(false);
                                                setOpenServiceType(true);
                                                handleEnterKeyPress(simulatedEvent, value, 0); // Call your function with simulated event
                                            }}
                                            id="clientId"
                                        />
                                    )}
                                /> */}


                            </div>

                            <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                                <Controller name="serviceType" control={control} render={({ field }) => (
                                    <Dropdown
                                        options={serviceTypeOptions}
                                        value={field.value}
                                        onChange={(value) => {
                                            field.onChange(value); // Update the field value
                                            // You can call handleEnterKeyPress with default or context values
                                            const simulatedEvent = {
                                                target: {
                                                    form: document.querySelector("form"), // Assuming the dropdown is in a form
                                                },
                                            };
                                            setOpenServiceType(false);

                                            handleEnterKeyPress(simulatedEvent, value, 2); // Call your function with simulated event
                                        }}

                                        label="service type"
                                        error={errors.serviceType?.message as string}
                                        onValueChange={(value) => { handleMoveToStandardForm(value) }} // Update state
                                        required

                                        ref={serviceTypeRef}
                                        onKeyDown={(event) => {
                                            if (event.key === "Tab" && event.shiftKey) {
                                                dispatch(addNewFormAddReducer(true));
                                                setOpenServiceType(false)
                                            }

                                        }}
                                        id="serviceType"
                                        isOpenOption={openServiceTypeOptions}
                                    />
                                )} />
                            </div>
                            <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                                <TextField
                                    onKeyDown={(event) => {
                                        if (event.key === "Tab" && event.shiftKey) {

                                            const simulatedEvent = {
                                                target: {
                                                    form: document.querySelector("form"), // Assuming the dropdown is in a form
                                                },
                                            };
                                            setOpenServiceType(true);

                                            handleEnterKeyPress(simulatedEvent, "", 0);
                                        }
                                        else if (event.key === "Enter") {
                                            event.preventDefault()
                                            handleEnterKeyPress(event, "", 1)
                                        }
                                    }}
                                    // onKeyDown={handleEnterKeyPress} 
                                    register={register} label="case No" error={errors.caseNo} name="caseNo" />
                            </div>



                            <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                                <TextField
                                    id="caption"
                                    onKeyDown={handleEnterKeyPressCheckboxFocus}
                                    register={register}
                                    label="caption"
                                    error={errors.caption}
                                    name="caption"
                                    ref={captionRef}
                                />
                            </div>
                        </div>
                        {/* L&T SERVICE TYPE STARTS */}

                        <div className="mt-6">
                            <h1 className="font-semibold   mb-4 text-base
            md:text-md
            lg:text-xl">L&T Service Type <span className="text-xs font-normal capitalize">(Select only one)</span>
                            </h1>
                            <div className="flex items-start w-full flex-wrap gap-x-8 gap-y-4 justify-start ">
                                {LTServiceData?.map((data, index) => {
                                    return <div className="w-[100%] md:w-[46%] lg:w-[30%]" key={index}>

                                        <CustomCheckBox
                                            onKeyDown={handleEnterKeyPressCheckboxFocus}
                                            ref={el => (checkboxRefs.current[index] = el)} // Store the checkbox refs
                                            register={register}
                                            name={data?.name?.replace(/[^a-zA-Z0-9]/g, "")}
                                            label={data?.name}
                                            checked={checkedName === data?._id}
                                            onChange={() => handleCheckboxChange(data)}
                                        />
                                    </div>
                                })}
                            </div>
                            {checkedName === "empty" && <p className="text-redColor text-sm">required</p>}
                        </div>
                        {/* L&T SERVICE TYPE ENDS */}
                        {/* OTHER L&T SERVICE TYPE STARTS */}
                        <div className="flex items-start w-full flex-wrap gap-x-8 gap-y-4 mt-6" >
                            <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                                <TextField onKeyDown={(event) => {

                                    if (event.key === "Enter") {
                                        event.preventDefault(), handleEnterKeyPress(event, "", 12)
                                    }
                                }} ref={desRef} register={register} label="Other L&T Description" error={errors.oLTDescription} name="oLTDescription" />

                            </div>

                            <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                                <FormatedIndexInputField
                                    // onKeyDown={handleEnterKeyPress}
                                    onKeyDown={
                                        (event) => {
                                            if (event.key === "Enter") {

                                                handleEnterKeyPress(event, selectedServiceType, allIndex)
                                            } else {
                                                handleEnterKeyPress
                                            }
                                        }}

                                    register={register}
                                    label="Index Number"
                                    error={errors.oLTIndexNo}
                                    name="oLTIndexNo"
                                    oltIndexValue={oLTIndex} // Provide the value to split
                                    onChange={setOltIndex}
                                    year={currentYear} // Pass current year
                                />
                            </div>

                        </div>
                        {/* OTHER L&T SERVICE TYPE ENDS */}

                        {/* L&T SERVICE TYPE STARTS */}
                        <div className="mt-6" ref={detailSectionRef}>
                            <h1 className="font-semibold  mb-4 text-base
            md:text-md
            lg:text-xl">L&T Service Detail</h1>
                            <div className="flex items-start w-full flex-wrap gap-x-8 gap-y-4 justify-between ">

                                {/* <div className="w-[100%] md:w-[46%] lg:w-[30%]" >
                                    <div className="flex flex-col w-full items-start gap-1 flex-wrap">
                                        <label className=" font-normal sm:font-medium text-sm capitalize">Full Name</label>
                                        <div className="flex items-center flex-wrap gap-x-2 w-full border-[1px] border-borderColor/10 bg-grayColorLight/50 border-solid rounded-lg px-2  py-1 text-wrap">
                                            <div className="flex items-center gap-x-3 flex-wrap">
                                                {multipleFullname?.length > 0 && multipleFullname?.map(data =>
                                                    <div className="flex items-center gap-x-1">
                                                        <p>{data}</p>
                                                        <RxCross2 className="text-redColor cursor-pointer" size={14} onClick={() => deleteName(data)} />
                                                    </div>
                                                )}

                                            </div>

                                            <input
                                                className="w-[100%]  focus:border-none focus:outline-none bg-grayColorLight/50"
                                                value={inputFullname}
                                                id={allIndex?.length + 2}
                                                ref={firstNameRef} // Bind the input field to inputFullname state
                                                onChange={(e) => setInputFullname(e?.target?.value)} // Update state on change
                                                onKeyDown={(e) => onKeyPressForAnotherName(e)}
                                            />
                                        </div>
                                    </div>
                                </div> */}
                                <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                                    <TextField ref={businessNameRef} onKeyDown={(e) => onKeyPressForAnotherName(e)} register={register} label="Name" error={errors.lTSFirstName} name="lTSFirstName" />
                                </div>
                                <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                                    <TextField ref={businessNameRef} onKeyDown={handleEnterKeyPress} register={register} label="bussiness Name" error={errors.lTSBusinessName} name="lTSBusinessName" />
                                </div>
                                <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                                    <TextField onKeyDown={handleEnterKeyPress} register={register} label="address" error={errors.lTSAddress} name="lTSAddress" />
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
                                    <TextField maxLength={12}
                                        onChange={handleZipChange}
                                        onKeyDown={handleEnterKeyPress} register={register} label="zip" error={errors.lTSZip} name="lTSZip" />
                                </div>
                                <div className="w-[100%]">

                                    <TextField
                                        // onKeyDown={handleEnterKeyPress} 
                                        register={register} label="description" error={errors.lTSDescription} name="lTSDescription" />
                                </div>
                            </div>

                        </div>
                        {/* L&T SERVICE TYPE ENDS */}
                        {/* ADDING MAILING STARTS */}
                        <div className="mt-6  relative">
                            <div className="flex items-start gap-x-4  ">
                                {mailingAddressData?.length > 0 && <div className="w-[100%] md:w-[46%] mb-4 lg:w-[30%]  ">
                                    <Controller name="mailingAddress" control={control} render={({ field }) => (
                                        <GetSelectedMailing
                                            options={mailingAddressData}
                                            value={field.value}
                                            onChange={() => { field.onChange, setOpenMailingAddressOptions(false) }}
                                            label="Client Mailing Addresses"
                                            error={errors.mailingAddress?.message as string}
                                            getMailFunction={GetSelectedMailingFunction}
                                            isOpenOption={openMailingAddressOptions}

                                        />
                                    )} />
                                </div>}
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4">
                                    <BorderButton
                                        isIcon
                                        buttonText="add new mailing address"
                                        icon={< IoMdAdd />}
                                        onClick={() => dispatch(isAddingMailAddressReducer(true))}
                                    />
                                </div>
                            </div>
                            {isAddMail &&
                                <div>
                                    <AddMailing />
                                </div>}

                            {/* DISPLAY ALL EXISTING MAILING ADDRESS EXISTING INISDE FORM STARTS*/}
                            {!isNewFormAdding && filterExistingFormMailingAdress?.length > 0 && (
                                <div className="mt-4">
                                    {filterExistingFormMailingAdress?.map((data: any, id) => (
                                        <div key={id} className="relative border-[1px] border-solid border-borderColor/10 bg-grayColorLight/50 shadow-smShadow rounded-lg p-4 mt-2">
                                            <IoMdClose onClick={() => dispatch(getFormMailAddressAfterDeletion(id))} size={24} className="text-redColor p-1 bg-redColor/10 rounded-full cursor-pointer absolute top-4 right-4" />
                                            {/* SENDING DATA TO ADDMAILING COMPONENT IF DATA IS SELECTED FORM DROPDOWN */}
                                            <ShowAllAddMailingAddress data={data} id={id} />

                                        </div>
                                    ))}
                                </div>
                            )}
                            {/* DISPLAY ALL EXISTING MAILING ADDRESS EXISTING INISDE FORM STARTS*/}
                            {/* DISPLAY ALL SELECTED MAILING STARTS */}
                            {isNewFormAdding && filterMailingAddressDataOnFormAdding?.length > 0 && (
                                <div className="mt-4">
                                    {filterMailingAddressDataOnFormAdding?.map((data: any, id) => (
                                        <div key={id} className="relative border-[1px] border-solid border-borderColor/10 bg-grayColorLight/50 shadow-smShadow rounded-lg p-4 mt-2">
                                            <IoMdClose onClick={() => dispatch(getMailAddressAfterDeletion(id))} size={24} className="text-redColor p-1 bg-redColor/10 rounded-full cursor-pointer absolute top-4 right-4" />
                                            {/* SENDING DATA TO ADDMAILING COMPONENT IF DATA IS SELECTED FORM DROPDOWN */}
                                            <ShowAllAddMailingAddress data={data} id={id} />

                                        </div>
                                    ))}
                                </div>
                            )}
                            {/* DISPLAY ALL SELECTED MAILING ENDS */}

                        </div>
                        {/* ADDING MAILING ENDS*/}
                        {/* END OF FORM STARTS */}
                        <div className="mt-6">
                            <h1 className="font-semibold text-xl mb-4 ">End of Form</h1>
                            <div className="flex items-start w-full flex-wrap gap-x-8 gap-y-4 justify-start">
                                <div className="w-[100%] md:w-[46%] lg:w-[20%] ">
                                    <label className="text-sm font-semibold capitalize">created By</label>
                                    <p>{userData?.userDetails?.user?.firstName} {userData?.userDetails?.user?.lastName}</p>
                                </div>
                                <div className="w-[100%] md:w-[46%] lg:w-[20%] ">
                                    <label className="text-sm font-semibold capitalize">updated By</label>
                                    <p>{userData?.userDetails?.user?.firstName} {userData?.userDetails?.user?.lastName}</p>

                                </div>
                                {!isNewFormAdding &&
                                    <>
                                        <div className="w-[100%] md:w-[46%] lg:w-[20%] ">
                                            <label className="text-sm font-semibold capitalize">Created At</label>
                                            <p>Date: {allServiceFormData[serviceFormIndex]?.createdAt?.split("T")[0]}</p>
                                            <p>Time: {createdAtLocal12hr}</p>

                                        </div>

                                        <div className="w-[100%] md:w-[46%] lg:w-[20%] ">
                                            <label className="text-sm font-semibold capitalize">Updated At</label>
                                            <p>Date: {allServiceFormData[serviceFormIndex]?.updatedAt?.split("T")[0]}</p>
                                            <p>Time: {updatedAtLocal12hr}</p>

                                        </div>
                                    </>

                                }
                            </div>
                        </div>
                        {/* END OF FORM ENDS */}
                        <div className="w-full flex justify-end flex-row mt-6" >
                            <div className="w-[21%] " >

                                <Button text={`${isNewFormAdding ? "add Data" : "Update Data"}`}
                                    disabled={isSubmitting}

                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        }

    </>

}

export default StandardTypeForm

