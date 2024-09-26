import React, { useState } from "react";
import Modal from "./Modal";
import { userInputSectionSchema } from "../../schemas/userInputSectionSchema";
import { useDispatch } from "react-redux";
import { z } from "zod";
import { showModalReducer } from "../../redux/slice/showModal";
import { deleteServiceFormThunk } from "../../redux/slice/serviceForm";
export type FormFields = z.infer<typeof userInputSectionSchema>

export interface DeleteServiceFormModalProps {
    id: any
}
const DeleteServiceFormModal: React.FC<DeleteServiceFormModalProps> = ({ id }) => {
    const dispatch = useDispatch()
    const deleteServiceFunction = () => {
        dispatch(deleteServiceFormThunk(id))
    }


    // MODALFOOTER STARTS
    const body = <p className="flex  gap-4 mb-4  items-center justify-start gap-x-8 gap-y-4 flex-wrap">
        Are you sure to delete this service form?
    </p>
    // MODALFOOTER ENDS
    return <Modal
        modalHeading="Delete Service Form"
        borderButtonText="cancel"
        filledButtonText={"delete"}
        modalBody={body}
        onFilledButtonClick={deleteServiceFunction}
        onBorderButtonClick={() => dispatch(showModalReducer(false))} />
}

export default DeleteServiceFormModal