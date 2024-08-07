import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { IoMdMenu } from "react-icons/io";
import { openMenuFunction } from "../redux/slice/menuOpen";
import { RootState } from "../redux/store";
import "./Sidebar.css"
import Spinner from "../components/Loader/Spinner";
const Layout = () => {
    const userInfo = useSelector((state: RootState) => state?.userDetail?.userDetails?.user)
    const widthSmall = useSelector((state: RootState) => state.sidebar.sideBar);
    const menu = useSelector((state: RootState) => state.menuOpen.menuOpenStatus);
    const isShowSpinner = useSelector((state: RootState) => state.showSpinner.isShowSpinner);

    const dispatch = useDispatch()
    console.log(userInfo)
    return <div className="relative">
            {isShowSpinner &&  <Spinner text="loading"/>}       

        {userInfo?.email !== null && userInfo?.email !== undefined ?
            <div className="">
                <div className="flex items-start ">
                    <div className={`z-[9999]  absolute duration-500 transition-all   md:static  top-[85px] ${menu ? "-left-80 " : "left-0   top-0 md:top-[85px]"}  ${widthSmall ? "lg:w-[8%] xl:w-[6%]" : "md:w-[28%] lg:w-[20%]"}`}>
                        <Sidebar />
                    </div>
                    <div className="md:w-[100%] bg-grayColorLight  ">
                        <Navbar />
                        {/* <div className="	 p-4 sm:p-8 bg-whiteColor w-[97%] m-auto mt-4 mb-4 rounded-xl border-[1px] border-solid border-borderColor shadow-smShadow"> */}
                        <div className="w-[95%] m-auto mt-4 sm:mt-8 mb-4 h-[83.5vh]">

                            <Outlet />
                            {/* <div className="flex flex-col items-end justify-center gap-2 mt-4 mr-4  ">
                        <p className="text-xs font-semibold">Designed and Developed By:</p>
                        <img src="/images/redstarlogo.png" alt="Red Star Technology" className=" w-[120px]" />
                    </div> */}
                        </div>
                    </div>
                </div>
            </div>
            : <Navigate to={"/login"} />}

    </div>
}

export default Layout