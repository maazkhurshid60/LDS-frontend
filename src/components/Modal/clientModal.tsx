import React from "react";
import Modal from "./Modal"
import { useDispatch } from "react-redux";
import { showModalReducer } from "../../redux/slice/showModal"
import TextField from "../InputFields/TextField/TextField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { clientSchema } from "../../schemas/clientSchema";
import CheckBox from "../CheckBox/CheckBox"
import { z } from "zod";
import { addClientApi } from "../../apiservices/clientApi/clientApi";
import { toast } from "react-toastify";
import { useGetAllData } from "../../hooks/getAllDataHook/useGetAllData";
import { showSpinnerReducer } from "../../redux/slice/spinner";
import { handleEnterKeyPress } from "../../utils/moveToNextFieldOnEnter";
export type FormFields = z.infer<typeof clientSchema>
const ClientModal = () => {
    const dispatch = useDispatch()
    const { isLoading, error, data, refetch } = useGetAllData("/client/all-clients")

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormFields>({ resolver: zodResolver(clientSchema) })
    const modalBody = <form className="flex items-center justify-center gap-x-8 gap-y-4 flex-wrap mb-8 h-[50vh] overflow-y-scroll ">
        <div className="w-full md:w-[38%] xl:w-[30%]">

            <TextField onKeyDown={handleEnterKeyPress} label="code" register={register} error={errors.code} name="code" placeholder="Enter Code" required />
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField onKeyDown={handleEnterKeyPress} label="full Name" register={register} error={errors.fullName} name="fullName" placeholder="Enter full Name" required />
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField onKeyDown={handleEnterKeyPress} label="MI" register={register} error={errors.mi} name="mi" placeholder="Enter MI" />
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField onKeyDown={handleEnterKeyPress} label="address 1" register={register} error={errors.address1} name="address1" placeholder="Enter Address" />
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField onKeyDown={handleEnterKeyPress} label="address 2" register={register} error={errors.address2} name="address2" placeholder="Enter Address" />
        </div>

        <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField onKeyDown={handleEnterKeyPress} label="state" register={register} error={errors.state} name="state" placeholder="Enter State" />
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField onKeyDown={handleEnterKeyPress} label="city" register={register} error={errors.city} name="city" placeholder="Enter City" />
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField onKeyDown={handleEnterKeyPress} label="zip" register={register} error={errors.zip} name="zip" placeholder="Enter zip" />
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField onKeyDown={handleEnterKeyPress} label="phone" register={register} error={errors.phone} name="phone" placeholder="000011111110000" required />
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField onKeyDown={handleEnterKeyPress} label="fax" register={register} error={errors.fax} name="fax" placeholder="Enter fax" />
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField onKeyDown={handleEnterKeyPress} label="apt" register={register} error={errors.apt} name="apt" placeholder="Enter apt" />
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <CheckBox label="Enable Case Navigation" register={register} error={errors.isActive?.message} name="isActive" />
        </div>
    </form>

    // ADD CLIENT FUNCTION
    const addClientFunction = async (data) => {
        const zip = parseInt(data?.zip)
        const allData = { ...data, zip }
        dispatch(showSpinnerReducer(true))
        try {
            const res = await addClientApi(allData)
            refetch()
            toast.success(`${res?.data?.message}`)
            dispatch(showModalReducer(false))
        } catch (error) {
            toast.error("Something went wrong or Network Error")
            dispatch(showModalReducer(false))
        } finally {
            dispatch(showSpinnerReducer(false))
        }

    }
    return <Modal
        modalBody={modalBody}
        borderButtonText="cancel"
        // filledButtonText={isSubmitting?"adding":"add"}
        filledButtonText="add"
        onBorderButtonClick={() => dispatch(showModalReducer(false))}
        disabled={isSubmitting}
        onFilledButtonClick={handleSubmit(addClientFunction)} />

}

export default ClientModal