import React, { useState } from "react";
import OutletLayout from "../../components/OutletLayout/OutletLayout";
import OutletLayoutHeader from "../../components/OutletLayout/OutLayoutHeader";
import { MdOutlineAdd } from "react-icons/md";
import BorderButton from "../../components/Buttons/BorderButton/BorderButton";
import Searchbar from "../../components/Searchbar/Searchbar";
import Filter from "../../components/Filter/Filter";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../components/Tables/Table";
import { headers, tableData } from "../../constdata/DevicesData";
import { RootState } from "../../redux/store";
import { showModalReducer } from "../../redux/slice/showModal";
import DeviceModal from "../../components/Modal/DeviceModal";
import Pagination from "../../components/Pagination/Pagination";
import { useGetAllData } from "../../hooks/getAllDataHook/useGetAllData";
import { usePaginationCalc } from "../../hooks/paginationCalc/usePaginationCalc";
const Devices= () => {
    const userInfo= useSelector((state: RootState) => state?.userDetail?.userDetails?.user);
      const showModal=useSelector((state: RootState )=>state?.showModal.isShowModal)
      const {isLoading,error,data,refetch}=useGetAllData("/device/all-devices")
      console.log(">>>>>>>>>>>>>>>>",isLoading,error,data)
      const {totalPages,currentPage,currentTableData,dataLimit,onPageChange}=usePaginationCalc({tableData: data || []})
const dispatch=useDispatch()
    return <>
    
    {showModal?<DeviceModal/>: <OutletLayout>
        <div className="">
            <OutletLayoutHeader heading="Devices">
                {userInfo?.role ==="admin"&&<BorderButton buttonText="add" icon={<MdOutlineAdd />} isIcon onClick={()=>dispatch(showModalReducer(true))}/>}
                <BorderButton buttonText="filter" disabled />
            </OutletLayoutHeader>
            <div className="mt-4 flex flex-col  gap-4
                            sm:flex-row sm:items-center">
                <Searchbar />
                <Filter />
            </div>
            <Table headers={headers} tableData={currentTableData} />
                        <Pagination
                            totalPages={totalPages}
                            currentPage={currentPage}
                            dataLimit={dataLimit}
                            tableData={tableData?.tableData}
                            onchange={onPageChange} // Pass onPageChange as onchange prop
                        />
        </div>
    </OutletLayout>}
    
   
    </>
}

export default Devices