import React from "react";
import { Link } from "react-router-dom";
import "./BorderButton.css";

export interface BorderButtonProps {
    icon?: React.ReactNode;
    isIcon?: boolean;
    isRightIcon?: boolean;
    borderColor?: string;
    buttonText?: string;
    disabled?: boolean;
    onClick?: () => void;
    to?: string;
}

const BorderButton: React.FC<BorderButtonProps> = ({
    to = "#",
    icon,
    isIcon,
    buttonText,
    disabled = false,
    onClick,
    isRightIcon,
    borderColor = "primaryColorLight",
}) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (disabled) {
            e.preventDefault();
            return;
        }
        if (onClick) onClick();
    };

    return (
        <Link
            to={disabled ? "#" : to}
            className={`inner-shadow capitalize flex items-center justify-center gap-y-1 px-3 py-[10px] bg-whiteColor border-[2px]
                border-${borderColor} text-${borderColor} rounded-lg
                ${disabled ? "opacity-[30%] cursor-not-allowed" : "opacity-[99%]"}
            `}
            onClick={handleClick}
        >
            {isIcon && <span className="mr-2">{icon}</span>}
            <p className="font-semibold text-xs sm:text-sm text-center ">{buttonText}</p>
            {isRightIcon && <span className="ml-2">{icon}</span>}
        </Link>
    );
};

export default BorderButton;
