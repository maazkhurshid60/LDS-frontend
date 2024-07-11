import React, { useState } from "react";
import Modal from "./Modal";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userInputSectionSchema } from "../../schemas/userInputSectionSchema";
import PasswordField from "../InputFields/PasswordField/PasswordField";
import { useDispatch } from "react-redux";
import { showModalReducer } from "../../redux/slice/showModal";
import TextField from "../InputFields/TextField/TextField";
import SelectMultipleDropdown from "../dropdown/SelectMultipleDropdown";
import { useGetAllData } from "../../hooks/getAllDataHook/useGetAllData";
import { MdDeleteOutline } from "react-icons/md";
import { DeleteIcon } from "../Icons/DeleteIcon";
import { z } from "zod";
import { registerUserApi } from "../../apiservices/user/userApi";
import { toast } from "react-toastify";
export type FormFields = z.infer<typeof userInputSectionSchema>


const AddUserModal = () => {
    const { register, handleSubmit, formState: { errors ,isSubmitting}, control } = useForm<FormFields>({ resolver: zodResolver(userInputSectionSchema) })
    const { isLoading, error, data } = useGetAllData("/role/all-roles")

    const options = data?.map((options, index: number) => { return { label: options?.name, value: options?._id } })
    const [allSelectedRoles, setAllSelectedRoles] = useState<any>([])

    console.log(allSelectedRoles)
    const dipatch = useDispatch()
    // ADD USER
    const addUserFunction = async(data: any) => {

        const onlyName=allSelectedRoles?.map(data=>data?.name)
        const allData={...data,roles:onlyName}
        // console.log(">>>>>>>>>>>>",allData)
        // dipatch(showModalReducer(false))
        try {
            const res= await registerUserApi(allData)
            alert(`${res?.data?.message}`)
        } catch (error) {
            alert("Something went wrong or Network later.")
        }
    }
    // CLOSE MODAL
    const closeModal = () => {
        dipatch(showModalReducer(false))
    }
    // GET SELECTED ROLES
    const getSelectedRoles = (optionValue) => {
        // console.log("getselectedfunciton", optionValue)
        const selected = data?.find((options, index: number) => { return options?._id === optionValue })
        // console.log(selected)
        setAllSelectedRoles([...allSelectedRoles, selected])
        // dispatch(getMailAddress(optionValue))
    }
    // DELETE ROLE
    const deleteRole = (id: string) => {
        const filterUser = allSelectedRoles?.filter((data, index: number) => data?._id !== id)
        // console.log(filterUser)
        setAllSelectedRoles(filterUser)
    }

    // MODALFOOTER STARTS
    const body = <form className="flex  gap-4 mb-4  items-center justify-start gap-x-8 gap-y-4 flex-wrap">
        <div className="w-full md:w-[38%] xl:w-[30%] ">
            <TextField label="email" register={register} name="email" error={errors?.email} /></div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField label="user name" register={register} name="userName" error={errors?.userName} /></div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField label="first name" register={register} name="firstName" error={errors?.firstName} /></div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField label="last name" register={register} name="lastName" error={errors?.lastName} /></div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <PasswordField label="password" register={register} name="password" error={errors?.password} /></div>
        <div className="w-full md:w-[38%] xl:w-[100%] flex items-center gap-x-10">
            <div className="w-[30%]">
                <Controller name="roles" control={control} render={({ field }) => (
                    <SelectMultipleDropdown
                        options={options}
                        value={field.value}
                        onChange={field.onChange}
                        label="Client Mailing Addresses"
                        error={errors.roles?.message as string}
                        getMailFunction={getSelectedRoles}
                    />)} />
            </div>
            {/* SELECTED ROLES FOR USER WILL BE DISPLAYED*/}
            {allSelectedRoles?.length > 0 && <div className="w-[65%]">
                <h1 className="font-semibold capitalize text-sm">User Role</h1>
                <div className="flex items-center justify-start  gap-x-14 gap-y-1 flex-wrap w-full">
                    {allSelectedRoles?.map((data, index: any) => <div className="flex items-center gap-x-6">
                        <p className="text-sm font-normal capitalize" key={index}>{data?.name}</p>
                        <DeleteIcon onClick={() => deleteRole(data?._id)} />
                    </div>
                    )}

                </div>
            </div>
            }
        </div>
    </form>
    // MODALFOOTER ENDS
    return <Modal modalHeading="Add user" borderButtonText="cancel" filledButtonText={isSubmitting?"adding":"add"} modalBody={body} onFilledButtonClick={handleSubmit(addUserFunction)}
        onBorderButtonClick={closeModal} />
}

export default AddUserModal