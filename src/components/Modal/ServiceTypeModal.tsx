import React from "react"
import Modal from "./Modal"
import { useDispatch } from "react-redux"
import { showModalReducer } from "../../redux/slice/showModal"
import { useForm } from "react-hook-form"
import TextArea from "../InputFields/TextArea/TextArea"
import { zodResolver } from "@hookform/resolvers/zod"
import TextField from "../InputFields/TextField/TextField"
import { serviceTypeSchema } from "../../schemas/serviceTypeSchema"
import { addServiceTypeApi } from "../../apiservices/serviceTypeApi/serviceTypeApi"
import { useGetAllData } from "../../hooks/getAllDataHook/useGetAllData"
import { toast } from "react-toastify"
import { showSpinnerReducer } from "../../redux/slice/spinner"
const ServiceTypeModal = () => {
    const disptach = useDispatch()
    const {register,handleSubmit,formState:{errors,isSubmitting}}=useForm({resolver:zodResolver(serviceTypeSchema)})
    const {isLoading,error,data,refetch}=useGetAllData("/service-type/all-service-types")

    const modalBody = <form className="mb-6">
        <TextField label="Service Type Code" register={register} error={errors.serviceTypeCode} name="serviceTypeCode" required/>
<div className="mt-4" >

        <TextArea label="Service Type Description" register={register} error={errors.serviceTypeDescription} name="serviceTypeDescription"/>
</div>
    </form>
    const addServiceResultFunction = async(data) => {
        disptach(showSpinnerReducer(true))

        try {
            const res=await addServiceTypeApi(data)
            toast.success(`${res?.data?.message}`)
            refetch()
        disptach(showModalReducer(false))

        } catch (error) {
        toast.error(`something went wrong`)
        disptach(showModalReducer(false))

        }finally{
            disptach(showSpinnerReducer(false))

        }
    }
    return <Modal
        modalHeading="Service Type"
        borderButtonText="cancel"
        // filledButtonText={isSubmitting?"adding":"add"}
        disabled={isSubmitting}
        filledButtonText="add"
        onBorderButtonClick={() => disptach(showModalReducer(false))}
        onFilledButtonClick={handleSubmit(addServiceResultFunction)}
        modalBody={modalBody}
    />
}

export default ServiceTypeModal