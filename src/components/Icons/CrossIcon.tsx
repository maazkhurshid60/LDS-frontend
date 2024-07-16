import React from "react";
import { RxCross2 } from "react-icons/rx";
export interface CrossIconProps{
    onClick:any
}
export const CrossIcon:React.FC<CrossIconProps>=({onClick})=>{
    return <RxCross2 onClick={onClick} className="text-redColor cursor-pointer" size={16}/>
}

