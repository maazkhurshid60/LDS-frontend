import React from "react";
export interface HeaderProps {
    index?: string | number;
    affidavitName?: string;
    serverName?: any;
    serverAddress?: string;

    lic?: string | number
}
const Header: React.FC<HeaderProps> = (item) => {
    console.log(item?.serverAddress)
    return <div className="w-full font-inter font-bold flex items-center justify-between flex-wrap text-sm">
        <div>
            <p className="font-normal font-times">11/21</p>
            <div className="capitalize flex items-center gap-x-2 font-normal font-times">
                <p>index #</p>
                <p className="font-semibold">{item?.index ? item?.index : "_________"}</p>
            </div>
        </div>
        <div className="  flex items-center gap-x-4 text-xl uppercase">
            <p className="">Affidavit of</p>
            <p className="italic font-times uppercase">  {item?.affidavitName === "personalplus" ? "Personal/Substitute" : (item?.affidavitName || "_________")}</p>
            <p>service</p>
        </div>
        <div className="font-times font-semibold">

            <p className="uppercase">{item?.serverName ? item?.serverName : "_________"}</p>

            <div className=" flex items-center gap-x-2 text-base">
                <p>Lic#</p>
                <p className="uppercase">{item?.lic ? item?.lic : "_________"}</p>
            </div>
            <p className="uppercase">{item?.serverAddress ? item?.serverAddress : "_________"}</p>

        </div>

    </div>
}

export default Header