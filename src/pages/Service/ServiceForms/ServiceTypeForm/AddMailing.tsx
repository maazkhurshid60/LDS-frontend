import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addingMailingSchema } from "../../../../schemas/service forms/addingMailing";
import { zodResolver } from "@hookform/resolvers/zod";
import TextField from "../../../../components/InputFields/TextField/TextField";
import CheckBox from "../../../../components/CheckBox/CustomCheckBox"
import Button from "../../../../components/Buttons/Button/Button"
import { useDispatch, useSelector } from "react-redux";
import { addMailAddress, createMailingAddressThunk, deleteMailingAddressThunk, getMailAddressAfterDeletion, isAddingMailAddressReducer, updateMailAddressIntoForm, updateMailAddressIntoFormL, updateMailingAddressThunk } from "../../../../redux/slice/mailingAdresses";
import { RootState } from "../../../../redux/store";
import { toast } from "react-toastify";
import BorderButton from "../../../../components/Buttons/BorderButton/BorderButton";

export interface AddMailingProps {
    data?: any
    id?: number
}

export type FormFields = z.infer<typeof addingMailingSchema>
const AddMailing: React.FC<AddMailingProps> = ({ data, id }) => {
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<FormFields>({ resolver: zodResolver(addingMailingSchema) })
    const dispatch = useDispatch()
    const isAddMail = useSelector((state: RootState) => state.mailingAdress.isAddingMailAddress)

    // console.log(">>>>>data in mailing address<<<<<<<<<<", data)
    // ADD MAILING DATA FUNCTION STARTS
    const AddMailingFunction = async (data) => {
        const zip = parseInt(data?.zip)
        const mailAddres = { ...data, zip: zip }
        dispatch(createMailingAddressThunk(mailAddres))
        reset()

    }
    // ADD MAILING DATA FUNCTION ENDS
    // UPDATE MAILING DATA FUNCTION STARTS
    // UPDATE MAILING DATA FUNCTION 
    // useEffect(() => {
    //     setValue("firstName", data?.firstName)
    //     setValue("rRR", data?.rRR)
    //     setValue("address", data?.address)
    //     setValue("city", data?.city)
    //     setValue("state", data?.state)
    //     setValue("apt", data?.apt)
    //     setValue("zip", JSON.stringify(data?.zip))
    // }, [data])


    const UpdateMailingFunction = async (newData) => {
        const zip = parseInt(newData?.zip)
        const updatedData = { ...newData, mailingAddressId: data?._id, zip: zip }
        console.log("updated data mailingdata", newData)

        // dispatch(updateMailAddressIntoForm({updatedData,id}))

        dispatch(updateMailingAddressThunk(updatedData))
    }

    // // GET UPDATE MAILING DATA FUNCTION WILL BE CALLED WHEN CTRL+S IS PRESSED TO SAVE DATA INSIDE SLICE
    // useEffect(() => {
    //     const handleKeyDown = (event) => {
    //         if (event.ctrlKey && event.key === 's') {
    //             event.preventDefault();
    //             handleSubmit(UpdateMailingFunction)();
    //         }
    //     };
    //     window.addEventListener('keydown', handleKeyDown);
    //     return () => {
    //         window.removeEventListener('keydown', handleKeyDown);
    //     };
    // }, [handleSubmit, UpdateMailingFunction]);

    const deleteMailingData = (data, id) => {
        console.log(data)
        dispatch(deleteMailingAddressThunk(data?._id))
        dispatch(getMailAddressAfterDeletion(id))

    }
    console.log(isAddMail)
    return <div>
        <h1 className="font-semibold text-md mb-4 capitalize">Adding Mailing Addresss {id && id}</h1>
        <form className="flex flex-col items-end">
            <div className="flex items-start w-full flex-wrap gap-x-8 gap-y-4 justify-between">
                <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                    <TextField
                        register={register} label="full Name" error={errors.firstName} name="firstName" />
                </div>
                <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                    <TextField
                        register={register} label="address" error={errors.address} name="address" />
                </div>
                <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                    <TextField
                        register={register} label="city" error={errors.city} name="city" />
                </div>
                <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                    <TextField
                        register={register} label="state" error={errors.state} name="state" />
                </div>
                <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                    <TextField
                        register={register} label="apt" error={errors.apt} name="apt" />
                </div>
                <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                    <TextField
                        register={register} label="zip" error={errors.zip} name="zip" />
                </div>
                <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                    <CheckBox
                        register={register} label="RRR" error={errors.rRR?.message} name="rRR" />
                </div>
            </div>
            <div className="flex items-center gap-x-4 w-full justify-end ">
                {/* {data?._id !== undefined && */}
                <div className={`w-full md:w-[25%] lg:w-[20%] xl:w-[15%] mt-4 flex items-center gap-x-4 ${isAddMail ? "inline-block" : "hidden"}`}>

                    <div className="w-[50%]">
                        <BorderButton buttonText={`${isAddMail && "cancel"}`} borderColor="redColor"
                            onClick={() => {
                                if (isAddMail) {
                                    dispatch(isAddingMailAddressReducer(false));
                                }
                            }}
                        />
                    </div>
                    <Button text={`${isAddMail && "add"}`}
                        onClick={isAddMail && handleSubmit(AddMailingFunction)}
                    />
                </div>
                {/* <div className=" w-full md:w-[25%] lg:w-[20%] xl:w-[15%] mt-4 flex items-center gap-x-4">
                        <BorderButton buttonText={`${isAddMail ? "cancel" : "delete"}`} borderColor="redColor"
                            onClick={isAddMail ? () => dispatch(isAddingMailAddressReducer(false)) : () => handleSubmit(deleteMailingData)}
                        />
                        <Button text={`${isAddMail ? "Add" : "Update"}`}
                            onClick={isAddMail ? handleSubmit(AddMailingFunction) : handleSubmit(UpdateMailingFunction)}
                        />
                    </div> */}
                {/* } */}


            </div>
            {/* {isAddMail  &&
             <div className=" w-full md:w-[25%] lg:w-[20%] xl:w-[15%] mt-4 flex items-center gap-x-4">
                <BorderButton buttonText={"cancel"}
                    onClick={() => dispatch(isAddingMailAddressReducer(false))} />
               
                <Button text={"add"}
                    onClick={ handleSubmit(AddMailingFunction)} />


            </div>} */}


        </form>
    </div>
}

export default AddMailing