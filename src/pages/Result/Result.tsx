import React, { useEffect } from "react";
import OutletLayoutHeader from "../../components/OutletLayout/OutLayoutHeader";
import BorderButton from "../../components/Buttons/BorderButton/BorderButton";
import { MdDeleteOutline, MdOutlineEdit, MdOutlineDone, MdArrowBackIos, MdArrowForwardIos, MdLastPage, MdFirstPage, MdMonitor, MdAdd } from "react-icons/md";
import Hints from "./Hints/Hints";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { resultFormSchema } from "../../schemas/resultFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import TextField from "../../components/InputFields/TextField/TextField";
import CheckBox from "../../components/CheckBox/CustomCheckBox";
import Dropdown from "../../components/dropdown/Dropdown";
import { Recepient, clientId, delivery, result, serverId, svcData } from "../../constdata/ResultForm";
import { useGetAllData } from "../../hooks/getAllDataHook/useGetAllData";
import { useDispatch, useSelector } from "react-redux";
import { addResultFormThunk, getAllResultFormThunk } from "../../redux/slice/resultForm";
import { RootState } from "../../redux/store";
export type FormFields = z.infer<typeof resultFormSchema>
const Result = () => {
    const { register, handleSubmit, formState: { errors }, control } = useForm<FormFields>({ resolver: zodResolver(resultFormSchema) })
    const { data: clientData } = useGetAllData("/client/all-clients");
    const clientIdOptions = clientData?.map((data, id) => { return { value: data?._id, label: data?.fullName } })
    const { data: serverIdData } = useGetAllData("/server/all-servers");
    const serverIdOptions = serverIdData?.map((data, id) => { return { value: data?._id, label: data?.serverCode } })
    const resultOptions = [{ value: "personal", label: "Personal" }, { value: "substitute", label: "Substitute" }, { value: "conspicuous", label: "Conspicuous" }]
    const dispatch=useDispatch()
    const allResultForm=useSelector((state:RootState)=>state.serviceForm.allServiceFormData)
    console.log("result form",allResultForm)
    // submitResultFormFunction
    const submitResultFormFunction = (data) => {
        const queryInformationLT = {
            fullName: data?.fullName,
            indexNo: data?.indexNo,
            address: data?.address,
            businessName: data?.businessName,
            inputDate: data?.inputDate

        }
        const queryInformationStandard = {
            serveTo: data?.serveTo,
            plaintiff: data?.plaintiff,
            defendants: data?.defendants
        }
        const serviceResults = {
            resultInputDate: data?.resultInputDate,
            scvType: data?.scvType,
            clientId: data?.clientId,
            jobNo: data?.jobNo,
            serverId: data?.serverId,
            results: data?.results,
            dateOfService: data?.dateOfService,
            firstTimeOfService: data?.firstTimeOfService,
            firstAttemptDate: data?.firstAttemptDate,
            secondTimeOfService: data?.secondTimeOfService,
            secondAttemptDate: data?.secondAttemptDate,
            thirdAttemptDate: data?.thirdAttemptDate,
            lTServed: data?.lTServed,
            lTNotServed: data?.lTNotServed,
            substituteDeliveredTo: data?.substituteDeliveredTo,
            corporateRecipient: data?.corporateRecipient,
            recipientTitle: data?.recipientTitle,
            description: {
                door: data?.door,
                doorLocks: data?.doorLocks,
                entry: data?.entry,
                wall: data?.wall,
                floor: data?.floor,
                lock: data?.lock,
                otherDescription: data?.otherDescription,
            }
        }
        const addingData = { queryInformationLT, queryInformationStandard, serviceResults }
        dispatch(addResultFormThunk(addingData))
    }

    // USE EFFECT WILL GET ALL RESULT FORM
    useEffect(()=>{
        dispatch(getAllResultFormThunk())
    },[])
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
    }, [handleSubmit, submitResultFormFunction])

    return <div className=" h-[72vh] overflow-y-scroll bg-whiteColor p-2 sm:p-8 w-[95%] m-auto border-[1px] border-borderColor border-solid rounded-xl shadow-smShadow">
        <OutletLayoutHeader heading="Result Form">
            <BorderButton buttonText="add" icon={<MdAdd />} isIcon />

            <BorderButton buttonText="edit" icon={<MdOutlineEdit />} isIcon />
            <BorderButton buttonText="submit" icon={<MdOutlineDone />} isIcon />
            <BorderButton buttonText="delete" icon={<MdDeleteOutline />} isIcon />
            <BorderButton buttonText="previous" icon={<MdArrowBackIos />} isIcon />
            <BorderButton buttonText="next" icon={<MdArrowForwardIos />} isRightIcon />
            <BorderButton buttonText="main screen" icon={<MdMonitor />} isIcon />
            <BorderButton buttonText="first" icon={<MdFirstPage />} isIcon />
            <BorderButton buttonText="last" icon={<MdLastPage />} isRightIcon />
        </OutletLayoutHeader>
        <div className="mt-8">
            <div>
                <h1 className="  font-semibold text-base
                md:text-md
                lg:text-xl">Hints</h1>
                <div className="flex flex-row gap-x-4 mt-2 flex-wrap gap-y-4">
                    <Hints keyName="Esc" label="finish" />
                    <Hints keyName="f7 + f10" label="find" />
                </div>
            </div>
            <form onSubmit={handleSubmit(submitResultFormFunction)}>
                {/* QUERY INFORMATION (L&T) FORM STARTS */}
                <div className="mt-6">
                    <h1 className="font-semibold  mb-4 text-base
                md:text-md
                lg:text-xl">Query Information (L&T)</h1>

                    <div className="flex items-start w-full flex-wrap gap-x-8 gap-y-4 justify-start ">
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="full Name" error={errors.fullName} name="fullName" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="index no" error={errors.indexNo} name="indexNo" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="address" error={errors.address} name="address" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="Business Name" error={errors.businessName} name="businessName" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="Input Date" error={errors.inputDate} name="inputDate" type="date" />
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
                            <TextField register={register} label="serve To" error={errors.serveTo} name="serveTo" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="plaintiff" error={errors.plaintiff} name="plainTiff" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="defendants" error={errors.defendants} name="defendants" />
                        </div>
                    </div>
                </div>
                {/* QUERY INFORMATION (STANDARD) FORM ENDS */}
                {/* SHOW RESULT  FORM STARTS */}
                <div className="mt-6">
                    <div>
                        <h1 className="  font-semibold text-base
                md:text-md
                lg:text-xl ">Hints</h1>
                        <div className="flex flex-row gap-x-4 mt-2 flex-wrap gap-y-4">
                            <Hints keyName="Esc" label="finish" />
                            <Hints keyName="f7 + f10" label="find" />
                            <Hints keyName="f4" label="ditto field" />
                        </div>

                    </div>
                    <div className="flex items-start w-full flex-wrap gap-x-8 gap-y-4 justify-start mt-4">
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="Result Input Date" error={errors.resultInputDate} name="resultInputDate" type="date" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            {/* <Controller name="svcType" control={control} render={({ field }) => (
                                <Dropdown
                                    options={svcData}
                                    value={field.value}
                                    onChange={field.onChange}
                                    label="Svc Type" error={errors.svcType?.message as string}
                                />
                            )} /> */}
                            <TextField register={register} label="svc Type" error={errors.scvType} name="scvType" defaultValue="L&T Residential"
                            />

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
                            <TextField register={register} label="Job" error={errors.jobNo} name="jobNo" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <Controller name="serverId" control={control} render={({ field }) => (
                                <Dropdown
                                    options={serverIdOptions}
                                    value={field.value}
                                    onChange={field.onChange}
                                    label="server Id" error={errors.serverId?.message as string}
                                />
                            )} />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <Controller name="results" control={control} render={({ field }) => (
                                <Dropdown
                                    options={resultOptions}
                                    value={field.value}
                                    onChange={field.onChange}
                                    label="result" error={errors.results?.message as string}
                                />
                            )} />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="Date of service" error={errors.dateOfService} name="dateOfService" type="date" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="Time of service" error={errors.timeService} name="timeService" type="time" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="1st date Attempt" error={errors.firstAttemptDate} name="firstAttemptDate" type="date" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="1st time Attempt" error={errors.firstTimeOfService} name="firstTimeOfService" type="time" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="2nd date Attempt" error={errors.secondAttemptDate} name="secondAttemptDate" type="date" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="2nd time Attempt" error={errors.secondTimeOfService} name="secondTimeOfService" type="time" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="3rd date Attempt" error={errors.thirdAttemptDate} name="thirdAttemptDate" type="date" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="3rd time Attempt" error={errors.thirdTimeOfService} name="thirdTimeOfService" type="time" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="L&T Served" error={errors.lTServed} name="lTServed" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="L&T Not Served" error={errors.lTNotServed} name="lTNotServed" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <Controller name="substituteDeliveredTo" control={control} render={({ field }) => (
                                <Dropdown
                                    options={delivery}
                                    value={field.value}
                                    onChange={field.onChange}
                                    label="delivered To" error={errors.substituteDeliveredTo?.message as string}
                                />
                            )} />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <Controller name="corporateRecipient" control={control} render={({ field }) => (
                                <Dropdown
                                    options={Recepient}
                                    value={field.value}
                                    onChange={field.onChange}
                                    label="Corporate Recipient" error={errors.corporateRecipient?.message as string}
                                />
                            )} />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="recipient Title" error={errors.recipientTitle} name="recipientTitle" />
                        </div>
                    </div>
                </div>
                {/* SHOW RESULT  FORM ENDS */}
                {/* DESCRIPTION FORM STARTS */}
                <div className="w-full mt-6 border-[1px] border-solid border-borderColor rounded-lg">
                    <h1 className="px-6 py-2 bg-cyanColor rounded-t-lg text-whiteColor font-semibold text-lg">Description</h1>
                    <div className="flex items-start w-full flex-wrap gap-x-8 gap-y-4 justify-start px-8 py-4">
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="door" error={errors.door} name="door" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="door Locks" error={errors.doorLocks} name="doorLocks" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="entry" error={errors.entry} name="entry" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="wall" error={errors.wall} name="wall" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="floor" error={errors.floor} name="floor" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="lock" error={errors.lock} name="lock" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <CheckBox register={register} label="otherDescription" error={errors.otherDescription?.message} name="otherDescription" />
                        </div>
                    </div>
                </div>
                {/* DESCRIPTION FORM ENDS */}
                {/* OTHER  FORM STARTS */}
                <div className="mt-6">
                    <div className="flex items-start w-full flex-wrap gap-x-8 gap-y-4 justify-start ">
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="Other Identifying Features" error={errors.otherIdentifyingFeatures} name="otherIdentifyingFeatures" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="Date of Mailing" error={errors.dateOfMailing} name="dateOfMailing" type="date" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="Notary Date" error={errors.notaryDate} name="notaryDate" type="date" />
                        </div>
                    </div>

                    <h1 className="font-semibold text-lg mt-4">
                        Do not Proceed Past This Line
                    </h1>
                </div>
                {/* OTHER  FORM ENDS */}

            </form>
        </div>
    </div>
}
export default Result