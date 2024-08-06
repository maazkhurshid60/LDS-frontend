import React, { useEffect, useState } from "react";
import TextField from "../../../components/InputFields/TextField/TextField";
import Hints from "../Hints/Hints";
import Dropdown from "../../../components/dropdown/Dropdown";
import CheckBox from "../../../components/CheckBox/CustomCheckBox";
import { addResultFormThunk, getAllResultFormThunk, updateResultFormThunk } from "../../../redux/slice/resultForm";
import { useDispatch, useSelector } from "react-redux";
import { useGetAllData } from "../../../hooks/getAllDataHook/useGetAllData";
import { RootState } from "../../../redux/store";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resultFormSchema } from "../../../schemas/resultFormSchema";
import { z } from "zod";
import { Recepient, clientId, delivery, result, serverId, svcData } from "../../../constdata/ResultForm";
export type FormFields = z.infer<typeof resultFormSchema>
import { format } from 'date-fns';

const ResultForm = () => {
    const { register, handleSubmit, formState: { errors }, control, setValue, reset, watch } = useForm<FormFields>({ resolver: zodResolver(resultFormSchema) })
    const { data: clientData } = useGetAllData("/client/all-clients");
    const clientIdOptions = clientData?.map((data, id) => { return { value: data?._id, label: data?.fullName } })
    const { data: serverIdData } = useGetAllData("/server/all-servers");
    const serverIdOptions = serverIdData?.map((data, id) => { return { value: data?._id, label: data?.serverCode } })
    const resultOptions = [{ value: "personal", label: "Personal" }, { value: "substitute", label: "Substitute" }, { value: "conspicuous", label: "Conspicuous" }]
    const dispatch = useDispatch()
    const allResultForm = useSelector((state: RootState) => state.resultForm.allResultFormData)
    const resultFormIndex = useSelector((state: RootState) => state.resultForm.resultFormIndex)
    const isNewResultFormAdd = useSelector((state: RootState) => state.resultForm.isNewResultFormAdd)
    const [isConspicuous, setIsConspicuous] = useState()
    // console.log("add new form set true",isNewResultFormAdd)   
    console.log(allResultForm[resultFormIndex], resultFormIndex)
    // submitResultFormFunction
    const submitResultFormFunction = (data) => {
        console.log("data>>>>",data)
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
            notaryDate: data?.notaryDate,
            dateOfMailing: data?.dateOfMailing,
            description: {
                door: data?.door,
                doorLocks: data?.doorLocks,
                entry: data?.entry,
                wall: data?.wall,
                floor: data?.floor,
                lock: data?.lock,
                otherDescription: data?.otherDescription,
                age: data?.age,
                height: data?.height,
                weight: data?.weight,
                hair: data?.hair,
                sex: data?.sex,
                skinColor: data?.skinColor,
            }
        }
        const addingData = { queryInformationLT, queryInformationStandard, serviceResults }
        if (isNewResultFormAdd === true) {
            console.log("<><><><>")
            dispatch(addResultFormThunk(addingData))
        } else {

            const updatingData = { queryInformationLT, queryInformationStandard, serviceResults, resultFormId: allResultForm[resultFormIndex]?._id }
            
            dispatch(updateResultFormThunk(updatingData))
        }
    }
    // USE EFFECT WILL GET ALL RESULT FORM
    useEffect(() => {
        dispatch(getAllResultFormThunk())
    }, [resultFormIndex])
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
    // USE EFFECT TO STORE DATA ON FIRST INDEX OF RESULT FORM
    useEffect(() => {
        if (isNewResultFormAdd === true) {

            reset()
        }
        else {

            setValue("fullName", allResultForm[resultFormIndex]?.queryInformationLT?.fullName),
                setValue("indexNo", allResultForm[resultFormIndex]?.queryInformationLT?.indexNo),
                setValue("address", allResultForm[resultFormIndex]?.queryInformationLT?.address),
                setValue("businessName", allResultForm[resultFormIndex]?.queryInformationLT?.businessName),
                setValue("inputDate", allResultForm[resultFormIndex]?.queryInformationLT?.inputDate)
            setValue("serveTo", allResultForm[resultFormIndex]?.queryInformationStandard?.serveTo),
                setValue("plaintiff", allResultForm[resultFormIndex]?.queryInformationStandard?.plaintiff),
                setValue("defendants", allResultForm[resultFormIndex]?.queryInformationStandard?.defendants)
            setValue("resultInputDate", allResultForm[resultFormIndex]?.serviceResults?.resultInputDate ?? "")
            setValue("scvType", allResultForm[resultFormIndex]?.serviceResults?.scvType ?? "")
            setValue("clientId", allResultForm[resultFormIndex]?.serviceResults?.clientId ?? "")
            setValue("jobNo", allResultForm[resultFormIndex]?.serviceResults?.jobNo ?? "")
            setValue("serverId", allResultForm[resultFormIndex]?.serviceResults?.serverId ?? "")
            setValue("results", allResultForm[resultFormIndex]?.serviceResults?.results ?? "")
            setValue("dateOfService", allResultForm[resultFormIndex]?.serviceResults?.dateOfService)
            setValue("firstTimeOfService", allResultForm[resultFormIndex]?.serviceResults?.firstTimeOfService)
            setValue("firstAttemptDate", allResultForm[resultFormIndex]?.serviceResults?.firstAttemptDate)
            setValue("secondTimeOfService", allResultForm[resultFormIndex]?.serviceResults?.secondTimeOfService)
            setValue("secondAttemptDate", allResultForm[resultFormIndex]?.serviceResults?.secondAttemptDate)
            setValue("thirdAttemptDate", allResultForm[resultFormIndex]?.serviceResults?.thirdAttemptDate)
            setValue("lTServed", allResultForm[resultFormIndex]?.serviceResults?.lTServed)
            setValue("lTNotServed", allResultForm[resultFormIndex]?.serviceResults?.lTNotServed)
            setValue("substituteDeliveredTo", allResultForm[resultFormIndex]?.serviceResults?.substituteDeliveredTo)
            setValue("corporateRecipient", allResultForm[resultFormIndex]?.serviceResults?.corporateRecipient)
            setValue("recipientTitle", allResultForm[resultFormIndex]?.serviceResults?.recipientTitle)
            setValue("door", allResultForm[resultFormIndex]?.serviceResults?.description?.door)
            setValue("doorLocks", allResultForm[resultFormIndex]?.serviceResults?.description?.doorLocks)
            setValue("entry", allResultForm[resultFormIndex]?.serviceResults?.description?.entry)
            setValue("wall", allResultForm[resultFormIndex]?.serviceResults?.description?.wall)
            setValue("floor", allResultForm[resultFormIndex]?.serviceResults?.description?.floor)
            setValue("lock", allResultForm[resultFormIndex]?.serviceResults?.description?.lock)
            setValue("otherDescription", allResultForm[resultFormIndex]?.serviceResults?.description?.otherDescription)
            setValue("otherIdentifyingFeatures", allResultForm[resultFormIndex]?.serviceResults?.otherIdentifyingFeatures)
            setValue("dateOfMailing", allResultForm[resultFormIndex]?.serviceResults?.dateOfMailing)
            setValue("notaryDate", allResultForm[resultFormIndex]?.serviceResults?.notaryDate)
            setValue("weight", allResultForm[resultFormIndex]?.serviceResults?.description?.weight)
            setValue("hair", allResultForm[resultFormIndex]?.serviceResults?.description?.hair)
            setValue("sex", allResultForm[resultFormIndex]?.serviceResults?.description?.sex)
            setValue("skinColor", allResultForm[resultFormIndex]?.serviceResults?.description?.skinColor)
            setValue("age", allResultForm[resultFormIndex]?.serviceResults?.description?.age)
            setValue("height", allResultForm[resultFormIndex]?.serviceResults?.description?.height)
            setIsConspicuous(allResultForm[resultFormIndex]?.serviceResults?.results)
        }
    }, [resultFormIndex, setValue, isNewResultFormAdd, allResultForm])
console.log("allResultForm[resultFormIndex]?.serviceResults?.skinColor",allResultForm[resultFormIndex]?.serviceResults?.results)
    // WHEN SELECT DATE OF SERVICE THE NEXT DATE STORE IN NOTRAY AND MAILING DATE LOGIC STARTS 
    const dateOfService = watch("dateOfService");
    useEffect(() => {
        if (dateOfService) {
            const serviceDate = new Date(dateOfService);
            const nextDay = new Date(serviceDate);
            nextDay.setDate(serviceDate.getDate() + 1);

            const formattedNextDay = format(nextDay, 'yyyy-MM-dd');

            setValue("dateOfMailing", formattedNextDay);
            setValue("notaryDate", formattedNextDay);
        }
    }, [dateOfService, setValue]);
    // WHEN SELECT DATE OF SERVICE THE NEXT DATE STORE IN NOTRAY AND MAILING DATE LOGIC ENDS 
    const handleEnterKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent the form from submitting
            const formElements = Array.from(event.target.form.elements);
            const index = formElements.indexOf(event.target);
            formElements[index + 1]?.focus(); // Focus the next input
        }
    };

    return <>

        <form onSubmit={handleSubmit(submitResultFormFunction)}>
            {/* QUERY INFORMATION (L&T) FORM STARTS */}
            <div className="mt-6">
                <h1 className="font-semibold  mb-4 text-base
                md:text-md
                lg:text-xl">Query Information (L&T)</h1>

                <div className="flex items-start w-full flex-wrap gap-x-8 gap-y-4 justify-start ">
                    <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                        <TextField register={register} label="full Name" error={errors.fullName} name="fullName" onKeyDown={handleEnterKeyPress}
                        />
                    </div>
                    <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                        <TextField register={register} label="index no" error={errors.indexNo} name="indexNo" onKeyDown={handleEnterKeyPress}
                        />
                    </div>
                    <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                        <TextField register={register} label="address" error={errors.address} name="address" onKeyDown={handleEnterKeyPress}
                        />
                    </div>
                    <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                        <TextField register={register} label="Business Name" error={errors.businessName} name="businessName" onKeyDown={handleEnterKeyPress}
                        />
                    </div>
                    <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                        <TextField register={register} label="Input Date" error={errors.inputDate} name="inputDate" onKeyDown={handleEnterKeyPress}
                        />
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
                            register={register} label="serve To" error={errors.serveTo} name="serveTo" />
                    </div>
                    <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                        <TextField onKeyDown={handleEnterKeyPress}
                            register={register} label="plaintiff" error={errors.plaintiff} name="plainTiff" />
                    </div>
                    <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                        <TextField onKeyDown={handleEnterKeyPress}
                            register={register} label="defendants" error={errors.defendants} name="defendants" />
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
                        <TextField onKeyDown={handleEnterKeyPress}
                            register={register} label="Result Input Date" error={errors.resultInputDate} name="resultInputDate" />
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
                        <TextField onKeyDown={handleEnterKeyPress}
                            register={register} label="svc Type" error={errors.scvType} name="scvType" defaultValue="L&T Residential"
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
                        <TextField onKeyDown={handleEnterKeyPress}
                            register={register} label="Job" error={errors.jobNo} name="jobNo" />
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
                                onValueChange={(value) => setIsConspicuous(value)} // Update state

                                label="result" error={errors.results?.message as string}
                            />
                        )} />
                    </div>
                    <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                        <TextField onKeyDown={handleEnterKeyPress}
                            register={register} label="Date of service" error={errors.dateOfService} name="dateOfService" type="date" />
                    </div>
                    <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                        <TextField onKeyDown={handleEnterKeyPress}
                            register={register} label="Time of service" error={errors.timeService} name="timeService" />
                    </div>
                    <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                        <TextField onKeyDown={handleEnterKeyPress}
                            register={register} label="1st date Attempt" error={errors.firstAttemptDate} name="firstAttemptDate" />
                    </div>
                    <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                        <TextField onKeyDown={handleEnterKeyPress}
                            register={register} label="1st time Attempt" error={errors.firstTimeOfService} name="firstTimeOfService" />
                    </div>
                    <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                        <TextField onKeyDown={handleEnterKeyPress}
                            register={register} label="2nd date Attempt" error={errors.secondAttemptDate} name="secondAttemptDate" />
                    </div>
                    <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                        <TextField onKeyDown={handleEnterKeyPress}
                            register={register} label="2nd time Attempt" error={errors.secondTimeOfService} name="secondTimeOfService" />
                    </div>
                    <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                        <TextField onKeyDown={handleEnterKeyPress}
                            register={register} label="3rd date Attempt" error={errors.thirdAttemptDate} name="thirdAttemptDate" />
                    </div>
                    <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                        <TextField onKeyDown={handleEnterKeyPress}
                            register={register} label="3rd time Attempt" error={errors.thirdTimeOfService} name="thirdTimeOfService" />
                    </div>
                    <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                        <TextField onKeyDown={handleEnterKeyPress}
                            register={register} label="L&T Served" error={errors.lTServed} name="lTServed" />
                    </div>
                    <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                        <TextField onKeyDown={handleEnterKeyPress}
                            register={register} label="L&T Not Served" error={errors.lTNotServed} name="lTNotServed" />
                    </div>

                    <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                        <Controller name="substituteDeliveredTo" control={control} render={({ field }) => (
                            <Dropdown
                                options={delivery}
                                value={field.value}
                                onChange={field.onChange}
                                label="substitute delivered To" error={errors.substituteDeliveredTo?.message as string}
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
                        <TextField onKeyDown={handleEnterKeyPress}
                            register={register} label="recipient Title" error={errors.recipientTitle} name="recipientTitle" />
                    </div>
                    {isConspicuous === "substitute" && allResultForm[resultFormIndex]?.serviceResults?.results === "substitute"&&
                        <div className="flex items-start w-full flex-wrap gap-x-8 gap-y-4 justify-start py-4">
                            <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                                <TextField onKeyDown={handleEnterKeyPress}
                                    register={register} label="sex" error={errors.sex} name="sex" />
                            </div>
                            <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                                <TextField onKeyDown={handleEnterKeyPress}
                                    register={register} label="skin Color" error={errors.skinColor} name="skinColor" />
                            </div>
                            <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                                <TextField onKeyDown={handleEnterKeyPress}
                                    register={register} label="hair" error={errors.hair} name="hair" />
                            </div>
                            <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                                <TextField onKeyDown={handleEnterKeyPress}
                                    register={register} label="age" error={errors.age} name="age" />
                            </div>
                            <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                                <TextField onKeyDown={handleEnterKeyPress}
                                    register={register} label="height" error={errors.height} name="height" />
                            </div>
                            <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                                <TextField onKeyDown={handleEnterKeyPress}
                                    register={register} label="weight" error={errors.weight} name="weight" />
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
                            register={register} label="door" error={errors.door} name="door" />
                    </div>
                    <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                        <TextField onKeyDown={handleEnterKeyPress}
                            register={register} label="door Locks" error={errors.doorLocks} name="doorLocks" />
                    </div>
                    <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                        <TextField onKeyDown={handleEnterKeyPress}
                            register={register} label="entry" error={errors.entry} name="entry" />
                    </div>
                    <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                        <TextField onKeyDown={handleEnterKeyPress}
                            register={register} label="wall" error={errors.wall} name="wall" />
                    </div>
                    <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                        <TextField onKeyDown={handleEnterKeyPress}
                            register={register} label="floor" error={errors.floor} name="floor" />
                    </div>
                    <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                        <TextField onKeyDown={handleEnterKeyPress}
                            register={register} label="lock" error={errors.lock} name="lock" />
                    </div>
                    <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                        <CheckBox register={register} label="otherDescription" error={errors.otherDescription?.message} name="otherDescription" />
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
                            register={register} label="Other Identifying Features" error={errors.otherIdentifyingFeatures} name="otherIdentifyingFeatures" />
                    </div>
                    <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                        <TextField onKeyDown={handleEnterKeyPress}
                            register={register} label="Date of Mailing" error={errors.dateOfMailing} name="dateOfMailing" type="date" />
                    </div>
                    <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                        <TextField onKeyDown={handleEnterKeyPress}
                            register={register} label="Notary Date" error={errors.notaryDate} name="notaryDate" type="date" />
                    </div>
                </div>

                <h1 className="font-semibold text-lg mt-4">
                    Do not Proceed Past This Line
                </h1>
            </div>
            {/* OTHER  FORM ENDS */}

        </form>
    </>
}

export default ResultForm