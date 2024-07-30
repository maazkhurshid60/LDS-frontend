import React from "react";
const Header=()=>{
    return <div className="w-full flex items-center justify-between flex-wrap text-sm">
        <div className="capitalize flex items-center gap-x-2">
            <p>index #</p>
            <p>7984325</p>
        </div>
        <div className=" font-medium flex items-center gap-x-2 text-xl uppercase">
            <p>Affidavit of</p>
            <p>Owner name</p>
        </div>
        <div className=" font-medium flex items-center gap-x-2 text-xl uppercase">
            <p>service</p>
            <p>Service Name</p>
        </div>
        <div className=" font-medium flex items-center gap-x-2 text-base">
            <p>lic#</p>
            <p>54325</p>
        </div>
    </div>
}

export default Header