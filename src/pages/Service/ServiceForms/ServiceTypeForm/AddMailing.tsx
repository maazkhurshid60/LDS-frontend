import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addingMailingSchema } from "../../../../schemas/service forms/addingMailing";
import { zodResolver } from "@hookform/resolvers/zod";
import TextField from "../../../../components/InputFields/TextField/TextField";
import CheckBox from "../../../../components/CheckBox/CustomCheckBox"
import Button from "../../../../components/Buttons/Button/Button"
import { useDispatch, useSelector } from "react-redux";
import { addMailAddress } from "../../../../redux/slice/mailingAdresses";
import { RootState } from "../../../../redux/store";

export interface AddMailingProps {
    data?: any
    id?: number
}

export type FormFields = z.infer<typeof addingMailingSchema>
const AddMailing: React.FC<AddMailingProps> = ({ data, id }) => {
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<FormFields>({ resolver: zodResolver(addingMailingSchema) })
    const dispatch = useDispatch()

    const AddMailingFunction = (data) => {
        console.log(data)
        const mailAddres = { value: data?.label, ...data }
        // console.log(mailAddres)
        dispatch(addMailAddress(mailAddres))
        reset()
    }
    console.log("data at addmialing components", data)
    useEffect(() => {
        setValue("label", data?.label)
        setValue("rrr", data?.rrr)
        setValue("address", data?.address)
        setValue("city", data?.city)
        setValue("state", data?.state)
        setValue("apt", data?.apt)
        setValue("zip", data?.zip)



    }, [data])
    return <div>
        <h1 className="font-semibold text-md mb-4 capitalize">Adding Mailing Addresss {id&& id}</h1>
        <form className="flex flex-col items-end">
            <div className="flex items-start w-full flex-wrap gap-x-8 gap-y-4 justify-between">
                <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                    <TextField
                        register={register} label="full Name" error={errors.label} name="label" />
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
                        register={register} label="RRR" error={errors.rrr?.message} name="rrr" />
                </div>
            </div>
            <div className=" w-full md:w-[25%] lg:w-[20%] xl:w-[15%] mt-4">

                <Button text={id !== undefined ? "update" :"save"}
                    onClick={handleSubmit(AddMailingFunction)} />
            </div>
        </form>
    </div>
}

export default AddMailing