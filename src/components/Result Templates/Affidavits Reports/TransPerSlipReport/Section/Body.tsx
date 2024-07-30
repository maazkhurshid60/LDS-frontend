import React from "react";
import DataTable from "./DataTable";
const Body = () => {
    return <div className="font-bold text-base w-full flex flex-col gap-y-4">
        <div className="flex flex-wrap items-center justify-between">
            <h1 className="w-[45%]">Name: NAME_FROM_BACKEND_API</h1>
            <h1 className="w-[45%]">Lic: LIC_FROM_BACKEND_API</h1>
        </div>
        <h1 className="w-[45%]">Title of action: TITLE_FROM_BACKEND_API</h1>
        <h1 className="w-[45%]">Name: NAME_FROM_BACKEND_API</h1>
        <h1 className="w-[45%]">Name: NAME_FROM_BACKEND_API</h1>
        <h1 className="w-[45%]">Paper Served: PaperServed_FROM_BACKEND_API</h1>
        <h1 className="w-[45%]">Name: NAME_FROM_BACKEND_API</h1>
        <h1 className="w-[45%]">Index no: Indexno_FROM_BACKEND_API</h1>
        <h1 className="w-[45%]">Address: Address_FROM_BACKEND_API</h1>
        <h1 className="w-[45%]">APT: APT_FROM_BACKEND_API</h1>
        <h1 className="w-[45%]">City: City_FROM_BACKEND_API</h1>
        <h1 className="w-[45%]">Zip: Zip_FROM_BACKEND_API</h1>
        <h1 className="w-[45%]">Country: Country_FROM_BACKEND_API</h1>
        <h1 className="w-[45%]">Type of Service: TypeofService_FROM_BACKEND_API</h1>
        <h1 className="w-[45%]">Service Completed: ServiceCompleted_FROM_BACKEND_API</h1>
        <h1 className="w-[45%]">Description: Description_FROM_BACKEND_API</h1>
        <h1 className="w-[45%]">Person Served: personServed_FROM_BACKEND_API</h1>
        <div>
            <h1 className="bg-grayColorLight px-2 py-2">Attempt Date</h1>
            <div className="flex flex-wrap items-center justify-between px-2 ">
                <h1 className="w-[32%]">Date: Date_FROM_BACKEND_API</h1>
                <h1 className="w-[32%]">Time: Time_FROM_BACKEND_API</h1>
                <h1 className="w-[32%]">Date of Mailing: FROM_BACKEND_API</h1>

            </div>
        </div>
        <DataTable/>
        <h1 className="w-[45%]">Comments:FROM_BACKEND_API</h1>

    </div>
}
export default Body