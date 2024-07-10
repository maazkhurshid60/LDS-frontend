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
    return<>
    <OutletLayout>
        <div className="">
            <OutletLayoutHeader heading="Service Types">
                {userInfo?.role ==="admin"&&<BorderButton buttonText="add" icon={<MdOutlineAdd />} isIcon onClick={()=>disptach(showModalReducer(true))}/>}
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
    </OutletLayout>
    
    {/* {showModal?<ServiceTypeModal/>: <OutletLayout>
        <div className="">
            <OutletLayoutHeader heading="Service Types">
                {userInfo?.role ==="admin"&&<BorderButton buttonText="add" icon={<MdOutlineAdd />} isIcon onClick={()=>disptach(showModalReducer(true))}/>}
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
    </OutletLayout>} */}
    
    </>

}

export default ServiceType