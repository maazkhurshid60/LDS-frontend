import React, { useState } from "react";
import OutletLayout from "../../components/OutletLayout/OutletLayout";
import OutletLayoutHeader from "../../components/OutletLayout/OutLayoutHeader";
import { MdOutlineAdd } from "react-icons/md";
import BorderButton from "../../components/Buttons/BorderButton/BorderButton";
import Searchbar from "../../components/Searchbar/Searchbar";
import Filter from "../../components/Filter/Filter";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Table from "../../components/Tables/Table";
import { headers, tableData } from "../../constdata/ServiceTypeData";
import { RootState } from "../../redux/store";
import ServiceTypeModal from "../../components/Modal/ServiceTypeModal";
import { showModalReducer, showUpdateModalReducer } from "../../redux/slice/showModal";
import Pagination from "../../components/Pagination/Pagination";
import { useGetAllData } from "../../hooks/getAllDataHook/useGetAllData";
import { DataLoader } from "../../components/Loader/DataLoader";
import { toast } from "react-toastify";
import { deleteServiceTypeApi } from "../../apiservices/serviceTypeApi/serviceTypeApi";
import ServiceTypeModalUpdate from "../../components/Modal/ServiceTypeModelUpdate";
import { serviceTypeType } from "../../type/serviceResultType/serviceResultType";
import { usePaginationCalc } from "../../hooks/paginationCalc/usePaginationCalc";
const ServiceType = () => {
    const showUpdateModal = useSelector((state: RootState) => state?.showModal.isUpdateShowModal);
    const {isLoading,error,data,refetch}=useGetAllData("/service-type/all-service-types")
    const {totalPages,currentPage,currentTableData,dataLimit,onPageChange}=usePaginationCalc({tableData: data || []})
    const userInfo= useSelector((state: RootState) => state?.userDetail?.userDetails?.user);
    const showModal = useSelector((state: RootState) => state?.showModal.isShowModal)
const [getSingleTypeData,setGetSingleTypeData]=useState<serviceTypeType>()

    const disptach = useDispatch()
    // const [currentPage, setCurrentPage] = useState(1); // State to manage current page
    // const dataLimit = 10; // Define your data limit here
    // const totalPages = Math.ceil(data?.length / dataLimit);
    // const onPageChange = (page: number) => {
    //     setCurrentPage(page); // Update current page state
    //     // You can perform any additional actions here, such as fetching data for the new page
    // };
    // // Calculate the indices for the current page's data slice
    // const lastIndexItem = dataLimit * currentPage;
    // const firstIndexItem = lastIndexItem - dataLimit;
    // const currentTableData = data?.slice(firstIndexItem, lastIndexItem);

    const deleteData=async(id:string)=>{
    try {
        const response=await deleteServiceTypeApi(id)
        toast.success(`${response?.data?.message}`)
        refetch()
    } catch (error) {
        console.log(error)
    
       toast.error("something went wrong") 
    }
    }
// UPDATE DATA FUNCTION
const resultUpdateFunction=(id:string)=>{
    console.log(id)
    setGetSingleTypeData(data?.find((data,index)=>data?._id === id))
    disptach(showUpdateModalReducer(true))
}


    if (isLoading) return <DataLoader text="Service type"/>

    if (error) return <div>An error has occurred: {error.message}</div>;
    return<>{showModal ? (
        <ServiceTypeModal />
    ) : showUpdateModal ? <ServiceTypeModalUpdate singledata={getSingleTypeData}/> : ( <OutletLayout>
        <div className="">
            <OutletLayoutHeader heading="Service Types">
                {userInfo?.roles[0]?.name === "Admin" &&<BorderButton buttonText="add" icon={<MdOutlineAdd />} isIcon onClick={()=>disptach(showModalReducer(true))}/>}
                <BorderButton buttonText="filter" disabled />
            </OutletLayoutHeader>
            <div className="mt-4 flex flex-col  gap-4
                            sm:flex-row sm:items-center">
                <Searchbar />
                <Filter />
            </div>
            <Table headers={headers} tableData={currentTableData} onClick={deleteData} onUpdateClick={resultUpdateFunction}/>
                        <Pagination
                            totalPages={totalPages}
                            currentPage={currentPage}
                            dataLimit={dataLimit}
                            tableData={tableData?.tableData}
                            onchange={onPageChange} // Pass onPageChange as onchange prop
                        />         
 
        </div>
    </OutletLayout>)}
    
    </>

}

export default ServiceType