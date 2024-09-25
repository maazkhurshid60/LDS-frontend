import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { standardFormSchema } from "../../../../schemas/service forms/standardFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import CheckBox from "../../../../components/CheckBox/CustomCheckBox"
import TextField from "../../../../components/InputFields/TextField/TextField"
import Dropdown from "../../../../components/dropdown/Dropdown";
import { useGetAllData } from "../../../../hooks/getAllDataHook/useGetAllData";
import { RootState } from "../../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { addServiceFormThunk, getAllServiceFormThunk, getIsSearchServiceForm, updateServiceFormThunk } from "../../../../redux/slice/serviceForm";
import Hints from "../../../Result/Hints/Hints";
import Button from "../../../../components/Buttons/Button/Button";
import { handleEnterKeyPress } from "../../../../utils/moveToNextFieldOnEnter";
import { toast } from "react-toastify";
import SearchResultData from "../ServiceTypeForm/SearchResultData";
import BorderButton from "../../../../components/Buttons/BorderButton/BorderButton";
import { MdAdd } from "react-icons/md";
import CustomCheckBox from "../../../../components/CheckBox/CustomCheckBox";
import FormatedIndexInputField from "../../../../components/InputFields/TextField/FormatedIndexInputField";

export type FormFields = z.infer<typeof standardFormSchema>
const StandardForm = () => {
    const userOptions = [{ value: "ZainCalzoni", label: "Zain Calzoni" }, { value: "cooperCulhane", label: "Cooper Culhane" }]
    const { register, handleSubmit, formState: { errors, isSubmitting }, control, setValue, reset, getValues } = useForm<FormFields>({ resolver: zodResolver(standardFormSchema) })
    const { data: standardServiceTypesData } = useGetAllData("/standard-service-type/all-standard-service-types");
    const [checkedName, setCheckedName] = useState<string | null>();
    const allServiceFormData = useSelector((state: RootState) => state.serviceForm.allServiceFormData)
    const serviceFormIndex = useSelector((state: RootState) => state.serviceForm.serviceFormIndex)
    const isNewFormAdding = useSelector((state: RootState) => state.serviceForm.isNewFormAdd)
    const getMailingAddressData = useSelector((state: RootState) => state.mailingAdress.getSelectMail)
    const getFormMailingAdress = useSelector((state: RootState) => state.mailingAdress.serviceFormMailingAdress?.mailingAdresses)
    const currentYear = new Date().getFullYear().toString().slice(-2);
    const [oSTIndex, setOStIndex] = useState("")


    const userData = useSelector((state: RootState) => state?.userDetail)
    const LTData = useSelector((state: RootState) => state.serviceForm.savedLTFormData)

    const lastServiceFormIndex = allServiceFormData?.length - 1

    const { data: clientData } = useGetAllData("/client/all-clients");
    const { data: serviceTypeData } = useGetAllData("/service-type/all-service-types");
    const clientFilteredOptions = clientData?.filter((data, id) => { return data?.isActive })
    const clientIdOptions = clientFilteredOptions?.map((data, id) => { return { value: data?._id, label: data?.code } })
    const getSelectedClientoption = clientIdOptions?.find((data, index) => data?.value === LTData?.clientId && { value: data?._id, label: data?.fullName })
    const getExistingSelectedClientoption = clientIdOptions?.find((data, index) => data?.value === allServiceFormData[serviceFormIndex]?.clientId?._id && { value: data?._id, label: data?.fullName })
    const serviceTypeOptions = serviceTypeData?.map((data, id) => { return { value: data?._id, label: data?.serviceTypeCode } })
    const getSelectedServiceTypeOption = serviceTypeOptions?.find((data, index) => data?.value === LTData?.serviceType && { value: data?._id, label: data?.fullName })
    const getExistingSelectedServiceTypeoption = serviceTypeOptions?.find((data, index) => data?.value === allServiceFormData[serviceFormIndex]?.serviceType?._id && { value: data?._id, label: data?.fullName })
    const [jobNo, setJobNo] = useState<any>()
    console.log("LTDATA", LTData)
    const dispatch = useDispatch()

    // SEARCH SERVICE FORM STARTS
    const allSeacrhServiceFormData = useSelector((state: RootState) => state.serviceForm.allSearchServiceFormData)
    const isSearchServiceForm = useSelector((state: RootState) => state.serviceForm.isSearchServiceForm)
    const selectedSearchServiceFormData = useSelector((state: RootState) => state.serviceForm.selectedSearchServicetData)
    const getSearchExistingSelectedClientoption = clientIdOptions?.find((data, index) => data?.value === selectedSearchServiceFormData[0]?.clientId?._id && { value: data?._id, label: data?.fullName })
    const getSearchExistingSelectedServiceType = serviceTypeOptions?.find((data, index) => data?.value === selectedSearchServiceFormData[0]?.serviceType?._id && { value: data?._id, label: data?.fullName })
    console.log("selectedSearchServiceFormData", selectedSearchServiceFormData, jobNo)
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'F4') {
                event.preventDefault();
                // handleSubmit(searchResultFormFunction)();
                dispatch(getIsSearchServiceForm(true))

            }
        }
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [])
    // SEARCH SERVICE FORM ENDS


    const handleCheckboxChange = (id: string) => {

        setCheckedName(id);
    };
    const StandardServiceTypeFunction = (data) => {
        const updatedLTDATA = {
            jobNo: parseInt(jobNo),
            inputDate: data?.inputDate,
            clientId: data?.clientId,
            serviceType: data?.serviceType,
            caseNo: parseInt(data?.caseNo),
            caption: data?.caption,
        }
        console.log("standardServiceType:checkedName", updatedLTDATA)
        if (checkedName === null) return setCheckedName("empty")
        const serviceFormData: any = allServiceFormData[0];
        const standardServiceDetail = {
            sSDCourt: data?.sSDCourt, sSDDefendants: data?.sSDDefendants, sSDPlaintiff: data?.sSDPlaintiff, sSDCountry: data?.sSDCountry, oSSTIndexNo: oSTIndex + "/" + currentYear, oSSTDescription: data?.oSSTDescription,
            firstNameServe: data?.firstNameServe, addressServe: data?.addressServe, cityServe: data?.cityServe, stateServe: data?.stateServe, aptServe: data?.aptServe, zipServe: data?.zipServe
        }
        // const finalData = { ...serviceFormData, standardServiceDetail };

        const LTDataa = {
            jobNo: allServiceFormData[serviceFormIndex]?.jobNo,
            inputDate: allServiceFormData[serviceFormIndex]?.inputDate,
            clientId: allServiceFormData[serviceFormIndex]?.clientId?._id,
            serviceType: allServiceFormData[serviceFormIndex]?.serviceType?._id,
            caseNo: allServiceFormData[serviceFormIndex]?.caseNo,
            caption: allServiceFormData[serviceFormIndex]?.caption,
            lTServiceType: allServiceFormData[serviceFormIndex]?.lTServiceType,
            noOfAddLMailings: isNewFormAdding ? getMailingAddressData?.length : allServiceFormData[serviceFormIndex]?.noOfAddLMailings,
            mailingAddresses: isNewFormAdding ? getMailingAddressData : allServiceFormData[serviceFormIndex]?.mailingAddresses,
            lTSFirstName: data?.lTSFirstName,
            lTSBusinessName: data?.lTSBusinessName,
            lTSAddress: data?.lTSAddress,
            lTSApt: data?.lTSApt,
            lTSCity: data?.lTSCity,
            lTSState: data?.lTSState,
            lTSZip: data?.lTSZip,
            lTSDescription: data?.lTSDescription,
            oLTIndexNo: data?.oLTIndexNo,
            oLTDescription: data?.oLTDescription
        }
        if (isNewFormAdding === true) {
            const LTDataaaaa: any = LTData
            // const updatedData = { ...LTDataaaaa,...standardServiceDetail, serviceFormId: allServiceFormData[serviceFormIndex]?._id,standardServiceType: checkedName, jobNo: parseInt(LTData?.jobNo), caseNo: parseInt(LTData?.caseNo) }
            const updatedData = { ...LTDataaaaa, ...standardServiceDetail, standardServiceType: checkedName, jobNo: parseInt(LTData?.jobNo), caseNo: parseInt(LTData?.caseNo) }

            // console.log("adding data to add api", updatedData);
            dispatch(addServiceFormThunk(updatedData))

        } else if (!isNewFormAdding && selectedSearchServiceFormData?.length > 0) {
            // const sendDataToUpdateApi = {
            //     ...updatedData, // Spreads all data from the object
            //     serviceFormId: selectedSearchServiceFormData[0]?._id // Adds serviceFormId field
            // };

            // console.log("sendDataToAddApi", sendDataToUpdateApi)
            if (LTData === null) {

                const updatedData = { ...LTDataa, ...updatedLTDATA, ...standardServiceDetail, serviceFormId: selectedSearchServiceFormData[0]?._id, standardServiceType: checkedName }
                // dispatch(updateServiceFormThunk(updatedData))
                // window.location.reload();

                dispatch(updateServiceFormThunk(updatedData))



            } else {
                const UpdatedLTData: any = LTData
                const updatedData = { ...UpdatedLTData, ...updatedLTDATA, ...standardServiceDetail, serviceFormId: selectedSearchServiceFormData[0]?._id, standardServiceType: checkedName }
                console.log("updating data to update api", LTData, updatedData);

                dispatch(updateServiceFormThunk(updatedData))

            }
            // dispatch(updateServiceFormThunk(sendDataToUpdateApi))

            // toast.success("called")
        } else {
            if (LTData === null) {

                const updatedData = { ...LTDataa, ...updatedLTDATA, ...standardServiceDetail, serviceFormId: allServiceFormData[serviceFormIndex]?._id, standardServiceType: checkedName }
                dispatch(updateServiceFormThunk(updatedData))
            } else {
                const UpdatedLTData: any = LTData
                const updatedData = { ...UpdatedLTData, ...updatedLTDATA, ...standardServiceDetail, serviceFormId: allServiceFormData[serviceFormIndex]?._id, standardServiceType: checkedName }
                console.log("updating data to update api", LTData, updatedData);

                dispatch(updateServiceFormThunk(updatedData))

            }


        }
    }
    // USE EFFECT TO SET VALUES OF INDEX 0 SERVICE FORM DATA FROM API WHICH IS STORED IN SLICE
    useEffect(() => {
        if (selectedSearchServiceFormData?.length > 0) {
            // setValue(
            //     "oSSTIndexNo",
            //     selectedSearchServiceFormData[0]?.oSSTIndexNo
            //         ? JSON.stringify(selectedSearchServiceFormData[0].oSSTIndexNo)
            //         : ""
            // )
            // setValue(
            //     "oSSTIndexNo",
            //     selectedSearchServiceFormData[0]?.oSSTIndexNo
            //         ? selectedSearchServiceFormData[0].oSSTIndexNo
            //         : ""
            // )
            if (selectedSearchServiceFormData[0]?.oSSTIndexNo === null) setOStIndex("");
            else setOStIndex(selectedSearchServiceFormData[0].oSSTIndexNo)
                ,
                setValue("oSSTDescription", selectedSearchServiceFormData[0]?.oSSTDescription),

                //     setValue("zipServe", selectedSearchServiceFormData[0]?.zipServe)
                // setValue("aptServe", selectedSearchServiceFormData[0]?.aptServe)
                // setValue("stateServe", selectedSearchServiceFormData[0]?.stateServe)
                // setValue("cityServe", selectedSearchServiceFormData[0]?.cityServe)
                // setValue("addressServe", selectedSearchServiceFormData[0]?.addressServe)
                // setValue("firstNameServe", selectedSearchServiceFormData[0]?.firstNameServe)
                setValue("sSDCountry", selectedSearchServiceFormData[0]?.sSDCountry)
            setValue("sSDPlaintiff", selectedSearchServiceFormData[0]?.sSDPlaintiff)
            setValue("sSDDefendants", selectedSearchServiceFormData[0]?.sSDDefendants)
            setValue("sSDCourt", selectedSearchServiceFormData[0]?.sSDCourt)
            setCheckedName(selectedSearchServiceFormData[0]?.standardServiceType?._id)
            setJobNo(selectedSearchServiceFormData[0]?.jobNo)
            setValue("inputDate", selectedSearchServiceFormData[0]?.inputDate)
            setValue("caption", selectedSearchServiceFormData[0]?.caption)
            setValue("clientId", getSearchExistingSelectedClientoption?.value);
            setValue("serviceType", getSearchExistingSelectedServiceType?.value);
            // setValue("caseNo", selectedSearchServiceFormData[0]?.caseNo) 
            setValue("caseNo", JSON.stringify(selectedSearchServiceFormData[0]?.caseNo));
        }
        else if (!isNewFormAdding) {
            // setValue(
            //     "oSSTIndexNo",
            //     allServiceFormData[serviceFormIndex]?.oSSTIndexNo
            //         ? JSON.stringify(allServiceFormData[serviceFormIndex].oSSTIndexNo)
            //         : ""
            // )
            // setValue(
            //     "oSSTIndexNo",
            //     allServiceFormData[serviceFormIndex]?.oSSTIndexNo
            //         ? allServiceFormData[serviceFormIndex].oSSTIndexNo
            //         : ""
            // )
            if (allServiceFormData[serviceFormIndex]?.oSSTIndexNo === null) setOStIndex("");
            else setOStIndex(allServiceFormData[serviceFormIndex].oSSTIndexNo)

            setValue("oSSTDescription", allServiceFormData[serviceFormIndex]?.oSSTDescription),
                //     setValue("zipServe", allServiceFormData[serviceFormIndex]?.zipServe)
                // setValue("aptServe", allServiceFormData[serviceFormIndex]?.aptServe)
                // setValue("stateServe", allServiceFormData[serviceFormIndex]?.stateServe)
                // setValue("cityServe", allServiceFormData[serviceFormIndex]?.cityServe)
                // setValue("addressServe", allServiceFormData[serviceFormIndex]?.addressServe)
                // setValue("firstNameServe", allServiceFormData[serviceFormIndex]?.firstNameServe)
                setValue("sSDCountry", allServiceFormData[serviceFormIndex]?.sSDCountry)
            setValue("sSDPlaintiff", allServiceFormData[serviceFormIndex]?.sSDPlaintiff)
            setValue("sSDDefendants", allServiceFormData[serviceFormIndex]?.sSDDefendants)
            setValue("sSDCourt", allServiceFormData[serviceFormIndex]?.sSDCourt)
            setCheckedName(allServiceFormData[serviceFormIndex]?.standardServiceType?._id)
            setJobNo(allServiceFormData[serviceFormIndex]?.jobNo)
            setValue("inputDate", allServiceFormData[serviceFormIndex]?.inputDate)
            setValue("caption", allServiceFormData[serviceFormIndex]?.caption)
            setValue("clientId", getExistingSelectedClientoption?.value);
            setValue("serviceType", getExistingSelectedServiceTypeoption?.value);
            // setValue("caseNo", allServiceFormData[serviceFormIndex]?.caseNo) 
            setValue("caseNo", JSON.stringify(allServiceFormData[serviceFormIndex]?.caseNo));
        }
        else {
            if (LTData?.inputDate) {
                setValue("inputDate", LTData?.inputDate);

            }
            else {

                const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
                setValue("inputDate", currentDate);
            }

            setValue("clientId", getSelectedClientoption?.value);
            setValue("serviceType", getSelectedServiceTypeOption?.value);
            setValue("caption", LTData?.caption);
            setValue("caseNo", LTData?.caseNo);



        }
    }, [allServiceFormData, serviceFormIndex, setValue, isSearchServiceForm])

    // USE EFFECT TO CLEAR THE INPUT FIELDS ON NEW DATA ENTRY
    useEffect(() => {
        if (isNewFormAdding) {
            reset();
            setCheckedName(null);
            setOStIndex("")
        }
    }, [isNewFormAdding, reset]);
    // USE EFFECT TO GET ALL SERVICE FORM DATA FROM API WHICH IS STORED IN SLICE
    useEffect(() => {
        dispatch(getAllServiceFormThunk())
        // setValue("jobNo",allServiceFormData[0]?.jobNo)
    }, [])

    // THIS USEEFECT WILL BE CALLED WHEN CTRL+S IS PRESSED TO SAVE DATA INSIDE SLICE
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.ctrlKey && event.key === 's' || event.key === 'Escape' || event.key === 'F10') {
                event.preventDefault();
                handleSubmit(StandardServiceTypeFunction)();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleSubmit, StandardServiceTypeFunction]);



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

    console.log('Created At (Local 12-Hour):', createdAtLocal12hr);
    console.log('Updated At (Local 12-Hour):', updatedAtLocal12hr);




    // USE EFFECT TO CLEAR THE INPUT FIELDS ON NEW DATA ENTRY
    useEffect(() => {
        reset()
        setCheckedName(null)
        const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
        setValue("inputDate", currentDate);
        if (allServiceFormData[lastServiceFormIndex]?.jobNo && parseInt(allServiceFormData[lastServiceFormIndex]?.jobNo) >= 1 && isNewFormAdding) {
            setJobNo(parseInt(allServiceFormData[lastServiceFormIndex]?.jobNo) + 1);
        } else if (LTData?.jobNo !== undefined) {
            setJobNo(LTData.jobNo);
        }
        else {
            if (allServiceFormData?.length > 0) {
                setJobNo(parseInt(allServiceFormData[0]?.jobNo))
            } else {
                setJobNo(1)
            }


        }
    }, [isNewFormAdding])
    // ADD DUPLICATE SERVICE FORM
    // const addDuplicateServiceForm = () => {
    //     const sendDataToAddApi = {


    //         lTServiceType: selectedSearchServiceFormData[0]?.lTServiceType,
    //         oLTIndexNo: selectedSearchServiceFormData[0]?.oLTIndexNo,
    //         lTSFirstName: selectedSearchServiceFormData[0]?.lTSFirstName,
    //         lTSBusinessName: selectedSearchServiceFormData[0]?.lTSBusinessName,
    //         lTSZip: selectedSearchServiceFormData[0]?.lTSZip,
    //         lTSState: selectedSearchServiceFormData[0]?.lTSState,
    //         lTSCity: selectedSearchServiceFormData[0]?.lTSCity,
    //         lTSApt: selectedSearchServiceFormData[0]?.lTSApt,
    //         lTSDescription: selectedSearchServiceFormData[0]?.lTSDescription,
    //         noOfAddLMailings: selectedSearchServiceFormData[0]?.noOfAddLMailings,
    //         mailingAddresses: selectedSearchServiceFormData[0]?.mailingAddresses,
    //         lTSAddress: selectedSearchServiceFormData[0]?.lTSAddress,
    //         standardServiceType: selectedSearchServiceFormData[0]?.standardServiceType,
    //     }
    //     console.log("sendDataToAddApi", sendDataToAddApi)
    //     // toast.success("called")
    //     dispatch(addServiceFormThunk(sendDataToAddApi))
    // }

    const addDuplicateServiceForm = (event) => {
        event.preventDefault();
        const { caption, caseNo,
            clientId,
            inputDate,
            oSSTDescription,
            oSSTIndexNo,

            standardServiceType,

            sSDCourt,
            sSDDefendants,
            sSDPlaintiff,

        } = getValues();
        // caseNo: parseInt(caseNo),

        const sendDataToAddApi = {
            jobNo: allServiceFormData[allServiceFormData?.length - 1]?.jobNo + 1,
            caption,
            caseNo: parseInt(caseNo ?? '0'),
            clientId,
            inputDate,
            oSSTDescription,
            oSSTIndexNo: oSTIndex + "/" + currentYear,
            sSDCourt,
            sSDDefendants,
            sSDPlaintiff,
            mailingAddresses: selectedSearchServiceFormData[0]?.mailingAddresses,
            lTServiceType: selectedSearchServiceFormData[0]?.lTServiceType,
            oLTIndexNo: selectedSearchServiceFormData[0]?.oLTIndexNo,
            lTSFirstName: selectedSearchServiceFormData[0]?.lTSFirstName,
            lTSBusinessName: selectedSearchServiceFormData[0]?.lTSBusinessName,
            lTSZip: selectedSearchServiceFormData[0]?.lTSZip,
            lTSState: selectedSearchServiceFormData[0]?.lTSState,
            lTSCity: selectedSearchServiceFormData[0]?.lTSCity,
            lTSApt: selectedSearchServiceFormData[0]?.lTSApt,
            lTSDescription: selectedSearchServiceFormData[0]?.lTSDescription,
            noOfAddLMailings: selectedSearchServiceFormData[0]?.noOfAddLMailings,
            lTSAddress: selectedSearchServiceFormData[0]?.lTSAddress,
            standardServiceType: selectedSearchServiceFormData[0]?.standardServiceType,

        }
        // toast.success(`${caption}`)
        // console.log("sendDataToAddApi", sendDataToAddApi)
        dispatch(addServiceFormThunk(sendDataToAddApi))
    }


    // NAVIGATION
    const caseNoRefs = useRef<HTMLInputElement>(null);
    const checkboxRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [allIndex, setAllIndex] = useState()
    useEffect(() => { setAllIndex(standardServiceTypesData?.length + 2) }, [standardServiceTypesData])

    const handleEnterKeyPressCheckboxFocus = (event: React.KeyboardEvent) => {

        if (event.key === 'Enter' || event.key === 'Tab') {
            event.preventDefault(); // Prevent default form submission
            const currentFocusedElement = document.activeElement;
            const currentCheckboxIndex = checkboxRefs?.current?.findIndex(ref => ref === currentFocusedElement);
            if (currentCheckboxIndex >= 0) {
                const currentCheckbox = checkboxRefs?.current[currentCheckboxIndex] as HTMLInputElement;

                // Check if the current checkbox is checked
                if (currentCheckbox?.checked) {
                    // If checked, move to the next input based on selected service type

                    // if (selectedServiceType === "residential") {
                    handleEnterKeyPress(event, "checkbox", allIndex)// Move to the Index Number input

                    // } else {
                    //     bussinessnameRef.current?.focus(); // Move to the Discretion input
                    // }
                } else {
                    // If not checked, focus the next checkbox
                    const nextCheckbox = checkboxRefs.current[currentCheckboxIndex + 1];
                    if (nextCheckbox) {
                        nextCheckbox.focus();
                    } else {
                        // If no more checkboxes, focus on the first checkbox or another input as needed
                        checkboxRefs.current[0]?.focus(); // Fallback to first checkbox
                    }
                }
            } else {
                // If focused on caption or any other input, focus the first checkbox
                if (currentFocusedElement === caseNoRefs?.current) {
                    checkboxRefs.current[0]?.focus();
                } else {
                    checkboxRefs.current[0]?.focus();
                }
            }
        }
    };
    useEffect(() => {
        // Focus the TextField when the component mounts
        if (caseNoRefs.current) {
            caseNoRefs.current.focus();
        }
    }, []);
    return <>
        {isSearchServiceForm ? <SearchResultData /> :
            <div className="w-[100%]">
                <div className="w-full">
                    <form className="w-full">
                        {/* <div className="w-full flex justify-end">
                <Hints label="To Save / Update Data" keyName="Ctrl + S / ESC" />
            </div> */}
                        <div className="flex items-center justify-between flex-row-reverse	">
                            <div className="flex items-center gap-x-2">

                                {selectedSearchServiceFormData?.length > 0 && <BorderButton buttonText="Duplicate Form" icon={<MdAdd />} isIcon onClick={addDuplicateServiceForm} />
                                }
                                <Hints keyName="Esc" label="Cancel" />
                                <Hints keyName="f4 " label="Find" />
                                <Hints keyName="f10 / Ctrl + S " label="Save" />                            </div>
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
                                <TextField onKeyDown={handleEnterKeyPress} ref={caseNoRefs} register={register} label="case No" error={errors.caseNo} name="caseNo" required />
                            </div>
                            {/* <div className="w-[100%] md:w-[46%] lg:w-[30%]">
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
                </div> */}
                        </div>
                        {/* STANDARD SERVICE TYPE STARTS */}
                        <div className="w-full mt-6" >
                            <div className="flex items-center gap-x-2  mb-4">
                                <h1 className="font-semibold   mb-4 text-base
            md:text-md
            lg:text-xl">Standard Service Type <span className="text-xs font-normal capitalize">(Select only one)</span> <span className="text-redColor text-sm">*</span></h1>                    {checkedName === "empty" && <p className="text-redColor text-sm">required</p>}
                            </div>


                            <div className="flex items-start w-full flex-wrap gap-x-8 gap-y-4 justify-start ">
                                {standardServiceTypesData?.map((data, index) => {
                                    return <div className="w-[100%] md:w-[46%] lg:w-[30%]" key={index}>
                                        {/* <CheckBox
                                            onKeyDown={handleEnterKeyPress}
                                            register={register}
                                            name={data?.name}
                                            label={data?.name?.replace(/[^a-zA-Z0-9]/g, " ")}
                                            checked={checkedName === data?._id}
                                            onChange={() => handleCheckboxChange(data?._id)}
                                        /> */}
                                        <CustomCheckBox
                                            onKeyDown={handleEnterKeyPressCheckboxFocus}
                                            ref={el => (checkboxRefs.current[index] = el)} // Store the checkbox refs
                                            register={register}
                                            name={data?.name?.replace(/[^a-zA-Z0-9]/g, "")}
                                            label={data?.name}
                                            checked={checkedName === data?._id}
                                            onChange={() => handleCheckboxChange(data?._id)}
                                        />
                                    </div>
                                })}

                            </div>

                        </div>
                        {/* STANDARD SERVICE TYPE ENDS */}
                        {/* OTHER STANDARD SERVICE TYPE STARTS */}
                        <div className="flex items-start w-full flex-wrap gap-x-8 gap-y-4 mt-6" >
                            <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                                <TextField onKeyDown={handleEnterKeyPress} register={register} label="Other Standard Description" error={errors.oSSTDescription} name="oSSTDescription" />
                            </div>
                            <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                                {/* <TextField onKeyDown={handleEnterKeyPress} register={register} label="Index Number" error={errors.oSSTIndexNo} name="oSSTIndexNo" /> */}
                                <FormatedIndexInputField
                                    onKeyDown={handleEnterKeyPress} register={register} label="Index Number" error={errors.oSSTIndexNo} name="oLTIndexNo" oltIndexValue={oSTIndex}
                                    onChange={setOStIndex} year={currentYear}
                                />
                            </div>
                        </div>
                        {/* OTHER STANDARD SERVICE TYPE ENDS */}
                        {/* STANDARD SERVICE DETAIL STARTS */}
                        <div className="mt-6"><h1 className="font-semibold text-xl mb-4 ">Standard Service Detail</h1>
                            <div className="flex items-start w-full flex-wrap gap-x-8 gap-y-4 justify-start">
                                <div className="w-[100%] md:w-[46%] lg:w-[30%] ">
                                    <TextField onKeyDown={handleEnterKeyPress} register={register} error={errors.sSDCourt} name="sSDCourt" label="Court" />
                                </div>
                                <div className="w-[100%] md:w-[46%] lg:w-[30%] ">
                                    <TextField onKeyDown={handleEnterKeyPress} register={register} error={errors.sSDDefendants} name="sSDDefendants" label="Defendants" />
                                </div>
                                <div className="w-[100%] md:w-[46%] lg:w-[30%] ">
                                    <TextField onKeyDown={handleEnterKeyPress} register={register} error={errors.sSDPlaintiff} name="sSDPlaintiff" label="Plaintiff" />
                                </div>
                                {/* <div className="w-[100%] md:w-[46%] lg:w-[30%] ">
                        <TextField onKeyDown={handleEnterKeyPress} register={register} error={errors.sSDCountry} name="ssDCountry" label="Country" />
                    </div> */}
                            </div>
                        </div>
                        {/* STANDARD SERVICE DETAIL ENDS */}
                        {/* SERVE TO STARTS */}
                        {/*<div className="mt-6"><h1 className="font-semibold text-xl mb-4 ">Serve To</h1>
                <div className="flex items-start w-full flex-wrap gap-x-8 gap-y-4 justify-start">
                    <div className="w-[100%] md:w-[46%] lg:w-[30%] ">
                        <TextField onKeyDown={handleEnterKeyPress} register={register} error={errors.firstNameServe} name="firstNameServe" label="first name" required />
                    </div>
                    <div className="w-[100%] md:w-[46%] lg:w-[30%] ">
                        <TextField onKeyDown={handleEnterKeyPress} register={register} error={errors.addressServe} name="addressServe" label="address" required />
                    </div>
                    <div className="w-[100%] md:w-[46%] lg:w-[30%] ">
                        <TextField onKeyDown={handleEnterKeyPress} register={register} error={errors.cityServe} name="cityServe" label="city" />
                    </div>
                    <div className="w-[100%] md:w-[46%] lg:w-[30%] ">
                        <TextField onKeyDown={handleEnterKeyPress} register={register} error={errors.stateServe} name="stateServe" label="state" />
                    </div>
                    <div className="w-[100%] md:w-[46%] lg:w-[30%] ">
                        <TextField onKeyDown={handleEnterKeyPress} register={register} error={errors.aptServe} name="aptServe" label="Apt#/Desc" />
                    </div>
                    <div className="w-[100%] md:w-[46%] lg:w-[30%] ">
                        <TextField onKeyDown={handleEnterKeyPress} register={register} error={errors.zipServe} name="zipServe" label="zip" />
                    </div>
                </div>
            </div>*/}
                        {/*SERVE TO ENDS */}
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
                        {/* ADDING MAILING ENDS */}
                        <div className="w-full flex justify-end flex-row mt-6" >
                            <div className="w-[21%] " >

                                <Button text={`${isNewFormAdding ? "add Data" : "Update Data"}`} onClick={handleSubmit(StandardServiceTypeFunction)}
                                    disabled={isSubmitting}

                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>}
    </>

}

export default StandardForm