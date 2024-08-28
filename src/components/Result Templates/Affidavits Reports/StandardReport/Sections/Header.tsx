import React from "react";
export interface HeaderProps{
index?:string | number
}
const Header:React.FC<HeaderProps>=(item)=>{
    return <div className="flex flex-col items-end w-full">
        <p>Index: <span className="font-semibold">{item?.index ? item?.index :"______________________________"}</span></p>
        <div className="w-full border-dashed border-[2px] border-grayColor px-4 p-2 flex justify-between flex-wrap items-center mt-4">
            <p className="w-[48%] text-center">Against</p>
            <div className="w-[48%] flex flex-col gap-y-5">
                <p>Plaintiff(s) Petitioner(s)</p>
                <p>Defendant(s) Respondent(s)</p>
            </div>
        </div>
    </div>
}
export default Header