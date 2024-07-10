import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowForward } from "react-icons/io";
import { RootState } from "../../redux/store";
import { openMenuFunction } from "../../redux/slice/menuOpen";
import { IoMdMenu } from "react-icons/io";

const Navbar=()=>{
    let navbarTrackingData=useSelector((state:RootState)=>state.navbarTracking)
const menu = useSelector((state: RootState) => state.menuOpen.menuOpenStatus);

//  console.log(navbarTrackingData)
const dispatch = useDispatch()
    return <div className="w-full border-b-[1px] border-b-borderColor h-[10vh] px-8 py-8 bg-whiteColor flex items-center
    sticky top-0 right-0 z-50" >

<IoMdMenu size={24} className=" absolute top-4 right-2 md:hidden"
                onClick={() => { dispatch(openMenuFunction(menu)) }} />
        <div className="flex items-center gap-3 font-semibold capitalize text-grayColor text-sm
                        md:text-base">
            {navbarTrackingData?.mainMenu && <> <p>{navbarTrackingData?.mainMenu}</p>
            < IoIosArrowForward size={14} className="font-bold"/>
            <p className="text-primaryColorLight">{navbarTrackingData?.subMenu}</p></>}
           
        </div>

    </div>
}

export default Navbar