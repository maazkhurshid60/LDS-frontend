import React from "react";
export interface HeaderProps {
    index?: string | number
    plaintTiff?: string
    defedants?: string
}
const Header: React.FC<HeaderProps> = (item) => {
    return <div className="flex flex-col w-full">
        <div className="flex items-center justify-between font-bold">
            <p>SUPREME</p>
            <p>NEW YORK</p>

            <p>Index: <span className="font-semibold">{item?.index ? item?.index : "______________________________"}</span></p>
        </div>
        <div className="w-full border-dashed border-[2px] border-grayColor px-4 p-2 flex justify-between flex-wrap items-center mt-4">
            <div className="w-[48%] m-auto">

                <div className="w-[100%] flex  justify-between">
                    <p className="font-bold">{item?.plaintTiff ? item?.plaintTiff : "______________________________"}</p>
                    <p>Plaintiff(s) Petitioner(s)</p>
                </div>
                <p className="w-[100%] text-center">Against</p>
                <div className="w-[100%] flex justify-between">
                    <p className="font-bold">{item?.defedants ? item?.defedants : "______________________________"}</p>

                    <p>Defendant(s) Respondent(s)</p>
                </div>
            </div>

        </div>
    </div>
}
export default Header