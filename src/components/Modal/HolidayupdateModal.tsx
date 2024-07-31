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
import { holidaySchema } from "../../schemas/holidaySchema"
import TextArea from "../InputFields/TextArea/TextArea"
import { holidayType } from "../../type/holidayType/holidayType"
import { updateHolidayApi } from "../../apiservices/holidayApi/holidayApi"
type Props = {
    singledata: holidayType | undefined; // Define props type here
};
export type FormFields = z.infer<typeof holidaySchema>
const HolidayModalUpdate: React.FC<Props> = ({ singledata }) => {
    const disptach = useDispatch()

    const { isLoading, error, data, refetch } = useGetAllData("/holiday/all-holidays")

    const { register, handleSubmit, formState: { errors, isSubmitting }, setValue } = useForm<FormFields>({ resolver: zodResolver(holidaySchema) })
    const modalBody = <form className=" flex items-center justify-center gap-x-8 gap-y-4 flex-wrap mb-8">
          <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField label="Holiday Date" register={register} error={errors.holidayDate} name="holidayDate" type="date" />
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField label="Holiday Year" register={register} error={errors.holidayYear} name="holidayYear"/>
        </div>
        <div className="w-full ">
            <TextArea label="Holiday Description" register={register} error={errors.holidayDescription} name="holidayDescription" />
        </div>
        
    </form>
    const updateDeviceFunction = async (data) => {
        const updateData = { ...data, holidayId: singledata?._id }
        try {
            const res = await updateHolidayApi(updateData)
            toast.success(`${res?.data?.message}`)
            refetch()
            disptach(showUpdateModalReducer(false))
        } catch (error) {
            disptach(showUpdateModalReducer(false))
            toast.error(`something went wrong`)
        }
    }
    useEffect(() => {
        setValue("holidayYear", singledata?.holidayYear ?? "")
        setValue("holidayDate", singledata?.holidayDate ?? "")
        setValue("holidayDescription", singledata?.holidayDescription ?? "")
    }, [])
    return <Modal
        modalHeading="Update Holiday"
        borderButtonText="cancel"
        // filledButtonText={isSubmitting ? "updating" : "update"}
        disabled={isSubmitting}
        filledButtonText="update"
        onBorderButtonClick={() => disptach(showUpdateModalReducer(false))}
        onFilledButtonClick={handleSubmit(updateDeviceFunction)}
        modalBody={modalBody}
    />
}

export default HolidayModalUpdate