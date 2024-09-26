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
import { showSpinnerReducer } from "../../redux/slice/spinner"
import { handleEnterKeyPress } from "../../utils/moveToNextFieldOnEnter"
import { ltServiceTypeSchema } from "../../schemas/ltServiceTypeSchema"
import { addLtServiceTypeApi } from "../../apiservices/L&TServiceTypeApi/L&TServiceTypeApi"
import { addStandardServiceTypeApi } from "../../apiservices/StandardServiceTypeApi copy/StandardServiceTypeApi"

const StandardServiceTypeModal = () => {
    const disptach = useDispatch()
    const { isLoading, error, data, refetch } = useGetAllData("/standard-service-type/all-standard-service-types")
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(ltServiceTypeSchema) })
    const modalBody = <form className=" flex items-center justify-start gap-x-8 gap-y-4 flex-wrap mb-8">
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField onKeyDown={handleEnterKeyPress} label="Name" register={register} error={errors.name} name="name" required />
        </div>


    </form>
    const addLtServiceTypeFunction = async (data) => {
        const addedData = { name: data?.name, isActive: false }

        disptach(showSpinnerReducer(true))
        try {
            const response = await addStandardServiceTypeApi(addedData)
            refetch()
            toast.success(`${response?.data?.message}`)
            disptach(showModalReducer(false))
        } catch (error) {
            toast.error("something went wrong. Try Later")
            disptach(showModalReducer(false))
        } finally {
            disptach(showSpinnerReducer(false))
        }
    }
    return <Modal
        modalHeading="Standard Service Type"
        borderButtonText="cancel"
        filledButtonText={isSubmitting ? "adding" : "add"}
        onBorderButtonClick={() => disptach(showModalReducer(false))}
        onFilledButtonClick={handleSubmit(addLtServiceTypeFunction)}
        modalBody={modalBody}
        disabled={isSubmitting}
    />
}

export default StandardServiceTypeModal