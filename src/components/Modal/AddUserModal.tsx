import React from "react";
import Modal from "./Modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userInputSectionSchema } from "../../schemas/userInputSectionSchema";
import TextField from "../InputFields/TextField/TextField";
import { useDispatch } from "react-redux";
import { showModalReducer } from "../../redux/slice/showModal";


const AddUserModal = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(userInputSectionSchema) })
    const dipatch=useDispatch()
    // ADD USER
    const addUserFunction = (data: any) => {
        alert("clicked")
        console.log(data)
        dipatch(showModalReducer(false))
    }
    // CLOSE MODAL
    const closeModal=()=>{
        dipatch(showModalReducer(false))
    }
    // MODALFOOTER STARTS
    const body = <form className="flex flex-col gap-4 mb-4">
        <TextField label="email" register={register} name="email" error={errors?.email} />
        <TextField label="user name" register={register} name="userName" error={errors?.userName} />
        <TextField label="first name" register={register} name="firstName" error={errors?.firstName} />
        <TextField label="last name" register={register} name="lastName" error={errors?.lastName} />
    </form>
    // MODALFOOTER ENDS
    return <Modal modalHeading="Add user" borderButtonText="cancel" filledButtonText="add" modalBody={body} onFilledButtonClick={handleSubmit(addUserFunction)}
        onBorderButtonClick={closeModal} />
}

export default AddUserModal