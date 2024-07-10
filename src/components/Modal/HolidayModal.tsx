import React from "react"
import Modal from "./Modal"
import { useDispatch } from "react-redux"
import { showModalReducer } from "../../redux/slice/showModal"
import { useForm } from "react-hook-form"
import TextArea from "../InputFields/TextArea/TextArea"
import { zodResolver } from "@hookform/resolvers/zod"
import { holidaySchema } from "../../schemas/holidaySchema"
const HolidayModal = () => {
    const disptach = useDispatch()
    const {register,handleSubmit,formState:{errors}}=useForm({resolver:zodResolver(holidaySchema)})
    const modalBody = <form className="mb-6">
        <TextArea label="Holiday Discription" register={register} error={errors.descriptionHoliday} name="descriptionHoliday"/>
    </form>
    const addHolidayFunction = (data) => {
        console.log(data)
        disptach(showModalReducer(false))
    }
    return <Modal
        modalHeading="Holiday"
        borderButtonText="cancel"
        filledButtonText="add"
        onBorderButtonClick={() => disptach(showModalReducer(false))}
        onFilledButtonClick={handleSubmit(addHolidayFunction)}
        modalBody={modalBody}
    />
}

export default HolidayModal