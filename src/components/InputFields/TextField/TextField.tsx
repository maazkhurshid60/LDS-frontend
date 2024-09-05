// import React, { forwardRef } from "react";
// import { FieldError, UseFormRegister } from "react-hook-form";

// export interface TextFieldProps {
//   label: string;
//   register?: UseFormRegister<any>;
//   error?: FieldError;
//   name: string;
//   placeholder?: string;
//   type?: string;
//   defaultValue?: string;
//   onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
//   required?: boolean;
//   // Add ref here
//   ref?: React.Ref<HTMLInputElement>;
// }

// const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
//   ({ label, register, error, name, placeholder, type = "text", defaultValue, onKeyDown, required = false }, ref) => {
//     return (
//       <div className="flex flex-col w-full items-start gap-1">
//         <label className="font-normal sm:font-medium text-sm capitalize">
//           {label} {required && <span className="text-redColor">*</span>}
//         </label>
//         <input
//           type={type}
//           className="w-full border-[1px] border-borderColor/10 bg-grayColorLight/50 border-solid rounded-lg px-2 py-1
//           focus:border-primaryColor focus:outline-primaryColor"
//           placeholder={placeholder}
//           {...register?.(name)}
//           defaultValue={defaultValue}
//           onKeyDown={onKeyDown}
//           ref={ref} // Attach ref here
//         />
//         {/* DISPLAY ERROR */}
//         {error && <p className="text-xs text-redColor capitalize">{error?.message}</p>}
//       </div>
//     );
//   }
// );

// TextField.displayName = 'TextField'; // Set displayName for debugging
// export default TextField;




import React from "react";
import { FieldError } from "react-hook-form";
import "./textField.css"
export interface TextFieldProps{
label:string
register?:any
error?:any
name:string
placeholder?:string
type?:string
defaultValue?:string
onKeyDown?:any
required?:boolean} 

const TextField:React.FC<TextFieldProps>=({label,register,error,name,placeholder, type = "text",defaultValue,onKeyDown,required=false})=>{
    return <div className="flex flex-col w-full items-start gap-1">
        <label className=" font-normal sm:font-medium text-sm capitalize">{label} {required && <span className="text-redColor">*</span> }</label>
        <input type={type} className="w-full border-[1px] border-borderColor/10 bg-grayColorLight/50 border-solid rounded-lg px-2  py-1
        focus:border-primaryColor focus:outline-primaryColor" placeholder={placeholder} {...register(name)}    defaultValue={defaultValue} 
        onKeyDown={onKeyDown} 

        />
        {/* DISPLAY ERROR */}
        {error&&<p className="text-xs text-redColor capitalize">{error?.message}</p>}
    </div>
}
export default TextField