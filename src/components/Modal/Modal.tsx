import React, { useEffect, useRef } from "react";
import BorderButton from "../Buttons/BorderButton/BorderButton";
import Button from "../Buttons/Button/Button";
import { showModalReducer, showRoleModalReducer } from "../../redux/slice/showModal";
import { useDispatch } from "react-redux";

export interface ModalProps {
    modalHeading?: string
    modalBody?: React.ReactElement
    borderButtonText?: string
    filledButtonText?: string
    onFilledButtonClick?: any
    onBorderButtonClick?: any
    disabled?: any

}

const Modal: React.FC<ModalProps> = ({ modalHeading, modalBody, borderButtonText, filledButtonText, onFilledButtonClick, onBorderButtonClick, disabled }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch()
    const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            dispatch(showModalReducer(false))
        }
    };
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return <div className="w-full h-[100vh] bg-[#000]/40 fixed top-0 left-0 z-50 flex items-center justify-center	backdrop-blur-[2px] z-[999999999]" >
        <div className=" w-[90%] md:w-[60%] p-8 bg-whiteColor rounded-lg   " ref={modalRef}>

            {/* MODAL HEADING */}
            <h1 className="font-semibold mb-4 capitalize
                md:text-md
                lg:text-xl">{modalHeading}</h1>

            {/* MODAL BODY STARTS */}
            <div > {modalBody}</div>
            {/* MODAL BODY ENDS */}

            {/* MODAL FOOTER STARTS */}
            <div className="flex item-center justify-end gap-4">
                <div className="w-[30%] sm:w-[20%]"> <BorderButton buttonText={borderButtonText} onClick={onBorderButtonClick} /></div>
                <div className="w-[45%] sm:w-[20%]"><Button text={filledButtonText} onClick={onFilledButtonClick} disabled={disabled} />
                </div>
            </div>
            {/* MODAL FOOTER ENDS */}

        </div>
    </div>
}

export default Modal
