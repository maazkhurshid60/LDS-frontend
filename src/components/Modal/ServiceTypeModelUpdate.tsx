import React, { useEffect } from "react"
import Modal from "./Modal"
import { useDispatch } from "react-redux"
import { showModalReducer, showUpdateModalReducer } from "../../redux/slice/showModal"
import { useForm } from "react-hook-form"
import TextArea from "../InputFields/TextArea/TextArea"
import TextField from "../InputFields/TextField/TextField"
import { addServiceResultApi, updateServiceResultApi } from "../../apiservices/serviceResult/serviceResult";
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-toastify"
import { useGetAllData } from "../../hooks/getAllDataHook/useGetAllData"
import {  serviceTypeType } from "../../type/serviceResultType/serviceResultType"
import { serviceTypeSchema } from "../../schemas/serviceTypeSchema"
import { updateServiceTypeApi } from "../../apiservices/serviceTypeApi/serviceTypeApi"

type Props = {
    singledata: serviceTypeType | undefined; // Define props type here
};

const ServiceTypeModalUpdate: React.FC<Props> = ({ singledata }) => {
    const disptach = useDispatch()
const {isLoading,error,data,refetch}=useGetAllData("/service-type/all-service-types")
    const {register,handleSubmit,formState:{errors,isSubmitting},setValue}=useForm({resolver:zodResolver(serviceTypeSchema)})
    const modalBody = <form className="mb-6">
        <TextField label="Service Type Code" register={register} error={errors.serviceTypeCode} name="serviceTypeCode"/>
<div className="mt-4" >

        <TextArea label="Service Type Discription" register={register} error={errors.serviceTypeDescription} name="serviceTypeDescription"/>
</div>
    </form>
    const updateServiceResultFunction = async (data) => {
        // console.log(data)
        // disptach(showModalReducer(false))

        const updateData={...data,serviceTypeId:singledata?._id}
console.log(updateData)
        try {
            const res=await updateServiceTypeApi(updateData)
            alert(`${res?.data?.message}`)
            refetch()
        disptach(showUpdateModalReducer(false))
        } catch (error) {
            toast.error(`something went wrong`)
        }   
    }

useEffect(()=>{

    setValue("serviceTypeCode",singledata?.serviceTypeCode)
    setValue("serviceTypeDescription",singledata?.serviceTypeDescription)

},[])

    return <Modal
        modalHeading="Service Result"
        borderButtonText="cancel"
        filledButtonText={isSubmitting?"updating":"update"}
        onBorderButtonClick={() => disptach(showUpdateModalReducer(false))}   
        onFilledButtonClick={handleSubmit(updateServiceResultFunction)}
        modalBody={modalBody}
    />
}

export default ServiceTypeModalUpdate