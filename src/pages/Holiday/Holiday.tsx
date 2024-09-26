import React, { useEffect, useState } from "react";
import OutletLayout from "../../components/OutletLayout/OutletLayout";
import OutletLayoutHeader from "../../components/OutletLayout/OutLayoutHeader";
import { MdOutlineAdd } from "react-icons/md";
import BorderButton from "../../components/Buttons/BorderButton/BorderButton";
import Searchbar from "../../components/Searchbar/Searchbar";
import Filter from "../../components/Filter/Filter";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../components/Tables/Table";
import { tableData } from "../../constdata/HolidayData";
import { RootState } from "../../redux/store";
import HolidayModal from "../../components/Modal/HolidayModal";
import { showModalReducer, showUpdateModalReducer } from "../../redux/slice/showModal";
import Pagination from "../../components/Pagination/Pagination";
import HolidayModalUpdate from "../../components/Modal/HolidayupdateModal";
import { useGetAllData } from "../../hooks/getAllDataHook/useGetAllData";
import { usePaginationCalc } from "../../hooks/paginationCalc/usePaginationCalc";
import { holidayType } from "../../type/holidayType/holidayType";
import { deleteHolidayApi } from "../../apiservices/holidayApi/holidayApi";
import { DataLoader } from "../../components/Loader/DataLoader";
import { toast } from "react-toastify";
import { showSpinnerReducer } from "../../redux/slice/spinner";
const Holiday = () => {
    const userInfo = useSelector((state: RootState) => state?.userDetail?.userDetails?.user);
    const isAdmin = userInfo?.roles?.some((data) => data?.name === "Admin");
    const showUpdateModal = useSelector((state: RootState) => state?.showModal.isUpdateShowModal);
    const { isLoading, error, data, refetch } = useGetAllData("/holiday/all-holidays")
    const { totalPages, currentPage, currentTableData, dataLimit, onPageChange, checkLastRecord } = usePaginationCalc({ tableData: data || [] })
    const showModal = useSelector((state: RootState) => state?.showModal.isShowModal)
    const dispatch = useDispatch()
    const [getSingleData, setGetSingleData] = useState<holidayType>()
    const [searchValue, setSearchValue] = useState("")
    const [searchedData, setSearchedData] = useState()

    // Conditionally include "Action" in the headers array if the user is an admin
    const headers = [
        "Holiday year",
        "holiday date",
        "holiday description",
        ...(isAdmin ? ["Action"] : [])  // Add "Action" if isAdmin is true
    ];

    const deleteData = async (id: string) => {
        dispatch(showSpinnerReducer(true))
        try {
            const response = await deleteHolidayApi(id)
            refetch()
            toast.success(`${response?.data?.message}`)
            checkLastRecord()
        } catch (error) {
            toast.error("something went wrong")
        }
        finally {
            dispatch(showSpinnerReducer(false))
        }
    }
    // UPDATE DATA FUNCTION
    const holidayUpdateFunction = (id: string) => {
        setGetSingleData(data?.find((data, index) => data?._id === id))
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
    }, [searchValue, data])

    if (isLoading) return <DataLoader text="holiday" />

    if (error) return <div>An error has occurred: {error.message}</div>;

    return <>

        {showModal ? <HolidayModal /> : showUpdateModal ? <HolidayModalUpdate singledata={getSingleData} /> : <OutletLayout>
            <div className="">
                <OutletLayoutHeader heading="Holidays">
                    {userInfo?.roles[0]?.name === "Admin" && <BorderButton buttonText="add" icon={<MdOutlineAdd />} isIcon onClick={() => dispatch(showModalReducer(true))} />}
                </OutletLayoutHeader>
                <div className="mt-4 flex flex-col  gap-4
                            sm:flex-row sm:items-center">
                    <Searchbar value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                </div>
                <Table headers={headers} tableData={searchValue.length > 0 ? searchedData : currentTableData} onClick={deleteData} onUpdateClick={holidayUpdateFunction} />
                {searchValue.length === 0 && <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    dataLimit={dataLimit}
                    tableData={tableData?.tableData}
                    onchange={onPageChange} // Pass onPageChange as onchange prop
                />}
            </div>
        </OutletLayout>}
    </>
}

export default Holiday