import React, { useEffect, useState } from "react";
import Table from "../../../components/Tables/Table";
import { headers } from "../../../constdata/UserData";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getOneUser, getUserId } from "../../../redux/slice/userId";
import { RootState } from "../../../redux/store";
import Pagination from "../../../components/Pagination/Pagination";
import TableWithoutAction from "../../../components/Tables/TableWithoutAction";

const AllUserSection = () => {
    const dispatch = useDispatch()
    const alluserData = useSelector((state: RootState) => state.userId.allUser)
    const getUserIdFunction = (userId:string,index: string) => {
             dispatch(getUserId(index))
        dispatch(getOneUser())

    };

    
useEffect(()=>{
    dispatch(getAllUsers())
}, [dispatch])

    return (
        <>
            <h1 className="font-semibold md:text-md
                lg:text-xl">Users</h1>
            <TableWithoutAction headers={headers} tableData={alluserData?.tableData} getRowData={getUserIdFunction}/>
           
         </>
    );
};

export default AllUserSection;
