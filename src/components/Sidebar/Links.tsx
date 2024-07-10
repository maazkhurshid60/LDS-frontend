import React, { useState } from "react";
import { linkData } from "../../constdata/LinksData";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { emptyNavbarData, setMainMenuName, setSubMenuName } from "../../redux/slice/navbarTracking";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { logoutUser } from "../../redux/slice/userDetail";
import { openMenuFunction } from "../../redux/slice/menuOpen";
import { RootState } from "../../redux/store";
export interface widthProp {
    widthSmall: boolean
}
const Links: React.FC<widthProp> = ({ widthSmall }) => {
    const [activeSubLink, setActiveSubLink] = useState<string>()
    const [activeLink, setActiveLink] = useState<string>()
    const [subMenu, setSubMenu] = useState(false)
    const [subMenuShow, setSubMenuShow] = useState(false)
    const menu = useSelector((state: RootState) => state.menuOpen.menuOpenStatus);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const toggleOpenFunction = (activeLinkName: string) => {
        setActiveLink(activeLinkName)
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
    return <div className={`mt-8 w-[100%] h-full m-auto  font-semibold relative`}>
        <div className="mr-4 h-[65vh] md:h-[85vh] flex flex-col justify-between"><div>{linkData.map((data, id) => (
            <div key={id} className="text-sm mb-2 relative">
                {/* MENU STARTS */}
                <div
                    onClick={() => { toggleOpenFunction(data.name), setSubMenuShow(true) }}
                    className={`cursor-pointer flex gap-2 items-center justify-between  px-2 py-2  transition-all duration-300 ${data.name === activeLink ? "bg-grayColorLight rounded-lg" : ""
                        }`}
                >
                    <div className="flex items-center jusify-start "  >
                        {React.createElement(data.icon, { size: 22, style: { marginLeft: '5px', marginRight: '5px' } })}
                        <h2 className={`text-sm ml-1 capitalize   ${widthSmall ? "hidden" : "inline-block"}`}>{data.name}</h2>
                    </div>
                    {!widthSmall && <IoIosArrowDown
                        size={16}
                        className={`${data.name === activeLink ? "rotate-[180deg]" : "rotate-[0deg]"}`}
                    />}
                </div>
                {/* MENU ENDS */}
                {/*SUBMENU STARTS and Render submenus only if the current link is active */}
                {data.name === activeLink && (
                    <ul className={`
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