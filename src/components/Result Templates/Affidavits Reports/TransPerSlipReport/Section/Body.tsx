import React from "react";
import DataTable from "./DataTable";
import { formatDate } from "../../../../../utils/dateFormate"
import { formatTime } from "../../../../../utils/timeFormate"


export interface BodyProps {
    name?: string
    lic?: string | number
    titleAction?: string
    nameServicesFirstName?: string
    paperServed?: string
    index?: string | number
    address?: string
    apt?: string | number
    city?: string
    zip?: string | number
    country?: string
    typeOfService?: string
    serviceCompleted?: string | boolean
    description?: string
    personServed?: string
    date?: string
    time?: string
    dateOfmailing?: string
    sex?: string;
    skinColor?: string;
    age?: string | number;
    height?: string | number
    weight?: string | number
    hair?: string
    entry?: string | boolean | number
    wall?: string | number
    floor?: string | number
    door?: string | number
    locks?: string | number
    noOfLocks?: string | number
    commentOtherFeature?: string | number | boolean
}
const Body: React.FC<BodyProps> = (item) => {
    return <div className="font-bold text-base w-full flex flex-col gap-y-4">
        <div className="flex flex-wrap items-center justify-between">
            <h1 className="w-[45%]">Name: <span className="font-semibold">{item?.name ? item?.name : "______________________________"}</span></h1>
            <h1 className="w-[45%]">Lic: <span className="font-semibold">{item?.lic ? item?.lic : "______________________________"}</span></h1>
        </div>
        <h1 className="w-[45%]">Title of action: <span className="font-semibold">{item?.titleAction ? item?.titleAction : "______________________________"}</span></h1>
        <h1 className="w-[45%]">Name: <span className="font-semibold">{item?.nameServicesFirstName ? item?.nameServicesFirstName : "______________________________"}</span></h1>
        <h1 className="w-[45%]">Paper Served: <span className="font-semibold">{item?.paperServed ? item?.paperServed : "______________________________"}</span></h1>
        <h1 className="w-[45%]">Index no: <span className="font-semibold">{item?.index ? item?.index : "______________________________"}</span></h1>
        <div className="flex items-center justify-between flex-wrap w-full">

            <h1 className="w-[40%]">Address: <span className="font-semibold">{item?.address ? item?.address : "______________________________"}</span></h1>
            <h1 className="w-[20%]">APT: <span className="font-semibold">{item?.apt ? item?.apt : "______________________________"}</span></h1>
            <h1 className="w-[20%]">City: <span className="font-semibold">{item?.city ? item?.city : "______________________________"}</span></h1>
            <h1 className="w-[20%]">Zip: <span className="font-semibold">{item?.zip ? item?.zip : "______________________________"}</span></h1>
        </div>
        <h1 className="w-[45%]">Country: <span className="font-semibold">{item?.country ? item?.country : "______________________________"}</span></h1>
        <h1 className="w-[45%]">Type of Service: <span className="font-semibold">{item?.typeOfService ? item?.typeOfService : "______________________________"}</span></h1>
        <h1 className="w-[45%]">Service Completed: <span className="font-semibold">{item?.serviceCompleted ? item?.serviceCompleted : "______________________________"}</span></h1>
        <h1 className="w-[45%]">Description: <span className="font-semibold">{item?.description ? item?.description : "______________________________"}</span></h1>
        <h1 className="w-[45%]">Person Served: <span className="font-semibold">{item?.personServed ? item?.personServed : "______________________________"}</span></h1>
        <div>
            <h1 className="bg-grayColorLight py-2">Attempt Date</h1>
            <div className="flex flex-wrap items-center justify-between ">
                <h1 className="w-[32%]">Date: <span className="font-semibold">{item?.date ? formatDate(item?.dateOfmailing) : "______________________________"}</span></h1>
                <h1 className="w-[32%]">Time: <span className="font-semibold">{item?.time ? formatTime(item?.time) : "______________________________"}</span></h1>
                <h1 className="w-[32%]">Date of Mailing: <span className="font-semibold">{item?.dateOfmailing ? formatDate(item?.dateOfmailing) : "______________________________"}</span></h1>

            </div>
        </div>
        <DataTable
            sex={item?.sex}
            skinColor={item?.skinColor}
            age={item?.age}
            height={item?.height}
            weight={item?.weight}
            hair={item?.hair}
            entry={item?.entry}
            wall={item?.wall}
            floor={item?.floor}
            door={item?.door}
            locks={item?.locks}
            noOfLocks={item?.noOfLocks}
            commentOtherFeature={item?.commentOtherFeature} />
        <h1 className="w-[45%]">Comments:<span className="font-semibold">{item?.commentOtherFeature ? item?.commentOtherFeature : "______________________________"}</span></h1>

    </div>
}
export default Body