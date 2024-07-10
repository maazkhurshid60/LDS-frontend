import React, { useState } from "react";
import OutletLayout from "../../components/OutletLayout/OutletLayout";
import OutletLayoutHeader from "../../components/OutletLayout/OutLayoutHeader";
import { MdOutlineAdd } from "react-icons/md";
import BorderButton from "../../components/Buttons/BorderButton/BorderButton";
import Searchbar from "../../components/Searchbar/Searchbar";
import Filter from "../../components/Filter/Filter";
import Table2Col from "../../components/Tables/Table";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Table from "../../components/Tables/Table";
import { headers, tableData } from "../../constdata/ServiceTypeData";
import { RootState } from "../../redux/store";
import ServiceTypeModal from "../../components/Modal/ServiceTypeModal";
import { showModalReducer } from "../../redux/slice/showModal";
import Pagination from "../../components/Pagination/Pagination";
const ServiceType = () => {
    

    const userInfo=useSelector((state: RootState )=>state?.userDetail)
    const showModal = useSelector((state: RootState) => state?.showModal.isShowModal)
    const disptach = useDispatch()
    const [currentPage, setCurrentPage] = useState(1); // State to manage current page
    const dataLimit = 1; // Define your data limit here
    const totalPages = Math.ceil(tableData?.tableData?.length / dataLimit);
    const onPageChange = (page: number) => {
        setCurrentPage(page); // Update current page state
        // You can perform any additional actions here, such as fetching data for the new page
    };
    // Calculate the indices for the current page's data slice
    const lastIndexItem = dataLimit * currentPage;
    const firstIndexItem = lastIndexItem - dataLimit;
    const currentTableData = tableData?.tableData.slice(firstIndexItem, lastIndexItem);
    return<>{showModal?<ServiceTypeModal/>: <OutletLayout>
        <div className="">
            <OutletLayoutHeader heading="Service Types">
                {userInfo?.role ==="admin"&&<BorderButton buttonText="add" icon={<MdOutlineAdd />} isIcon onClick={()=>disptach(showModalReducer(true))}/>}
                <BorderButton buttonText="filter" disabled />
            </OutletLayoutHeader>
            {/* <div className="flex items-center justify-between">
                <h1 className="font-semibold text-xl">Search Results </h1>
                <div className="flex items-center gap-2">
                    <BorderButton buttonText="add" icon={<MdOutlineAdd />} isIcon />
                    <BorderButton buttonText="filter" disabled />
                </div>
            </div> */}
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
                        />            {/* 
<div className="relative w-full overflow-x-auto rounded-lg mt-4 border-[1px] border-borderColor border-solid rounded-xl capitalize
                    text-sm
                    sm:text-base">
    <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400 ">
        <thead className="text-xs text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="bg-[#5D87B2] text-whiteColor">
                <th scope="col" className="px-6 py-3">
                Service Type Code
                </th>
                <th scope="col" className="px-6 py-3">
                Service Type Description
                </th>                
            </tr>
        </thead>
        <tbody>
            {tableData?.map((data,id:number)=> <tr className={`bg-white ${id%2===0 ?"bg-XwhiteColor":"bg-[#F1F5F8]"}  font-medium text-sm
                    sm:text-base`} key={id}>
                <th scope="row" className="px-6 py-4 ">
                    {data?.ServiceTypeCode}
                </th>
                <td className="px-6 py-4">
                {data?.ServiceTypeDescription}
                </td>
            </tr>)}           
        </tbody>
    </table>
</div> */}
        </div>
    </OutletLayout>}
    
    </>

}

export default ServiceType