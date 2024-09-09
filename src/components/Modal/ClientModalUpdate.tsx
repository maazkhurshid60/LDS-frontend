import React, { useEffect } from "react"
import Modal from "./Modal"
import { useDispatch } from "react-redux"
import { showModalReducer, showUpdateModalReducer } from "../../redux/slice/showModal"
import { useForm } from "react-hook-form"
import CheckBox from "../../components/CheckBox/CheckBox"
import TextField from "../InputFields/TextField/TextField"
import { addServiceResultApi, updateServiceResultApi } from "../../apiservices/serviceResult/serviceResult";
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-toastify"
import { useGetAllData } from "../../hooks/getAllDataHook/useGetAllData"
import { clientType } from "../../type/clientType/clientType"
import { clientSchema } from "../../schemas/clientSchema"
import { z } from "zod"
import { updateClientApi } from "../../apiservices/clientApi/clientApi"
import { showSpinnerReducer } from "../../redux/slice/spinner"
import { handleEnterKeyPress } from "../../utils/moveToNextFieldOnEnter"
type Props = {
    singledata: clientType | undefined; // Define props type here
};
export type FormFields = z.infer<typeof clientSchema>
const ClientModalUpdate: React.FC<Props> = ({ singledata }) => {
    const disptach = useDispatch()
    const { isLoading, error, data, refetch } = useGetAllData("/client/all-clients")
    const { register, handleSubmit, formState: { errors, isSubmitting }, setValue } = useForm<FormFields>({ resolver: zodResolver(clientSchema) })
    const modalBody = <form className="flex items-center justify-center gap-x-8 gap-y-4 flex-wrap mb-8 h-[50vh] overflow-y-scroll ">
        <div className="w-full md:w-[38%] xl:w-[30%]">

            <TextField onKeyDown={handleEnterKeyPress} label="code" register={register} error={errors.code} name="code" placeholder="Enter Code" required />
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField onKeyDown={handleEnterKeyPress} label="full Name" register={register} error={errors.fullName} name="fullName" placeholder="Enter full Name" required />
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField onKeyDown={handleEnterKeyPress} label="MI" register={register} error={errors.mi} name="mi" placeholder="Enter MI" />
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField onKeyDown={handleEnterKeyPress} label="address1" register={register} error={errors.address1} name="address1" placeholder="Enter Address" />
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField onKeyDown={handleEnterKeyPress} label="address2" register={register} error={errors.address2} name="address2" placeholder="Enter Address" />
        </div>
        {/* <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField onKeyDown={handleEnterKeyPress}  label="country" register={register} error={errors.country} name="country" placeholder="Enter Country" />
        </div> */}
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField onKeyDown={handleEnterKeyPress} label="state" register={register} error={errors.state} name="state" placeholder="Enter State" />
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField onKeyDown={handleEnterKeyPress} label="city" register={register} error={errors.city} name="city" placeholder="Enter City" />
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField onKeyDown={handleEnterKeyPress} label="zip" register={register} error={errors.zip} name="zip" placeholder="Enter zip" />
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField onKeyDown={handleEnterKeyPress} label="phone" register={register} error={errors.phone} name="phone" placeholder="000011111110000" required />
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField onKeyDown={handleEnterKeyPress} label="fax" register={register} error={errors.fax} name="fax" placeholder="Enter fax" />
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField onKeyDown={handleEnterKeyPress} label="apt" register={register} error={errors.apt} name="apt" placeholder="Enter apt" />
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <CheckBox onKeyDown={handleEnterKeyPress} label="Enable Case Navigation" register={register} error={errors.isActive?.message} name="isActive" />
        </div>
    </form>
    const updateServiceResultFunction = async (data) => {
        const updateData = { ...data, clientId: singledata?._id }
        // console.log("<<<<<<<<<<<<<<<<<<<<<",updateData,singledata?._id)
        disptach(showSpinnerReducer(true))

        try {
            const res = await updateClientApi(updateData)
            toast.success(`${res?.data?.message}`)
            refetch()
            disptach(showUpdateModalReducer(false))
        } catch (error) {
            toast.error(`something went wrong`)
            disptach(showUpdateModalReducer(false))

        } finally {
            disptach(showSpinnerReducer(false))

        }
    }

    useEffect(() => {
        setValue("address1", singledata?.address1 ?? "")
        setValue("address2", singledata?.address2 ?? "")
        setValue("apt", singledata?.apt ?? "")
        setValue("city", singledata?.city ?? "")
        setValue("code", singledata?.code ?? "")
        setValue("state", singledata?.state ?? "")
        setValue("fax", singledata?.fax ?? "")
        setValue("fullName", singledata?.fullName ?? "")
        setValue("mi", singledata?.mi ?? "")
        setValue("phone", singledata?.phone ?? "")
        setValue("zip", JSON.stringify(singledata?.zip) ?? "")
        setValue("isActive", singledata?.isActive ?? true)
    }, [])

    return <Modal
        modalHeading="Update Client"
        borderButtonText="cancel"
        // filledButtonText={isSubmitting?"updating":"update"}
        filledButtonText="update"
        onBorderButtonClick={() => disptach(showUpdateModalReducer(false))}
        onFilledButtonClick={handleSubmit(updateServiceResultFunction)}
        disabled={isSubmitting}
        modalBody={modalBody}
    />
}

export default ClientModalUpdate