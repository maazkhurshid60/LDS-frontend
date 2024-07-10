import { IoSettingsOutline } from 'react-icons/io5';
import { LuUser2 } from "react-icons/lu";

export const linkData = [
    {
        name: "operations",
       submenu:true,
       icon:IoSettingsOutline,
        subMenu: [
                    { linkName: "Service", to: "/service"},
                    { linkName: "Result", to: "/result"},
                    { linkName: "Legal Delivery", to: "/legal-delivery"},
                  
                ]
    },
    {
        name: "Administration",
        icon:LuUser2,
        submenu:true,
        subMenu: [
                    { linkName: "User", to: "/user" },
                    { linkName: "Service Result", to: "/service-result" },
                    { linkName: "Service Type", to: "/service-type" },
                    { linkName: "Servers", to: "/server" },
                    { linkName: "Clients", to: "/client" },
                    { linkName: "Devices", to: "/device" },
                    { linkName: "Holidays", to: "/holiday" },
                    { linkName: "Settings", to: "/setting" },
                ]
    }
]