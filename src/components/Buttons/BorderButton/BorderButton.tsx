import React from "react";
import { IoAddCircle } from "react-icons/io5";
import { Link } from "react-router-dom";
import "./BorderButton.css"
import { IconType } from "react-icons";
import { MdOutlineAdd } from "react-icons/md";

export interface BorderButtonProps{
    icon?:React.ReactNode
    isIcon?:boolean
    isRightIcon?:boolean

    buttonText?:string
    disabled?:boolean
    onClick?:()=>void
}
const BorderButton:React.FC<BorderButtonProps>=({icon,isIcon,buttonText,disabled,onClick,isRightIcon})=>{
return <Link to="#" className={`inner-shadow capitalize flex items-center justify-center gap-y-1  px-3 py-[10px] bg-whiteColor border-[2px]
                                 border-primaryColorLight text-primaryColorLight rounded-lg 
                                ${disabled?"opacity-[30%] cursor-not-allowed":""}`}
                                onClick={onClick}>
        {isIcon && <span className="mr-2">{icon}</span>}
        <p className="font-semibold text-xs sm:text-sm text-center ">{buttonText} </p>
        {isRightIcon && <span className="ml-2">{icon}</span>}
</Link>
}
export default BorderButton