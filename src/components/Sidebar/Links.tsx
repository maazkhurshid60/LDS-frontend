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
export interface widthProp {
    widthSmall: boolean
    userData: string
}
const Links: React.FC<widthProp> = ({ widthSmall, userData }) => {
    const link="users"
    const link2="roles"
    const link3="operation"

// console.log((link === "users" || link2 === "roles")  && userData !=="Admin" ?  "hidden":{link ,link2,link3} )
    const [activeSubLink, setActiveSubLink] = useState<string>()
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [activeLink, setActiveLink] = useState<string>()
    const [activeLinkIndex, setActiveLinkIndex] = useState<string>()

    const [subMenu, setSubMenu] = useState(false)
    const [subMenuShow, setSubMenuShow] = useState(false)
    const menu = useSelector((state: RootState) => state.menuOpen.menuOpenStatus);
    const dispatch = useDispatch()
    console.log("activelink",activeLink,subMenu)
    const navigate = useNavigate()
    const toggleOpenFunction = (activeLinkName: string,id) => {
        setActiveLink(activeLinkName)
        setActiveLinkIndex(id)
        setSubMenu(!subMenu);
        dispatch(setMainMenuName(activeLinkName))
    }
    //    LOGOUT FUNCTION
    const logoutFunction = () => {
        dispatch(logoutUser())
        dispatch(emptyNavbarData())
        navigate("/login")
    }
    // SUBMENU FUNCTION
    const subMenuFunction = (linkName: string) => {
        setActiveSubLink(linkName),
            dispatch(setSubMenuName(linkName)),
            setSubMenuShow(false),
            dispatch(openMenuFunction(menu))
    }
    // console.log("smallwidth",widthSmall,"subMenuShow",subMenuShow)
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
    return <div className={`mt-8 w-[100%] h-full m-auto  font-semibold relative`}>
        
        <div className=" w-[40px] h-[65vh] md:h-[85vh] flex flex-col justify-between items-center">
            <div  ref={dropdownRef}>
                {linkData.map((data, id) => (
                    <div key={id} className="text-sm mb-2 relative" >

                        {/* MENU STARTS */}
                        <div
                            onClick={() => { toggleOpenFunction(data.name,id), setSubMenuShow(true),navigate(`${data?.to}`) }}
                            className={`cursor-pointer flex gap-2 items-center justify-between  px-2 py-2  transition-all duration-300 ${data.name === activeLink ? "bg-grayColorLight rounded-lg" : ""
                                } ${(data?.name === "users" || data?.name === "roles")  && userData !=="Admin" ? "hidden" : "inline-block"}`}
                        >

                            {/* CHECK IF USER IS ADMIN THEN USERS LINK SHOULD SHOW 
                           ${(data?.name === "users" || data?.name === "roles")  && userData !=="Admin" ? "hidden" : "inline-block"} */}
                            <div className={`flex items-center jusify-start  `}  >
                                {React.createElement(data.icon, { size: 22, style: { marginLeft: '5px', marginRight: '5px' } })}
                                <h2 className={`text-sm ml-1 capitalize   ${widthSmall ? "hidden" : "inline-block"} ${(data?.name === "users" || data?.name === "roles")  && userData !=="Admin" ? "hidden" : "inline-block"}`}>{data.name}</h2>
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
                            <ul   className={`
                    ${widthSmall ? `absolute top-0 left-16 border-[1px] border-borderColor border-solid rounded-xl w-[180px] shadow-lgShadow py-6 px-8
                    
                    ${subMenuShow ? "inline-block" : "hidden"}` : "relative"} bg-whiteColor overflow-hidden`}>
                                {data.subMenu &&
                                    data.subMenu.map((subLink, subLinkId) => (
                                        <li
                                            key={subLinkId}
                                            className={`${subLink.linkName === activeSubLink
                                                ? "text-primaryColorLight"
                                                : "text-grayColor"
                                                } p-2`}

                                        >
                                            <Link to={subLink.to} onClick={() => subMenuFunction(subLink.linkName)}>{subLink.linkName}</Link>
                                        </li>
                                    ))}

                            </ul>
                        )}
                        {/*SUBMENU ENDS and Render submenus only if the current link is active */}
                        </div>
                    </div>
                ))}</div>
            <div className="flex items-center text-sm mt-4 ml-2 mr-2 cursor-pointer" onClick={logoutFunction}>
                <RiLogoutBoxRLine className="text-redColor mr-1" size={22} />
                <p className={`text-sm ml-1 capitalize   ${widthSmall ? "hidden" : "inline-block"}`}>Logout</p>
            </div>
        </div>
        {/* <div className="flex items-center text-sm mt-4" onClick={logoutFunction}>
            <RiLogoutBoxRLine className="text-redColor mr-1" size={16}/>
            <p>Logout</p>
        </div> */}
    </div>
}

export default Links