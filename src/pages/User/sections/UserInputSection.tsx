import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { userInputSectionSchema } from "../../../schemas/userInputSectionSchema";
import TextField from "../../../components/InputFields/TextField/TextField";
import BorderButton from "../../../components/Buttons/BorderButton/BorderButton";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { getOneUser } from "../../../redux/slice/userId";


const UserInputSection = () => {
const userId=useSelector((state:RootState)=>state.userId.userId)
    const { register, formState: { errors }, handleSubmit,setValue } = useForm({ resolver: zodResolver(userInputSectionSchema) })
    const alluserDetail=useSelector((state:RootState)=>state.userId)
    const alluserData=useSelector((state:RootState)=>state.userId.allUser.tableData)

    const dispatch=useDispatch()
    const oneUser=useSelector((state:RootState)=>state.userId.singleUser)
//    console.log(oneUser!==null&& oneUser[0])
      useEffect(() => {
            dispatch(getOneUser())
            }, [userId,alluserData]);
// const userDetail=userData?.filter((_,id)=>id===userId)
// console.log(oneUser!==null&& oneUser[0])
    useEffect(() => {
        if (oneUser!==null&& oneUser[0]&&alluserData.length>0) {
            setValue("userName", oneUser[0].userName || "");
            setValue("firstName", oneUser[0].firstName || "");
            setValue("lastName", oneUser[0].lastName || "");
            setValue("email", oneUser[0].email || "");
        }
        else{ setValue("userName", "");
            setValue("firstName", "");
            setValue("lastName", "");
            setValue("email", "")}
    }, [alluserDetail, setValue]);

    // const userDetail=userData?.filter((_,id)=>id===userId)
    // useEffect(() => {
    //     if (userDetail) {
    //         setValue("userName", userDetail[0].userName);
    //         setValue("firstName", userDetail[0].firstName);
    //         setValue("lastName", userDetail[0].lastName);
    //         setValue("email", userDetail[0].email);
    //     }
    // }, [userDetail, setValue]);
    const userInputFunction = (data) => {
        console.log(data)
    }
    return <form onSubmit={handleSubmit(userInputFunction)} className="w-full lg:w-[40%] flex flex-col gap-4">
        <TextField label="User Name" name="userName" register={register} error={errors?.userName} />
        <TextField label="first Name" name="firstName" register={register} error={errors?.firstName} />
        <TextField label="last Name" name="lastName" register={register} error={errors?.lastName} />
        <TextField label="email" name="email" register={register} error={errors?.email} />
        <BorderButton buttonText="save" />
    </form>

}

export default UserInputSection