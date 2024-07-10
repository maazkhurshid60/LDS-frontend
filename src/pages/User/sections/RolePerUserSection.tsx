import React, { useState } from "react";
import Table from "../../../components/Tables/Table";
import { headers, userRoleData } from "../../../constdata/UserPerRole";
import Pagination from "../../../components/Pagination/Pagination";

const RolePerUserSection = () => {
    
    const [currentPage, setCurrentPage] = useState(1); // State to manage current page
    const dataLimit = 1; // Define your data limit here
    const totalPages = Math.ceil(userRoleData?.tableData?.length / dataLimit);
    const onPageChange = (page: number) => {
        setCurrentPage(page); // Update current page state
        // You can perform any additional actions here, such as fetching data for the new page
    };
    // Calculate the indices for the current page's data slice
    const lastIndexItem = dataLimit * currentPage;
    const firstIndexItem = lastIndexItem - dataLimit;
    const currentTableData = userRoleData?.tableData.slice(firstIndexItem, lastIndexItem);
    return (
        <div className=" w-full">
            <h1 className="font-semibold mb-4
                md:text-md
                lg:text-xl">Role per users </h1>
            <Table headers={headers} tableData={currentTableData}/>
            <Pagination
                            totalPages={totalPages}
                            currentPage={currentPage}
                            dataLimit={dataLimit}
                            tableData={userRoleData?.tableData}
                            onchange={onPageChange} // Pass onPageChange as onchange prop
                        />
        </div>
    );
}

export default RolePerUserSection;
