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
import { useGetAllData } from "../../hooks/getAllDataHook/useGetAllData"

const HolidayModal = () => {
    const disptach = useDispatch()
    const { isLoading, error, data, refetch } = useGetAllData("/holiday/all-holidays")

    const { register, handleSubmit, formState: { errors,isSubmitting } } = useForm({ resolver: zodResolver(holidaySchema) })
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
    const addHolidayFunction =async (data) => {
        const holidayYear=parseInt(data?.holidayYear)
        const postHolidayData={...data,holidayYear}
        console.log(postHolidayData)
        // disptach(showModalReducer(false))
        try {
            const response=await addHolidayApi(postHolidayData)
            refetch()
            toast.success(`${response?.data?.message}`)
            disptach(showModalReducer(false))
        } catch (error) {
            toast.success("something went wrong. Try Later")
            disptach(showModalReducer(false))

        }
    }
    return <Modal
        modalHeading="Holiday"
        borderButtonText="cancel"
        filledButtonText="add"
        // filledButtonText={isSubmitting?"adding":"add"}
        onBorderButtonClick={() => disptach(showModalReducer(false))}
        onFilledButtonClick={handleSubmit(addHolidayFunction)}
        modalBody={modalBody}
    />
}

export default HolidayModal