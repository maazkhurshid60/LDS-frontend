import React, { useEffect, useState } from "react";
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
import { showModalReducer, showUpdateModalReducer } from "../../redux/slice/showModal";
import Pagination from "../../components/Pagination/Pagination";
import { usePaginationCalc } from "../../hooks/paginationCalc/usePaginationCalc";
import { useGetAllData } from "../../hooks/getAllDataHook/useGetAllData";
import { DataLoader } from "../../components/Loader/DataLoader";
import { useGetAllDataParameter } from "../../hooks/getAllDataHook/useGetAllDataParameter";
import { deleteClientApi } from "../../apiservices/clientApi/clientApi";
import { toast } from "react-toastify";
import { clientType } from "../../type/clientType/clientType";
import ClientModalUpdate from "../../components/Modal/ClientModalUpdate";
import { showSpinnerReducer } from "../../redux/slice/spinner";
const Client = () => {
    const userInfo = useSelector((state: RootState) => state?.userDetail?.userDetails?.user);
    const isAdmin = userInfo?.roles?.some((data) => data?.name === "Admin");
    const showModal = useSelector((state: RootState) => state?.showModal.isShowModal)
    const showUpdateModal = useSelector((state: RootState) => state?.showModal.isUpdateShowModal);
    const { isLoading, error, data, refetch } = useGetAllData("/client/all-clients")
    const [searchedData, setSearchedData] = useState()
    const [searchValue, setSearchValue] = useState("")
    const { totalPages, currentPage, currentTableData, dataLimit, onPageChange, checkLastRecord } = usePaginationCalc({ tableData: data || [] })
    const header = ["code", "full Name", "mi", "address 1", "city", "state", "zip", "phone", "apt", ...(isAdmin ? ["Action"] : [])]
    const dispatch = useDispatch()
    console.log(userInfo)
    const [getSingleClientData, setGetSingleClientData] = useState<clientType>()
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

    const deleteData = async (id: string) => {
        // console.log("<id>",id)
        dispatch(showSpinnerReducer(true))
        try {
            const response = await deleteClientApi(id)
            checkLastRecord()
            toast.success(`${response?.data?.message}`)
            refetch()
        } catch (error) {
            console.log(error)

            toast.error("something went wrong")
        }
        finally {
            dispatch(showSpinnerReducer(false))

        }
    }
    // UPDATE DATA FUNCTION
    const clientUpdateFunction = (id: string) => {
        setGetSingleClientData(data?.find((data, index) => data?._id === id))
        console.log(id)
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


    if (isLoading) return <DataLoader text="Client" />

    if (error) return <div>An error has occurred: {error.message}</div>;

    return <>
        {showModal ? <ClientModal /> : showUpdateModal ? <ClientModalUpdate singledata={getSingleClientData} /> : <OutletLayout>
            <div className="">
                <OutletLayoutHeader heading="Clients">
                    {userInfo?.roles[0]?.name === "Admin" && <BorderButton buttonText="add" icon={<MdOutlineAdd />} isIcon onClick={() => dispatch(showModalReducer(true))} />}
                    {/* <BorderButton buttonText="filter" disabled /> */}
                </OutletLayoutHeader>
                <div className="mt-4 flex flex-col  gap-4
                            sm:flex-row sm:items-center">
                    <Searchbar value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                    {/* <Filter /> */}
                </div>
                <Table headers={header} tableData={searchValue.length > 0 ? searchedData : currentTableData} onClick={deleteData} onUpdateClick={clientUpdateFunction} />

                {searchValue.length === 0 && <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    dataLimit={dataLimit}
                    tableData={currentTableData}
                    onchange={onPageChange} // Pass onPageChange as onchange prop
                />}

            </div>
        </OutletLayout>}

    </>
}

export default Client