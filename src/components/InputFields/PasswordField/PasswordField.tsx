import React, { useState } from "react";
import { FieldError } from "react-hook-form";
import { FaEye,FaEyeSlash  } from "react-icons/fa";

export interface PasswordFieldProps{
    label:string
    register:any
    error?:any;
    name:string

} 

const PasswordField:React.FC<PasswordFieldProps>=({label,register,error,name})=>{
    const [showPassword,setShowPassword]=useState(false)
    return <div className="flex flex-col items-start gap-1 ">
        <label className="font-medium text-sm capitalize">{label}</label>
        <div className="relative w-full">
        <input type={showPassword?"text":"password"} className="w-full border-[1px] border-borderColor/10 bg-grayColorLight/50 border-solid rounded-lg px-2  py-1
        focus:border-primaryColor focus:outline-primaryColor" placeholder="Password" {...register(name)}/>
        {/* DISPLAY ERROR */}
        {error&&<p className="text-xs text-redColor text-start">{error.message}</p>}
        {/* SHOWPASSWORD FUNCTIONALITY STARTS */}
        <div className="absolute top-2 right-2 opacity-[65%] cursor-pointer" onClick={()=>setShowPassword(!showPassword)}>{showPassword? <FaEye size={18}/>:<FaEyeSlash size={18}/>}</div>
        {/* SHOWPASSWORD FUNCTIONALITY ENDS */}
        </div>
    </div>
}
export default PasswordField