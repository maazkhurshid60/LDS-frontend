import React, { useState } from "react";
import Links from "./Links";
import { IoIosArrowBack } from "react-icons/io";
import Tooltip from "../Tooltip/Tooltip";
import { IoMdMenu } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { isSideBarWidth } from "../../redux/slice/sideBarWidth";
import { openMenuFunction } from "../../redux/slice/menuOpen";
import { RootState } from "../../redux/store";

const Sidebar = () => {
    // const [widthSmall, setWidthSmall] = useState(false)
    // const [menuOpen, setMenuOpen] = useState(false)
    const widthSmall = useSelector((state: RootState) => state.sidebar.sideBar);
    // const menu = useSelector(state => state.menuOpen.menuOpenStatus);

    const dispatch = useDispatch()

    return <>

        <div className={`w-full 
        md:inline-block 
     transition-all duration-300 bg-whiteColor pl-6 py-4 border-r-[1px] border-r-borderColor h-auto relative 
    
     `}>
            {/* BACK ICON USED TO REDUCE WIDTH OF SIDEBAR STARTS */}
            <div className={`hidden 
        md:flex md:items-center md:justify-center
        absolute -right-4 top-6 rounded-lg  cursor-pointer bg-primaryColor text-whiteColor border-[1px] border-whiteColor w-[28px] h-[28px]`}
                onClick={() => { dispatch(isSideBarWidth(widthSmall)) }}>
                <IoIosArrowBack className={`transition-all duration-300 ${widthSmall ? "rotate-[180deg]" : "rotate-0"}`} />
            </div>
            {/* BACK ICON USED TO REDUCE WIDTH OF SIDEBAR ENDS */}
            {/* USER DETAILS STARTS */}
            <div className="flex items-center w-full">
                <img src="/images/pic.jpg" alt="user img" className="rounded-full 
                w-[60px]
            md:w-[30px]
            lg:w-[35px]
            xl:w-[45px] "/>
                {!widthSmall && <div className="ml-2
           xl:ml-4">
                    <h1 className="uppercase  text-grayColor font-medium tracking-wide 
                    text-xs
                                md:text-[8px]
                                lg:text-[10px]
                                xl:text-xs">admin</h1>  {/* ADMIN is user role will come from api currently its hardcoded */}
                    <h1 className="capitalize   font-medium tracking-wide 
                text-xs
                lg:text-sm
                xl:text-md">Roger Dokidis</h1>  {/* ADMIN is user role will come from api currently its hardcoded */}
                </div>}

            </div>
            {/* USER DETAILS ENDS */}
            {/* LINKS STARTS*/}
            <Links widthSmall={widthSmall} />
            {/* LINKS ENDS*/}
        </div>
    </>
}
export default Sidebar