import React from "react";
import "./Button.css"
export interface ButtonProps{
        text?:string
        onClick?:any
}

const Button:React.FC<ButtonProps>=({text,onClick})=>{
    return(
    <button className="w-full bg-primaryColorLight py-2 rounded-md capitalize text-whiteColor" onClick={onClick}>
     {/* <button className="button"> */}
        {text}
    </button>)
}

export default Button