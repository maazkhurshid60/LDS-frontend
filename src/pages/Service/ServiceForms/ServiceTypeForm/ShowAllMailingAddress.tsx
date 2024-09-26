import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addingMailingSchema } from "../../../../schemas/service forms/addingMailing";
import { zodResolver } from "@hookform/resolvers/zod";
import TextField from "../../../../components/InputFields/TextField/TextField";
import CheckBox from "../../../../components/CheckBox/CustomCheckBox"
import Button from "../../../../components/Buttons/Button/Button"
import { useDispatch, useSelector } from "react-redux";
import { addMailAddress, createMailingAddressThunk, deleteMailingAddressThunk, getMailAddressAfterDeletion, isAddingMailAddressReducer, updateMailAddressIntoForm, updateMailAddressIntoFormL, updateMailingAddressThunk } from "../../../../redux/slice/mailingAdresses";
import { RootState } from "../../../../redux/store";
import { toast } from "react-toastify";
import BorderButton from "../../../../components/Buttons/BorderButton/BorderButton";

export interface AddMailingProps {
    data?: any
    id?: number
}

export type FormFields = z.infer<typeof addingMailingSchema>
const ShowAllAddMailingAddress: React.FC<AddMailingProps> = ({ data, id }) => {
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<FormFields>({ resolver: zodResolver(addingMailingSchema) })
    const dispatch = useDispatch()
    const isAddMail = useSelector((state: RootState) => state.mailingAdress.isAddingMailAddress)

    // ADD MAILING DATA FUNCTION STARTS
    const AddMailingFunction = async (data) => {
        const zip = parseInt(data?.zip)
        const mailAddres = { ...data, zip: zip }
        dispatch(createMailingAddressThunk(mailAddres))
        reset()

    }
    // ADD MAILING DATA FUNCTION ENDS
    // UPDATE MAILING DATA FUNCTION STARTS
    // UPDATE MAILING DATA FUNCTION 
    useEffect(() => {
        setValue("firstName", data?.firstName)
        setValue("rRR", data?.rRR)
        setValue("address", data?.address)
        setValue("city", data?.city)
        setValue("state", data?.state)
        setValue("apt", data?.apt)
        setValue("zip", JSON.stringify(data?.zip))
    }, [data])


    const UpdateMailingFunction = async (newData) => {
        const zip = parseInt(newData?.zip)
        const updatedData = { ...newData, mailingAddressId: data?._id, zip: zip }

        dispatch(updateMailingAddressThunk(updatedData))
    }


    const deleteMailingData = (data, id) => {
        dispatch(deleteMailingAddressThunk(data?._id))
        dispatch(getMailAddressAfterDeletion(id))
    }

    return <div>
        <h1 className="font-semibold text-md mb-4 capitalize">All Mailing Addresss {id && id}</h1>
        <form className="flex flex-col items-end">
            <div className="flex items-start w-full flex-wrap gap-x-8 gap-y-4 justify-between">
                <div className="w-[100%] md:w-[46%] lg:w-[30%]">

                    <label className=" font-normal sm:font-medium text-sm capitalize">Full Name</label>
                    <label className=" font-normal text-sm capitalize ml-10">{data?.firstName}</label>

                </div>
                <div className="w-[100%] md:w-[46%] lg:w-[30%]">

                    <label className=" font-normal sm:font-medium text-sm capitalize">Address</label>
                    <label className=" font-normal text-sm capitalize ml-10">{data?.address}</label>
                </div>
                <div className="w-[100%] md:w-[46%] lg:w-[30%]">

                    <label className=" font-normal sm:font-medium text-sm capitalize">City</label>
                    <label className=" font-normal text-sm capitalize ml-10">{data?.city}</label>
                </div>
                <div className="w-[100%] md:w-[46%] lg:w-[30%]">

                    <label className=" font-normal sm:font-medium text-sm capitalize">state</label>
                    <label className=" font-normal text-sm capitalize ml-10">{data?.state}</label>
                </div>
                <div className="w-[100%] md:w-[46%] lg:w-[30%]">

                    <label className=" font-normal sm:font-medium text-sm capitalize">Apt</label>
                    <label className=" font-normal text-sm capitalize ml-10">{data?.apt}</label>
                </div>
                <div className="w-[100%] md:w-[46%] lg:w-[30%]">

                    <label className=" font-normal sm:font-medium text-sm capitalize">zip</label>
                    <label className=" font-normal text-sm capitalize ml-10">{data?.zip}</label>
                </div>
                <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                    <CheckBox
                        register={register} label="RRR" error={errors.rRR?.message} name="rRR" />
                </div>
            </div>
        </form>
    </div>
}

export default ShowAllAddMailingAddress