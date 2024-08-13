import React from "react";
import TextField from "../../../../components/InputFields/TextField/TextField";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { serviceSchema } from "../../../../schemas/legal delivery schemas/service";
import Dropdown from "../../../../components/dropdown/Dropdown";
import Button from "../../../../components/Buttons/Button/Button"

import { z } from "zod";
import CheckBox from "../../../../components/CheckBox/CustomCheckBox";
import { handleEnterKeyPress } from "../../../../utils/moveToNextFieldOnEnter";
export type FormFields = z.infer<typeof serviceSchema>
const Service = () => {
    const { register, formState: { errors }, handleSubmit, control } = useForm<FormFields>({ resolver: zodResolver(serviceSchema) })
    const clientOptions = [{ value: "client1", label: "Client 1" }, { value: "client2", label: "Client 2" }, { value: "client3", label: "Client 3" }]
    const serviceTypeOptions = [{ value: "service1", label: "service 1" }, { value: "service2", label: "service 2" }, { value: "service3", label: "service 3" }]

    // function to get data for service filter
    const serviceFilterFunction = (data) => {
        console.log(data)
    }
    return <form className="flex flex-col items-start gap-y-3 overflow-y-auto h-[76vh]">
        <TextField onKeyDown={handleEnterKeyPress} register={register} label="Date entered" error={errors.dateCreated} name="dateCreated" type="date" />
        <TextField onKeyDown={handleEnterKeyPress} register={register} label="Index No" error={errors.jobNo} name="jobNo" />
        <Controller name="clientId" control={control} render={({ field }) => (
            <Dropdown
                options={clientOptions}
                value={field.value}
                onChange={field.onChange}
                label="Client" error={errors.clientId?.message as string}
            />
        )} />
        <Controller name="serviceType" control={control} render={({ field }) => (
            <Dropdown
                options={serviceTypeOptions}
                value={field.value}
                onChange={field.onChange}
                label="Service Type" error={errors.serviceType?.message as string}
            />
        )} />
        <TextField onKeyDown={handleEnterKeyPress} register={register} label="case No" error={errors.caseNo} name="caseNo" />
        <TextField onKeyDown={handleEnterKeyPress} register={register} label="full Name" error={errors.fullName} name="fullName" />
        <TextField onKeyDown={handleEnterKeyPress} register={register} label="bussiness " error={errors.businessName} name="businessName" />
        <TextField onKeyDown={handleEnterKeyPress} register={register} label="address " error={errors.address} name="address" />
        <TextField onKeyDown={handleEnterKeyPress} register={register} label="apt " error={errors.apt} name="apt" />
        <TextField onKeyDown={handleEnterKeyPress} register={register} label="city " error={errors.city} name="city" />
        <TextField onKeyDown={handleEnterKeyPress} register={register} label="zip " error={errors.zip} name="zip" />
        <TextField onKeyDown={handleEnterKeyPress} register={register} label="commercial Description " error={errors.commercialDescription} name="commercialDescription" />
        <TextField onKeyDown={handleEnterKeyPress} register={register} label="Other L&T Description " error={errors.otherLTDescription} name="otherLTDescription" />
        {/* <CheckBox   onKeyDown={handleEnterKeyPress} 
          name="addressNotEntered"
          register={register}
          label="address Not Entered"
          error={errors.addressNotEntered?.message}
        />
             <CheckBox   onKeyDown={handleEnterKeyPress}  name="gpsCodeNotGenerated"
            register={register}
            label="gps Code Not Generated"
            error={errors.gpsCodeNotGenerated?.message} />
       <CheckBox   onKeyDown={handleEnterKeyPress}  name="gpsCodeGenerated"
            register={register}
            label="gps Code Generated"
            error={errors.gpsCodeGenerated?.message} />
        <CheckBox   onKeyDown={handleEnterKeyPress}  name="serviceTypeLT"
            register={register}
            label="Select/Clear L&T Service Types"
            error={errors.serviceTypeLT?.message} />
        <CheckBox   onKeyDown={handleEnterKeyPress}  name="day3Notice"
            register={register}
            label="3 Day Notice"
            error={errors.day3Notice?.message} />
        <CheckBox   onKeyDown={handleEnterKeyPress}  name="day5Notice"
            register={register}
            label="5 Day Notice"
            error={errors.day5Notice?.message} />
        <CheckBox   onKeyDown={handleEnterKeyPress}  name="day10Notice"
            register={register}
            label="10 Day Notice"
            error={errors.day10Notice?.message} />
        <CheckBox   onKeyDown={handleEnterKeyPress}  name="day15Notice"
            register={register}
            label="15 Day Notice"
            error={errors.day15Notice?.message} />
        <CheckBox   onKeyDown={handleEnterKeyPress}  name="day3Notice30DayDeptor"
            register={register}
            label="3 Day Notice & 30 Day Deptor"
            error={errors.day3Notice30DayDeptor?.message} />
        <CheckBox   onKeyDown={handleEnterKeyPress}  name="day30Termination"
            register={register}
            label="30 Day Notice of Termination"
            error={errors.day30Termination?.message} />
        <CheckBox   onKeyDown={handleEnterKeyPress}  name="noticePetition"
            register={register}
            label="Notice of Petition & Petition"
            error={errors.noticePetition?.message} />
        <CheckBox   onKeyDown={handleEnterKeyPress}  name="noticePetitionHoldOver"
            register={register}
            label="Notice of Petition & Petition Holdover"
            error={errors.noticePetitionHoldOver?.message} />
        <CheckBox   onKeyDown={handleEnterKeyPress}  name="otherLT"
            register={register}
            label="Other L&T"
            error={errors.otherLT?.message} />  */}
            <Button text="filter"  onClick={handleSubmit(serviceFilterFunction)}/>
    </form>
}

export default Service