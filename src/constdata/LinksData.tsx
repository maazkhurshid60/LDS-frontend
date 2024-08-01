import { IoSettingsOutline } from 'react-icons/io5';
import { LuUser2 } from "react-icons/lu";

export const linkData = [
    {
        name: "operations",
       submenu:true,
       icon:IoSettingsOutline,
       to:"#",

        subMenu: [
                    { linkName: "Service", to: "/operations/service"},
                    { linkName: "Result", to: "/operations/result"},
                    { linkName: "Legal Delivery", to: "/operations/legal-delivery"},
                  
                ]
    },
    {
        name: "Administration",
        icon:LuUser2,
        submenu:true,
        to:"#",

        subMenu: [
                    { linkName: "User", to: "/administration/user" },
                    { linkName: "Service Results", to: "/administration/service-results" },
                    { linkName: "Service Type", to: "/administration/service-type" },
                    { linkName: "Servers", to: "/administration/server" },
                    { linkName: "Clients", to: "/administration/client" },
                    { linkName: "Devices", to: "/administration/device" },
                    { linkName: "Holidays", to: "/administration/holiday" },
                    { linkName: "Settings", to: "/administration/setting" },
                ]
    },
    // {
    //     name: "Users",
    //     to:"/all-users",
    //     icon:LuUser2,
    //     submenu:false,
       
    // },
    // {
    //     name: "Roles",
    //     to:"/all-roles",
    //     icon:LuUser2,
    //     submenu:false,
       
    // }
]