import React, { ReactNode } from "react";

export interface OutletLayoutProps{
    children:ReactNode 
}
const OutletLayout=({children})=>{
    return <div className="w-full p-4 bg-whiteColor shadow-smShadow bg-whitecolor m-auto border-[1px] border-borderColor border-solid rounded-xl 
                            sm:p-6  sm:w-[95%]">
        
        {children}
        
        </div>
}

export default OutletLayout