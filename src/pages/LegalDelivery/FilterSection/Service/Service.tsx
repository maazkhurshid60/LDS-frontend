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
import { LTFormSchema } from "../../../../schemas/service forms/L&TFormSchema";
// export type FormFields = z.infer<typeof serviceSchema>
export type FormFields = z.infer<typeof LTFormSchema>


const Service = () => {
    const { register, formState: { errors }, handleSubmit, control } = useForm<FormFields>({ resolver: zodResolver(LTFormSchema) })
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
            console.log("<<<<<<<<<", searchData)
            const data = {
                ...searchData, jobNo, caseNo, clientId, serviceType
            }
            const sendingData = { searchIn: "service", data }

            dispatch(getAllFilteredDataThunk(searchData))
            // dispatch(getSearchNameReducer("service"))

        } catch (error) {

        }
    }
    return <form className="flex flex-col items-start gap-y-3 overflow-y-auto h-[80vh]">
        <TextField onKeyDown={handleEnterKeyPress} register={register} label="Date entered" error={errors.startDate} name="startDate" type="date" />
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
        <TextField onKeyDown={handleEnterKeyPress} register={register} label="full Name" error={errors.lTSFirstName} name="lTSFirstName" />
        <TextField onKeyDown={handleEnterKeyPress} register={register} label="bussiness " error={errors.lTSBusinessName} name="lTSBusinessName" />
        <TextField onKeyDown={handleEnterKeyPress} register={register} label="address " error={errors.lTSAddress} name="lTSAddress" />
        <TextField onKeyDown={handleEnterKeyPress} register={register} label="apt " error={errors.lTSApt} name="lTSApt" />
        <TextField onKeyDown={handleEnterKeyPress} register={register} label="city " error={errors.lTSCity} name="lTSCity" />
        <TextField onKeyDown={handleEnterKeyPress} register={register} label="zip " error={errors.lTSZip} name="lTSZip" maxLength={6} />
        {/* <TextField onKeyDown={handleEnterKeyPress} register={register} label="commercial Description " error={errors.commercialDescription} name="commercialDescription" /> */}
        <TextField onKeyDown={handleEnterKeyPress} register={register} label="Other L&T Description " error={errors.oLTDescription} name="oLTDescription" />

        <Button text="filter" onClick={handleSubmit(serviceFilterFunction)} />
    </form>
}

export default Service