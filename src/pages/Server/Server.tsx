import React, { useEffect, useState } from "react";
import OutletLayout from "../../components/OutletLayout/OutletLayout";
import OutletLayoutHeader from "../../components/OutletLayout/OutLayoutHeader";
import { MdOutlineAdd } from "react-icons/md";
import BorderButton from "../../components/Buttons/BorderButton/BorderButton";
import Searchbar from "../../components/Searchbar/Searchbar";
import Filter from "../../components/Filter/Filter";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../components/Tables/Table";
import {  tableData } from "../../constdata/ServerData";
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
    const userInfo = useSelector((state: RootState) => state?.userDetail?.userDetails?.user);
    const isAdmin = userInfo?.roles?.some((data) => data?.name === "Admin");

    const showModal = useSelector((state: RootState) => state.showModal.isShowModal)
    const showUpdateModal = useSelector((state: RootState) => state?.showModal.isUpdateShowModal);
    const widthSmall = useSelector((state: RootState) => state.sidebar.sideBar);

    const { isLoading, error, data, refetch } = useGetAllData("/server/all-servers")
    const { totalPages, currentPage, currentTableData, dataLimit, onPageChange, checkLastRecord } = usePaginationCalc({ tableData: data || [] })
    const [getSingleServerData, setGetSingleServerData] = useState<serverType>()
    const headers = ["Server Code", "First Name", "Last name", "Device Code", "License No.","address 1", "Country","state","phone","zip",  ...(isAdmin ? ["Action"] : [])];
const[searchedData,setSearchedData]=useState()
const [searchValue,setSearchValue]=useState("")

    const dispatch = useDispatch()
    const deleteData = async (id: string) => {
        // const response =deleteServerApi(id)
        try {
            const response = await deleteServerApi(id)
            toast.success(`${response?.data?.message}`)
            refetch()
            checkLastRecord()
        } catch (error) {
            console.log(error)

            toast.error("something went wrong")
        }
    }

    const serverUpdateFunction = (id: string) => {
        setGetSingleServerData(data?.find((data: serverType, index: number) => data?._id === id))
        dispatch(showUpdateModalReducer(true))
        console.log(id)
        // updateServerApi(data?.find((data,index:number)=>data?._id === id))
        // updateServerApi
    }

// USE EFFECT TO SEARCH DATA
useEffect(()=>{
    setSearchedData(data?.filter(data=>   Object.entries(data)
    .filter(([key]) => !['_id', 'createdAt', 'updatedAt',"__v"].includes(key)) // Exclude the _id field
    .some(([_, value]) => 
      value?.toString().toLowerCase().includes(searchValue.toLowerCase())
    )
    ))
},[searchValue])

    if (isLoading) return <DataLoader text="Server" />

    if (error) return <div>An error has occurred: {error.message}</div>;

    return <>
        {showModal ? <AdministrationServerModal /> : showUpdateModal ? <AdministrationServerUpdateModal singledata={getSingleServerData} />
            :
            <OutletLayout>
                <div className="">
                    <OutletLayoutHeader heading="Servers">
                        {userInfo?.roles[0]?.name === "Admin" && <BorderButton buttonText="add" icon={<MdOutlineAdd />} isIcon onClick={() => dispatch(showModalReducer(true))} />}
                        <BorderButton buttonText="filter" disabled />
                    </OutletLayoutHeader>
                    <div className="mt-4 flex flex-col  gap-4
                            sm:flex-row sm:items-center">
                <Searchbar value={searchValue} onChange={(e)=>setSearchValue(e.target.value)}/>
                <Filter />
                    </div>
                    {/* <div className={`${widthSmall ? "w-[1310px]" : "w-[1150px]"}`} > */}
                        <Table headers={headers} tableData={ searchValue?.length > 0 ? searchedData :currentTableData} onClick={deleteData} onUpdateClick={serverUpdateFunction} />
                        {searchValue?.length ===0 && <Pagination
                            totalPages={totalPages}
                            currentPage={currentPage}
                            dataLimit={dataLimit}
                            tableData={tableData?.tableData}
                            onchange={onPageChange} // Pass onPageChange as onchange prop

                        />}
                    {/* </div> */}
                    {/*                                
                    <Table headers={headers} tableData={currentTableData} onClick={deleteData} onUpdateClick={serverUpdateFunction}/>
                        <Pagination
                            totalPages={totalPages}
                            currentPage={currentPage}
                            dataLimit={dataLimit}
                            tableData={tableData?.tableData}
                            onchange={onPageChange} // Pass onPageChange as onchange prop

                        /> */}


                </div>


            </OutletLayout>}
    </>
}
export default Server