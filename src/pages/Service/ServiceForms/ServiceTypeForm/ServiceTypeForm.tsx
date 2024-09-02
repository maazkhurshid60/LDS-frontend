import React, { useEffect, useState } from "react";
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
import { getAllServiceFormThunk, isDataSaveReducer, moveToStandardFormReducer, savedLTFormDataReducer, updateServiceFormThunk } from "../../../../redux/slice/serviceForm";
import Hints from "../../../Result/Hints/Hints";
import ShowAllAddMailingAddress from "./ShowAllMailingAddress";
import { toast } from "react-toastify";
import { handleEnterKeyPress } from "../../../../utils/moveToNextFieldOnEnter";
import axios from "axios";
import { DeleteIcon } from "../../../../components/Icons/DeleteIcon";
export type FormFields = z.infer<typeof LTFormSchema>
import { RxCross2 } from "react-icons/rx";
import Spinner from "../../../../components/Loader/Spinner"
const StandardTypeForm = () => {
    const mailingAddressData = useSelector((state: RootState) => state.mailingAdress.mailingAddressData)
    const loadingSpinner = useSelector((state: RootState) => state.showSpinner?.isShowSpinner)
    console.log("loadingSpinner", loadingSpinner)
    const isNewFormAdding = useSelector((state: RootState) => state.serviceForm.isNewFormAdd)
    const getMailingAddressDataOnFormAdding = useSelector((state: RootState) => state.mailingAdress.getSelectMail)
    const filterMailingAddressDataOnFormAdding = getMailingAddressDataOnFormAdding?.filter((obj1, i, arr) =>
        arr.findIndex(obj2 => (obj2?._id === obj1?._id)) === i
    )
    const savedLTData = useSelector((state: RootState) => state.serviceForm.savedLTFormData)
    // const LTData = useSelector((state: RootState) => state.serviceForm.savedLTFormData)
    console.log("saved lt data", savedLTData)
    // GET ALL MAILING ADDRESSES THAT COMMING INSIDE THE FORMS 
    const getFormMailingAdress = useSelector((state: RootState) => state.mailingAdress?.serviceFormMailingAdress?.mailingAdresses)
    const filterExistingFormMailingAdress = getFormMailingAdress?.filter((obj1, i, arr) =>
        arr.findIndex(obj2 => (obj2?._id === obj1?._id)) === i
    )
    console.log("filterExistingFormMailingAdress", getFormMailingAdress)
    const [checkedName, setCheckedName] = useState<string | null>(
        // LTServiceData?.find((data) => data?.isActive)?._id || null
    );

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

    console.log("clientIdOptions", holidayData)
    const serviceTypeOptions = serviceTypeData?.map((data, id) => { return { value: data?._id, label: data?.serviceTypeCode } })
    const getSelectedServiceTypeOption = serviceTypeOptions?.find((data, index) => data?.value === savedLTData?.serviceType && { value: data?._id, label: data?.fullName })
    const getExistingSelectedServiceTypeoption = serviceTypeOptions?.find((data, index) => data?.value === allServiceFormData[serviceFormIndex]?.serviceType?._id && { value: data?._id, label: data?.fullName })
    const [serviceType, setServiceType] = useState()
    const dispatch = useDispatch()
    const { register, formState: { errors }, control, handleSubmit, setValue, reset, getValues, watch } = useForm<FormFields>({ resolver: zodResolver(LTFormSchema) })
    const isAddMail = useSelector((state: RootState) => state.mailingAdress.isAddingMailAddress)
    const isUpdateMail = useSelector((state: RootState) => state.mailingAdress.isUpdatingMailAddress)
    const [jobNo, setJobNo] = useState<any>()
    const [inputFullname, setInputFullname] = useState("");
    const [multipleFullname, setMultipleFullname] = useState<string[]>([]);
    const [joinedFullname, setJoinedFullname] = useState("");

    console.log("servicetype<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<",joinedFullname)
    // handleMoveToStandardForm
    const handleMoveToStandardForm = (value) => {
        const { clientId, inputDate, caseNo } = getValues();

        if (!inputDate || !caseNo || !clientId || !checkedName) {
            // Show error message if either field is empty
            setValue("serviceType", "");
            toast.error("Input Date,case No ,clientI d and  lTServiceType are required!");
            return;
        }
        const data = serviceTypeOptions?.find(data => data?.value === value)?.label
        if (data === "Standard") {

            handleSubmit(StandardTypeFormSubmitFunciton)();
            dispatch(moveToStandardFormReducer(data))
        }

    }
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

            // console.log("Full API Response:", response.data); // Log the entire API response

            if (response?.data?.results && response.data.results.length > 0) {
                const location = response.data.results[0].geometry.location;
                setCoordinates({
                    lat: location.lat,
                    lng: location.lng,
                });
            } else {
                console.warn("No results found for the given city name.");
            }
        } catch (error) {
            console.error("Error fetching the coordinates:", error);
        }
    };

    useEffect(() => {
        getCoordinates();
    }, [city]);

    useEffect(() => {
        console.log("Longitude:", coordinates.lng);
        console.log("Latitude:", coordinates.lat);
    }, [coordinates]);

    // GET LONGITUDE AND LATITUDE ON THE BASIS OF CITY ENDS

    // const [isAddMail, dispatch(isAddingMailAddressReducer] = us)eState(false)
    // console.log("allServiceFormData[serviceFormIndex]?.standardServiceDetail?.firstName", allServiceFormData[serviceFormIndex]?.standardServiceType?._id)


    const handleCheckboxChange = (id: string) => {
        console.log("id checkoubox", id)
        setCheckedName(id);
    };

    // GET SELECTED VALUES FROM ADD MAILING DROPDOWN
    const GetSelectedMailingFunction = (optionValue: string) => {

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

        }
    }, [isNewFormAdding, reset]);

    // USE EFFECT TO GET ALL SERVICE FORM DATA FROM API WHICH IS STORED IN SLICE
    useEffect(() => {
        dispatch(getAllServiceFormThunk())
    }, [])
    // USE EFFECT TO SET VALUES OF INDEX 0 SERVICE FORM DATA FROM API WHICH IS STORED IN SLICE

    useEffect(() => {

        if (!isNewFormAdding) {
            const currentData = allServiceFormData[serviceFormIndex];
            const data = allServiceFormData[serviceFormIndex]?.mailingAddresses
            const id = allServiceFormData[serviceFormIndex]?._id
            // console.log(data, id)
            dispatch(getFormMailAddress({ data, id }))

            if (currentData) {

                console.log("new form is not adding****************************************", allServiceFormData[serviceFormIndex]?.inputDate);
                //    toast.success("current****************************************");

                // Set form values
                setValue("clientId", getExistingSelectedClientoption?.value);
                setValue("serviceType", getExistingSelectedServiceTypeoption?.value);
                setJobNo(JSON.stringify(currentData?.jobNo));
                setValue("inputDate", currentData?.inputDate);
                setValue("caseNo", JSON.stringify(currentData?.caseNo));
                if (currentData?.oLTIndexNo === null) setValue("oLTIndexNo", "");
                else setValue("oLTIndexNo", JSON.stringify(currentData?.oLTIndexNo));

                setValue("oLTDescription", currentData?.oLTDescription);
                setValue("caption", currentData?.caption);
                setValue("lTSBusinessName", currentData?.lTSBusinessName);
                setValue("lTSAddress", currentData?.lTSAddress);
                setValue("lTSApt", currentData?.lTSApt);
                setValue("lTSCity", currentData?.lTSCity);
                setValue("lTSState", currentData?.lTSState);
                setValue("lTSZip", currentData?.lTSZip);
                setValue("lTSDescription", currentData?.lTSDescription);
                if (currentData?.lTSFirstName) {
                    setMultipleFullname(currentData.lTSFirstName.split(','));
                } else {
                    setMultipleFullname([]);
                }
                setCheckedName(allServiceFormData[serviceFormIndex]?.lTServiceType?._id);

            } else {
                console.log("No current data found for the form index.");
            }
        }
        else {
      if( savedLTData?.inputDate){
                setValue("inputDate", savedLTData?.inputDate);

            }
            else{

                const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
                setValue("inputDate", currentDate);
            }

            setValue("clientId", getSelectedClientoption?.value);
            setValue("serviceType", getSelectedServiceTypeOption?.value);
            // setValue("inputDate", savedLTData?.inputDate);
            setValue("oLTIndexNo", JSON.stringify(savedLTData?.oLTIndexNo));

            setValue("caseNo", savedLTData?.caseNo);
            setValue("caption", savedLTData?.caption);
            // setValue("lTSFirstName", savedLTData?.lTSFirstName);
            setValue("lTSBusinessName", savedLTData?.lTSBusinessName);
            setValue("lTSAddress", savedLTData?.address);
            setValue("lTSApt", savedLTData?.lTSApt);
            setValue("lTSCity", savedLTData?.lTSCity);
            setValue("lTSState", savedLTData?.lTSState);
            setValue("lTSZip", savedLTData?.lTSZip);
            setValue("lTSDescription", savedLTData?.lTSDescription);
            // alert(savedLTData?.lTServiceType?._id)
            { savedLTData?.lTSFirstName && setMultipleFullname(savedLTData?.lTSFirstName.split(',')); }
            setCheckedName(savedLTData?.lTServiceType?._id);
            setCheckedName(savedLTData?.lTServiceType)
        }

        //    if (jobNo===1) {
        //     // toast.success("new form is adding");
        //     if( savedLTData?.inputDate){
        //         setValue("inputDate", savedLTData?.inputDate);

        //     }
        //     else{

        //         const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
        //         setValue("inputDate", currentDate);
        //     }
        //         setValue("clientId", getSelectedClientoption?.value);
        //         setValue("serviceType", getSelectedServiceTypeOption?.value);
        //         setValue("oLTIndexNo", JSON.stringify(savedLTData?.oLTIndexNo));

        //         setValue("caseNo", savedLTData?.caseNo);
        //         setValue("caption", savedLTData?.caption);
        //         // setValue("lTSFirstName", savedLTData?.lTSFirstName);
        //         setValue("lTSBusinessName", savedLTData?.lTSBusinessName);
        //         setValue("lTSAddress", savedLTData?.address);
        //         setValue("lTSApt", savedLTData?.lTSApt);
        //         setValue("lTSCity", savedLTData?.lTSCity);
        //         setValue("lTSState", savedLTData?.lTSState);
        //         setValue("lTSZip", savedLTData?.lTSZip);
        //         setValue("lTSDescription", savedLTData?.lTSDescription);
        //         // alert(savedLTData?.lTServiceType?._id)
        //         {savedLTData?.lTSFirstName && setMultipleFullname(savedLTData?.lTSFirstName.split(',')); }
        //         setCheckedName(savedLTData?.lTServiceType?._id);
        //         setCheckedName(savedLTData?.lTServiceType)
        //     }

    }, [allServiceFormData, serviceFormIndex, setValue, isNewFormAdding]);



    // }, [allServiceFormData, serviceFormIndex, setValue, isNewFormAdding,  savedLTData]);

    // }, [allServiceFormData, serviceFormIndex, setValue, isNewFormAdding, getExistingSelectedClientoption, getExistingSelectedServiceTypeoption, savedLTData]);


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
        // console.log(data, id)
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
        console.log(joinedFullname)
        if (checkedName === null) setCheckedName("empty")
        console.log(">>>>>>>>>>>>>>saving StandardTypeFormSubmitFunciton>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", data)        //    DATA FOR STANDARD FORM STARTS
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
        // console.log(">>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>.", standardServiceDetail)
        //    DATA FOR STANDARD FORM ENDS

        //    DATA FOR L&T FORM STARTS
        const serviceFormId = allServiceFormData[serviceFormIndex]?._id
        const LTData = {
            // serviceFormId,
            jobNo: parseInt(jobNo),
            inputDate: data?.inputDate,
            clientId: data?.clientId,
            serviceType: data?.serviceType,
            caseNo: data?.caseNo,
            caption: data?.caption,
            lTServiceType: checkedName,
            noOfAddLMailings: isNewFormAdding ? getMailingAddressDataOnFormAdding?.length : getFormMailingAdress?.length,
            mailingAddresses: isNewFormAdding ? getMailingAddressDataOnFormAdding : getFormMailingAdress,
            lTSFirstName: joinedFullname,
            lTSBusinessName: data?.lTSBusinessName,
            lTSAddress: data?.lTSAddress,
            lTSApt: data?.lTSApt,
            lTSCity: data?.lTSCity,
            lTSState: data?.lTSState,
            lTSZip: data?.lTSZip,
            lTSDescription: data?.lTSDescription,
            oLTIndexNo: parseInt(data?.oLTIndexNo),
            oLTDescription: data?.oLTDescription,
            lTSCityLongitude: "",
            lTSCityLatitude: ""
        }
        //    DATA FOR L&T FORM ENDS
        // const selectedLTDataService=LTServiceData?.find((data,id)=>data?._id === checkedName)
        // console.log("LT DATA SUBMIT",LTData)
        const updatedData = { ...LTData, standardServiceDetail, serviceFormId, standardServiceType: allServiceFormData[serviceFormIndex]?.standardServiceType?._id }
        // console.log("LTS UPDATED DATA", updatedData)
        // console.log("LT DATA", LTData)

        // alert("k")
        if (!isNewFormAdding && allServiceFormData?.length > 1) {

            dispatch(updateServiceFormThunk(updatedData))
            dispatch(savedLTFormDataReducer(LTData))
            dispatch(moveToStandardFormReducer("Standard"))

        } else {

            dispatch(savedLTFormDataReducer(LTData))
            toast.success("Your data is saved temporarily. For a permanent save, navigate to the Standard form and save your data.")
            dispatch(moveToStandardFormReducer("Standard"))

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
    // console.log("allServiceFormData[serviceFormIndex]", allServiceFormData[serviceFormIndex]?.lTServiceType?._id)
    const onKeyPressForAnotherName = (e) => {
        if (e.key === 'Enter') {

            if (multipleFullname.includes(e.target.value)) {
                toast.error("Duplicate data can't be entered");
            } else {
                const updatedFullname = [...multipleFullname, e.target.value];
                setMultipleFullname(updatedFullname);

                const joinedNames = updatedFullname.join(',');
                console.log(">>>>>>>>", joinedNames);
                setJoinedFullname(joinedNames);
            }

            setInputFullname("");
        }
        // else if (e.key === 'Escape') {
        //     setInputFullname(""); // Clear input on 'Escape' key press
        //     const joinedNames = multipleFullname.join(',');
        //     setJoinedFullname(joinedNames); // Or do something else with the joined string
        // }

    }
    const deleteName = (data) => {
        const freshData = multipleFullname?.filter(multipleFullname => multipleFullname !== data)
        setMultipleFullname(freshData)
        setJoinedFullname(freshData.join(','));
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


    console.log(">>>>>>>>>>>>>>>>>>>", checkedName,
        LTServiceData?.find((data, index) => {
            data._id
        }))




    return <>
        <div className="w-[100%]">
            <div className="w-full">
                <form onSubmit={handleSubmit(StandardTypeFormSubmitFunciton)}>
                    <div className="flex items-center justify-between flex-row-reverse	">
                        <Hints label="To Save / Update L&T Data" keyName="Ctrl + S / ESC" />
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            {jobNo &&
                                <div className="flex flex-col w-full items-start gap-1">
                                    <label className=" font-normal sm:font-semibold text-xl capitalize">Job No <span>{jobNo}</span></label>
                                </div>
                            }
                        </div>
                    </div>

                    <div className="flex items-start w-full flex-wrap gap-x-8 gap-y-4 mt-2 justify-start">

                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField onKeyDown={handleEnterKeyPress} register={register} label="Input date" error={errors.inputDate} name="inputDate" type="date" required />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <Controller name="clientId" control={control} render={({ field }) => (
                                <Dropdown
                                    options={clientIdOptions}
                                    // singleOption={getSelectedClientoption}
                                    value={field.value}
                                    onChange={field.onChange}
                                    label="Client id" error={errors.clientId?.message as string}
                                    required
                                />
                            )} />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField onKeyDown={handleEnterKeyPress} register={register} label="case No" error={errors.caseNo} name="caseNo" required />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <Controller name="serviceType" control={control} render={({ field }) => (
                                <Dropdown
                                    options={serviceTypeOptions}
                                    // singleOption={getSelectedServiceTypeOption}
                                    value={field.value}
                                    onChange={field.onChange}
                                    label="service type"
                                    error={errors.serviceType?.message as string}
                                    // onValueChange={(value) => handleMoveToStandardForm(value)} // Update state
                                    required

                                />
                            )} />
                        </div>

                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField onKeyDown={handleEnterKeyPress} register={register} label="caption" error={errors.caption} name="caption" />
                        </div>
                    </div>
                    {/* L&T SERVICE TYPE STARTS */}
                    <div className="mt-6">
                        <h1 className="font-semibold   mb-4 text-base
                md:text-md
                lg:text-xl">L&T Service Type <span className="text-xs font-normal capitalize">(Select only one)</span> <span className="text-redColor text-sm">*</span></h1>
                        <div className="flex items-start w-full flex-wrap gap-x-8 gap-y-4 justify-start ">
                            {LTServiceData?.map((data, index) => {
                                return <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                                    <CheckBox
                                        onKeyDown={handleEnterKeyPress}
                                        register={register}
                                        name={data?.name}
                                        label={data?.name}
                                        checked={checkedName === data._id}
                                        onChange={() => handleCheckboxChange(data._id)}
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
                            <TextField onKeyDown={handleEnterKeyPress} register={register} label="Other L&T Description" error={errors.oLTDescription} name="oLTDescription" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField onKeyDown={handleEnterKeyPress} register={register} label="Index Number" error={errors.oLTIndexNo} name="oLTIndexNo" />
                        </div>
                    </div>
                    {/* OTHER L&T SERVICE TYPE ENDS */}

                    {/* L&T SERVICE TYPE STARTS */}
                    <div className="mt-6">
                        <h1 className="font-semibold  mb-4 text-base
                md:text-md
                lg:text-xl">L&T Service Detail</h1>
                        <div className="flex items-start w-full flex-wrap gap-x-8 gap-y-4 justify-between ">

                            <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                                {/* <TextField onKeyDown={handleEnterKeyPress} register={register} label="full Name" error={errors.lTSFirstName} name="lTSFirstName" /> */}
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
                                            className="w-[100px] focus:border-none focus:outline-none bg-grayColorLight/50"
                                            value={inputFullname} // Bind the input field to inputFullname state
                                            onChange={(e) => setInputFullname(e.target.value)} // Update state on change
                                            onKeyDown={(e) => onKeyPressForAnotherName(e)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                                <TextField onKeyDown={handleEnterKeyPress} register={register} label="bussiness Name" error={errors.lTSBusinessName} name="lTSBusinessName" />
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
                                <TextField onKeyDown={handleEnterKeyPress} register={register} label="zip" error={errors.lTSZip} name="lTSZip" />
                            </div>
                            <div className="w-[100%]">
                                <TextArea register={register} label="description" error={errors.lTSDescription} name="lTSDescription" />
                            </div>
                        </div>

                    </div>
                    {/* L&T SERVICE TYPE ENDS */}
                    {/* ADDING MAILING STARTS */}
                    <div className="mt-6  relative">
                        <div className="flex items-start gap-x-4  ">
                            {mailingAddressData?.length > 0 && <div className="w-[100%] md:w-[46%] mb-4 lg:w-[30%] 	">
                                <Controller name="mailingAddress" control={control} render={({ field }) => (
                                    <GetSelectedMailing
                                        options={mailingAddressData}
                                        value={field.value}
                                        onChange={field.onChange}
                                        label="Client Mailing Addresses"
                                        error={errors.mailingAddress?.message as string}
                                        getMailFunction={GetSelectedMailingFunction}
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
                                        {/* <DeleteIcon onClick={()=>deleteMailingData(data,id)}/> */}
                                        <IoMdClose onClick={() => dispatch(getFormMailAddressAfterDeletion(id))} size={24} className="text-redColor p-1 bg-redColor/10 rounded-full cursor-pointer absolute top-4 right-4" />
                                        {/* SENDING DATA TO ADDMAILING COMPONENT IF DATA IS SELECTED FORM DROPDOWN */}
                                        {/* <AddMailing data={data} id={id+1} /> */}
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
                                        {/* <DeleteIcon onClick={()=>deleteMailingData(data,id)}/> */}
                                        <IoMdClose onClick={() => dispatch(getMailAddressAfterDeletion(id))} size={24} className="text-redColor p-1 bg-redColor/10 rounded-full cursor-pointer absolute top-4 right-4" />
                                        {/* SENDING DATA TO ADDMAILING COMPONENT IF DATA IS SELECTED FORM DROPDOWN */}
                                        {/* <AddMailing data={data} id={id} /> */}
                                        <ShowAllAddMailingAddress data={data} id={id} />


                                    </div>
                                ))}
                            </div>
                        )}
                        {/* DISPLAY ALL SELECTED MAILING ENDS */}

                    </div>
                    {/* ADDING MAILING ENDS
                {isNewFormAdding && <div className="w-full flex justify-end flex-row mt-6" >
                    <div className="w-[21%] " >
                        <Button text="Save Data" onClick={dataSavedFunction} />
                    </div>
                </div>} */}

                </form>
            </div>
        </div>
    </>

}

export default StandardTypeForm