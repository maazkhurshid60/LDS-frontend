import React, { useEffect } from "react"
import Modal from "./Modal"
import { useDispatch } from "react-redux"
import { showModalReducer, showUpdateModalReducer } from "../../redux/slice/showModal"
import { useForm } from "react-hook-form"
import TextArea from "../InputFields/TextArea/TextArea"
import TextField from "../InputFields/TextField/TextField"
import { addServiceResultApi, updateServiceResultApi } from "../../apiservices/serviceResult/serviceResult";
import { zodResolver } from "@hookform/resolvers/zod"
import { serviceResultSchema } from "../../schemas/serviceResultSchema"
import { toast } from "react-toastify"
import { useGetAllData } from "../../hooks/getAllDataHook/useGetAllData"
import { serviceResultType } from "../../type/serviceResultType/serviceResultType"

type Props = {
    singledata: serviceResultType | undefined; // Define props type here
};

const ServiceResultModalUpdate: React.FC<Props> = ({ singledata }) => {
    const disptach = useDispatch()
const {isLoading,error,data,refetch}=useGetAllData("/service-result/all-service-results")
    const {register,handleSubmit,formState:{errors,isSubmitting},setValue}=useForm({resolver:zodResolver(serviceResultSchema)})
    const modalBody = <form className="mb-6">
        <TextField label="Service Results Code" register={register} error={errors.serviceResultCode} name="serviceResultCode"/>
<div className="mt-4" >

        <TextArea label="Service Results Discription" register={register} error={errors.serviceResultDescription} name="serviceResultDescription"/>
</div>
    </form>
    const updateServiceResultFunction = async (data) => {
        // console.log(data)
        // disptach(showModalReducer(false))

        const updateData={...data,serviceResultId:singledata?._id}
console.log(updateData)
        try {
            const res=await updateServiceResultApi(updateData)
            toast.success(`${res?.data?.message}`)
            refetch()
        disptach(showUpdateModalReducer(false))
        } catch (error) {
        disptach(showUpdateModalReducer(false))
            toast.error(`something went wrong`)
        }   
    }

useEffect(()=>{

    setValue("serviceResultCode",singledata?.serviceResultCode)
    setValue("serviceResultDescription",singledata?.serviceResultDescription)

},[])

    return <Modal
        modalHeading="Service Result"
        borderButtonText="cancel"
        // filledButtonText={isSubmitting?"updating":"update"}
        filledButtonText="update"

        onBorderButtonClick={() => disptach(showUpdateModalReducer(false))}   
        onFilledButtonClick={handleSubmit(updateServiceResultFunction)}
        modalBody={modalBody}
    />
}

export default ServiceResultModalUpdate