import React, { useEffect, useState } from "react";
import TextField from "../../../components/InputFields/TextField/TextField";
import Hints from "../Hints/Hints";
import Dropdown from "../../../components/dropdown/Dropdown";
import CheckBox from "../../../components/CheckBox/CustomCheckBox";
import { addResultFormThunk, getAllResultFormThunk, searchResultFormAddReducer, searchResultFormThunk, updateResultFormThunk } from "../../../redux/slice/resultForm";
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
import { toast } from "react-toastify";
import { handleEnterKeyPress } from "../../../utils/moveToNextFieldOnEnter";
import SearchResultData from "./SearchResultData";

const ResultForm = () => {
    const { register, handleSubmit, formState: { errors }, control, setValue, reset, watch } = useForm<FormFields>({ resolver: zodResolver(resultFormSchema) })
    const { data: clientData } = useGetAllData("/client/all-clients");
    const clientFilteredOptions = clientData?.filter((data, id) => { return data?.isActive })
    const clientIdOptions = clientFilteredOptions?.map((data, id) => { return { value: data?._id, label: data?.code } })
    console.log("clientIdOptionsclientIdOptionsclientIdOptions", clientIdOptions)
    const { data: serverIdData } = useGetAllData("/server/all-servers");
    const serverIdOptions = serverIdData?.map((data, id) => { return { value: data?._id, label: data?.serverCode } })
    const resultOptions = [{ value: "personal", label: "Personal" }, { value: "substitute", label: "Substitute" }, { value: "conspicuous", label: "Conspicuous" }]
    const dispatch = useDispatch()
    const allResultForm = useSelector((state: RootState) => state.resultForm.allResultFormData)
    const resultFormIndex = useSelector((state: RootState) => state.resultForm.resultFormIndex)
    const isNewResultFormAdd = useSelector((state: RootState) => state.resultForm.isNewResultFormAdd)
    const isSearchResultForm = useSelector((state: RootState) => state.resultForm.isSearchResultForm)
    const [isConspicuous, setIsConspicuous] = useState()
    const selectedSearchResultData = useSelector((state: RootState) => state.resultForm.selectedSearchResultData)
    const searchResultFormData = useSelector((state: RootState) => state.resultForm.searchResultFormData)

    console.log("searchResultFormData", selectedSearchResultData, isNewResultFormAdd, selectedSearchResultData?.length > 0)

    // console.log("add new form set true", isConspicuous)
    // console.log(allResultForm[resultFormIndex], resultFormIndex)
    // submitResultFormFunction
    const submitResultFormFunction = (data) => {
        // console.log("data>>>>", data)
        const addingData = {
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
            serviceResultClientId: data?.serviceResultClientId,
            serviceResultJobNo: parseInt(data?.serviceResultJobNo),
            serviceResultServerId: data?.serviceResultServerId,
            serviceResultResults: data?.serviceResultResults,
            serviceResultDateOfService: data?.serviceResultDateOfService,
            serviceResultTimeService: data?.serviceResultTimeService,
            serviceResultFirstTimeOfService: data?.serviceResultFirstTimeOfService,
            serviceResultFirstAttemptDate: data?.serviceResultFirstAttemptDate,
            serviceResultSecondTimeOfService: data?.serviceResultSecondTimeOfService,
            serviceResultSecondAttemptDate: data?.serviceResultSecondAttemptDate,
            serviceResultThirdTimeOfService: data?.serviceResultThirdTimeOfService,
            serviceResultThirdAttemptDate: data?.serviceResultThirdAttemptDate,
            serviceResultlTServed: data?.serviceResultlTServed,
            serviceResultlTNotServed: data?.serviceResultlTNotServed,
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
        }
        console.log("adding data", addingData)
        // const addingData = { queryInformationLT, queryInformationStandard, serviceResults }
        if (isNewResultFormAdd === true) {
            // console.log("<><><><>")
            dispatch(addResultFormThunk(addingData))
        } else if (isSearchResultForm === true) {
            const searchData = {
                queryInformationLTAddress: data?.queryInformationLTAddress,
                queryInformationLTBusinessName: data?.queryInformationLTBusinessName,
                queryInformationLTFullName: data?.queryInformationLTFullName,
                queryInformationLTIndexNo: parseInt(data?.queryInformationLTIndexNo),
                queryInformationLTInputDate: data?.queryInformationLTInputDate,
            }
            // console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<search>>>>>>>>>>>>>>>>>>>>>>>>>>>", searchData)
            dispatch(searchResultFormThunk(searchData))
            // dispatch(searchResultFormAddReducer(false))
            // toast.success("Search Result Form will be applied")
        } else {

            const updatingData = { ...addingData, resultFormId: allResultForm[resultFormIndex]?._id }

            dispatch(updateResultFormThunk(updatingData))
        }
    }
    // SEARCH RESULT FORM
    const searchResultFormFunction = () => {
        setValue("queryInformationLTFullName", "")
        setValue("queryInformationLTIndexNo", "")
        setValue("queryInformationLTAddress", "")
        setValue("queryInformationLTBusinessName", "")
        setValue("queryInformationLTInputDate", "")

        // dispatch(searchResultFormThunk(true))

        dispatch(searchResultFormAddReducer(true))

    }
    // USE EFFECT WILL GET ALL RESULT FORM
    useEffect(() => {
        dispatch(getAllResultFormThunk())
    }, [resultFormIndex])
    // USE EFFECT WILL BE CALLED ON PRESSING F10 KEY
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'F10' || event.key === 'Escape') {
                event.preventDefault();
                handleSubmit(submitResultFormFunction)();
            }
        }
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleSubmit, submitResultFormFunction])
    // USE EFFECT WILL BE CALLED ON PRESSING F7 KEY
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'F7') {
                event.preventDefault();
                handleSubmit(searchResultFormFunction)();
            }
        }
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleSubmit, searchResultFormFunction])
    // USE EFFECT TO STORE DATA ON FIRST INDEX OF RESULT FORM
    useEffect(() => {
        if (isNewResultFormAdd === true) {

            reset()
        }
        else if (selectedSearchResultData?.length > 0) {
            toast.success("sucess")
            console.log("selectedSearchResultData?.queryInformationLTFullName", selectedSearchResultData[0]?.queryInformationLTFullName)
            setValue("queryInformationLTFullName", selectedSearchResultData[0]?.queryInformationLTFullName),
                setValue("queryInformationLTIndexNo", JSON.stringify(selectedSearchResultData[0]?.queryInformationLTIndexNo, 10));

            setValue("queryInformationLTAddress", selectedSearchResultData[0]?.queryInformationLTAddress),
                setValue("queryInformationLTBusinessName", selectedSearchResultData[0]?.queryInformationLTBusinessName),
                setValue("queryInformationLTInputDate", selectedSearchResultData[0]?.queryInformationLTInputDate)
            setValue("queryInformationStandardServeTo", selectedSearchResultData[0]?.queryInformationStandardServeTo),
                setValue("queryInformationStandardDefendants", selectedSearchResultData[0]?.queryInformationStandardDefendants),
                setValue("queryInformationStandardPlaintiff", selectedSearchResultData[0]?.queryInformationStandardPlaintiff)
            setValue("serviceResultInputDate", selectedSearchResultData[0]?.serviceResultInputDate ?? "")
            setValue("serviceResultScvType", selectedSearchResultData[0]?.serviceResultScvType ?? "")
            setValue("serviceResultClientId", selectedSearchResultData[0]?.serviceResultClientId ?? "")
            setValue("serviceResultJobNo", JSON.stringify(selectedSearchResultData[0]?.serviceResultJobNo ?? ""))
            setValue("serviceResultServerId", selectedSearchResultData[0]?.serviceResultServerId ?? "")
            setValue("serviceResultResults", selectedSearchResultData[0]?.serviceResultResults ?? "")
            setValue("serviceResultDateOfService", selectedSearchResultData[0]?.serviceResultDateOfService)
            setValue("serviceResultTimeService", selectedSearchResultData[0]?.serviceResultTimeService)
            setValue("serviceResultFirstTimeOfService", selectedSearchResultData[0]?.serviceResultFirstTimeOfService)
            setValue("serviceResultFirstAttemptDate", selectedSearchResultData[0]?.serviceResultFirstAttemptDate)
            setValue("serviceResultSecondTimeOfService", selectedSearchResultData[0]?.serviceResultSecondTimeOfService)
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
            setValue("serviceResultSex", selectedSearchResultData[0]?.otherIdentifyingFeatures)
            setValue("serviceResultHair", selectedSearchResultData[0]?.serviceResultHair)
            setValue("serviceResultAge", JSON.stringify(selectedSearchResultData[0]?.serviceResultAge))
            setValue("serviceResultHeight", JSON.stringify(selectedSearchResultData[0]?.serviceResultHeight))
            setValue("serviceResultWeight", JSON.stringify(selectedSearchResultData[0]?.serviceResultWeight))
            setValue("serviceResultOtherFeatures", selectedSearchResultData[0]?.serviceResultOtherFeatures)
            setValue("serviceResultDateOfMailing", selectedSearchResultData[0]?.serviceResultDateOfMailing)
            setValue("serviceResultDateOfNotary", selectedSearchResultData[0]?.serviceResultDateOfNotary)
        }
        else {
            setValue("queryInformationLTFullName", allResultForm[resultFormIndex]?.queryInformationLTFullName),
                setValue("queryInformationLTIndexNo", JSON.stringify(allResultForm[resultFormIndex]?.queryInformationLTIndexNo, 10));

            setValue("queryInformationLTAddress", allResultForm[resultFormIndex]?.queryInformationLTAddress),
                setValue("queryInformationLTBusinessName", allResultForm[resultFormIndex]?.queryInformationLTBusinessName),
                setValue("queryInformationLTInputDate", allResultForm[resultFormIndex]?.queryInformationLTInputDate)
            setValue("queryInformationStandardServeTo", allResultForm[resultFormIndex]?.queryInformationStandardServeTo),
                setValue("queryInformationStandardDefendants", allResultForm[resultFormIndex]?.queryInformationStandardDefendants),
                setValue("queryInformationStandardPlaintiff", allResultForm[resultFormIndex]?.queryInformationStandardPlaintiff)
            setValue("serviceResultInputDate", allResultForm[resultFormIndex]?.serviceResultInputDate ?? "")
            setValue("serviceResultScvType", allResultForm[resultFormIndex]?.serviceResultScvType ?? "")
            setValue("serviceResultClientId", allResultForm[resultFormIndex]?.serviceResultClientId ?? "")
            setValue("serviceResultJobNo", JSON.stringify(allResultForm[resultFormIndex]?.serviceResultJobNo ?? ""))
            setValue("serviceResultServerId", allResultForm[resultFormIndex]?.serviceResultServerId?._id ?? "")
            setValue("serviceResultResults", allResultForm[resultFormIndex]?.serviceResultResults ?? "")
            setValue("serviceResultDateOfService", allResultForm[resultFormIndex]?.serviceResultDateOfService)
            setValue("serviceResultTimeService", allResultForm[resultFormIndex]?.serviceResultTimeService)
            setValue("serviceResultFirstTimeOfService", allResultForm[resultFormIndex]?.serviceResultFirstTimeOfService)
            setValue("serviceResultFirstAttemptDate", allResultForm[resultFormIndex]?.serviceResultFirstAttemptDate)
            setValue("serviceResultSecondTimeOfService", allResultForm[resultFormIndex]?.serviceResultSecondTimeOfService)
            setValue("serviceResultSecondAttemptDate", allResultForm[resultFormIndex]?.serviceResultSecondAttemptDate)
            setValue("serviceResultThirdTimeOfService", allResultForm[resultFormIndex]?.serviceResultThirdTimeOfService)
            setValue("serviceResultThirdAttemptDate", allResultForm[resultFormIndex]?.serviceResultThirdAttemptDate)
            setValue("serviceResultlTServed", allResultForm[resultFormIndex]?.serviceResultlTServed)
            setValue("serviceResultlTNotServed", allResultForm[resultFormIndex]?.serviceResultlTNotServed)
            setValue("serviceResultRecipientTitle", allResultForm[resultFormIndex]?.serviceResultRecipientTitle)
            setValue("serviceResultDoor", JSON.stringify(allResultForm[resultFormIndex]?.serviceResultDoor))
            setValue("serviceResultDoorLocks", JSON.stringify(allResultForm[resultFormIndex]?.serviceResultDoorLocks))
            setValue("serviceResultEntry", JSON.stringify(allResultForm[resultFormIndex]?.serviceResultEntry))
            setValue("serviceResultWall", JSON.stringify(allResultForm[resultFormIndex]?.serviceResultWall))
            setValue("serviceResultFloor", JSON.stringify(allResultForm[resultFormIndex]?.serviceResultFloor))
            setValue("serviceResultLock", JSON.stringify(allResultForm[resultFormIndex]?.serviceResultLock))
            setValue("serviceResultOtherDescription", allResultForm[resultFormIndex]?.serviceResultOtherDescription)
            setValue("serviceResultSex", allResultForm[resultFormIndex]?.otherIdentifyingFeatures)
            setValue("serviceResultHair", allResultForm[resultFormIndex]?.serviceResultHair)
            setValue("serviceResultAge", JSON.stringify(allResultForm[resultFormIndex]?.serviceResultAge))
            setValue("serviceResultHeight", JSON.stringify(allResultForm[resultFormIndex]?.serviceResultHeight))
            setValue("serviceResultWeight", JSON.stringify(allResultForm[resultFormIndex]?.serviceResultWeight))
            setValue("serviceResultOtherFeatures", allResultForm[resultFormIndex]?.serviceResultOtherFeatures)
            setValue("serviceResultDateOfMailing", allResultForm[resultFormIndex]?.serviceResultDateOfMailing)
            setValue("serviceResultDateOfNotary", allResultForm[resultFormIndex]?.serviceResultDateOfNotary)
            // setValue("height", allResultForm[resultFormIndex]?.serviceResults?.description?.height)
            // setIsConspicuous(allResultForm[resultFormIndex]?.serviceResults?.results)
            console.log("allResultForm[resultFormIndex]?.serviceResultHeight",allResultForm[resultFormIndex]?.serviceResultWeight)
        }

    }, [resultFormIndex, setValue, isNewResultFormAdd, allResultForm,selectedSearchResultData])
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
    // const handleEnterKeyPress = (event) => {
    //     if (event.key === 'Enter') {
    //         event.preventDefault(); // Prevent the form from submitting
    //         const formElements = Array.from(event.target.form.elements);
    //         const index = formElements.indexOf(event.target);
    //         formElements[index + 1]?.focus(); // Focus the next input
    //     }
    // };

    return <>
        {searchResultFormData?.length > 0 && isSearchResultForm ? <SearchResultData /> :

            <form onSubmit={handleSubmit(submitResultFormFunction)}>
                {/* QUERY INFORMATION (L&T) FORM STARTS */}
                <div className="mt-6">
                    <h1 className="font-semibold  mb-4 text-base
                                    md:text-md 
                                    lg:text-xl">Query Information (L&T)</h1>

                    <div className="flex items-start w-full flex-wrap gap-x-8 gap-y-4 justify-start ">
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="full Name" error={errors.queryInformationLTFullName} name="queryInformationLTFullName" onKeyDown={handleEnterKeyPress}
                            />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="index no" error={errors.queryInformationLTIndexNo} name="queryInformationLTIndexNo" onKeyDown={handleEnterKeyPress}
                            />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="address" error={errors.queryInformationLTAddress} name="queryInformationLTAddress" onKeyDown={handleEnterKeyPress}
                            />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="Business Name" error={errors.queryInformationLTBusinessName} name="queryInformationLTBusinessName" onKeyDown={handleEnterKeyPress}
                            />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="Input Date" error={errors.queryInformationLTInputDate} name="queryInformationLTInputDate" onKeyDown={handleEnterKeyPress}
                                type="date" />
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
                                register={register} label="plaintiff" error={errors.queryInformationStandardPlaintiff} name="queryInformationStandardPlaintiff" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField onKeyDown={handleEnterKeyPress}
                                register={register} label="defendants" error={errors.queryInformationStandardDefendants} name="queryInformationStandardDefendants" />
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
                            {/* <Hints keyName="f4" label="ditto field" /> */}
                        </div>

                    </div>
                    <div className="flex items-start w-full flex-wrap gap-x-8 gap-y-4 justify-start mt-4">
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField onKeyDown={handleEnterKeyPress}
                                register={register} label="Result Input Date" error={errors.serviceResultInputDate} name="serviceResultInputDate" type="date" />
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
                                register={register} label="svc Type" error={errors.serviceResultScvType} name="serviceResultScvType" defaultValue="L&T Residential"
                            />

                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <Controller name="serviceResultClientId" control={control} render={({ field }) => (
                                <Dropdown
                                    options={clientIdOptions}
                                    // singleOption={getSelectedClientoption}
                                    value={field.value}
                                    onChange={field.onChange}
                                    label="Client id" error={errors.serviceResultClientId?.message as string}
                                />
                            )} />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField onKeyDown={handleEnterKeyPress}
                                register={register} label="Job" error={errors.serviceResultJobNo} name="serviceResultJobNo" required/>
                                <p className="text-xs font-semibold">Note: Job no should be same to the Job no of service form</p>
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <Controller name="serviceResultServerId" control={control} render={({ field }) => (
                                <Dropdown
                                    options={serverIdOptions}
                                    value={field.value}
                                    onChange={field.onChange}
                                    label="server Id" error={errors.serviceResultServerId?.message as string}
                                />
                            )} />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <Controller name="serviceResultResults" control={control} render={({ field }) => (
                                <Dropdown
                                    options={resultOptions}
                                    value={field.value}
                                    onChange={field.onChange}
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
                                register={register} label="Time of service" error={errors.serviceResultTimeService} name="serviceResultTimeService" type="time" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField onKeyDown={handleEnterKeyPress}
                                register={register} label="1st date Attempt" error={errors.serviceResultFirstAttemptDate} name="serviceResultFirstAttemptDate" type="date" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField onKeyDown={handleEnterKeyPress}
                                register={register} label="1st time Attempt" error={errors.serviceResultFirstTimeOfService} name="serviceResultFirstTimeOfService" type="time" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField onKeyDown={handleEnterKeyPress}
                                register={register} label="2nd date Attempt" error={errors.serviceResultSecondAttemptDate} name="serviceResultSecondAttemptDate" type="date" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField onKeyDown={handleEnterKeyPress}
                                register={register} label="2nd time Attempt" error={errors.serviceResultSecondTimeOfService} name="serviceResultSecondTimeOfService" type="time" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField onKeyDown={handleEnterKeyPress}
                                register={register} label="3rd date Attempt" error={errors.serviceResultThirdAttemptDate} name="serviceResultThirdAttemptDate" type="date" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField onKeyDown={handleEnterKeyPress}
                                register={register} label="3rd time Attempt" error={errors.serviceResultThirdTimeOfService} name="serviceResultThirdTimeOfService" type="time" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField onKeyDown={handleEnterKeyPress}
                                register={register} label="L&T Served" error={errors.serviceResultlTServed} name="serviceResultlTServed" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField onKeyDown={handleEnterKeyPress}
                                register={register} label="L&T Not Served" error={errors.serviceResultlTNotServed} name="serviceResultlTNotServed" />
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

            </form>
        }

    </>
}

export default ResultForm