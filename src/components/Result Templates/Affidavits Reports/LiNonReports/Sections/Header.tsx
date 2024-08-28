import React from "react"
export interface HeaderProps {
    //RESULTS
    index?: string | number
    petitioner?: string,
    against?: string,
    //SERVICES
    firstNameServe?:string
    address?:string


}
const Header: React.FC<HeaderProps> = (item) => {
    return <div className="w-full flex items-center justify-between flex-wrap gap-y-5">
        <div className="w-full flex items-center justify-between flex-wrap ">
            <h1 className="font-bold flex items-center gap-x-2 text-xl uppercase underline">
                district court of the state of new york
            </h1>
            <h1 className="font-bold flex items-center gap-x-2 text-xl uppercase underline">
                L&T Index: <span className="font-semibold">{item?.index ? item?.index :"______________________________" }</span>
            </h1>
        </div>
        <div className="w-full flex items-center justify-between flex-wrap ">
            <h1 className="font-bold flex items-center gap-x-2 text-xl uppercase underline">
                county of nassau
            </h1>

            <h1 className="font-bold flex items-center gap-x-2 text-xl ">
                Affidavit of Investigation</h1>
        </div>
<div className="font-bold ">

        <h1 className="flex items-center gap-x-2 text-lg underline">
            Petitioner-landord-Against 
        </h1>
        <p className=" text-xl">{item?.firstNameServe? item?.firstNameServe:"--N/A--"}</p>
        <p className=" text-xl">{item?.address? item?.address:"--N/A--"}</p>

</div>
        
    </div>
}
export default Header