import React, { useEffect, useState } from "react";
import OutletLayout from "../../components/OutletLayout/OutletLayout";
import OutletLayoutHeader from "../../components/OutletLayout/OutLayoutHeader";
import { MdOutlineAdd } from "react-icons/md";
import BorderButton from "../../components/Buttons/BorderButton/BorderButton";
import Searchbar from "../../components/Searchbar/Searchbar";
import Filter from "../../components/Filter/Filter";
import Table from "../../components/Tables/Table";
import { headers, tableData } from "../../constdata/ServiceResultData";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../components/Pagination/Pagination";
import { showModalReducer } from "../../redux/slice/showModal";
import ServiceResultModal from "../../components/Modal/ServiceResultModal"
import { useGetAllData } from "../../hooks/getAllDataHook/useGetAllData";
import { DataLoader } from "../../components/Loader/DataLoader";
const ServiceResult = () => {
    const userInfo = useSelector((state: RootState) => state?.userDetail);
    const showModal = useSelector((state: RootState) => state?.showModal.isShowModal);
    // const [allServiceResultData,setAllServiceResultData]=useState<serviceResultType[]>([])
const dispatch=useDispatch()
const {isLoading,error,data}=useGetAllData("/service-result/all-service-results")
// console.log(isLoading,error,data)
    const [currentPage, setCurrentPage] = useState(1); // State to manage current page
    const dataLimit = 1; // Define your data limit here
    const totalPages = Math.ceil(data?.length / dataLimit);
    const onPageChange = (page: number) => {
        setCurrentPage(page); // Update current page state
        // You can perform any additional actions here, such as fetching data for the new page
    };
    // Calculate the indices for the current page's data slice
    const lastIndexItem = dataLimit * currentPage;
    const firstIndexItem = lastIndexItem - dataLimit;
    const currentTableData = data?.slice(firstIndexItem, lastIndexItem);

// useEffect(()=>{
//     getAllDataFunction()
    
// },[])

// const getAllDataFunction=async()=>{
//     try {
//         const res=await getAllServiceResultApi()
//         console.log(">>>>>>>>>>>>>>>>>>>>>>",res?.data)
//         setAllServiceResultData(res?.data)
//     } catch (error) {
        
//         console.log(error)
//     }
// }

 if (isLoading) return <DataLoader text="Service result"/>

    if (error) return <div>An error has occurred: {error.message}</div>;
    return (
        <>
            {showModal ? (
                <ServiceResultModal />
            ) : (
                <OutletLayout>
                    <div className="">
                        <OutletLayoutHeader heading="Service Results">
                            {userInfo?.role === "admin" && (
                                <BorderButton buttonText="add" icon={<MdOutlineAdd />} isIcon onClick={() => dispatch(showModalReducer(true))} />
                            )}
                            <BorderButton buttonText="filter" disabled />
                        </OutletLayoutHeader>
                        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center">
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
                </OutletLayout>
            )}
        </>
    );
};

export default ServiceResult;
