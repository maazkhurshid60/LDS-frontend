import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { userInputSectionSchema } from "../../../schemas/userInputSectionSchema";
import TextField from "../../../components/InputFields/TextField/TextField";
import BorderButton from "../../../components/Buttons/BorderButton/BorderButton";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { getOneUser, updateUser } from "../../../redux/slice/userId";
import { z } from "zod";
import { useGetAllData } from "../../../hooks/getAllDataHook/useGetAllData";
import SelectMultipleDropdown from "../../../components/dropdown/SelectMultipleDropdown";
import { DeleteIcon } from "../../../components/Icons/DeleteIcon";
import Button from "../../../components/Buttons/Button/Button";

export type FormFields = z.infer<typeof userInputSectionSchema>

const UserInputSection = () => {
    const userId = useSelector((state: RootState) => state.userId.userId)
    const { register, formState: { errors, isSubmitting }, handleSubmit, setValue, control } = useForm<FormFields>({ resolver: zodResolver(userInputSectionSchema) })
    const alluserDetail = useSelector((state: RootState) => state.userId)
    const alluserData = useSelector((state: RootState) => state.userId.allUser.tableData)
    // const { isLoading, error, data } = useGetAllData("/role/all-roles")
    const data = useSelector((state: RootState) => state?.roles?.allRoles?.tableData)

    const [singleUserId, setSingleUserId] = useState("")
    const options = data?.map((options, index: number) => { return { label: options?.name, value: options?._id } })
    const [allSelectedRoles, setAllSelectedRoles] = useState<any>([])
    const dispatch = useDispatch()
    const oneUser = useSelector((state: RootState) => state.userId.singleUser) 

    useEffect(() => {
        dispatch(getOneUser())
    }, [userId, alluserData]);
    // const userDetail=userData?.filter((_,id)=>id===userId)
    // console.log(oneUser!==null&& oneUser[0])
    useEffect(() => {
        if (oneUser !== null && oneUser[0] && alluserData.length > 0) {
            setValue("userName", oneUser[0].userName || "");
            setValue("firstName", oneUser[0].firstName || "");
            setValue("lastName", oneUser[0].lastName || "");
            setValue("email", oneUser[0].email || "");
            setAllSelectedRoles(oneUser[0].roles)
            setSingleUserId(oneUser[0]._id)
        }
        else {
            setValue("userName", "");
            setValue("firstName", "");
            setValue("lastName", "");
            setValue("email", "")
        }
    }, [alluserDetail, setValue]);


    // UPDATE USER
    const userUpdateFunction = (data) => {
        const onlyName = allSelectedRoles?.map(data => data?.name)
        // alert("clicked")
        // const allData = { ...data, roles: onlyName, userId: singleUserId }
        const allData={userId:oneUser[0]?._id, userName: data?.userName,
            firstName:  data?.firstName,
            lastName: data?.lastName,
            email: data?.email}
        dispatch(updateUser(allData))
        console.log("data", allData)
    }

    // GET SELECTED ROLES
    const getSelectedRoles = (optionValue) => {
        // console.log("getselectedfunciton", optionValue)
        const selected = data?.find((options, index: number) => { return options?._id === optionValue })
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

    return <form onSubmit={handleSubmit(userUpdateFunction)} className="w-full lg:w-[40%] flex flex-col gap-4">
        <TextField label="User Name" name="userName" register={register} error={errors?.userName} />
        <TextField label="first Name" name="firstName" register={register} error={errors?.firstName} />
        <TextField label="last Name" name="lastName" register={register} error={errors?.lastName} />
        <TextField label="email" name="email" register={register} error={errors?.email} />
        <div className="w-full md:w-[38%] xl:w-[100%] flex flex-col items-start gap-x-10 mb-2">
            {/* SELECTED ROLES FOR USER WILL BE DISPLAYED*/}
            {/* {allSelectedRoles?.length > 0 && <div className="w-[65%] mt-2">
                <h1 className="font-semibold capitalize text-sm">User Role</h1>
                <div className="flex items-center justify-start  gap-x-14 gap-y-1 flex-wrap w-full">
                    {allSelectedRoles?.map((data, index: any) => <div className="flex items-center gap-x-6">
                        <p className="text-sm font-normal capitalize" key={index}>{data?.name}</p>
                        <DeleteIcon onClick={() => deleteRole(data?._id)} />
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
                        label="Client Mailing Addresses"
                        error={errors.roles?.message as string}
                        getMailFunction={getSelectedRoles}
                    />)} />
            </div> */}

        </div>
        <Button text={isSubmitting ? "saving" : "save"} />
    </form>

}

export default UserInputSection