import React, { ReactNode } from "react";
interface OutletLayoutHeaderProps{
    heading:string
    children?:ReactNode
}
const OutletLayoutHeader:React.FC<OutletLayoutHeaderProps>=({heading,children})=>{
    return <div className="flex flex-col  
                           2xl:flex-row 2xl:items-center 2xl:justify-between ">
                <h1 className="font-semibold mb-4 text-base
                md:text-md
                lg:text-xl">{heading} </h1>
                    
                <div className="flex items-center justify-start flex-wrap gap-4 mt-3
                                sm:gap-2 sm:mt-0">
                   {children}
                </div>
    </div>
}

export default OutletLayoutHeader