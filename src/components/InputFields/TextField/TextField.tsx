import React from "react";
import { FieldError } from "react-hook-form";

export interface TextFieldProps{
label:string
register:any
error:any
name:string
placeholder?:string
type?:string
} 

const TextField:React.FC<TextFieldProps>=({label,register,error,name,placeholder, type = "text",})=>{
    return <div className="flex flex-col w-full items-start gap-1">
        <label className=" font-normal sm:font-medium text-sm capitalize">{label}</label>
        <input type={type} className="w-full border-[1px] border-borderColor/10 bg-grayColorLight/50 border-solid rounded-lg px-2  py-1
        focus:border-primaryColor focus:outline-primaryColor" placeholder={placeholder} {...register(name)}/>
        {/* DISPLAY ERROR */}
        {error&&<p className="text-xs text-redColor capitalize">{error?.message}</p>}
    </div>
}
export default TextField