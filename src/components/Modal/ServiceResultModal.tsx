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
import { useGetAllData } from "../../hooks/getAllDataHook/useGetAllData"
import { showSpinnerReducer } from "../../redux/slice/spinner"
import { handleEnterKeyPress } from "../../utils/moveToNextFieldOnEnter"

const ServiceResultModal = () => {
    const disptach = useDispatch()
const {isLoading,error,data,refetch}=useGetAllData("/service-result/all-service-results")

    const {register,handleSubmit,formState:{errors,isSubmitting}}=useForm({resolver:zodResolver(serviceResultSchema)})
    const modalBody = <form className="mb-6">
        <TextField onKeyDown={handleEnterKeyPress}  label="Service Results Code" register={register} error={errors.serviceResultCode} name="serviceResultCode" required/>
<div className="mt-4" >

        <TextArea required label="Service Results Description" register={register} error={errors.serviceResultDescription} name="serviceResultDescription"/>
</div>
    </form>

    const addServiceResultFunction = async (data) => {
        // console.log(data)
        // disptach(showModalReducer(false))
        disptach(showSpinnerReducer(true))

        try {
            const res=await addServiceResultApi(data)
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
        modalHeading="Service Results"
        borderButtonText="cancel"
        // filledButtonText={isSubmitting?"adding":"add"}
        disabled={isSubmitting}
        filledButtonText="add"
        onBorderButtonClick={() => disptach(showModalReducer(false))}   
        onFilledButtonClick={handleSubmit(addServiceResultFunction)}
        modalBody={modalBody}
    />
}

export default ServiceResultModal