import React from "react";
import { MdDeleteOutline } from "react-icons/md";
export interface DeleteIconProps{
    onClick:any
}
export const DeleteIcon:React.FC<DeleteIconProps>=({onClick})=>{
    return <MdDeleteOutline onClick={onClick} className="text-redColor cursor-pointer" size={16}/>
}

