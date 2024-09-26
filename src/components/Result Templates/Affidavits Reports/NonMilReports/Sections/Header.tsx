import React from "react"
export interface HeaderProps {
    index?: string | number
    petitioner?: string,
    against?: string,

}
const Header: React.FC<HeaderProps> = (item) => {
    return <div className="w-full flex items-center justify-between flex-wrap gap-y-5">
        <div className="w-full flex items-center justify-between flex-wrap ">
            <h1 className="font-bold flex items-center gap-x-2 text-xl uppercase underline">
                civil court of the city of new york
            </h1>
            <h1 className="font-bold flex items-center gap-x-2 text-xl uppercase underline">
                L&T Index: <span className="font-semibold">{item?.index ? item?.index : "_____________________________________"}</span>
            </h1>
        </div>
        <div className="w-full flex items-center justify-between flex-wrap ">
            <h1 className="font-bold flex items-center gap-x-2 text-xl uppercase underline">
                county of bronx
            </h1>

            <h1 className="font-bold flex items-center gap-x-2 text-xl ">
                Affidavit of Investigation</h1>
        </div>

        <h1 className="font-bold flex items-center gap-x-2 text-xl underline">
            Petitioner-landord-Against
        </h1>

    </div>
}
export default Header