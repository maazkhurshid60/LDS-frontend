import React, { useState } from "react";
import Service from "../Service/Service";
import Result from "../Result/Result";
import Standard from "../Standard/Standard";

const FilterMenu = () => {
    const filterMenu = ["service", "result", "standard"]
    const [activeMenu, setActiveMenu] = useState(0)
    return <div className="">
        <h1 className="text-xl font-semibold ml-2">Filters</h1>
        <div className="p-2">
            {/* FILTER MENU STARTS */}
            <div className="flex items-center justify-between">{filterMenu?.map((menu: string, id: number) => <p key={ id} className={`capitalize font-semibold text-sm cursor-pointer pb-2 border-b-[3px] border-radius-full border-b-solid 
                ${activeMenu === id ? "text-[#000] border-b-primaryColor" : "text-grayColor border-b-whiteColor"}`} onClick={() => { setActiveMenu(id) }}>{menu}</p>)}
            </div>
            {/* FILTER MENU ENDS */}

            {/* FILTER MENU DETAILS STARTS  */}
            <div className="mt-4">
                {activeMenu === 0 ?<Service/> : activeMenu===1 ? <Result/> : <Standard/> }
            </div>
            {/* FILTER MENU DETAILS ENDS */}
        </div>
    </div>
}

export default FilterMenu