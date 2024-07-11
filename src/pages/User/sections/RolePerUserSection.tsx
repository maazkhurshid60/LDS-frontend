import React, { useState } from "react";
import Table from "../../../components/Tables/Table";
import { headers, userRoleData } from "../../../constdata/UserPerRole";
import Pagination from "../../../components/Pagination/Pagination";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import TableWithoutAction from "../../../components/Tables/TableWithoutAction";

const RolePerUserSection = () => {
    const alluserDetail=useSelector((state:RootState)=>state.userId)
    // console.log("alluser detail",alluserDetail?.singleUser[0]?.roles)
   
    return (
        <div className=" w-full">
            <h1 className="font-semibold mb-4
                md:text-md
                lg:text-xl">Role per users </h1>
            <TableWithoutAction headers={headers} tableData={alluserDetail.singleUser ? alluserDetail.singleUser[0]?.roles : []}/>
            
        </div>
    );
}

export default RolePerUserSection;
