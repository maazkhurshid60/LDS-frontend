import React from "react"
import Modal from "./Modal"
import { useDispatch } from "react-redux"
import { showModalReducer } from "../../redux/slice/showModal"
import { useForm } from "react-hook-form"
import TextArea from "../InputFields/TextArea/TextArea"
import { zodResolver } from "@hookform/resolvers/zod"
import { holidaySchema } from "../../schemas/holidaySchema"
import TextField from "../InputFields/TextField/TextField"
import useGenerateYears from "../../hooks/generateYears/useGenereateYears"
import { toast } from "react-toastify"
import { addServerApi } from "../../apiservices/serverApi/serverApi"
import { addHolidayApi } from "../../apiservices/holidayApi/holidayApi"
import { settingSchema } from "../../schemas/settingSchema"
import CheckBox from "../CheckBox/CustomCheckBox"

import { z } from "zod"
import { addSettingApi } from "../../apiservices/settingApi/settingApi"
import { showSpinnerReducer } from "../../redux/slice/spinner"
export type FormFields = z.infer<typeof settingSchema>

const SettingModal = () => {
    const disptach = useDispatch()
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormFields>({ resolver: zodResolver(settingSchema) })
    const modalBody = <form className=" flex items-center justify-start gap-x-8 gap-y-4 flex-wrap mb-8">
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField label="Label" register={register} error={errors.label} name="label" />
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <CheckBox label="Active" register={register} error={errors.value?.message} name="value" />
        </div>


    </form>
    const addSettingFunction = async (data) => {
        disptach(showSpinnerReducer(true))

        try {
            const response = await addSettingApi(data)
            toast.success(`${response?.data?.message}`)
            disptach(showModalReducer(false))
        } catch (error) {
            disptach(showModalReducer(false))
            toast.error("something went wrong. Try Later")
        } finally {
            disptach(showSpinnerReducer(false))

        }
    }
    return <Modal
        modalHeading="Setting"
        borderButtonText="cancel"
        disabled={isSubmitting}
        filledButtonText="add"
        onBorderButtonClick={() => disptach(showModalReducer(false))}
        onFilledButtonClick={handleSubmit(addSettingFunction)}
        modalBody={modalBody}
    />
}

export default SettingModal