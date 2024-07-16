import React, { useEffect } from "react"
import Modal from "./Modal"
import { useDispatch } from "react-redux"
import { showModalReducer, showUpdateModalReducer } from "../../redux/slice/showModal"
import { Controller, useForm } from "react-hook-form"
import CheckBox from "../../components/CheckBox/CustomCheckBox"
import TextField from "../InputFields/TextField/TextField"
import { zodResolver } from "@hookform/resolvers/zod"
import { useGetAllData } from "../../hooks/getAllDataHook/useGetAllData"
import { z } from "zod"
import { userInputSectionSchema } from "../../schemas/addAdministrationServerSchema"
import { updateServerApi } from "../../apiservices/serverApi/serverApi"
import Dropdown from "../dropdown/Dropdown"
import { serverType } from "../../type/serverType/serverType"
type Props = {
    singledata: serverType | undefined; // Define props type here
};
export type FormFields = z.infer<typeof userInputSectionSchema>
const AdministrationServerUpdateModal: React.FC<Props> = ({ singledata }) => {
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors, isSubmitting }, control, setValue } = useForm<FormFields>({ resolver: zodResolver(userInputSectionSchema) })
    const { isLoading, error, data, refetch } = useGetAllData("/device/all-devices")
    const options = data?.map((options) => ({ label: options?.deviceCode, value: options?._id }));
    console.log(":data", data, "options", options)
    console.log("singledata>>>>>>", singledata)
    const modalBody = <form className="flex items-center justify-center gap-x-8 gap-y-4 flex-wrap mb-8 h-[50vh] overflow-y-scroll ">
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField label="server Code" register={register} error={errors.serverCode} name="serverCode" placeholder="Enter Code" />
        </div>
        <div className="w-[30%]">
                {options ? (
                    <Controller
                        name="deviceCode"
                        control={control}
                        render={({ field }) => (
                            <Dropdown
                                options={options}
                                value={field.value}
                                onChange={field.onChange}
                                label="Device Code"
                                error={errors.deviceCode?.message as string}
                            />
                        )}
                    />
                ) : (
                    <div>Loading devices...</div>
                )}
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField label="firstName" register={register} error={errors.firstName} name="firstName" placeholder="Enter First Name" />
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField label="lastName" register={register} error={errors.lastName} name="lastName" placeholder="Enter Last Name" />
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField label="address1" register={register} error={errors.address1} name="address1" placeholder="Enter Address" />
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField label="address2" register={register} error={errors.address2} name="address2" placeholder="Enter Address" />
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField label="country" register={register} error={errors.country} name="country" placeholder="Enter Country" />
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField label="state" register={register} error={errors.state} name="state" placeholder="Enter State" />
        </div>
        {/* <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField label="city" register={register} error={errors.city} name="city" placeholder="Enter City"/>
            </div> */}
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField label="zip" register={register} error={errors.zip} name="zip" placeholder="Enter zip" />
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField label="phone" register={register} error={errors.phone} name="phone" placeholder="000011111110000" />
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField label="fax" register={register} error={errors.fax} name="fax" placeholder="Enter fax" />
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField label="license No" register={register} error={errors.licenseNo} name="licenseNo" placeholder="Enter License No" />
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField label="apt" register={register} error={errors.apt} name="apt" placeholder="Enter apt" />
        </div>
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <CheckBox label="Active" register={register} error={errors.isActive?.message} name="isActive" />
        </div>
    </form>

    // ADD ADMINISTRATION FUNCTION
    const administrationFunction = async (data) => {
        console.log(typeof parseInt(data?.zip))
        const zip = parseInt(data?.zip)
        const licenseNo = parseInt(data?.licenseNo)
        const postData = { ...data, zip, licenseNo, serverId: singledata?._id }
        console.log("postdata", postData)
        await updateServerApi(postData)
    }
    useEffect(() => {
        if (singledata) {
            setValue("serverCode", singledata.serverCode ?? "");
            setValue("deviceCode", singledata.deviceCode ?? "");
            setValue("firstName", singledata.firstName ?? "");
            setValue("lastName", singledata.lastName ?? "");
            setValue("address1", singledata.address1 ?? "");
            setValue("address2", singledata.address2 ?? "");
            setValue("country", singledata.country ?? "");
            setValue("state", singledata.state ?? "");
            setValue("phone", singledata.phone ?? "");
            setValue("zip", singledata.zip?.toString() ?? "");
            setValue("fax", singledata.fax?.toString() ?? "");
            setValue("licenseNo", singledata.licenseNo?.toString() ?? "");
            setValue("apt", singledata.apt?.toString() ?? "");
            setValue("isActive", singledata.isActive ?? true);
        }
    }, [singledata]);

    return <>
        <Modal
            modalHeading="update Server"
            onBorderButtonClick={() => dispatch(showUpdateModalReducer(false))}
            onFilledButtonClick={handleSubmit(administrationFunction)}
            filledButtonText={isSubmitting ? "updating" : "update"}
            borderButtonText="cancel"
            modalBody={modalBody} />
    </>
}

export default AdministrationServerUpdateModal