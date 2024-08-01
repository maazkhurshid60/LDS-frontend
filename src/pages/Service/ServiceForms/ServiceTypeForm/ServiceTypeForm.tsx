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
import { addMailAddressIntoFormL, getAllMailingAddressThunk,isAddingMailAddressReducer, getFormMailAddress, getFormMailAddressAfterDeletion, getMailAddress, getMailAddressAfterDeletion, isUpdaitngMailAddressReducer } from "../../../../redux/slice/mailingAdresses";
import { IoMdClose } from "react-icons/io";
import { LTFormSchema } from "../../../../schemas/service forms/L&TFormSchema";
import { useGetAllData } from "../../../../hooks/getAllDataHook/useGetAllData";
import Button from "../../../../components/Buttons/Button/Button";
import { getAllServiceFormThunk, isDataSaveReducer, savedLTFormDataReducer } from "../../../../redux/slice/serviceForm";
import Hints from "../../../Result/Hints/Hints";
import ShowAllAddMailingAddress from "./ShowAllMailingAddress";
export type FormFields = z.infer<typeof LTFormSchema>
const StandardTypeForm = () => {
    const mailingAddressData = useSelector((state: RootState) => state.mailingAdress.mailingAddressData)
    const isNewFormAdding = useSelector((state: RootState) => state.serviceForm.isNewFormAdd)
    const getMailingAddressData = useSelector((state: RootState) => state.mailingAdress.getSelectMail)
    const savedLTData= useSelector((state: RootState) => state.serviceForm.savedLTFormData)
    console.log("saved lt data",savedLTData)
    // GET ALL MAILING ADDRESSES THAT COMMING INSIDE THE FORMS 
    const getFormMailingAdress = useSelector((state: RootState) => state.mailingAdress.serviceFormMailingAdress?.mailingAdresses)
    const allServiceFormData = useSelector((state: RootState) => state.serviceForm.allServiceFormData)
    const serviceFormIndex = useSelector((state: RootState) => state.serviceForm.serviceFormIndex)
    const { data: clientData } = useGetAllData("/client/all-clients");
    const { data: serviceTypeData } = useGetAllData("/service-type/all-service-types");
    const { data: LTServiceData } = useGetAllData("/ltservice-type/all-lt-service-types");
    // console.log(LTServiceData)
    const clientFilteredOptions = clientData?.filter((data, id) => { return data?.isActive })
    const clientIdOptions = clientFilteredOptions?.map((data, id) => { return { value: data?._id, label: data?.fullName } })
    console.log("clientIdOptions",clientIdOptions)
    const getSelectedClientoption = clientIdOptions?.find((data, index) => data?.value === allServiceFormData[serviceFormIndex]?.clientId?._id && { value: data?._id, label: data?.fullName })
    const serviceTypeOptions = serviceTypeData?.map((data, id) => { return { value: data?._id, label: data?.serviceTypeCode } })
    const getSelectedServiceTypeOption = serviceTypeOptions?.find((data, index) => data?.value === allServiceFormData[serviceFormIndex]?.serviceType?._id && { value: data?._id, label: data?.fullName })
    console.log(getSelectedClientoption)

    const dispatch = useDispatch()
    const { register, formState: { errors }, control, handleSubmit, setValue, reset } = useForm<FormFields>({ resolver: zodResolver(LTFormSchema) })
    const isAddMail=useSelector((state:RootState)=>state.mailingAdress.isAddingMailAddress)
    const isUpdateMail = useSelector((state: RootState) => state.mailingAdress.isUpdatingMailAddress)

    // const [isAddMail, dispatch(isAddingMailAddressReducer] = us)eState(false)
    // console.log(serviceFormIndex)
    const [checkedName, setCheckedName] = useState<string | null>(
        // LTServiceData?.find((data) => data?.isActive)?._id || null
    );

    const handleCheckboxChange = (id: string) => {
        setCheckedName(id);
    };

    

    // GET SELECTED VALUES FROM ADD MAILING DROPSOWN
    const GetSelectedMailingFunction = (optionValue:string) => {
        isNewFormAdding ? dispatch(getMailAddress(optionValue))  : dispatch(addMailAddressIntoFormL(optionValue))
    }
    // USE EFFECT TO GET ALL SERVICE FORM DATA FROM API WHICH IS STORED IN SLICE
    useEffect(() => {
        if (isNewFormAdding) {
            reset();
            setCheckedName(null);
        }
    }, [isNewFormAdding, reset]);

    // USE EFFECT TO GET ALL SERVICE FORM DATA FROM API WHICH IS STORED IN SLICE
    useEffect(() => {
        dispatch(getAllServiceFormThunk())
    }, [])
    // USE EFFECT TO SET VALUES OF INDEX 0 SERVICE FORM DATA FROM API WHICH IS STORED IN SLICE
    useEffect(() => {
        if (!isNewFormAdding) {
            setValue("clientId", getSelectedClientoption?.value);
            setValue("serviceType", getSelectedServiceTypeOption?.value);
            setValue("jobNo", JSON.stringify(allServiceFormData[serviceFormIndex]?.jobNo));
            setValue("inputDate", convertDateFormat(allServiceFormData[serviceFormIndex]?.inputDate));
            setValue("caseNo", JSON.stringify(allServiceFormData[serviceFormIndex]?.caseNo));
            setValue("caption", allServiceFormData[serviceFormIndex]?.caption);
            setValue("fullName", allServiceFormData[serviceFormIndex]?.lTServiceDetail?.fullName);
            setValue("businessName", allServiceFormData[serviceFormIndex]?.lTServiceDetail?.businessName);
            setValue("address", allServiceFormData[serviceFormIndex]?.lTServiceDetail?.address);
            setValue("apt", allServiceFormData[serviceFormIndex]?.lTServiceDetail?.apt);
            setValue("city", allServiceFormData[serviceFormIndex]?.lTServiceDetail?.city);
            setValue("state", allServiceFormData[serviceFormIndex]?.lTServiceDetail?.state);
            setValue("zip", allServiceFormData[serviceFormIndex]?.lTServiceDetail?.zip);
            setValue("description", allServiceFormData[serviceFormIndex]?.lTServiceDetail?.description);
            setCheckedName(allServiceFormData[serviceFormIndex]?.lTServiceType?._id);
        }else{
            setValue("clientId", getSelectedClientoption?.value);
            setValue("serviceType", getSelectedServiceTypeOption?.value);
            setValue("jobNo", JSON.stringify(savedLTData?.jobNo));
            setValue("inputDate", convertDateFormat(savedLTData?.inputDate));
            setValue("caseNo", JSON.stringify(savedLTData?.caseNo));
            setValue("caption", savedLTData?.caption);
            setValue("fullName", savedLTData?.lTServiceDetail?.fullName);
            setValue("businessName", savedLTData?.lTServiceDetail?.businessName);
            setValue("address", savedLTData?.lTServiceDetail?.address);
            setValue("apt", savedLTData?.lTServiceDetail?.apt);
            setValue("city", savedLTData?.lTServiceDetail?.city);
            setValue("state", savedLTData?.lTServiceDetail?.state);
            setValue("zip", savedLTData?.lTServiceDetail?.zip);
            setValue("description", savedLTData?.lTServiceDetail?.description);
            setCheckedName(savedLTData?.lTServiceType?._id); 
        }
  const data = allServiceFormData[serviceFormIndex]?.mailingAddresses
        const id = allServiceFormData[serviceFormIndex]?._id
        console.log(data, id)
        dispatch(getFormMailAddress({ data, id }))
        const lTServiceDetail = {
            fullName: allServiceFormData[serviceFormIndex]?.lTServiceDetail?.fullName,
            businessName: allServiceFormData[serviceFormIndex]?.lTServiceDetail?.businessName,
            address:allServiceFormData[serviceFormIndex]?.lTServiceDetail?.address,
            apt: allServiceFormData[serviceFormIndex]?.lTServiceDetail?.apt,
            city: allServiceFormData[serviceFormIndex]?.lTServiceDetail?.city,
            state: allServiceFormData[serviceFormIndex]?.lTServiceDetail?.state,
            zip: allServiceFormData[serviceFormIndex]?.lTServiceDetail?.zip,
            description: allServiceFormData[serviceFormIndex]?.lTServiceDetail?.description
        }
        const LTData = {
            jobNo: allServiceFormData[serviceFormIndex]?.jobNo,
            inputDate: allServiceFormData[serviceFormIndex]?.inputDate,
            clientId: allServiceFormData[serviceFormIndex]?.clientId?._id,
            serviceType: allServiceFormData[serviceFormIndex]?.serviceType?._id,
            caseNo: allServiceFormData[serviceFormIndex]?.caseNo,
            caption: allServiceFormData[serviceFormIndex]?.caption,
            lTServiceType: checkedName,
            noOfAddLMailings:isNewFormAdding? getMailingAddressData?.length : getFormMailingAdress?.length,
            mailingAddresses:isNewFormAdding? getMailingAddressData : getFormMailingAdress,
            lTServiceDetail
        }
        dispatch(savedLTFormDataReducer(LTData))
    }, [allServiceFormData, serviceFormIndex, setValue,isNewFormAdding])
    
    // USE EFFECT TO GET ALL MAILING ADDRESS FROM API WHICH IS STORED IN SLICE
    useEffect(() => {
        dispatch(getAllMailingAddressThunk())
    }, [])
    // USE EFFECT TO CLEAR THE INPUT FIELDS ON NEW DATA ENTRY
    useEffect(() => {
        reset()
        setCheckedName(null)
    }, [isNewFormAdding])
    // THIS WILL SEND DATA OF MAILING ADDRESS INSIDE EXISTING FORM TO getFormMailAddress
    useEffect(() => {
        const data = allServiceFormData[serviceFormIndex]?.mailingAddresses
        const id = allServiceFormData[serviceFormIndex]?._id
        console.log(data, id)
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
        const lTServiceDetail = {
            fullName: data?.fullName,
            businessName: data?.businessName,
            address: data?.address,
            apt: data?.apt,
            city: data?.city,
            state: data?.state,
            zip: data?.zip,
            description: data?.description
        }
        const LTData = {
            jobNo: data?.jobNo,
            inputDate: data?.inputDate,
            clientId: data?.clientId,
            serviceType: data?.serviceType,
            caseNo: data?.caseNo,
            caption: data?.caption,
            lTServiceType: checkedName,
            noOfAddLMailings:isNewFormAdding? getMailingAddressData?.length : getFormMailingAdress?.length,
            mailingAddresses:isNewFormAdding? getMailingAddressData : getFormMailingAdress,
            lTServiceDetail
        }
        // const selectedLTDataService=LTServiceData?.find((data,id)=>data?._id === checkedName)
        // console.log("LT DATA SUBMIT",LTData)
        dispatch(savedLTFormDataReducer(LTData))
    }
    // THIS USEEFECT WILL BE CALLED WHEN CTRL+S IS PRESSED TO SAVE DATA INSIDE SLICE
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.ctrlKey && event.key === 's') {
                event.preventDefault();
                handleSubmit(StandardTypeFormSubmitFunciton)();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleSubmit, StandardTypeFormSubmitFunciton]);
    
    return <div className="w-[100%]">
        <div className="w-full">
            <form onSubmit={handleSubmit(StandardTypeFormSubmitFunciton)}>
                <Hints label="To Save L&T Data" keyName="Ctrl + S" />
                {/* {isNewFormAdding && <div className="w-full flex justify-end flex-row mt-2">
                    <div className="w-[21%] " >
                        <Button text="Save Data" onClick={dataSavedFunction} />
                    </div>
                </div>} */}
                <div className="flex items-start w-full flex-wrap gap-x-8 gap-y-4 mt-2 justify-between">
                    <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                        <TextField register={register} label="Job no" error={errors.jobNo} name="jobNo" />
                    </div>
                    <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                        <TextField register={register} label="Input date" error={errors.inputDate} name="inputDate" type="date" />
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
                            />
                        )} />
                    </div>
                    <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                        <TextField register={register} label="case No" error={errors.caseNo} name="caseNo" />
                    </div>
                    <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                        <TextField register={register} label="caption" error={errors.caption} name="caption" />
                    </div>
                </div>
                {/* L&T SERVICE TYPE STARTS */}
                <div className="mt-6">
                    <h1 className="font-semibold   mb-4 text-base
                md:text-md
                lg:text-xl">L&T Service Type <span className="text-xs font-normal capitalize">(Select only one)</span></h1>
                    <div className="flex items-start w-full flex-wrap gap-x-8 gap-y-4 justify-start ">
                        {LTServiceData?.map((data, index) => {
                            return <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                                <CheckBox
                                    register={register}
                                    name={data.name}
                                    label={data.name}
                                    checked={checkedName === data._id}
                                    onChange={() => handleCheckboxChange(data._id)}
                                />
                            </div>
                        })}
                    </div>
                </div>
                {/* L&T SERVICE TYPE ENDS */}
                {/* L&T SERVICE TYPE STARTS */}
                <div className="mt-6">
                    <h1 className="font-semibold  mb-4 text-base
                md:text-md
                lg:text-xl">L&T Service Detail</h1>
                    <div className="flex items-start w-full flex-wrap gap-x-8 gap-y-4 justify-between ">
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="full Name" error={errors.fullName} name="fullName" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="bussiness Name" error={errors.businessName} name="businessName" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="address" error={errors.address} name="address" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="apt" error={errors.apt} name="apt" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="city" error={errors.city} name="city" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="state" error={errors.state} name="state" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="zip" error={errors.zip} name="zip" />
                        </div>
                        <div className="w-[100%]">
                            <TextArea register={register} label="description" error={errors.description} name="description" />
                        </div>
                    </div>

                </div>
                {/* L&T SERVICE TYPE ENDS */}
                {/* ADDING MAILING STARTS */}
                <div className="mt-6  ">
                    <div className="flex items-center gap-x-4 ">
                        {mailingAddressData?.length > 0 && <div className="w-[100%] md:w-[46%] mb-4 lg:w-[30%]">
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
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
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
                    {!isNewFormAdding && getFormMailingAdress?.length > 0 && (
                        <div className="mt-4">
                            {getFormMailingAdress?.map((data: any, id) => (
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
                    {isNewFormAdding && getMailingAddressData?.length > 0 && (
                        <div className="mt-4">
                            {getMailingAddressData?.map((data: any, id) => (
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
}

export default StandardTypeForm