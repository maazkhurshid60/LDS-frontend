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
const ServiceTypeModal = () => {
    const disptach = useDispatch()
    const {register,handleSubmit,formState:{errors,isSubmitting}}=useForm({resolver:zodResolver(serviceTypeSchema)})
    const modalBody = <form className="mb-6">
        <TextField label="Service Type Code" register={register} error={errors.serviceTypeCode} name="serviceTypeCode"/>
<div className="mt-4" >

        <TextArea label="Service Type Discription" register={register} error={errors.serviceTypeDescription} name="serviceTypeDescription"/>
</div>
    </form>
    const addServiceResultFunction = async(data) => {
        try {
            const res=await addServiceTypeApi(data)
            alert(`${res?.data?.message}`)
        disptach(showModalReducer(false))

        } catch (error) {
        alert(`something went wrong`)
        }
    }
    return <Modal
        modalHeading="Service Type"
        borderButtonText="cancel"
        filledButtonText={isSubmitting?"adding":"add"}
        onBorderButtonClick={() => disptach(showModalReducer(false))}
        onFilledButtonClick={handleSubmit(addServiceResultFunction)}
        modalBody={modalBody}
    />
}

export default ServiceTypeModal