import React, { useEffect, useRef, useState } from "react";
import { linkData } from "../../constdata/LinksData";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { emptyNavbarData, setMainMenuName, setSubMenuName } from "../../redux/slice/navbarTracking";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { logoutUser } from "../../redux/slice/userDetail";
import { openMenuFunction } from "../../redux/slice/menuOpen";
import { RootState } from "../../redux/store";
import Tooltip from "../Tooltip/Tooltip";
import { emptyLegalDeliveryReducer } from "../../redux/slice/legalDelivery";
import { showNotFoundPage } from "../../redux/slice/notFoundSlice";
export interface widthProp {
    widthSmall: boolean
    userData: string
}
const Links: React.FC<widthProp> = ({ widthSmall, userData }) => {
    const link = "users"
    const link2 = "roles"
    const link3 = "operation"
    const [activeSubLink, setActiveSubLink] = useState<string>()
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [activeLink, setActiveLink] = useState<string>()
    const [isOperationDropdown, setIsOperationDropdown] = useState(true)
    const [subMenu, setSubMenu] = useState(false)
    const [subMenuShow, setSubMenuShow] = useState(false)
    const menu = useSelector((state: RootState) => state.menuOpen.menuOpenStatus);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const toggleOpenFunction = (activeLinkName: string) => {
        if (activeLink === activeLinkName) {
            setActiveLink(null); // Close the menu if it's already open
        } else {
            setActiveLink(activeLinkName);
            dispatch(setMainMenuName(activeLinkName));
        }
    };
    //    LOGOUT FUNCTION
    const logoutFunction = () => {
        localStorage.setItem("serviceFormActiveSection", "0")
        dispatch(logoutUser())
        dispatch(emptyNavbarData())
        localStorage.removeItem("accessToken")

        dispatch(emptyLegalDeliveryReducer())

        navigate("/login")
    }
    // SUBMENU FUNCTION
    const subMenuFunction = (linkName: string) => {
        setActiveSubLink(linkName),
            dispatch(setSubMenuName(linkName)),
            setSubMenuShow(false),
            dispatch(openMenuFunction(menu))
    }
    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            // subMenu
            setSubMenuShow(false);
        }
    };
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const showNotFound = useSelector((state: RootState) => state?.notFoundSlice?.isShow)

    return <div className={`mt-8 w-[100%]  m-auto  font-semibold relative 	`}>
        <div className="mr-4 flex flex-col justify-between h-[83vh]">
            <div ref={dropdownRef}>
                {linkData.map((data, id) => (
                    <div key={id} className="text-sm mb-2 relative" >
                        {/* MENU STARTS */}
                        <div
                            onClick={() => { toggleOpenFunction(data.name), setSubMenuShow(true), navigate(`${data?.to}`) }}
                            className={`cursor-pointer flex gap-2 items-center     px-2 py-2  transition-all duration-300 
                                ${widthSmall ? "justify-center" : "justify-between"}
                                ${data.name === activeLink ? "bg-grayColorLight rounded-lg" : ""
                                } ${(data?.name === "users" || data?.name === "roles") && userData !== "Admin" ? "hidden" : "inline-block"}`}
                        >

                            <div className={`flex items-center justify-center group relative`}  >
                                {React.createElement(data.icon, { size: 22, style: { marginLeft: '5px', marginRight: '5px' } })}
                                <h2 className={`text-sm ml-1 capitalize   ${widthSmall ? "hidden" : "inline-block"} ${(data?.name === "users" || data?.name === "roles") && userData !== "Admin" ? "hidden" : "inline-block"}`}>{data.name}</h2>
                                {widthSmall && <p className="hidden group-hover:inline-block absolute -right-4 top-0 capitalize">
                                    <Tooltip text={data?.name} /></p>}
                            </div>
                            {!widthSmall && data.submenu && <IoIosArrowDown
                                size={16}
                                className={`${data.name === activeLink ? "rotate-[180deg]" : "rotate-[0deg]"}`}
                            />}
                        </div>
                        {/* MENU ENDS */}
                        <div>
                            {/*SUBMENU STARTS and Render submenus only if the current link is active */}
                            {data.name === activeLink && data.submenu && (
                                <ul className={` flex flex-col
                    ${widthSmall ? `absolute top-0 left-16 border-[1px] border-borderColor border-solid rounded-xl w-[180px] shadow-lgShadow 
                    ${subMenuShow ? "inline-block" : "hidden"}` : "relative"} bg-whiteColor overflow-hidden`}>
                                    {data.subMenu &&
                                        data.subMenu.map((subLink, subLinkId) => (
                                            // dispatch(showNotFoundPage(!showNotFound))
                                            <Link to={subLink.to} onClick={() => { subMenuFunction(subLink.linkName), dispatch(showNotFoundPage(!showNotFound)) }}
                                                className={`${subLink.linkName === activeSubLink
                                                    ? "text-primaryColorLight"
                                                    : "text-grayColor"
                                                    }  cursor-pointer hover:bg-primaryColorLight hover:text-whiteColor py-1 mt-1  px-8`}>{subLink.linkName}</Link>
                                        ))}

                                </ul>
                            )}
                            {/*SUBMENU ENDS and Render submenus only if the current link is active */}
                        </div>
                    </div>
                ))}</div>
            <div className={`flex items-center text-sm mt-4 ml-2 mr-2 cursor-pointer bg-whiteColor ${widthSmall && "justify-center"}`} onClick={logoutFunction}>
                <RiLogoutBoxRLine className="text-redColor mr-1" size={22} />
                <p className={`text-sm ml-1 capitalize   ${widthSmall ? "hidden" : "inline-block"}`}>Logout</p>
            </div>
        </div>

    </div>
}

export default Links