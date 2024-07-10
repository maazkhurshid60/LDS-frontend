import React from "react"
import Modal from "./Modal"
import { useDispatch } from "react-redux"
import { showModalReducer } from "../../redux/slice/showModal"
import { useForm } from "react-hook-form"
import TextArea from "../InputFields/TextArea/TextArea"
import { zodResolver } from "@hookform/resolvers/zod"
import { serviceResultSchema } from "../../schemas/serviceResultSchema"

const ServiceResultModal = () => {
    const disptach = useDispatch()
    const {register,handleSubmit,formState:{errors}}=useForm({resolver:zodResolver(serviceResultSchema)})
    const modalBody = <form className="mb-6">
        <TextArea label="Service Results Discription" register={register} error={errors.descriptionServiceResult} name="descriptionServiceResult"/>
    </form>

    const addServiceResultFunction = (data) => {
        console.log(data)
        disptach(showModalReducer(false))
        
    }
    return <Modal
        modalHeading="Service Result"
        borderButtonText="cancel"
        filledButtonText="add"
        onBorderButtonClick={() => disptach(showModalReducer(false))}   
        onFilledButtonClick={handleSubmit(addServiceResultFunction)}
        modalBody={modalBody}
    />
}

export default ServiceResultModal