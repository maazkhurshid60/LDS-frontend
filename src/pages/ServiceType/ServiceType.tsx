import React, { useEffect, useState } from "react";
import OutletLayout from "../../components/OutletLayout/OutletLayout";
import OutletLayoutHeader from "../../components/OutletLayout/OutLayoutHeader";
import { MdOutlineAdd } from "react-icons/md";
import BorderButton from "../../components/Buttons/BorderButton/BorderButton";
import Searchbar from "../../components/Searchbar/Searchbar";
import Filter from "../../components/Filter/Filter";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Table from "../../components/Tables/Table";
import { tableData } from "../../constdata/ServiceTypeData";
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
import { showSpinnerReducer } from "../../redux/slice/spinner";

const ServiceType = () => {
    const showUpdateModal = useSelector((state: RootState) => state?.showModal.isUpdateShowModal);
    const { isLoading, error, data, refetch } = useGetAllData("/service-type/all-service-types");
    const userInfo = useSelector((state: RootState) => state?.userDetail?.userDetails?.user);
    const isAdmin = userInfo?.roles?.some((data) => data?.name === "Admin");
    const showModal = useSelector((state: RootState) => state?.showModal.isShowModal);
    const [getSingleTypeData, setGetSingleTypeData] = useState<serviceTypeType>();
    const { totalPages, currentPage, currentTableData, dataLimit, onPageChange, checkLastRecord } = usePaginationCalc({ tableData: data || [] })
    const headers = ["Service Type Code", "Service Type Description", ...(isAdmin ? ["Action"] : [])];
    const [searchedData, setSearchedData] = useState()
    const [searchValue, setSearchValue] = useState("")
    const dispatch = useDispatch();

    const deleteData = async (id: string) => {
        dispatch(showSpinnerReducer(true))
        try {
            const response = await deleteServiceTypeApi(id);
            toast.success(`${response?.data?.message}`);
            await refetch();
            checkLastRecord()
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            dispatch(showSpinnerReducer(false))
        }
    };

    // UPDATE DATA FUNCTION
    const resultUpdateFunction = (id: string) => {
        setGetSingleTypeData(data?.find((data) => data?._id === id));
        dispatch(showUpdateModalReducer(true));
    };
    // USE EFFECT TO SEARCH DATA
    useEffect(() => {
        setSearchedData(data?.filter(data => Object.entries(data)
            .filter(([key]) => !['_id', 'createdAt', 'updatedAt', "__v"].includes(key)) // Exclude the _id field
            .some(([_, value]) =>
                value?.toString().toLowerCase().includes(searchValue.toLowerCase())
            )
        ))
    }, [searchValue, data])

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
                        </OutletLayoutHeader>
                        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center">
                            <Searchbar value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                        </div>
                        <Table
                            headers={headers}
                            tableData={searchValue.length > 0 ? searchedData : currentTableData}
                            onClick={deleteData}
                            onUpdateClick={resultUpdateFunction}
                        />
                        {searchValue?.length === 0 && <Pagination
                            totalPages={totalPages}
                            currentPage={currentPage}
                            dataLimit={dataLimit}
                            tableData={tableData?.tableData}
                            onchange={onPageChange} // Pass onPageChange as onchange prop
                        />}
                    </div>
                </OutletLayout>
            )}
        </>
    );
};

export default ServiceType;
