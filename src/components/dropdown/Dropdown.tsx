import React, { useEffect, useRef, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

export interface DropdownProp {
    options: option[];
    // singleOption?:option
    value: string;
    onChange: (value: string) => void;
    onValueChange?: (value: string) => void; // New prop for external value change
required?:boolean;
    error: string;
    label: string;
}

export interface option {
    value: string;
    label: string;
}

const Dropdown: React.FC<DropdownProp> = ({
    options = [],
    error,
    value,
    label,
    onChange,
    onValueChange,
    required=false
    // singleOption
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
// console.log(value)
    const handleSelectClick = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (optionValue: string) => {
        onChange(optionValue);
        if (onValueChange) {
            onValueChange(optionValue); // Call the external value change handler
        }
        setIsOpen(false);
    };
    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return (
        <div className="w-full" ref={dropdownRef}>
            <label className="sm:font-medium text-sm capitalize">{label} 
                {required && <span className="text-redColor">*</span> }
                </label>
            <div className="w-full relative">
                <div
                    onClick={handleSelectClick}
                    className="w-full border-[1px] border-borderColor/10 bg-grayColorLight/50 border-solid rounded-lg px-2 py-1
                    focus:border-primaryColor focus:outline-primaryColor cursor-pointer"
                >
                    {/* {singleOption?.label|| options.find((option) => option.value === value)?.label || "Select an option"} */}
                    { options.find((option) => option.value === value)?.label ||  "Select an option" }
                    <span className="absolute top-[10px] right-2">
                        {isOpen ? <FaAngleUp size={15} /> : <FaAngleDown size={15} />}
                    </span>
                </div>
                {isOpen && (
                    <div className="absolute z-10 bg-grayColorLight w-full bg-whiteColor border-[1px] border-borderColor rounded-md ">
                        {options.map((option) => (
                            <div
                                key={option.value}
                                onClick={() => handleOptionClick(option.value)}
                                className="cursor-pointer bg-grayColorLight font-medium hover:bg-whiteColor p-2 text-xs"
                            >
                                {option.label}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {error && <p className="text-xs text-redColor">{error}</p>}
        </div>
    );
};

export default Dropdown;
