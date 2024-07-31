import React, { useEffect } from "react";
import Modal from "./Modal"
import { useDispatch, useSelector } from "react-redux";
import { showModalReducer, showRoleModalReducer } from "../../redux/slice/showModal"
import TextField from "../InputFields/TextField/TextField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CheckBox from "../CheckBox/CustomCheckBox"
import { roleSchema } from "../../schemas/roleSchema";
import { z } from "zod";
import { addRole, emptyOneRole, updateRole } from "../../redux/slice/roles";
import { RootState } from "../../redux/store";
export type FormFields = z.infer<typeof roleSchema>

const AddRoleModal = () => {
    const dispatch = useDispatch()
    const singleRoleData = useSelector((state: RootState) => state?.roles?.singleRole)
    console.log("singleRoleData>>>>>>>>>>>>>>>>>>>>>>>>>>", singleRoleData)
    const { register, handleSubmit, formState: { errors, isSubmitting }, setValue } = useForm<FormFields>({ resolver: zodResolver(roleSchema) })
    const modalBody = <form className="flex items-center justify-center gap-x-8 gap-y-8 flex-wrap mb-8 overflow-y-scroll ">
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField label="Role Name" register={register} error={errors.name} name="name" placeholder="Enter Role Name" />
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField label="Role description" register={register} error={errors.description} name="description" placeholder="Enter Device Name" />
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <CheckBox label="Active" register={register} error={errors.isActive?.message} name="isActive" />
        </div>

    </form>

    // ADD CLIENT FUNCTION
    const addRoleFunction = (data) => {
        const updatedRoleData = { name: data?.name, description: data?.description, isActive: data?.isActive, roleId: singleRoleData?._id }
        //  console.log(updatedRoleat) 

        if (singleRoleData !== null) {
            dispatch(updateRole(updatedRoleData))
        } else {
            dispatch(addRole(data))
        }


        dispatch(showRoleModalReducer(false))
        dispatch(emptyOneRole())
    }

    useEffect(() => {
        if (singleRoleData !== null) {
            setValue("name", singleRoleData?.name || "");
            setValue("description", singleRoleData.description || "");
            setValue("isActive", singleRoleData.isActive || "");
        }
        // else{ setValue("userName", "");
        //     setValue("firstName", "");
        //     setValue("lastName", "");
        //     setValue("email", "")}
    }, [singleRoleData, setValue]);


    return <Modal
        modalBody={modalBody}
        borderButtonText="cancel"
        // filledButtonText={isSubmitting ? "Adding" : "Add"}
        filledButtonText="Add"
        onBorderButtonClick={() => { dispatch(showRoleModalReducer(false)), dispatch(emptyOneRole()) }}
        onFilledButtonClick={handleSubmit(addRoleFunction)} />

}

export default AddRoleModal