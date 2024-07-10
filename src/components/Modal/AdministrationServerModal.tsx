import React from "react";
import Modal from "./Modal";
import { useDispatch } from "react-redux";
import TextField from "../InputFields/TextField/TextField"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userInputSectionSchema } from "../../schemas/addAdministrationServerSchema";
import { showModalReducer } from "../../redux/slice/showModal";
const AdministrationServerModal = () => {
    const dispatch = useDispatch()
const {register,handleSubmit,formState:{errors}}=useForm({resolver:zodResolver(userInputSectionSchema)})
    const modalBody = <form className="flex items-center justify-center gap-x-8 gap-y-4 flex-wrap mb-8 h-[50vh] overflow-y-scroll ">
        <div className="w-full md:w-[38%] xl:w-[30%]">

        <TextField label="code" register={register} error={errors.code} name="code" placeholder="Enter Code"/>
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
        <TextField label="firstName" register={register} error={errors.firstName} name="firstName" placeholder="Enter First Name"/>
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
        <TextField label="lastName" register={register} error={errors.lastName} name="lastName" placeholder="Enter Last Name"/>
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
        <TextField label="MI" register={register} error={errors.MI} name="MI" placeholder="Enter MI"/>
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
        <TextField label="address1" register={register} error={errors.address1} name="address1" placeholder="Enter Address"/>
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
        <TextField label="country" register={register} error={errors.country} name="country" placeholder="Enter Country"/>
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
        <TextField label="state" register={register} error={errors.state} name="state" placeholder="Enter State"/>
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
        <TextField label="city" register={register} error={errors.city} name="city" placeholder="Enter City"/>
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
        <TextField label="zip" register={register} error={errors.zip} name="zip" placeholder="Enter zip"/>
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
        <TextField label="phone" register={register} error={errors.phone} name="phone" placeholder="000011111110000"/>
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
        <TextField label="fax" register={register} error={errors.fax} name="fax" placeholder="Enter fax"/>
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
        <TextField label="license No" register={register} error={errors.licenseNo} name="licenseNo" placeholder="Enter License No"/>
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
        <TextField label="apt" register={register} error={errors.apt} name="apt" placeholder="Enter apt"/>
        </div>
    </form>

    // ADD ADMINISTRATION FUNCTION
    const administrationFunction=(data)=>{
        console.log(data)    
        dispatch(showModalReducer(false))
    }
    return <>
        <Modal
            modalHeading="Server"
            onBorderButtonClick={() => dispatch(showModalReducer(false))}
            onFilledButtonClick={handleSubmit(administrationFunction)}
            filledButtonText="Add"
            borderButtonText="cancel"
            modalBody={modalBody} />
    </>
}

export default AdministrationServerModal