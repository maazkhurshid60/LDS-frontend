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
                district court of the state of new york
            </h1>
            <h1 className="font-bold flex items-center gap-x-2 text-xl uppercase underline">
                L&T Index: {item?.index}
            </h1>
        </div>
        <div className="w-full flex items-center justify-between flex-wrap ">
            <h1 className="font-bold flex items-center gap-x-2 text-xl uppercase underline">
                county of nassau
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