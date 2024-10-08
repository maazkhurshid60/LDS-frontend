import React from "react";
import { FiFilter } from "react-icons/fi";
export interface FilterProps{
    onClick:any
}
const Filter:React.FC<FilterProps>=({onClick})=>{
    return <div onClick={onClick} className="border-[1px] border-borderColor border-solid rounded-md px-2 py-1 cursor-pointer  text-grayColor flex items-center gap-2"><FiFilter /> <p>A</p></div>
}

export default Filter