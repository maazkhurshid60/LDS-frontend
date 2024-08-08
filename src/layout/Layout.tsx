import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Loader/Spinner";
import { RootState } from "../redux/store";
import "./Sidebar.css";

const Layout = () => {
  const userInfo = useSelector((state: RootState) => state?.userDetail?.userDetails?.user);
  const widthSmall = useSelector((state: RootState) => state.sidebar.sideBar);
  const menu = useSelector((state: RootState) => state.menuOpen.menuOpenStatus);
  const isShowSpinner = useSelector((state: RootState) => state.showSpinner.isShowSpinner);

  const dispatch = useDispatch();
  console.log(userInfo);

  


  return (
    <div className="relative">
      {userInfo?.email !== null && userInfo?.email !== undefined ? (
        <div className="flex">
          <div
            className={`flex-shrink-0 z-[9999] sticky top-0
              transition-all duration-500 md:static
              ${menu ? "-left-80" : "left-0"} 
              ${widthSmall ? "lg:w-[8%] xl:w-[6%]" : "md:w-[28%] lg:w-[20%]"}`}
          >
            <Sidebar />
          </div>

          <div className="flex-grow md:w-[80%] bg-grayColorLight">
            <Navbar />
            <div className="w-[95%] m-auto mt-4 sm:mt-8 mb-4">
              <Outlet />
            </div>
          </div>
        </div>
      ) : (
        <Navigate to={"/login"} />
      )}
    </div>
  );
};

export default Layout;
