import React from "react";
import Modal from "./Modal"
import { useDispatch } from "react-redux";
import { showModalReducer } from "../../redux/slice/showModal"
import TextField from "../InputFields/TextField/TextField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { deviceSchema } from "../../schemas/DeviceSchema";
const DeviceModal = () => {
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(deviceSchema) })
    const modalBody = <form className="flex items-center justify-center gap-x-8 gap-y-8 flex-wrap mb-8 overflow-y-scroll ">
        <div className="w-full md:w-[38%] xl:w-[30%]">

            <TextField label="device code" register={register} error={errors.deviceCode} name="deviceCode" placeholder="Enter Device Code" />
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField label="device id" register={register} error={errors.deviceId} name="deviceId" placeholder="Enter Device Id" />
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField label="device Name" register={register} error={errors.deviceName} name="deviceName" placeholder="Enter Device Name" />
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField label="product Type" register={register} error={errors.productType} name="productType" placeholder="Enter Product Type" />
        </div>
        
    </form>

     // ADD CLIENT FUNCTION
     const addDeviceFunction=(data)=>{
        console.log(data)    
        dispatch(showModalReducer(false))
    }
    return <Modal
        modalBody={modalBody}
        borderButtonText="cancel"
        filledButtonText="Add"
        onBorderButtonClick={() => dispatch(showModalReducer(false))}
        onFilledButtonClick={handleSubmit(addDeviceFunction)} />

}

export default DeviceModal