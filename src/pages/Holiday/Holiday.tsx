import React, { useState } from "react";
import OutletLayout from "../../components/OutletLayout/OutletLayout";
import OutletLayoutHeader from "../../components/OutletLayout/OutLayoutHeader";
import { MdOutlineAdd } from "react-icons/md";
import BorderButton from "../../components/Buttons/BorderButton/BorderButton";
import Searchbar from "../../components/Searchbar/Searchbar";
import Filter from "../../components/Filter/Filter";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../components/Tables/Table";
import { headers, tableData } from "../../constdata/HolidayData";
import { RootState } from "../../redux/store";
import HolidayModal from "../../components/Modal/HolidayModal";
import { showModalReducer } from "../../redux/slice/showModal";
import Pagination from "../../components/Pagination/Pagination";
const Holiday= () => {
      const userInfo=useSelector((state: RootState )=>state?.userDetail)
      const showModal=useSelector((state: RootState )=>state?.showModal.isShowModal)
      const dispatch=useDispatch()
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
    
    {showModal?<HolidayModal/>:<OutletLayout>
        <div className="">
            <OutletLayoutHeader heading="Holidays">
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

export default Holiday