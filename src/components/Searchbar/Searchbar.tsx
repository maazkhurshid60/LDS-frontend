import React from "react";
import { FiSearch } from "react-icons/fi";

export interface SearchbarProps{
    value?:string
    onChange?:any
}


 const Searchbar:React.FC<SearchbarProps>=({value,onChange})=>{
    return<div className=" border-[1px] border-borderColor border-solid rounded-md px-2 py-1 sm:w-[200px] text-grayColor flex items-center gap-2">
        <FiSearch/>
        <input className="w-[80%] focus:outline-none" placeholder="Search..." value={value} onChange={onChange}/>
        </div>
}

export default Searchbar