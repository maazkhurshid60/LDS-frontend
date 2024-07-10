import React, { useState } from "react";
import Table from "../../../components/Tables/Table";
import { headers } from "../../../constdata/UserData";
import { useDispatch, useSelector } from "react-redux";
import { getOneUser, getUserId } from "../../../redux/slice/userId";
import { RootState } from "../../../redux/store";
import Pagination from "../../../components/Pagination/Pagination";

const AllUserSection = () => {
    const dispatch = useDispatch()
    const alluserData = useSelector((state: RootState) => state.userId.allUser)
    // console.log("all user after deletin",alluserData)
    const getUserIdFunction = (userId: number) => {
        dispatch(getUserId(userId))
        dispatch(getOneUser())

    };

    const [currentPage, setCurrentPage] = useState(1); // State to manage current page
    const dataLimit = 1; // Define your data limit here
    const totalPages = Math.ceil(alluserData?.tableData?.length / dataLimit);
    const onPageChange = (page: number) => {
        setCurrentPage(page); // Update current page state
        // You can perform any additional actions here, such as fetching data for the new page
    };
    // Calculate the indices for the current page's data slice
    const lastIndexItem = dataLimit * currentPage;
    const firstIndexItem = lastIndexItem - dataLimit;
    const currentTableData = alluserData?.tableData.slice(firstIndexItem, lastIndexItem);

    return (
        <>
            <h1 className="font-semibold md:text-md
                lg:text-xl">Users</h1>
            <Table headers={headers} tableData={alluserData?.tableData} onClick={getUserIdFunction}/>
            {/* <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                dataLimit={dataLimit}
                tableData={alluserData?.tableData}
                onchange={onPageChange} // Pass onPageChange as onchange prop
            />        */}
         </>
    );
};

export default AllUserSection;
