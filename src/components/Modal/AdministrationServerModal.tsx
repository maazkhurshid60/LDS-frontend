import React from "react";
import Modal from "./Modal";
import { useDispatch } from "react-redux";
import TextField from "../InputFields/TextField/TextField"
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userInputSectionSchema } from "../../schemas/addAdministrationServerSchema";
import { showModalReducer } from "../../redux/slice/showModal";
import Dropdown from "../dropdown/Dropdown"
import CheckBox from "../CheckBox/CustomCheckBox"
import { z } from "zod";
import { toast } from "react-toastify";
import { addServerApi } from "../../apiservices/serverApi/serverApi";
import { useGetAllData } from "../../hooks/getAllDataHook/useGetAllData";
import { usePaginationCalc } from "../../hooks/paginationCalc/usePaginationCalc";
export type FormFields = z.infer<typeof userInputSectionSchema>

const AdministrationServerModal = () => {
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors, isSubmitting }, control } = useForm<FormFields>({ resolver: zodResolver(userInputSectionSchema) })
    const { isLoading, error, data } = useGetAllData("/device/all-devices")
    const { refetch } = useGetAllData("/server/all-servers")

    const options = data?.map((options, index: number) => { return { label: options?.deviceCode, value: options?._id } })
    console.log(":data", data, "options", options)

    const modalBody = <form className="flex items-center justify-start gap-x-8 gap-y-4 flex-wrap mb-8 h-[50vh] overflow-y-scroll ">
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField label="server Code" register={register} error={errors.serverCode} name="serverCode" placeholder="Enter Code" />
        </div>
        <div className="w-[30%]">
            <Controller name="deviceCode" control={control} render={({ field }) => (
                <Dropdown
                    options={options}
                    value={field.value}
                    onChange={field.onChange}
                    label="Device Code"
                    error={errors.deviceCode?.message as string}
                />)} />
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField label="first Name" register={register} error={errors.firstName} name="firstName" placeholder="Enter First Name" />
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField label="last Name" register={register} error={errors.lastName} name="lastName" placeholder="Enter Last Name" />
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField label="address 1" register={register} error={errors.address1} name="address1" placeholder="Enter Address" />
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField label="address 2" register={register} error={errors.address2} name="address2" placeholder="Enter Address" />
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField label="country" register={register} error={errors.country} name="country" placeholder="Enter Country" />
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField label="state" register={register} error={errors.state} name="state" placeholder="Enter State" />
        </div>
        {/* <div className="w-full md:w-[38%] xl:w-[30%]">
        <TextField label="city" register={register} error={errors.city} name="city" placeholder="Enter City"/>
        </div> */}
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField label="zip" register={register} error={errors.zip} name="zip" placeholder="Enter zip" />
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField label="phone" register={register} error={errors.phone} name="phone" placeholder="000011111110000" />
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField label="fax" register={register} error={errors.fax} name="fax" placeholder="Enter fax" />
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField label="license No" register={register} error={errors.licenseNo} name="licenseNo" placeholder="Enter License No" />
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField label="apt" register={register} error={errors.apt} name="apt" placeholder="Enter apt" />
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <CheckBox label="Active" register={register} error={errors.isActive?.message} name="isActive" />
        </div>
    </form>

    // ADD ADMINISTRATION FUNCTION
    const administrationFunction = async (data) => {
        console.log(typeof parseInt(data?.zip))
        const zip = parseInt(data?.zip)
        const licenseNo = parseInt(data?.licenseNo)
        const postData = { ...data, zip, licenseNo }
        // console.log(postData)
        try {
            const response = await addServerApi(postData)
            toast.success(`server added successfully`)
            refetch()
            dispatch(showModalReducer(false))

        } catch (error) {
            console.log(error)
            dispatch(showModalReducer(false))
            toast.error("Some thing went wrong or already server code exist")
        }
    }
    return <>
        <Modal
            modalHeading="Server"
            onBorderButtonClick={() => dispatch(showModalReducer(false))}
            onFilledButtonClick={handleSubmit(administrationFunction)}
            // filledButtonText={isSubmitting?"adding":"Add"}
            filledButtonText="Add"
            borderButtonText="cancel"
            disabled={isSubmitting}
            modalBody={modalBody} />
    </>
}

export default AdministrationServerModal