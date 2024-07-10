import React from "react";
import { FiSearch } from "react-icons/fi";

 const Searchbar=()=>{
    return<div className=" border-[1px] border-borderColor border-solid rounded-md px-2 py-1 sm:w-[200px] text-grayColor flex items-center gap-2">
        <FiSearch/>
        <input className="w-[80%] focus:outline-none" placeholder="Search..."/>
        </div>
}

export default Searchbar