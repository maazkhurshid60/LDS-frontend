import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {  userUpdateInputSectionSchema } from "../../../schemas/userInputSectionSchema";
import TextField from "../../../components/InputFields/TextField/TextField";
import BorderButton from "../../../components/Buttons/BorderButton/BorderButton";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { getOneUser, updateUser } from "../../../redux/slice/userId";
import { z } from "zod";
import Button from "../../../components/Buttons/Button/Button";
import { handleEnterKeyPress } from "../../../utils/moveToNextFieldOnEnter";
import roles from "../../../redux/slice/roles";

export type FormFields = z.infer<typeof userUpdateInputSectionSchema>

const UserInputSection = () => {
    const userId = useSelector((state: RootState) => state.userId.userId)
    const { register, handleSubmit, formState: { errors, isSubmitting }, setValue } = useForm<FormFields>({ resolver: zodResolver(userUpdateInputSectionSchema) })
    const alluserData = useSelector((state: RootState) => state.userId.allUser.tableData)
    const userInfo = useSelector((state: RootState) => state?.userDetail?.userDetails?.user);
  
    const oneUser = useSelector((state: RootState) => state.userId.singleUser)
    const dispatch = useDispatch();
    const [singleUserId, setSingleUserId] = useState("");

    useEffect(() => {
        dispatch(getOneUser());
    }, [userId]);

    useEffect(() => {
        if (oneUser !== null && oneUser[0] && alluserData.length > 0) {
            setValue("userName", oneUser[0].userName || "");
            setValue("firstName", oneUser[0].firstName || "");
            setValue("lastName", oneUser[0].lastName || "");
            setValue("email", oneUser[0].email || "");
            setSingleUserId(oneUser[0]._id);
        } else {
            setValue("userName", "");
            setValue("firstName", "");
            setValue("lastName", "");
            setValue("email", "");
        }
    }, [oneUser, setValue]);

    // UPDATE USER
    const userUpdateFunction = (data) => {
        const allData = {
            userId: oneUser[0]?._id,
            userName: data?.userName,
            firstName: data?.firstName,
            lastName: data?.lastName,
            email: data?.email,
            
        };
        dispatch(updateUser(allData));
    };

    return (
        <form onSubmit={handleSubmit(userUpdateFunction)} className="w-full lg:w-[40%] flex flex-col gap-4">
        
            <TextField onKeyDown={handleEnterKeyPress}  label="User Name" name="userName" register={register} error={errors?.userName} required/>
        <TextField onKeyDown={handleEnterKeyPress}  label="first Name" name="firstName" register={register} error={errors?.firstName} />
        <TextField onKeyDown={handleEnterKeyPress}  label="last Name" name="lastName" register={register} error={errors?.lastName} />
        <TextField onKeyDown={handleEnterKeyPress}  label="email" name="email" register={register} error={errors?.email} required/>
        <Button text={isSubmitting ? "saving" : "save"} disabled={isSubmitting} />
       
  
    </form>
        // <form onSubmit={handleSubmit(userUpdateFunction)} className="w-full lg:w-[40%] flex flex-col gap-4">
        //     {userInfo?.roles[0]?.name === "Admin"? <>
        //         <TextField onKeyDown={handleEnterKeyPress}  label="User Name" name="userName" register={register} error={errors?.userName} required/>
        //     <TextField onKeyDown={handleEnterKeyPress}  label="first Name" name="firstName" register={register} error={errors?.firstName} />
        //     <TextField onKeyDown={handleEnterKeyPress}  label="last Name" name="lastName" register={register} error={errors?.lastName} />
        //     <TextField onKeyDown={handleEnterKeyPress}  label="email" name="email" register={register} error={errors?.email} required/>
        //     <Button text={isSubmitting ? "saving" : "save"} disabled={isSubmitting} />
        //     </>:<>
        // <label className=" font-normal sm:font-medium text-sm capitalize">User Name : <span className="font-normal">{oneUser&&oneUser[0]?.userName }</span></label>
        // <label className=" font-normal sm:font-medium text-sm capitalize">first Name :<span className="font-normal">{oneUser&&oneUser[0]?.firstName}</span></label>
        // <label className=" font-normal sm:font-medium text-sm capitalize">last Name :<span className="font-normal">{oneUser&&oneUser[0]?.lastName}</span></label>
        // <label className=" font-normal sm:font-medium text-sm capitalize">email Name :<span className="font-normal">{oneUser&&oneUser[0]?.email}</span></label>

            
        //     </>}
      
        // </form>
    );
}

export default UserInputSection;
