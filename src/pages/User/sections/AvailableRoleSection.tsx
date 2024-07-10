import React, { useState } from "react";
import Table from "../../../components/Tables/Table";
import { availableRoleData, headers } from "../../../constdata/AvailableRoleData";
import Pagination from "../../../components/Pagination/Pagination";
const AvailableRoleSection=()=>{
    const [currentPage, setCurrentPage] = useState(1); // State to manage current page
    const dataLimit = 1; // Define your data limit here
    const totalPages = Math.ceil(availableRoleData?.tableData?.length / dataLimit);
    const onPageChange = (page: number) => {
        setCurrentPage(page); // Update current page state
        // You can perform any additional actions here, such as fetching data for the new page
    };
    // Calculate the indices for the current page's data slice
    const lastIndexItem = dataLimit * currentPage;
    const firstIndexItem = lastIndexItem - dataLimit;
    const currentTableData = availableRoleData?.tableData.slice(firstIndexItem, lastIndexItem);

    return <>
            <h1 className="font-semibold md:text-md
                lg:text-xl">Available Roles</h1>
            <Table headers={headers} tableData={currentTableData}/>
            <Pagination
                            totalPages={totalPages}
                            currentPage={currentPage}
                            dataLimit={dataLimit}
                            tableData={availableRoleData?.tableData}
                            onchange={onPageChange} // Pass onPageChange as onchange prop
                        />
            </>
}

export default AvailableRoleSection