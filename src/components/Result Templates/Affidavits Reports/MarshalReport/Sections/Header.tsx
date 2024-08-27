import React from "react";
export interface HeaderProps{
    index?:string | number;
    affidavitName?:string;
    serverName?:string 
    lic?:string | number
    serverAddress?:string 

} 
const Header:React.FC<HeaderProps>=(item)=>{
    return <div className="w-full flex items-center justify-between flex-wrap text-sm">
        <div className="capitalize flex items-center gap-x-2">
            <p>index #</p>
            <p className="font-semibold">{item?.index ?item?.index :"--N/A--"}</p>
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
       
        <div className="flex items-start justify-start flex-col">
            <p><span className="font-semibold">{item?.serverName ? item?.serverName : "--N/A--"}</span></p>
            <p>Lic#{item?.lic? item?.lic:"--N/A--"}</p>
            <p><span className="font-semibold capitalize">{item?.serverAddress ? item?.serverAddress : "--N/A--"}</span>
            </p>

            </div>
    </div>
}

export default Header