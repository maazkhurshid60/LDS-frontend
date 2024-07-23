import React, { useEffect } from "react"
import Modal from "./Modal"
import { useDispatch } from "react-redux"
import { showModalReducer, showUpdateModalReducer } from "../../redux/slice/showModal"
import { useForm } from "react-hook-form"
import CheckBox from "../../components/CheckBox/CustomCheckBox"
import TextField from "../InputFields/TextField/TextField"
import { addServiceResultApi, updateServiceResultApi } from "../../apiservices/serviceResult/serviceResult";
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-toastify"
import { useGetAllData } from "../../hooks/getAllDataHook/useGetAllData"
import { clientType } from "../../type/clientType/clientType"
import { clientSchema } from "../../schemas/clientSchema"
import { z } from "zod"
import { updateClientApi } from "../../apiservices/clientApi/clientApi"
import { deviceSchema } from "../../schemas/DeviceSchema"
import { deviceType } from "../../type/deviceType/deviceType"
import { updateDeviceApi } from "../../apiservices/deviceApi/deviceApi"
type Props = {
    singledata: deviceType | undefined; // Define props type here
};
export type FormFields = z.infer<typeof deviceSchema>
const DeviceModalUpdate: React.FC<Props> = ({ singledata }) => {
    const disptach = useDispatch()
    const { isLoading, error, data, refetch } = useGetAllData("/client/all-clients")
    const { register, handleSubmit, formState: { errors, isSubmitting }, setValue } = useForm<FormFields>({ resolver: zodResolver(deviceSchema) })
    const modalBody = <form className="flex items-center justify-center gap-x-8 gap-y-8 flex-wrap mb-8 overflow-y-scroll ">
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
    const updateDeviceFunction = async (data) => {
        const updateData = { ...data, id: singledata?._id }
        try {
            const res = await updateDeviceApi(updateData)
            alert(`${res?.data?.message}`)
            refetch()
            disptach(showUpdateModalReducer(false))
        } catch (error) {
            toast.error(`something went wrong`)
        }
    }
    useEffect(() => {
        setValue("deviceId", singledata?.deviceId ?? "")
        setValue("deviceCode", singledata?.deviceCode ?? "")
        setValue("deviceName", singledata?.deviceName ?? "")
        setValue("productType", singledata?.productType ?? "")
        setValue("isActive", singledata?.isActive ?? true)
        console.log(">>>>>>>>>>>>>>>",typeof singledata?.deviceId)
    }, [])
    return <Modal
        modalHeading="Update Device"
        borderButtonText="cancel"
        filledButtonText={isSubmitting ? "updating" : "update"}
        onBorderButtonClick={() => disptach(showUpdateModalReducer(false))}
        onFilledButtonClick={handleSubmit(updateDeviceFunction)}
        modalBody={modalBody}
    />
}

export default DeviceModalUpdate