import React from "react";
import "./Button.css"
export interface ButtonProps {
    text?: string
    onClick?: any
    disabled?: any
}

const Button: React.FC<ButtonProps> = ({ text, onClick, disabled }) => {
    return (
        <button
            disabled={disabled}
            className="w-full bg-primaryColorLight py-2 rounded-md capitalize text-whiteColor border-[2px]
                                 border-primaryColorLight" onClick={onClick}
        >
            {text}
        </button>)
}

export default Button