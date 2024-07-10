import React from "react"
import Modal from "./Modal"
import { useDispatch } from "react-redux"
import { showModalReducer } from "../../redux/slice/showModal"
import { useForm } from "react-hook-form"
import TextArea from "../InputFields/TextArea/TextArea"
import TextField from "../InputFields/TextField/TextField"
import { addServiceResultApi } from "../../apiservices/serviceResult/serviceResult";
import { zodResolver } from "@hookform/resolvers/zod"
import { serviceResultSchema } from "../../schemas/serviceResultSchema"
import { toast } from "react-toastify"

const ServiceResultModal = () => {
    const disptach = useDispatch()
    const {register,handleSubmit,formState:{errors,isSubmitting}}=useForm({resolver:zodResolver(serviceResultSchema)})
    const modalBody = <form className="mb-6">
        <TextField label="Service Results Code" register={register} error={errors.serviceResultCode} name="serviceResultCode"/>
<div className="mt-4" >

        <TextArea label="Service Results Discription" register={register} error={errors.serviceResultDescription} name="serviceResultDescription"/>
</div>
    </form>

    const addServiceResultFunction = async (data) => {
        // console.log(data)
        // disptach(showModalReducer(false))

        try {
            const res=await addServiceResultApi(data)
            alert(`${res?.data?.message}`)
        disptach(showModalReducer(false))

        } catch (error) {
            toast.error(`something went wrong`)
        }
        
    }
    return <Modal
        modalHeading="Service Result"
        borderButtonText="cancel"
        filledButtonText={isSubmitting?"adding":"add"}
        onBorderButtonClick={() => disptach(showModalReducer(false))}   
        onFilledButtonClick={handleSubmit(addServiceResultFunction)}
        modalBody={modalBody}
    />
}

export default ServiceResultModal