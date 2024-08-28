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
            <p className="font-semibold">{item?.index ?item?.index :"_________"}</p>
        </div>
        <div className=" font-medium flex items-center gap-x-4 text-xl uppercase">
            <p>Affidavit of</p>
            <p>{item?.affidavitName}</p>
            <p>service</p>
        </div>
        {/* <div className=" font-medium flex items-center gap-x-2 text-xl uppercase">
            <p>service</p>
            <p>{item?.serviceName}</p>
        </div> */}
        <div className=" flex items-center gap-x-2 text-base">
            <p>Lic#</p>
            <p className="font-medium ">{item?.licNo ? item?.licNo:"_________"}</p>
        </div>
    </div>
}

export default Header