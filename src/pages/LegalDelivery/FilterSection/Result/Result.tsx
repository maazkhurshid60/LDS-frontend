import React from "react";
import TextField from "../../../../components/InputFields/TextField/TextField";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Dropdown from "../../../../components/dropdown/Dropdown";
import Button from "../../../../components/Buttons/Button/Button"
import { resultSchema } from "../../../../schemas/legal delivery schemas/result";
const Result = () => {
    const { register, formState: { errors }, handleSubmit, control } = useForm({ resolver: zodResolver(resultSchema) })
    const result = [{ value: "result1", label: "result 1" }, { value: "result2", label: "result 2" }, { value: "result3", label: "result 3" }]
    const serviceTypeOptions = [{ value: "service1", label: "service 1" }, { value: "service2", label: "service 2" }, { value: "service3", label: "service 3" }]

    // function to get data for service filter
    const serviceFilterFunction = (data) => {
        console.log(data)
    }
    return <form className="flex flex-col items-start gap-y-3 overflow-y-auto h-[70vh]" onSubmit={handleSubmit(serviceFilterFunction)}>
        <Controller name="resultOptions" control={control} render={({ field }) => (
            <Dropdown
                options={result}
                value={field.value}
                onChange={field.onChange}
                label="Service result" error={errors.resultOptions?.message as string}
            />
        )} />
        <Controller name="serviceTypeOptions" control={control} render={({ field }) => (
            <Dropdown
                options={serviceTypeOptions}
                value={field.value}
                onChange={field.onChange}
                label="Service Type" error={errors.serviceTypeOptions?.message as string}
            />
        )} />
     <TextField register={register} label="Date entered" error={errors.dateEntered} name="dateEntered" type="date" />
     <TextField register={register} label="Date service" error={errors.dateService} name="dateService" type="date" />

     <TextField register={register} label="Date of 1st Attempt" error={errors.date1Attepmt} name="date1Attepmt" type="date" />
     <TextField register={register} label="Date of 2nd Attempt" error={errors.date2Attepmt} name="date2Attepmt" type="date" />
     <TextField register={register} label="Date of 3rd Attempt" error={errors.date3Attepmt} name="date3Attepmt" type="date" />
     <TextField register={register} label="Date of Amiling" error={errors.dateMailing} name="dateMailing" type="date" />
     <TextField register={register} label="Corp Recipient" error={errors.corpRecipient} name="corpRecipient" />
     <TextField register={register} label="Corp Recipient Title" error={errors.corpRecipientTitle} name="corpRecipientTitle" />
     <TextField register={register} label="substitute Delivered To" error={errors.substituteDeliveredTo} name="substituteDeliveredTo" />
       
            <Button text="filter"/>
    </form>
}

export default Result