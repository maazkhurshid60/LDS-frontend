import React from "react";
import TextField from "../../../../components/InputFields/TextField/TextField";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { serviceSchema } from "../../../../schemas/legal delivery schemas/service";
import Dropdown from "../../../../components/dropdown/Dropdown";
import Button from "../../../../components/Buttons/Button/Button"
import { useDispatch } from "react-redux";  // Import useDispatch

import { z } from "zod";
import CheckBox from "../../../../components/CheckBox/CustomCheckBox";
import { handleEnterKeyPress } from "../../../../utils/moveToNextFieldOnEnter";
import { getAllFilteredDataThunk, getSearchNameReducer } from "../../../../redux/slice/legalDelivery";
import { useGetAllData } from "../../../../hooks/getAllDataHook/useGetAllData";
export type FormFields = z.infer<typeof serviceSchema>
const Service = () => {
    const { register, formState: { errors }, handleSubmit, control } = useForm<FormFields>({ resolver: zodResolver(serviceSchema) })
    // const serviceTypeOptions = [{ value: "service1", label: "service 1" }, { value: "service2", label: "service 2" }, { value: "service3", label: "service 3" }]
    const { data: clientData } = useGetAllData("/client/all-clients");
    const clientFilteredOptions = clientData?.filter((data, id) => { return data?.isActive })
    const clientIdOptions = clientFilteredOptions?.map((data, id) => { return { value: data?._id, label: data?.code } })
    const { data: serviceTypeData } = useGetAllData("/service-type/all-service-types");
    const serviceTypeOptions = serviceTypeData?.map((data, id) => { return { value: data?._id, label: data?.serviceTypeCode } })
    console.log("clientIdOptionsclientIdOptionsclientIdOptions", clientIdOptions)
    
    const dispatch = useDispatch()
    // function to get data for service filter
    const serviceFilterFunction = async (searchData) => {
        try {
            const jobNo = parseInt(searchData?.jobNo)
            const caseNo = isNaN(parseInt(searchData?.caseNo)) ? "" : parseInt(searchData?.caseNo);
            const clientId = searchData?.clientId === undefined && " "
            const serviceType = searchData?.serviceType === undefined && ""
            console.log("<<<<<<<<<",clientId,serviceType)
            const data = {
                ...searchData, jobNo, caseNo, 
            }
            const sendingData = { searchIn: "service", data }
            dispatch(getAllFilteredDataThunk(sendingData))
            dispatch(getSearchNameReducer("service"))

        } catch (error) {

        }
    }
    return <form className="flex flex-col items-start gap-y-3 overflow-y-auto h-[76vh]">
        <TextField onKeyDown={handleEnterKeyPress} register={register} label="Date entered" error={errors.dateCreated} name="dateCreated" type="date" />
        <TextField onKeyDown={handleEnterKeyPress} register={register} label="Job No" error={errors.jobNo} name="jobNo" />
        <Controller name="clientId" control={control} render={({ field }) => (
            <Dropdown
                options={clientIdOptions}
                // singleOption={getSelectedClientoption}
                value={field.value}
                onChange={field.onChange}
                label="Client id" error={errors.clientId?.message as string}
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

        <Button text="filter" onClick={handleSubmit(serviceFilterFunction)} />
    </form>
}

export default Service