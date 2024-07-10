import React from "react";
import BorderButton from "../Buttons/BorderButton/BorderButton";
import Button from "../Buttons/Button/Button";

export interface ModalProps {
    modalHeading?: string
    modalBody?: React.ReactElement
    borderButtonText?: string
    filledButtonText?: string
onFilledButtonClick?:any
onBorderButtonClick?:any

}

const Modal: React.FC<ModalProps> = ({ modalHeading, modalBody, borderButtonText, filledButtonText ,onFilledButtonClick,onBorderButtonClick}) => {
    return <div className="w-full h-[100vh] bg-[#000]/40 fixed top-0 left-0 z-50 flex items-center justify-center	backdrop-blur-[2px] z-[99999999999]">
        <div className=" w-[90%] md:w-[60%] p-8 bg-whiteColor rounded-lg   ">

            {/* MODAL HEADING */}
            <h1 className="font-semibold mb-4
                md:text-md
                lg:text-xl">{modalHeading}</h1>

            {/* MODAL BODY STARTS */}
            <div > {modalBody}</div>
            {/* MODAL BODY ENDS */}

            {/* MODAL FOOTER STARTS */}
            <div className="flex item-center justify-end gap-4"> 
            <div className="w-[30%] sm:w-[20%]"> <BorderButton buttonText={borderButtonText} onClick={onBorderButtonClick}/></div>
                 <div className="w-[45%] sm:w-[20%]"><Button text={filledButtonText} onClick={onFilledButtonClick}/>
                 </div>
                </div>
            {/* MODAL FOOTER ENDS */}

        </div>
    </div>
}

export default Modal
