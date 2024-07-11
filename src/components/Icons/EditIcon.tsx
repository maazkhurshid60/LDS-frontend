import React from "react";
import {  MdOutlineEdit  } from "react-icons/md";
export interface EditIconProps{
    onClick:any
}
export const EditIcon:React.FC<EditIconProps>=({onClick})=>{
    return <MdOutlineEdit  onClick={onClick} className="text-greenColor cursor-pointer" size={16}/>
}

