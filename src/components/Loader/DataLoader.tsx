import React from "react";
export interface DataLoaderProps{
    text:string
}
export const DataLoader:React.FC<DataLoaderProps>=({text})=>{
    return <div className="w-full p-4 bg-whiteColor capitalize font-medium shadow-smShadow bg-whitecolor m-auto border-[1px] border-borderColor border-solid rounded-xl 
 sm:p-6  sm:w-[95%]">{text} is Loading...</div>;
}