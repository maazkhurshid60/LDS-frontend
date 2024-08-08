import React, { useEffect, useState } from "react";
import OutletLayout from "../../components/OutletLayout/OutletLayout";
import OutletLayoutHeader from "../../components/OutletLayout/OutLayoutHeader";
import { MdOutlineAdd } from "react-icons/md";
import BorderButton from "../../components/Buttons/BorderButton/BorderButton";
import Searchbar from "../../components/Searchbar/Searchbar";
import Filter from "../../components/Filter/Filter";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../components/Tables/Table";
import { tableData } from "../../constdata/DevicesData";
import { RootState } from "../../redux/store";
import { showModalReducer, showUpdateModalReducer } from "../../redux/slice/showModal";
import DeviceModal from "../../components/Modal/DeviceModal";
import Pagination from "../../components/Pagination/Pagination";
import { useGetAllData } from "../../hooks/getAllDataHook/useGetAllData";
import { usePaginationCalc } from "../../hooks/paginationCalc/usePaginationCalc";
import { deleteDeviceApi } from "../../apiservices/deviceApi/deviceApi";
import { DataLoader } from "../../components/Loader/DataLoader";
import { deviceType } from "../../type/deviceType/deviceType";
import DeviceModalUpdate from "../../components/Modal/DeviceModalUpdate";
import { deleteHolidayApi } from "../../apiservices/holidayApi/holidayApi";
import { InfinitySpin, RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";
import { showSpinnerReducer } from "../../redux/slice/spinner";
const Devices = () => {
    const userInfo = useSelector((state: RootState) => state?.userDetail?.userDetails?.user);
    const isAdmin = userInfo?.roles?.some((data) => data?.name === "Admin");

    const showModal = useSelector((state: RootState) => state?.showModal.isShowModal)
    const { isLoading, error, data, refetch } = useGetAllData("/device/all-devices")
    const { totalPages, currentPage, currentTableData, dataLimit, onPageChange, checkLastRecord } = usePaginationCalc({ tableData: data || [] })
    const [getSingleData, setGetSingleData] = useState<deviceType>()
    const showUpdateModal = useSelector((state: RootState) => state?.showModal.isUpdateShowModal);
    const headers = ["Device Id", "Device Code", "device name", "product type", ...(isAdmin ? ["Action"] : [])];
    const [searchValue, setSearchValue] = useState("")
    const [searchedData, setSearchedData] = useState()
   
    const dispatch = useDispatch()

    const deleteData = async (id: string) => {
        dispatch(showSpinnerReducer(true))
        // console.log("<id>", id)
        try {
            const response = await deleteDeviceApi(id)
            refetch()
            checkLastRecord()
            toast.success(`${response?.data?.message}`)
        } catch (error) {
            console.log(error)

            toast.error("something went wrong")
        }
        finally{
            dispatch(showSpinnerReducer(false))
        }
    }
    // UPDATE DATA FUNCTION
    const clientUpdateFunction = (id: string) => {
        setGetSingleData(data?.find((data, index) => data?._id === id))
        // console.log(id)
        dispatch(showUpdateModalReducer(true))
    }
    // USE EFFECT TO SEARCH DATA
    useEffect(() => {
        setSearchedData(data?.filter(data => Object.entries(data)
            .filter(([key]) => !['_id', 'createdAt', 'updatedAt', "__v"].includes(key)) // Exclude the _id field
            .some(([_, value]) =>
                value?.toString().toLowerCase().includes(searchValue.toLowerCase())
            )
        ))
    }, [searchValue])
    // console.log(searchValue)

    if (isLoading) return <DataLoader text="device" />

    if (error) return <div>An error has occurred: {error.message}</div>;
    return <div className="relative ">

        {showModal ? <DeviceModal /> : showUpdateModal ? <DeviceModalUpdate singledata={getSingleData} /> : <OutletLayout>
            <div className="relative">
                
                <OutletLayoutHeader heading="Devices">
                    {userInfo?.roles[0]?.name === "Admin" && <BorderButton buttonText="add" icon={<MdOutlineAdd />} isIcon onClick={() => dispatch(showModalReducer(true))} />}
                    {/* <BorderButton buttonText="filter" disabled /> */}
                </OutletLayoutHeader>
                <div className="mt-4 flex flex-col  gap-4
                            sm:flex-row sm:items-center">
                    <Searchbar value={searchValue} onChange={(e) => { setSearchValue(e.target.value) }} />
                    {/* <Filter /> */}
                </div>
                <Table headers={headers} tableData={searchValue?.length > 0 ? searchedData : currentTableData} onClick={deleteData} onUpdateClick={clientUpdateFunction} />
                {searchValue?.length === 0 && <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    dataLimit={dataLimit}
                    tableData={tableData?.tableData}
                    onchange={onPageChange} // Pass onPageChange as onchange prop
                />}
            </div>
        </OutletLayout>}


    </div>
}

export default Devices