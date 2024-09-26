import React, { useEffect } from "react"
import Modal from "./Modal"
import { useDispatch } from "react-redux"
import { showModalReducer, showUpdateModalReducer } from "../../redux/slice/showModal"
import { useForm } from "react-hook-form"
import CheckBox from "../../components/CheckBox/CheckBox"
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
import { showSpinnerReducer } from "../../redux/slice/spinner"
import { handleEnterKeyPress } from "../../utils/moveToNextFieldOnEnter"
type Props = {
    singledata: deviceType | undefined; // Define props type here
};
export type FormFields = z.infer<typeof deviceSchema>
const DeviceModalUpdate: React.FC<Props> = ({ singledata }) => {
    const disptach = useDispatch()
    const { isLoading, error, data, refetch } = useGetAllData("/device/all-devices")
    const { register, handleSubmit, formState: { errors, isSubmitting }, setValue } = useForm<FormFields>({ resolver: zodResolver(deviceSchema) })
    const modalBody = <form className="flex items-center justify-start gap-x-8 gap-y-8 flex-wrap mb-8 overflow-y-scroll ">
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField onKeyDown={handleEnterKeyPress} label="device code" register={register} error={errors.deviceCode} name="deviceCode" placeholder="Enter Device Code" required />
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField onKeyDown={handleEnterKeyPress} label="device Name" register={register} error={errors.deviceName} name="deviceName" placeholder="Enter Device Name" required />
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField onKeyDown={handleEnterKeyPress} label="product Type" register={register} error={errors.productType} name="productType" placeholder="Enter Product Type" />
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <CheckBox onKeyDown={handleEnterKeyPress} label="Active" register={register} error={errors.isActive?.message} name="isActive" />
        </div>
    </form>
    const updateDeviceFunction = async (data) => {
        const updateData = { ...data, id: singledata?._id }
        disptach(showSpinnerReducer(true))

        try {
            const res = await updateDeviceApi(updateData)
            toast.success(`${res?.data?.message}`)
            refetch()
            disptach(showUpdateModalReducer(false))
        } catch (error) {
            toast.error(`something went wrong`)
            disptach(showUpdateModalReducer(false))
        } finally {
            disptach(showSpinnerReducer(false))

        }
    }
    useEffect(() => {
        setValue("deviceCode", singledata?.deviceCode ?? "")
        setValue("deviceName", singledata?.deviceName ?? "")
        setValue("productType", singledata?.productType ?? "")
        setValue("isActive", singledata?.isActive ?? true)
    }, [])
    return <Modal
        modalHeading="Update Device"
        borderButtonText="cancel"
        filledButtonText="update"
        disabled={isSubmitting}
        onBorderButtonClick={() => disptach(showUpdateModalReducer(false))}
        onFilledButtonClick={handleSubmit(updateDeviceFunction)}
        modalBody={modalBody}
    />
}

export default DeviceModalUpdate