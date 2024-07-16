import React, { useEffect, useState } from "react";
import Table from "../../../components/Tables/Table";
import { headers, userRoleData } from "../../../constdata/UserPerRole";
import Pagination from "../../../components/Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import TableWithoutAction from "../../../components/Tables/TableWithoutAction";
import { Controller, useForm } from "react-hook-form";
import { DeleteIcon } from "../../../components/Icons/DeleteIcon";
import SelectMultipleDropdown from "../../../components/dropdown/SelectMultipleDropdown";
import { zodResolver } from "@hookform/resolvers/zod";
import { userInputSectionRolesSchema, userInputSectionSchema } from "../../../schemas/userInputSectionSchema";
import { z } from "zod";
import { getAllUsers, getOneUser, updateUserRole } from "../../../redux/slice/userId";
import Button from "../../../components/Buttons/Button/Button";
import TextField from "../../../components/InputFields/TextField/TextField";
import { CrossIcon } from "../../../components/Icons/CrossIcon";
export type FormFields = z.infer<typeof userInputSectionRolesSchema>

const RolePerUserSection = () => {
    const { register, formState: { errors, isSubmitting }, handleSubmit, setValue, control } = useForm<FormFields>({ resolver: zodResolver(userInputSectionRolesSchema) })
    const alluserDetail = useSelector((state: RootState) => state.userId)
    // console.log("alluser detail",alluserDetail?.singleUser[0]?.roles)
    const [allSelectedRoles, setAllSelectedRoles] = useState<any>([])
    const allRolesdata = useSelector((state: RootState) => state?.roles?.allRoles?.tableData)
    const options = allRolesdata?.map((options, index: number) => { return { label: options?.name, value: options?._id } })
    const oneUser = useSelector((state: RootState) => state.userId.singleUser)
    const userId = useSelector((state: RootState) => state.userId.userId)
    const alluserData = useSelector((state: RootState) => state.userId.allUser.tableData)

    const dispatch = useDispatch()
    // GET SELECTED ROLES
    const getSelectedRoles = (optionValue) => {
        // console.log("getselectedfunciton", optionValue)
        const selected = allRolesdata?.find((options, index: number) => { return options?._id === optionValue })
        // console.log(selected)
        setAllSelectedRoles([...allSelectedRoles, selected])
        // dispatch(getMailAddress(optionValue))
    }
    // DELETE ROLE
    const deleteRole = (id: string) => {
        const filterUser = allSelectedRoles?.filter((data, index: number) => data?._id !== id)
        // console.log(filterUser)
        setAllSelectedRoles(filterUser)
    }

    useEffect(() => {
        dispatch(getOneUser())
    }, [userId, alluserData]);

    useEffect(() => {
        if (oneUser !== null && oneUser[0] && alluserData.length > 0) {
            setAllSelectedRoles(oneUser[0].roles)

        }

    }, [alluserDetail, setValue]);

    const updateUserRoleFunction =async (id) => {
        const newSelectedRole = allRolesdata?.find((data, index) => data?._id === id?.roles)
        if (newSelectedRole !== undefined) {
            const allRoles = [...allSelectedRoles]
            const roles = allRoles?.map((data, index) => data?.name)
            const data = { userId: oneUser[0]._id, roles }
            dispatch(updateUserRole(data))
            dispatch(getAllUsers())


        }
        else {

            const allRoles = [...allSelectedRoles]
            const roles = allRoles?.map((data, index) => data?.name)
            const data = { userId: oneUser[0]._id, roles }
            dispatch(updateUserRole(data))
        }



    }

    return (
        <div className=" w-full">
            <h1 className="font-semibold mb-4
                md:text-md
                lg:text-xl">Role per users </h1>
            <TableWithoutAction headers={headers} tableData={alluserDetail.singleUser ? alluserDetail.singleUser[0]?.roles : []} />
            <form className="mt-6 w-[100%] m-auto" onSubmit={handleSubmit(updateUserRoleFunction)}>
                <h1 className="font-semibold
                md:text-md
                lg:text-base">Update User Role</h1>
                <div className="w-full md:w-[40%]  flex flex-col items-start gap-x-10 mb-4">

                    {/* SELECTED ROLES FOR USER WILL BE DISPLAYED*/}
                    {allSelectedRoles?.length > 0 && <div className="w-[100%] mt-2">
                        {/* <h1 className="font-semibold capitalize text-sm">User Role</h1> */}
                        <div className="flex items-center justify-start  gap-x-14 gap-y-1 flex-wrap w-full">
                            {allSelectedRoles?.map((data, index: any) => <div className="flex items-center gap-x-6">
                                <p className="text-sm font-normal capitalize" key={index}>{data?.name}</p>
                                <CrossIcon onClick={() => deleteRole(data?._id)} />
                            </div>
                            )}

                        </div>
                    </div>
                    }
                    <div className="w-[100%] mt-2 ">
                        <Controller name="roles" control={control} render={({ field }) => (
                            <SelectMultipleDropdown
                                options={options}
                                value={field.value}
                                onChange={field.onChange}
                                label="Roles"
                                error={errors.roles?.message as string}
                                getMailFunction={getSelectedRoles}
                            />)} />
                    </div>

                </div>
                <div className="w-[30%] m-auto ">
                    <Button text={isSubmitting ? "Updating" : "Update User Role"} />
                </div>
            </form>
        </div>
    );
}

export default RolePerUserSection;
