import React from "react";
import Modal from "./Modal"
import { useDispatch } from "react-redux";
import { showModalReducer } from "../../redux/slice/showModal"
import TextField from "../InputFields/TextField/TextField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { deviceSchema } from "../../schemas/DeviceSchema";
import CheckBox from "../CheckBox/CustomCheckBox"
import { z } from "zod";
import { toast } from "react-toastify";
import { addDeviceApi } from "../../apiservices/deviceApi/deviceApi";
import { useGetAllData } from "../../hooks/getAllDataHook/useGetAllData";
export type FormFields = z.infer<typeof deviceSchema>

const DeviceModal = () => {
    const dispatch = useDispatch()
    const { isLoading, error, data,refetch } = useGetAllData("/device/all-devices")

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormFields>({ resolver: zodResolver(deviceSchema) })
    const modalBody = <form className="flex items-center justify-start gap-x-8 gap-y-8 flex-wrap mb-8 overflow-y-scroll ">
        <div className="w-full md:w-[38%] xl:w-[30%]">

            <TextField label="device code" register={register} error={errors.deviceCode} name="deviceCode" placeholder="Enter Device Code" />
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField label="device Name" register={register} error={errors.deviceName} name="deviceName" placeholder="Enter Device Name" />
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField label="product Type" register={register} error={errors.productType} name="productType" placeholder="Enter Product Type" />
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <CheckBox label="Active" register={register} error={errors.isActive?.message} name="isActive" />
        </div>

    </form>

    // ADD CLIENT FUNCTION
    const addDeviceFunction = async (data) => {

        try {
            const response = await addDeviceApi(data)
            toast.success(`${response?.data?.message}`)
            dispatch(showModalReducer(false))
            refetch()
        } catch (error) {
            toast.error("Something went wrong. Try later")
            dispatch(showModalReducer(false))
        }
        // dispatch(showModalReducer(false))
    }
    return <Modal
        modalBody={modalBody}
        borderButtonText="cancel"
        // filledButtonText={isSubmitting?"Adding":"Add"}
        filledButtonText="Add"
        onBorderButtonClick={() => dispatch(showModalReducer(false))}
        onFilledButtonClick={handleSubmit(addDeviceFunction)} />

}

export default DeviceModal