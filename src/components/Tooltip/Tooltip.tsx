import React from "react";

export interface TooltipProps {
    isTooltipVisible?: boolean;
    text: string;
}

const Tooltip: React.FC<TooltipProps> = ({ isTooltipVisible, text }) => {
    return (
        <div className="relative ">
<div className="h-[12px] w-[10px] bg-blackColor absolute top-[11px] -left-2 rounded-lg" style={{clipPath:"polygon(100% 0, 0 50%, 100% 100%)"}}>

</div>
        <div
            id="tooltip-default"
            role="tooltip"
            className={`absolute z-10 inline-block px-3 py-2 text-sm font-medium text-whiteColor transition-opacity duration-300 bg-blackColor rounded-lg shadow-sm tooltip dark:bg-primaryColor`}
            >
            {text}
            <div className="tooltip-arrow" data-popper-arrow></div>
           </div>
        </div>
    );
};

export default Tooltip;
