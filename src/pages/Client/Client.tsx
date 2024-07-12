import React, { useState } from "react";
import OutletLayout from "../../components/OutletLayout/OutletLayout";
import OutletLayoutHeader from "../../components/OutletLayout/OutLayoutHeader";
import { MdOutlineAdd } from "react-icons/md";
import BorderButton from "../../components/Buttons/BorderButton/BorderButton";
import Searchbar from "../../components/Searchbar/Searchbar";
import Filter from "../../components/Filter/Filter";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../components/Tables/Table";
import { headers } from "../../constdata/ClientData";
import { RootState } from "../../redux/store";
import ClientModal from "../../components/Modal/clientModal";
import { showModalReducer } from "../../redux/slice/showModal";
import Pagination from "../../components/Pagination/Pagination";
import { usePaginationCalc } from "../../hooks/paginationCalc/usePaginationCalc";
import { useGetAllData } from "../../hooks/getAllDataHook/useGetAllData";
import { DataLoader } from "../../components/Loader/DataLoader";
import { useGetAllDataParameter } from "../../hooks/getAllDataHook/useGetAllDataParameter";
const Client = () => {
    const userInfo= useSelector((state: RootState) => state?.userDetail?.userDetails?.user);
    const showModal = useSelector((state: RootState) => state?.showModal.isShowModal)
    const {isLoading,error,data}=useGetAllDataParameter("/client/all-clients")
    console.log(">>>>>>>>>>>>>>>>",data)
    const {totalPages,currentPage,currentTableData,dataLimit,onPageChange}=usePaginationCalc({tableData: data || []})
    const dispatch =useDispatch()
    console.log(userInfo)

    // const [currentPage, setCurrentPage] = useState(1); // State to manage current page
    // // PAGE CALCULATION STARTS
    // const dataLimit = 1; // Define your data limit here
    // const totalPages = Math.ceil(tableData?.tableData?.length / dataLimit);
    // const onPageChange = (page: number) => {
    //     setCurrentPage(page); // Update current page state
    //     // You can perform any additional actions here, such as fetching data for the new page
    // };
    // // Calculate the indices for the current page's data slice
    // const lastIndexItem = dataLimit * currentPage;
    // const firstIndexItem = lastIndexItem - dataLimit;
    // const currentTableData = tableData?.tableData.slice(firstIndexItem, lastIndexItem);
// PAGE CALCULATION ENDS


// if (isLoading) return <DataLoader text="Client"/>

// if (error) return <div>An error has occurred: {error.message}</div>;

    return <>
{showModal?<ClientModal/>:<OutletLayout>
            <div className="">
                <OutletLayoutHeader heading="Clients">
                    {userInfo?.roles[0]?.name === "Admin" && <BorderButton buttonText="add" icon={<MdOutlineAdd />} isIcon onClick={()=>dispatch(showModalReducer(true))}/>}
                    <BorderButton buttonText="filter" disabled />
                </OutletLayoutHeader>
                <div className="mt-4 flex flex-col  gap-4
                            sm:flex-row sm:items-center">
                    <Searchbar />
                    <Filter />
                </div>
                {/* <Table headers={headers} tableData={currentTableData} />
                <Pagination
                            totalPages={totalPages}
                            currentPage={currentPage}
                            dataLimit={dataLimit}
                            tableData={currentTableData}
                            onchange={onPageChange} // Pass onPageChange as onchange prop
                        /> */}
            </div>
        </OutletLayout>}
        
    </>
}

export default Client