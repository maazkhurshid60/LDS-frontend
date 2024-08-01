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
import {  tableData } from "../../constdata/ServiceTypeData";
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
    const { isLoading, error, data, refetch } = useGetAllData("/service-type/all-service-types");
    const userInfo= useSelector((state: RootState) => state?.userDetail?.userDetails?.user);
    const isAdmin = userInfo?.roles?.some((data) => data?.name === "Admin");    
    const showModal = useSelector((state: RootState) => state?.showModal.isShowModal);
    const [getSingleTypeData, setGetSingleTypeData] = useState<serviceTypeType>();
const {totalPages,currentPage,currentTableData,dataLimit,onPageChange,checkLastRecord}=usePaginationCalc({tableData: data || []})
 const headers = ["Service Type Code", "Service Type Description", ...(isAdmin ? ["Action"] : [])];

    const dispatch = useDispatch();
    // const [currentPage, setCurrentPage] = useState(1); // State to manage current page
    // const dataLimit = 5; // Define your data limit here
    // const totalPages = Math.ceil(data?.length / dataLimit);
    
    // const onPageChange = (page: number) => {
    //     setCurrentPage(page); // Update current page state
    // };

    // // Calculate the indices for the current page's data slice
    // const lastIndexItem = dataLimit * currentPage;
    // const firstIndexItem = lastIndexItem - dataLimit;
    // const currentTableData = data?.slice(firstIndexItem, lastIndexItem);

    const deleteData = async (id: string) => {
        try {
            const response = await deleteServiceTypeApi(id);
            toast.success(`${response?.data?.message}`);
            await refetch();

            // If the current page has no data after deletion, move to the previous page
            // if (currentTableData?.length === 1 && currentPage > 1) {
            //     setCurrentPage(currentPage - 1);
            // }
            checkLastRecord()
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    // UPDATE DATA FUNCTION
    const resultUpdateFunction = (id: string) => {
        setGetSingleTypeData(data?.find((data) => data?._id === id));
        dispatch(showUpdateModalReducer(true));
    };

    if (isLoading) return <DataLoader text="Service type" />;

    if (error) return <div>An error has occurred: {error.message}</div>;

    return (
        <>
            {showModal ? (
                <ServiceTypeModal />
            ) : showUpdateModal ? (
                <ServiceTypeModalUpdate singledata={getSingleTypeData} />
            ) : (
                <OutletLayout>
                    <div className="">
                        <OutletLayoutHeader heading="Service Types">
                            {userInfo?.roles[0]?.name === "Admin" && (
                                <BorderButton
                                    buttonText="Add"
                                    icon={<MdOutlineAdd />}
                                    isIcon
                                    onClick={() => dispatch(showModalReducer(true))}
                                />
                            )}
                            <BorderButton buttonText="Filter" disabled />
                        </OutletLayoutHeader>
                        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center">
                            <Searchbar />
                            <Filter />
                        </div>
                        <Table
                            headers={headers}
                            tableData={currentTableData}
                            onClick={deleteData}
                            onUpdateClick={resultUpdateFunction}
                        />
                        <Pagination
                            totalPages={totalPages}
                            currentPage={currentPage}
                            dataLimit={dataLimit}
                            tableData={tableData?.tableData}
                            onchange={onPageChange} // Pass onPageChange as onchange prop
                        />
                    </div>
                </OutletLayout>
            )}
        </>
    );
};

export default ServiceType;
