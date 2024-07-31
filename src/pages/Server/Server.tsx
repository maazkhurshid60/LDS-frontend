import React, { useState } from "react";
import OutletLayout from "../../components/OutletLayout/OutletLayout";
import OutletLayoutHeader from "../../components/OutletLayout/OutLayoutHeader";
import { MdOutlineAdd } from "react-icons/md";
import BorderButton from "../../components/Buttons/BorderButton/BorderButton";
import Searchbar from "../../components/Searchbar/Searchbar";
import Filter from "../../components/Filter/Filter";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../components/Tables/Table";
import { headers, tableData } from "../../constdata/ServerData";
import { RootState } from "../../redux/store";
import AdministrationServerModal from "../../components/Modal/AdministrationServerModal";
import { showModalReducer, showUpdateModalReducer } from "../../redux/slice/showModal";
import Pagination from "../../components/Pagination/Pagination";
import { useGetAllData } from "../../hooks/getAllDataHook/useGetAllData";
import { usePaginationCalc } from "../../hooks/paginationCalc/usePaginationCalc";
import { deleteServerApi, updateServerApi } from "../../apiservices/serverApi/serverApi";
import { toast } from "react-toastify";
import { serverType } from "../../type/serverType/serverType";
import { DataLoader } from "../../components/Loader/DataLoader";
import AdministrationServerUpdateModal from "../../components/Modal/AdministrationServerUpdateModal";
const Server = () => {
    const userInfo= useSelector((state: RootState) => state?.userDetail?.userDetails?.user);
    const showModal = useSelector((state: RootState) => state.showModal.isShowModal)
    const showUpdateModal = useSelector((state: RootState) => state?.showModal.isUpdateShowModal);
    const {isLoading,error,data,refetch}=useGetAllData("/server/all-servers")
    const {totalPages,currentPage,currentTableData,dataLimit,onPageChange}=usePaginationCalc({tableData: data || []})
    const [getSingleServerData,setGetSingleServerData]=useState<serverType>()

    const dispatch = useDispatch()
const deleteData=async(id:string)=>{
    // const response =deleteServerApi(id)
    try {
        const response=await deleteServerApi(id)
        toast.success(`${response?.data?.message}`)
        refetch()
    } catch (error) {
        console.log(error)
    
       toast.error("something went wrong") 
    }
}

const clientUpdateFunction=(id:string)=>{
    setGetSingleServerData(data?.find((data:serverType,index:number)=>data?._id === id))
    dispatch(showUpdateModalReducer(true))
    console.log(id)
    // updateServerApi(data?.find((data,index:number)=>data?._id === id))
    // updateServerApi
}



if (isLoading) return <DataLoader text="Server"/>

if (error) return <div>An error has occurred: {error.message}</div>;

    return <>
        {showModal ? <AdministrationServerModal/> :showUpdateModal?<AdministrationServerUpdateModal singledata={getSingleServerData}/>
            :
            <OutletLayout>
                <div className="bg-grayColorLight">
                    <OutletLayoutHeader heading="Servers">
                        {userInfo?.roles[0]?.name === "Admin" && <BorderButton buttonText="add" icon={<MdOutlineAdd />} isIcon onClick={() => dispatch(showModalReducer(true))} />}
                        <BorderButton buttonText="filter" disabled />
                    </OutletLayoutHeader>
                    <div className="mt-4 flex flex-col  gap-4
                            sm:flex-row sm:items-center">
                        <Searchbar />
                        <Filter />
                    </div>
           <div>
                    <Table headers={headers} tableData={currentTableData} onClick={deleteData} onUpdateClick={clientUpdateFunction}/>
                        <Pagination
                            totalPages={totalPages}
                            currentPage={currentPage}
                            dataLimit={dataLimit}
                            tableData={tableData?.tableData}
                            onchange={onPageChange} // Pass onPageChange as onchange prop

                        />
                        
           </div>
            
                    </div>

         
            </OutletLayout>}
    </>
}
export default Server