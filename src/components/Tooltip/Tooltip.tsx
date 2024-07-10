import React from "react";

export interface TooltipProps {
    isTooltipVisible: boolean;
    text: string;
}

const Tooltip: React.FC<TooltipProps> = ({ isTooltipVisible, text }) => {
    return (
        <div
            id="tooltip-default"
            role="tooltip"
            className={`absolute z-10 ${isTooltipVisible ? "visible opacity-100" : "invisible opacity-0"} inline-block px-3 py-2 text-sm font-medium text-whiteColor transition-opacity duration-300 bg-blackColor rounded-lg shadow-sm tooltip dark:bg-primaryColor`}
        >
            {text}
            <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
    );
};

export default Tooltip;
