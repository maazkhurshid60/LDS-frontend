import React, { useState } from "react";
import OutletLayout from "../../components/OutletLayout/OutletLayout";
import OutletLayoutHeader from "../../components/OutletLayout/OutLayoutHeader";
import Searchbar from "../../components/Searchbar/Searchbar";
import Filter from "../../components/Filter/Filter";
import Table from "../../components/Tables/Table";
import { headers, tableData } from "../../constdata/LegalDeliveryData";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";
import FilterMenu from "./FilterSection/FilterMenu/FilterMenu";

const LegalDelivery = () => {

    const [showFilterMenu, setShowFilterMenu] = useState(false)
    const linksData = ["Clear Filter", "GPS Report", "Affidavits Reports", "Column Layout", "Enable Actions", "Regenerate GeoCode", "Sort Records"]

    const [currentPage, setCurrentPage] = useState(1); // State to manage current page
    const dataLimit = 1; // Define your data limit here
    const totalPages = Math.ceil(tableData?.tableData?.length / dataLimit);
    const onPageChange = (page: number) => {
        setCurrentPage(page); // Update current page state
        // You can perform any additional actions here, such as fetching data for the new page
    };
    // Calculate the indices for the current page's data slice
    const lastIndexItem = dataLimit * currentPage;
    const firstIndexItem = lastIndexItem - dataLimit;
    const currentTableData = tableData?.tableData.slice(firstIndexItem, lastIndexItem);
    return <div className="h-[72vh]">
        <div className="relative bg-whiteColor ">
            {/* <div className={`absolute -top-4 sm:-top-6 md:-top-24  flex items-start transition-all duration-500 z-50  ${showFilterMenu ? "-right-5 xl:-right-[52px]" : "-right-5 xl:-right-[52px]"}`} > */}
            <div className={`fixed top-[65px] md:top-[20px]  flex items-start transition-all duration-500 z-50 rounded-tl-full rounded-bl-full shadow-smShadow ${showFilterMenu ? "-right-2 lg:-right-0" : "-right-0 lg:right-[0px]"}`} >
                {/* SUB FILTER SHOW BUTTON STARTS*/}
                <div className="rounded-tl-full rounded-bl-full p-1  border-[1px] border-borderColor border-solid bg-whiteColor
                                shadow-lgShadow w-[40px]  cursor-pointer">
                    <IoIosArrowDropleftCircle className={`text-primaryColor transition-all duration-500 ${showFilterMenu ? "rotate-[180deg]" : "rotate-[0deg]"}`} size={30} onClick={() => setShowFilterMenu(!showFilterMenu)} />
                </div>
                {/* SUB FILTER SHOW BUTTON ENDS*/}
                <div className={`p-4 border-[1px] border-borderColor border-solid  w-[275px] sm:w-[300px] bg-whiteColor ${showFilterMenu ? "inline-block" : "hidden opacity-0"}`}><FilterMenu /></div>
            </div>
        </div>
        <OutletLayout>
            <OutletLayoutHeader heading="Legal Delivery">
            </OutletLayoutHeader>
            <div className="mt-4 flex flex-col  gap-4
            sm:flex-row sm:items-center">
                <Searchbar />
                <Filter />
            </div>
            <div className="flex flex-wrap items-center gap-x-8 justify-between font-medium text-sm mt-4">
                {linksData?.map((data, id) => <Link to="#" key={id}>{data}</Link>)}
            </div>
            <Table headers={headers} tableData={currentTableData} />
            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                dataLimit={dataLimit}
                tableData={tableData?.tableData}
                onchange={onPageChange} // Pass onPageChange as onchange prop
            />
        </OutletLayout>

    </div>
}
export default LegalDelivery