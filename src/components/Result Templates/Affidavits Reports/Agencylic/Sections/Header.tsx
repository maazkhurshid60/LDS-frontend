import React from "react";
export interface HeaderProps{
    index?:string | number;
    affidavitName?:string;
    serviceName?:string;
    licNo?:string |number
} 
const Header:React.FC<HeaderProps>=(item)=>{
    return <div className="w-full flex items-center justify-between flex-wrap text-sm">
        <div className="capitalize flex items-center gap-x-2">
            <p>index #</p>
            <p>{item?.index}</p>
        </div>
        <div className=" font-medium flex items-center gap-x-2 text-xl uppercase">
            <p>Affidavit of</p>
            <p>{item?.affidavitName}</p>
        </div>
        <div className=" font-medium flex items-center gap-x-2 text-xl uppercase">
            <p>service</p>
            <p>{item?.serviceName}</p>
        </div>
        <div className=" font-medium flex items-center gap-x-2 text-base">
            <p>lic#</p>
            <p>{item?.licNo}</p>
        </div>
    </div>
}

export default Header