import React from "react";
import TextField from "../../../../components/InputFields/TextField/TextField";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Dropdown from "../../../../components/dropdown/Dropdown";
import Button from "../../../../components/Buttons/Button/Button"
import { resultSchema } from "../../../../schemas/legal delivery schemas/result";
import { handleEnterKeyPress } from "../../../../utils/moveToNextFieldOnEnter";
import { getAllFilteredDataThunk, getSearchNameReducer } from "../../../../redux/slice/legalDelivery";
import { useDispatch } from "react-redux";
import { useGetAllData } from "../../../../hooks/getAllDataHook/useGetAllData";
import { LTFormSchema } from "../../../../schemas/service forms/L&TFormSchema";
const Result = () => {
    const { register, formState: { errors }, handleSubmit, control } = useForm({ resolver: zodResolver(LTFormSchema) })
    const result = [{ value: "result1", label: "result 1" }, { value: "result2", label: "result 2" }, { value: "result3", label: "result 3" }]
    const { data: serviceTypeData } = useGetAllData("/service-type/all-service-types");
    const serviceTypeOptions = serviceTypeData?.map((data, id) => { return { value: data?._id, label: data?.serviceTypeCode } })
    const dispatch = useDispatch()
    // function to get data for service filter
    const serviceFilterFunction = (data) => {
        const sendingData = { searchIn: "result", data }
        dispatch(getAllFilteredDataThunk(data))
        dispatch(getSearchNameReducer("result"))



    }
    return <form className="flex flex-col items-start gap-y-3 overflow-y-auto h-[80vh]" onSubmit={handleSubmit(serviceFilterFunction)}>

        <Controller name="serviceType" control={control} render={({ field }) => (
            <Dropdown
                options={serviceTypeOptions}
                value={field.value}
                onChange={field.onChange}
                label="Service Type" error={errors.serviceType?.message as string}
            />
        )} />
        <TextField onKeyDown={handleEnterKeyPress} register={register} label="Date entered" error={errors.startDate} name="startDate" type="date" />
        <TextField onKeyDown={handleEnterKeyPress} register={register} label="Date service" error={errors.serviceResultDateOfService} name="serviceResultDateOfService" type="date" />

        <TextField onKeyDown={handleEnterKeyPress} register={register} label="Date of 1st Attempt" error={errors.serviceResultFirstAttemptDate} name="serviceResultFirstAttemptDate" type="date" />
        <TextField onKeyDown={handleEnterKeyPress} register={register} label="Date of 2nd Attempt" error={errors.serviceResultSecondAttemptDate} name="serviceResultSecondAttemptDate" type="date" />
        <TextField onKeyDown={handleEnterKeyPress} register={register} label="Date of 3rd Attempt" error={errors.serviceResultThirdAttemptDate} name="serviceResultThirdAttemptDate" type="date" />
        <TextField onKeyDown={handleEnterKeyPress} register={register} label="Date of Mailing" error={errors.serviceResultDateOfMailing} name="serviceResultDateOfMailing" type="date" />
        <TextField onKeyDown={handleEnterKeyPress} register={register} label="Corp Recipient" error={errors.serviceResultRecipient} name="corporateRecipient" />
        <TextField onKeyDown={handleEnterKeyPress} register={register} label="Corp Recipient Title" error={errors.serviceResultRecipientTitle} name="serviceResultRecipientTitle" />
        <TextField onKeyDown={handleEnterKeyPress} register={register} label="substitute Delivered To" error={errors.serviceResultSubstitudeDeliveredTo} name="substituteDeliveredTo" />

        <Button text="filter" />
    </form>
}


export default Result