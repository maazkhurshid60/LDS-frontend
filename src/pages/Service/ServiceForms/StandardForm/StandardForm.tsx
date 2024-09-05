import React, { useEffect, useState } from "react";
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
import { addServiceFormThunk, getAllServiceFormThunk, updateServiceFormThunk } from "../../../../redux/slice/serviceForm";
import Hints from "../../../Result/Hints/Hints";
import Button from "../../../../components/Buttons/Button/Button";
import { handleEnterKeyPress } from "../../../../utils/moveToNextFieldOnEnter";
import { toast } from "react-toastify";
export type FormFields = z.infer<typeof standardFormSchema>
const StandardForm = () => {
    const userOptions = [{ value: "ZainCalzoni", label: "Zain Calzoni" }, { value: "cooperCulhane", label: "Cooper Culhane" }]
    const { register, handleSubmit, formState: { errors, isSubmitting }, control, setValue, reset } = useForm<FormFields>({ resolver: zodResolver(standardFormSchema) })
    const { data: standardServiceTypesData } = useGetAllData("/standard-service-type/all-standard-service-types");
    const [checkedName, setCheckedName] = useState<string | null>();
    const allServiceFormData = useSelector((state: RootState) => state.serviceForm.allServiceFormData)
    const serviceFormIndex = useSelector((state: RootState) => state.serviceForm.serviceFormIndex)
    const isNewFormAdding = useSelector((state: RootState) => state.serviceForm.isNewFormAdd)
    const getMailingAddressData = useSelector((state: RootState) => state.mailingAdress.getSelectMail)
    const getFormMailingAdress = useSelector((state: RootState) => state.mailingAdress.serviceFormMailingAdress?.mailingAdresses)
    

    
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
    const handleCheckboxChange = (id: string) => {

        setCheckedName(id);
    };
    const StandardServiceTypeFunction = (data) => {
        const updatedLTDATA={
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
            sSDCourt: data?.sSDCourt, sSDDefendants: data?.sSDDefendants, sSDPlaintiff: data?.sSDPlaintiff, sSDCountry: data?.sSDCountry, oSSTIndexNo:  parseInt(data?.oSSTIndexNo), oSSTDescription: data?.oSSTDescription,
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
            const updatedData = { ...LTDataaaaa,...standardServiceDetail,standardServiceType: checkedName, jobNo: parseInt(LTData?.jobNo), caseNo: parseInt(LTData?.caseNo) }

            // console.log("adding data to add api", updatedData);
            dispatch(addServiceFormThunk(updatedData))

        } else {
            if (LTData === null) {

                const updatedData = { ...LTDataa,...updatedLTDATA, ...standardServiceDetail, serviceFormId: allServiceFormData[serviceFormIndex]?._id, standardServiceType: checkedName }
                dispatch(updateServiceFormThunk(updatedData))
            } else {
                const UpdatedLTData: any = LTData
                const updatedData = { ...UpdatedLTData,...updatedLTDATA, ...standardServiceDetail, serviceFormId: allServiceFormData[serviceFormIndex]?._id, standardServiceType: checkedName }
                console.log("updating data to update api", LTData, updatedData);

                dispatch(updateServiceFormThunk(updatedData))

            }


        }
    }

    // USE EFFECT TO SET VALUES OF INDEX 0 SERVICE FORM DATA FROM API WHICH IS STORED IN SLICE
    useEffect(() => {
        if (!isNewFormAdding) {
            setValue("oSSTIndexNo", JSON.stringify(allServiceFormData[serviceFormIndex]?.oSSTIndexNo)),
                setValue("oSSTDescription", allServiceFormData[serviceFormIndex]?.oSSTDescription),
                setValue("zipServe", allServiceFormData[serviceFormIndex]?.zipServe)
            setValue("aptServe", allServiceFormData[serviceFormIndex]?.aptServe)
            setValue("stateServe", allServiceFormData[serviceFormIndex]?.stateServe)
            setValue("cityServe", allServiceFormData[serviceFormIndex]?.cityServe)
            setValue("addressServe", allServiceFormData[serviceFormIndex]?.addressServe)
            setValue("firstNameServe", allServiceFormData[serviceFormIndex]?.firstNameServe)
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
            if( LTData?.inputDate){
                      setValue("inputDate", LTData?.inputDate);
      
                  }
                  else{
      
                      const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
                      setValue("inputDate", currentDate);
                  }
      
                  setValue("clientId", getSelectedClientoption?.value);
                  setValue("serviceType", getSelectedServiceTypeOption?.value);
                  setValue("caption", LTData?.caption);
                  setValue("caseNo", LTData?.caseNo);


                  
              }
    }, [allServiceFormData, serviceFormIndex, setValue])

    // USE EFFECT TO CLEAR THE INPUT FIELDS ON NEW DATA ENTRY
    useEffect(() => {
        if (isNewFormAdding) {
            reset();
            setCheckedName(null);
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

    // CONVERT 24HR INTO 12 HR
    const time24hr = allServiceFormData[serviceFormIndex]?.createdAt?.split("T")[1]?.split(".")[0];
    const updatedtime24hr = allServiceFormData[serviceFormIndex]?.updatedAt?.split("T")[1]?.split(".")[0];


// Function to convert 24-hour time to 12-hour format
const convertTo12HourFormat = (time24hr: string): string => {
    // Ensure time24hr is defined and is a valid string
    if (!time24hr || typeof time24hr !== 'string') {
        return ''; // or handle the error appropriately
    }

    let [hours, minutes, seconds] = time24hr.split(":");

    // Convert hours from string to number
    let hoursNumber = parseInt(hours);

    // Determine AM or PM
    const ampm = hoursNumber >= 12 ? 'PM' : 'AM';

    // Convert 24-hour time to 12-hour time
    hoursNumber = hoursNumber % 12 || 12; // '0' hours should be '12'

    // Convert hours back to string
    hours = hoursNumber.toString();

    // Return formatted time
    return `${hours}:${minutes}:${seconds} ${ampm}`;
};


const time12hr = convertTo12HourFormat(time24hr);
const updatedtime12hr = convertTo12HourFormat(updatedtime24hr);

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

    return <div className="w-[100%]">
        <div className="w-full">
            <form className="w-full">
                {/* <div className="w-full flex justify-end">
                    <Hints label="To Save / Update Data" keyName="Ctrl + S / ESC" />
                </div> */}
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
                                <CheckBox
                                    onKeyDown={handleEnterKeyPress}
                                    register={register}
                                    name={data?.name}
                                    label={data.name}
                                    checked={checkedName === data._id}
                                    onChange={() => handleCheckboxChange(data._id)}
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
                        <TextField onKeyDown={handleEnterKeyPress} register={register} label="Index Number" error={errors.oSSTIndexNo} name="oSSTIndexNo"  />
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
                            <p>Time: {time12hr}</p>

                        </div>
                        
                        <div className="w-[100%] md:w-[46%] lg:w-[20%] ">
                        <label className="text-sm font-semibold capitalize">Updated At</label>
                        <p>Date: {allServiceFormData[serviceFormIndex]?.updatedAt?.split("T")[0]}</p>
                        <p>Time: {updatedtime12hr}</p>

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
    </div>
}

export default StandardForm