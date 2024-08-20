import React from "react";
export interface HeaderProps{
    index?:string | number
    lic?:string | number

}
const Header:React.FC<HeaderProps>=(item)=>{
    return <div className="w-full flex items-center justify-between flex-wrap text-sm">
        <div className="capitalize flex items-center gap-x-2">
            <p>index #</p>
            <p className="font-semibold">{item?.index ? item?.index : "--N/A--"}</p>
        </div>
        <div className=" font-bold flex items-center gap-x-2 text-xl uppercase">
            <p>Affidavit of</p>
            <p>Owner name</p>
        </div>
        <div className=" font-bold flex items-center gap-x-2 text-xl uppercase">
            <p>service</p>
            <p>Service Name</p>
        </div>
        <div className=" font-medium flex items-center gap-x-2 text-base">
            <p>lic#</p>
            <p className="font-semibold">{item?.lic ? item?.lic : "--N/A--"}</p>
        </div>
    </div>
}

export default Header