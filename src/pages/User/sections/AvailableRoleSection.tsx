import React, { useEffect, useState } from "react";
import Table from "../../../components/Tables/Table";
import { availableRoleData, headers } from "../../../constdata/AvailableRoleData";
import Pagination from "../../../components/Pagination/Pagination";
import Button from "../../../components/Buttons/Button/Button";
import AddRoleModal from "../../../components/Modal/AddRoleModal";
import { RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { showModalReducer, showRoleModalReducer } from "../../../redux/slice/showModal";
import { deleteRole, getAllRoles, getOneRole } from "../../../redux/slice/roles";
import TableWithoutAction from "../../../components/Tables/TableWithoutAction";
const AvailableRoleSection = () => {
    const showModal = useSelector((state: RootState) => state?.showModal.isShowRoleModal)
    const allRolesData = useSelector((state: RootState) => state?.roles.allRoles?.tableData)

    const dispatch = useDispatch()
    const [currentPage, setCurrentPage] = useState(1); // State to manage current page
    const dataLimit = 1; // Define your data limit here
    const totalPages = Math.ceil(availableRoleData?.tableData?.length / dataLimit);
    const userInfo = useSelector((state: RootState) => state?.userDetail?.userDetails?.user);
    const isAdmin = userInfo?.roles?.some((data) => data?.name === "Admin");
    const headers = [
        "name", "description",
        // ...(isAdmin ? ["Action"] : [])  // Add "Action" if isAdmin is true
    ];
    const onPageChange = (page: number) => {
        setCurrentPage(page); // Update current page state
        // You can perform any additional actions here, such as fetching data for the new page
    };
    // Calculate the indices for the current page's data slice
    const lastIndexItem = dataLimit * currentPage;
    const firstIndexItem = lastIndexItem - dataLimit;
    const currentTableData = availableRoleData?.tableData.slice(firstIndexItem, lastIndexItem);
    const showModalFunction = () => {
        dispatch(showRoleModalReducer(true))
    }

    const deleteRoleFunction = (id: string) => {
        // console.log("delete id", id)
        dispatch(deleteRole(id))

    }

    const updateRoleFunction = (id: string) => {
        console.log("update id", id)
        dispatch(getOneRole(id))
        dispatch(showRoleModalReducer(true))
    }

    useEffect(() => {
        dispatch(getAllRoles())
    }, [ ])

console.log("allRolesData",allRolesData)
    return <>

        {showModal ? <AddRoleModal /> : <><div className="flex items-center flex-row justify-between  flex-wrap w-[99%]">

            <h1 className="font-semibold md:text-md
    lg:text-xl">Available Roles</h1>
            {/* <div className="w-[13%]">

                {isAdmin && <Button text="Add New Role" onClick={showModalFunction} />}
            </div> */}
        </div>
            {/* <Table headers={headers} tableData={allRolesData} onClick={deleteRoleFunction} onUpdateClick={updateRoleFunction} /> */}
            <TableWithoutAction headers={headers} tableData={allRolesData}   />

            {/* <Pagination
totalPages={totalPages}
currentPage={currentPage}
dataLimit={dataLimit}
tableData={availableRoleData?.tableData}
onchange={onPageChange} // Pass onPageChange as onchange prop
/> */}

        </>}

    </>
}

export default AvailableRoleSection