import React, { useEffect } from "react"
import Modal from "./Modal"
import { useDispatch } from "react-redux"
import { showModalReducer, showUpdateModalReducer } from "../../redux/slice/showModal"
import { useForm } from "react-hook-form"
import CheckBox from "../../components/CheckBox/CustomCheckBox"
import TextField from "../InputFields/TextField/TextField"
import { addServiceResultApi, updateServiceResultApi } from "../../apiservices/serviceResult/serviceResult";
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-toastify"
import { useGetAllData } from "../../hooks/getAllDataHook/useGetAllData"
import { clientType } from "../../type/clientType/clientType"
import { clientSchema } from "../../schemas/clientSchema"
import { z } from "zod"
import { updateClientApi } from "../../apiservices/clientApi/clientApi"
import { deviceSchema } from "../../schemas/DeviceSchema"
import { deviceType } from "../../type/deviceType/deviceType"
import { updateDeviceApi } from "../../apiservices/deviceApi/deviceApi"
import { holidaySchema } from "../../schemas/holidaySchema"
import TextArea from "../InputFields/TextArea/TextArea"
import { holidayType } from "../../type/holidayType/holidayType"
import { updateHolidayApi } from "../../apiservices/holidayApi/holidayApi"
import { showSpinnerReducer } from "../../redux/slice/spinner"
import { handleEnterKeyPress } from "../../utils/moveToNextFieldOnEnter"
import { ltServiceTypeSchema } from "../../schemas/ltServiceTypeSchema"
import { updateLtServiceTypeApi } from "../../apiservices/L&TServiceTypeApi/L&TServiceTypeApi"
type Props = {
    singledata: any | undefined; // Define props type here
};
export type FormFields = z.infer<typeof ltServiceTypeSchema>
const LtServiceTypeUpdateModal: React.FC<Props> = ({ singledata }) => {
    const disptach = useDispatch()

    const { isLoading, error, data, refetch } = useGetAllData("/ltservice-type/all-lT-service-types")

    const { register, handleSubmit, formState: { errors, isSubmitting }, setValue } = useForm<FormFields>({ resolver: zodResolver(ltServiceTypeSchema) })
    const modalBody = <form className=" flex items-center justify-start gap-x-8 gap-y-4 flex-wrap mb-8">
        <div className="w-full md:w-[38%] xl:w-[30%]">
            <TextField onKeyDown={handleEnterKeyPress}  label="name" register={register} error={errors.name} name="name" required/>
        </div>
          
        
    </form>
    const updateDeviceFunction = async (data) => {
        // const updateData = { ...data, lTServiceTypeId: singledata?._id }
       const updateData= {name:data?.name,isActive:false,lTServiceTypeId: singledata?._id}

        // const holidayYear=parseInt(data?.holidayYear)
       
       
        // if(updateData?.holidayYear!==updateData?.holidayDate.slice(0,4)){return alert("Holiday Year and Holiday Date's Year should be Same")}
          console.log("updaetjgsgfg",updateData)
        disptach(showSpinnerReducer(true))

        try {
            const res = await updateLtServiceTypeApi(updateData)
            toast.success(`${res?.data?.message}`)
            refetch()
            disptach(showUpdateModalReducer(false))
        } catch (error) {
            disptach(showUpdateModalReducer(false))
            toast.error(`something went wrong`)
        }finally{
            disptach(showSpinnerReducer(false))

        }
    }
    useEffect(() => {
        setValue("name", singledata?.name ?? "")

    }, [])
    return <Modal
        modalHeading="Update Lt Service Type"
        borderButtonText="cancel"
        // filledButtonText={isSubmitting ? "updating" : "update"}
        disabled={isSubmitting}
        filledButtonText="update"
        onBorderButtonClick={() => disptach(showUpdateModalReducer(false))}
        onFilledButtonClick={handleSubmit(updateDeviceFunction)}
        modalBody={modalBody}
    />
}

export default LtServiceTypeUpdateModal