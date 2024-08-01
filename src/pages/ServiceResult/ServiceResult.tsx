import React, { useEffect, useState } from "react";
import OutletLayout from "../../components/OutletLayout/OutletLayout";
import OutletLayoutHeader from "../../components/OutletLayout/OutLayoutHeader";
import { MdOutlineAdd } from "react-icons/md";
import BorderButton from "../../components/Buttons/BorderButton/BorderButton";
import Searchbar from "../../components/Searchbar/Searchbar";
import Filter from "../../components/Filter/Filter";
import Table from "../../components/Tables/Table";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../components/Pagination/Pagination";
import { showModalReducer, showUpdateModalReducer } from "../../redux/slice/showModal";
import ServiceResultModal from "../../components/Modal/ServiceResultModal"
import { useGetAllData } from "../../hooks/getAllDataHook/useGetAllData";
import { DataLoader } from "../../components/Loader/DataLoader";
import { toast } from "react-toastify";
import { deleteServiceResultApi } from "../../apiservices/serviceResult/serviceResult";
import { usePaginationCalc } from "../../hooks/paginationCalc/usePaginationCalc";
import ServiceResultModalUpdate from "../../components/Modal/ServiceResultModalUpdate";
import { serviceResultType } from "../../type/serviceResultType/serviceResultType";

const ServiceResult = () => {
    const userInfo = useSelector((state: RootState) => state?.userDetail?.userDetails?.user);
    const isAdmin = userInfo?.roles?.some((data) => data?.name === "Admin");    
 const headers = ["Service Result Code", "Service Result Description",...(isAdmin ? ["Action"] : [])];
    
    const showModal = useSelector((state: RootState) => state?.showModal.isShowModal);
    const showUpdateModal = useSelector((state: RootState) => state?.showModal.isUpdateShowModal);

const dispatch=useDispatch()
const {isLoading,error,data,refetch}=useGetAllData("/service-result/all-service-results")
const {totalPages,currentPage,currentTableData,dataLimit,onPageChange,checkLastRecord}=usePaginationCalc({tableData: data || []})
const [getSingleResultData,setGetSingleResultData]=useState<serviceResultType>()

// DELETE DATA FUNCTION
const deleteData=async(id:string)=>{
try {
    const response=await deleteServiceResultApi(id)
    console.log(response)
    toast.success(`${response?.data?.message}`)
    refetch()
    checkLastRecord() 
} catch (error) {
    console.log(error)

   toast.error("something went wrong") 
}
}

// UPDATE DATA FUNCTION
const resultUpdateFunction=(id:string)=>{
     console.log(id)
     setGetSingleResultData(data?.find((data,index)=>data?._id === id))
     dispatch(showUpdateModalReducer(true))
}

 if (isLoading) return <DataLoader text="Service result"/>

    if (error) return <div>An error has occurred: {error.message}</div>;
    return (
        <>
            {showModal ? (
                <ServiceResultModal />
            ) : showUpdateModal ? <ServiceResultModalUpdate singledata={getSingleResultData}/> : (
                <OutletLayout>
                    <div className="">
                        <OutletLayoutHeader heading="Service Results">
                            {userInfo?.roles[0]?.name === "Admin" && (
                                <BorderButton buttonText="add" icon={<MdOutlineAdd />} isIcon onClick={() => dispatch(showModalReducer(true))} />
                            )}
                            <BorderButton buttonText="filter" disabled />
                        </OutletLayoutHeader>
                        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center">
                            <Searchbar />
                            <Filter />
                        </div>
                        <Table headers={headers} tableData={currentTableData} onClick={deleteData} onUpdateClick={resultUpdateFunction}/>
                        <Pagination
                            totalPages={totalPages}
                            currentPage={currentPage}
                            dataLimit={dataLimit}
                            tableData={currentTableData}
                            onchange={onPageChange} // Pass onPageChange as onchange prop
                        />
                    </div>
                </OutletLayout>
            )}
        </>
    );
};

export default ServiceResult;
