import React from "react";
import Modal from "./Modal";
import { useDispatch } from "react-redux";
import TextField from "../InputFields/TextField/TextField"
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userInputSectionSchema } from "../../schemas/addAdministrationServerSchema";
import { showModalReducer } from "../../redux/slice/showModal";
import Dropdown from "../dropdown/Dropdown"
import CheckBox from "../CheckBox/CheckBox"
import { z } from "zod";
import { toast } from "react-toastify";
import { addServerApi } from "../../apiservices/serverApi/serverApi";
import { useGetAllData } from "../../hooks/getAllDataHook/useGetAllData";
import { usePaginationCalc } from "../../hooks/paginationCalc/usePaginationCalc";
import { showSpinnerReducer } from "../../redux/slice/spinner";
import { handleEnterKeyPress } from "../../utils/moveToNextFieldOnEnter";
export type FormFields = z.infer<typeof userInputSectionSchema>

const AdministrationServerModal = () => {
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors, isSubmitting }, control, setValue } = useForm<FormFields>({ resolver: zodResolver(userInputSectionSchema) })
    const { isLoading, error, data } = useGetAllData("/device/all-devices")
    const { refetch } = useGetAllData("/server/all-servers")

    const options = data?.map((options, index: number) => { return { label: options?.deviceCode, value: options?._id } })
    const handleZipChange = (event) => {
        const { value } = event.target;
        const sanitizedValue = value.replace(/[^a-zA-Z0-9]/g, ''); // Allow only letters and numbers

        // Limit to a maximum of 9 characters
        const limitedValue = sanitizedValue.slice(0, 9);

        let formattedValue = limitedValue;
        if (limitedValue.length > 5) {
            formattedValue = `${limitedValue.slice(0, 5)}-${limitedValue.slice(5)}`;
        }

        setValue("zip", formattedValue); // Update the form state
    };
    const modalBody = <form className="flex items-center justify-start gap-x-8 gap-y-4 flex-wrap mb-8 h-[50vh] overflow-y-scroll ">
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField onKeyDown={handleEnterKeyPress} label="server Code" register={register} error={errors.serverCode} name="serverCode" placeholder="Enter Code" />
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
            <TextField onKeyDown={handleEnterKeyPress} label="first Name" register={register} error={errors.firstName} name="firstName" placeholder="Enter First Name" />
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField onKeyDown={handleEnterKeyPress} label="last Name" register={register} error={errors.lastName} name="lastName" placeholder="Enter Last Name" />
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField onKeyDown={handleEnterKeyPress} label="address 1" register={register} error={errors.address1} name="address1" placeholder="Enter Address" />
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField onKeyDown={handleEnterKeyPress} label="address 2" register={register} error={errors.address2} name="address2" placeholder="Enter Address" />
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField onKeyDown={handleEnterKeyPress} label="country" register={register} error={errors.country} name="country" placeholder="Enter Country" />
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField onKeyDown={handleEnterKeyPress} label="state" register={register} error={errors.state} name="state" placeholder="Enter State" />
        </div>

        <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField onKeyDown={handleEnterKeyPress} label="zip" register={register} error={errors.zip} name="zip" placeholder="Enter zip" maxLength={12} onChange={handleZipChange} />
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField onKeyDown={handleEnterKeyPress} label="phone" register={register} error={errors.phone} name="phone" placeholder="000011111110000" />
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField onKeyDown={handleEnterKeyPress} label="fax" register={register} error={errors.fax} name="fax" placeholder="Enter fax" />
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField onKeyDown={handleEnterKeyPress} label="license No" register={register} error={errors.licenseNo} name="licenseNo" placeholder="Enter License No" />
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField onKeyDown={handleEnterKeyPress} label="apt" register={register} error={errors.apt} name="apt" placeholder="Enter apt" />
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <CheckBox onKeyDown={handleEnterKeyPress} label="Active" register={register} error={errors.isActive?.message} name="isActive" />
        </div>
    </form>

    // ADD ADMINISTRATION FUNCTION
    const administrationFunction = async (data) => {
        const licenseNo = parseInt(data?.licenseNo)
        const postData = { ...data, licenseNo }
        dispatch(showSpinnerReducer(true))
        try {
            const response = await addServerApi(postData)
            toast.success(`server added successfully`)
            refetch()
            dispatch(showModalReducer(false))

        } catch (error) {
            dispatch(showModalReducer(false))
            toast.error("Some thing went wrong or already server code exist")
        } finally {
            dispatch(showSpinnerReducer(false))
        }
    }
    return <>
        <Modal
            modalHeading="Server"
            onBorderButtonClick={() => dispatch(showModalReducer(false))}
            onFilledButtonClick={handleSubmit(administrationFunction)}
            filledButtonText="Add"
            borderButtonText="cancel"
            disabled={isSubmitting}
            modalBody={modalBody} />
    </>
}

export default AdministrationServerModal