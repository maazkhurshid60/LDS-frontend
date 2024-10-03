import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addingMailingSchema } from "../../../../schemas/service forms/addingMailing";
import { zodResolver } from "@hookform/resolvers/zod";
import TextField from "../../../../components/InputFields/TextField/TextField";
import CheckBox from "../../../../components/CheckBox/CheckBox"
import Button from "../../../../components/Buttons/Button/Button"
import { useDispatch, useSelector } from "react-redux";
import { addMailAddress, addMailAddressIntoFormL, createMailingAddressThunk, deleteMailingAddressThunk, getMailAddress, getMailAddressAfterDeletion, isAddingMailAddressReducer, updateMailAddressIntoForm, updateMailAddressIntoFormL, updateMailingAddressThunk } from "../../../../redux/slice/mailingAdresses";
import { RootState } from "../../../../redux/store";
import { toast } from "react-toastify";
import BorderButton from "../../../../components/Buttons/BorderButton/BorderButton";
import { handleEnterKeyPress } from "../../../../utils/moveToNextFieldOnEnter";

export interface AddMailingProps {
    data?: any
    id?: number
}

export type FormFields = z.infer<typeof addingMailingSchema>
const AddMailing: React.FC<AddMailingProps> = ({ data, id }) => {
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<FormFields>({ resolver: zodResolver(addingMailingSchema) })
    const dispatch = useDispatch()
    const isAddMail = useSelector((state: RootState) => state.mailingAdress.isAddingMailAddress)
    const isNewFormAdding = useSelector((state: RootState) => state.serviceForm?.isNewFormAdd)

    // ADD MAILING DATA FUNCTION STARTS
    const AddMailingFunction = async (data) => {
        const zip = parseInt(data?.zip)
        const mailAddres = { ...data, zip: zip }
        dispatch(createMailingAddressThunk(mailAddres))
        reset()

    }
    // ADD MAILING DATA FUNCTION ENDS
    const GetSelectedMailingFunction = (data: any) => {

        // isNewFormAdding && dispatch(getMailAddress(data))
        isNewFormAdding ? dispatch(getMailAddress(data)) : dispatch(addMailAddressIntoFormL(data))

        reset()
    }
    const UpdateMailingFunction = async (newData) => {
        const zip = parseInt(newData?.zip)
        const updatedData = { ...newData, mailingAddressId: data?._id, zip: zip }
        dispatch(updateMailingAddressThunk(updatedData))
    }

    const deleteMailingData = (data, id) => {
        dispatch(deleteMailingAddressThunk(data?._id))
        dispatch(getMailAddressAfterDeletion(id))

    }
    const handleZipChange = (event) => {
        const { value } = event.target;
        const sanitizedValue = value.replace(/[^a-zA-Z0-9]/g, ''); // Allow only letters and numbers

        // Limit to a maximum of 9 characters
        const limitedValue = sanitizedValue.slice(0, 9);

        let formattedValue = limitedValue;
        if (limitedValue.length > 5) {
            formattedValue = `${limitedValue.slice(0, 5)}-${limitedValue.slice(5)}`;
        }

        setValue("zip", formattedValue); // Update the form state
    };
    return <div className="mt-4">
        <div className="flex items-center justify-between">

            <h1 className="font-semibold text-md mb-4 capitalize">Adding Mailing Addresss {id && id}</h1>

            <div className="w-[8%]">

                <Button text={`${isAddMail && "Save"}`}
                    onClick={isAddMail && handleSubmit(AddMailingFunction)}
                />
            </div>
        </div>
        <form className="flex flex-col items-end" onSubmit={handleSubmit(GetSelectedMailingFunction)}>
            <div className="flex items-start w-full flex-wrap gap-x-8 gap-y-4 justify-between">
                <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                    <TextField onKeyDown={handleEnterKeyPress}
                        register={register} label="full Name" error={errors.firstName} name="firstName" />
                </div>
                <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                    <TextField onKeyDown={handleEnterKeyPress}
                        register={register} label="address" error={errors.address} name="address" />
                </div>
                <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                    <TextField onKeyDown={handleEnterKeyPress}
                        register={register} label="city" error={errors.city} name="city" />
                </div>
                <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                    <TextField onKeyDown={handleEnterKeyPress}
                        register={register} label="state" error={errors.state} name="state" />
                </div>
                <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                    <TextField onKeyDown={handleEnterKeyPress}
                        register={register} label="apt" error={errors.apt} name="apt" />
                </div>
                <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                    <TextField onKeyDown={handleEnterKeyPress}
                        register={register} label="zip" error={errors.zip} name="zip" maxLength={12} onChange={handleZipChange}
                    />
                </div>
                {/* <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                    <CheckBox onKeyDown={handleEnterKeyPress}
                        register={register} label="RRR" error={errors.rRR?.message} name="rRR" />
                </div> */}
            </div>
            <div className="flex items-center gap-x-4 w-full justify-end ">
                <div className={`w-full md:w-[25%] lg:w-[20%] xl:w-[15%] mt-4 flex items-center gap-x-4 ${isAddMail ? "inline-block" : "hidden"}`}>

                    <div className="w-[50%]">
                        <BorderButton buttonText={`${isAddMail && "cancel"}`}
                            onClick={() => {
                                if (isAddMail) {
                                    dispatch(isAddingMailAddressReducer(false));
                                }
                            }}
                        />
                    </div>
                    <Button text={`${isAddMail && "add"}`}
                        onClick={isAddMail && handleSubmit(GetSelectedMailingFunction)}
                    />
                </div>
            </div>
        </form>
    </div>
}

export default AddMailing