import React, { Suspense, lazy } from "react";
import TextField from "../../components/InputFields/TextField/TextField";
import { FieldError, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../schemas/auth.schema"
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/slice/userDetail";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { loginApi } from "../../apiservices/user/userApi";
import Button from "../../components/Buttons/Button/Button";
import PasswordField from "../../components/InputFields/PasswordField/PasswordField"
const Login = () => {
    const { register, formState: { errors ,isSubmitting}, handleSubmit } = useForm({ resolver: zodResolver(loginSchema) },)
    const dispatch=useDispatch();
    const navigate=useNavigate()
    // LOGIN FUNCTION STARTS
    const loginFunction = async(data) => {
        // alert(",mcxznv,mcxznv")
        try {
            const response=await loginApi(data) 
            console.log(response?.data?.data)
            dispatch(loginUser(response?.data?.data))
            const accessToken = response?.data?.data?.accessToken;
            localStorage.setItem("accessToken", accessToken); 
            toast.success(`${response?.data?.message}`)
            navigate("/")
        } catch (error) {
            toast.error(`Incorrect Name or Password`)
            console.log(error)
        }
        // const role="admin"
        // const userData={name:data?.userName,role}
        // console.log(userData)
    //    dispatch(loginUser(userData))
    //    navigate("/")
    }
    // LOGIN FUNCTION ENDS
    return <div className="w-full bg-whiteColor flex items-center justify-center h-[100vh] ">
        <div className="w-[95%] border-[1px] border-borderColor border-solid rounded-xl text-center shadow-lgShadow py-6 px-8
                        sm:w-[65%] 
                        md:py-8 md:px-10 
                         lg:py-10 lg:px-12
                        xl:w-[35%] xl:py-12 xl:px-14">
            {/* HEADER STARTS */}
            <div className="flex flex-col items-center justify-center gap-4">
                <h1 className="px-6 tracking-wide py-2 bg-primaryColor rounded-md 
                           inline-block text-whiteColor font-semibold text-base
                           sm:text-xl
                           lg:text-2xl ">
                    Logo
                </h1>
                <p className="capitalize font-medium text-sm md:text-lg opacity-[65%]">Enter Your Email & Password</p>
            </div>
            {/* HEADER ENDS */}
            {/* FORM STARTS */}
            <form onSubmit={handleSubmit(loginFunction)} className="flex flex-col gap-4 mt-8">
         
                    <TextField label="User Name" register={register} error={errors?.userName} name="userName"/>
             
         
                    <PasswordField label="Password" register={register} error={errors?.password} name="password"/>
             
         
                    <Button  text={isSubmitting?"logging":"login"}/>
             
            </form>
            {/* FORM ENDS */}
        </div>
    </div>
}

export default Login