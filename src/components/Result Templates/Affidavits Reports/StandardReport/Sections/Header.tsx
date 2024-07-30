import React from "react";
const Header=()=>{
    return <div className="flex flex-col items-end w-full">
        <p>Index: FROM_BACKEND</p>
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