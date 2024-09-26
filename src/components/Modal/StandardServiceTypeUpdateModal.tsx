import React, { useEffect } from "react"
import Modal from "./Modal"
import { useDispatch } from "react-redux"
import { showModalReducer, showUpdateModalReducer } from "../../redux/slice/showModal"
import { useForm } from "react-hook-form"
import CheckBox from "../CheckBox/CustomCheckBox"
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
import { showSpinnerReducer } from "../../redux/slice/spinner"
import { handleEnterKeyPress } from "../../utils/moveToNextFieldOnEnter"
import { ltServiceTypeSchema } from "../../schemas/ltServiceTypeSchema"
import { updateLtServiceTypeApi } from "../../apiservices/L&TServiceTypeApi/L&TServiceTypeApi"
import { updateStandardServiceTypeApi } from "../../apiservices/StandardServiceTypeApi copy/StandardServiceTypeApi"
type Props = {
    singledata: any | undefined; // Define props type here
};
export type FormFields = z.infer<typeof ltServiceTypeSchema>
const StandardServiceTypeUpdateModal: React.FC<Props> = ({ singledata }) => {
    const disptach = useDispatch()

    const { isLoading, error, data, refetch } = useGetAllData("/standard-service-type/all-standard-service-types")

    const { register, handleSubmit, formState: { errors, isSubmitting }, setValue } = useForm<FormFields>({ resolver: zodResolver(ltServiceTypeSchema) })
    const modalBody = <form className=" flex items-center justify-start gap-x-8 gap-y-4 flex-wrap mb-8">
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField onKeyDown={handleEnterKeyPress} label="name" register={register} error={errors.name} name="name" required />
        </div>


    </form>
    const updateDeviceFunction = async (data) => {
        const updateData = { name: data?.name, isActive: false, standardServiceTypeId: singledata?._id }

        disptach(showSpinnerReducer(true))

        try {
            const res = await updateStandardServiceTypeApi(updateData)
            toast.success(`${res?.data?.message}`)
            refetch()
            disptach(showUpdateModalReducer(false))
        } catch (error) {
            disptach(showUpdateModalReducer(false))
            toast.error(`something went wrong`)
        } finally {
            disptach(showSpinnerReducer(false))

        }
    }
    useEffect(() => {
        setValue("name", singledata?.name ?? "")

    }, [])
    return <Modal
        modalHeading="Update Standard Service Type"
        borderButtonText="cancel"
        disabled={isSubmitting}
        filledButtonText="update"
        onBorderButtonClick={() => disptach(showUpdateModalReducer(false))}
        onFilledButtonClick={handleSubmit(updateDeviceFunction)}
        modalBody={modalBody}
    />
}

export default StandardServiceTypeUpdateModal