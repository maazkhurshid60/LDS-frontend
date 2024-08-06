import React, { useState } from "react";
import Modal from "./Modal";
import { userInputSectionSchema } from "../../schemas/userInputSectionSchema";
import { useDispatch } from "react-redux";
import { z } from "zod";
import { showModalReducer } from "../../redux/slice/showModal";
import { deleteServiceFormThunk } from "../../redux/slice/serviceForm";
export type FormFields = z.infer<typeof userInputSectionSchema>

export interface RefreshPageModalProps {
    show: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}
const RefreshPageModal: React.FC<RefreshPageModalProps> = ({ show, onConfirm, onCancel }) => {
    if (!show) return null;



    // MODALFOOTER STARTS
    const body = <p className="flex  gap-4 mb-4  items-center justify-start gap-x-8 gap-y-4 flex-wrap">
       Are you sure to refresh this Page? Data will be lost.
    </p>
    // MODALFOOTER ENDS
    return <Modal 
    modalHeading="Warning"
     borderButtonText="cancel" 
     filledButtonText={"Refresh Page"} 
     modalBody={body} 
     onFilledButtonClick={onConfirm}
        onBorderButtonClick={onCancel} />
}

export default RefreshPageModal