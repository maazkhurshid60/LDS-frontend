import React, { useEffect, useState } from "react";
import Table from "../../../components/Tables/Table";
import { headers } from "../../../constdata/UserData";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getOneUser, getUserId } from "../../../redux/slice/userId";
import { RootState } from "../../../redux/store";
import Pagination from "../../../components/Pagination/Pagination";

const AllUserSection = () => {
    const dispatch = useDispatch()
    const alluserData = useSelector((state: RootState) => state.userId.allUser)
    const getUserIdFunction = (userId: number) => {
             dispatch(getUserId(userId))
        dispatch(getOneUser())

    };

    
useEffect(()=>{
    dispatch(getAllUsers())
}, [dispatch])

    return (
        <>
            <h1 className="font-semibold md:text-md
                lg:text-xl">Users</h1>
            <Table headers={headers} tableData={alluserData?.tableData} getRowData={getUserIdFunction}/>
           
         </>
    );
};

export default AllUserSection;
