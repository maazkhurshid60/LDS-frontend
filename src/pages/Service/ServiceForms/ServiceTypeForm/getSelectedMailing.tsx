import React, { useEffect, useRef, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa"
export interface GetSelectedMailingProp {
    options: option[]
    value: string
    onChange: (value: string) => void
    getMailFunction: (value: string) => void
    error: string
    label: string
}
export interface option {
    _id: string
    firstName: string
}
const GetSelectedMailing: React.FC<GetSelectedMailingProp> = ({ options,
    error,
    value,
    label,
    onChange,
    getMailFunction }) => {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null);
    const handleSelectClick = () => {
        setIsOpen(!isOpen)
    }
    const handleOptionClick = (optionValue: string) => {
        onChange(optionValue)

        getMailFunction(optionValue);


        setIsOpen(false)
    }
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
    return <div className="w-full z-[99999999999]" ref={dropdownRef}>
        <label className="font-medium text-sm capitalize">{label}</label>
        <div className="w-full relative">
            <div onClick={handleSelectClick}
                className="w-full border-[1px] border-borderColor/10 bg-grayColorLight/50 border-solid rounded-lg px-2  py-1
        focus:border-primaryColor focus:outline-primaryColor cursor-pointer">
                Select a Mail
                <span className="absolute top-[10px] right-2">
                    {isOpen ? <FaAngleUp size={15} /> : <FaAngleDown size={15} />}
                </span></div>
            {/* LIST OF OPTIONS STARTS */}
            {isOpen && (
                <div className=" bg-grayColorLight w-full  h-[100px] overflow-y-auto  bg-whiteColor border-[1px] border-borderColor rounded-md ">
                    {options.map((option) => (
                        <div
                            key={option._id}
                            onClick={() => handleOptionClick(option._id)}
                            className="cursor-pointer  bg-grayColorLight font-medium hover:bg-whiteColor   p-2 text-xs"
                        >
                            {option.firstName}
                        </div>
                    ))}

                </div>
            )}</div>
        {/* LIST OF OPTIONS ENDS */}
        {/* ERROR DISPLAY IF DROP DOWN IS EMPTY*/}
        {error && <p className="text-xs text-redColor">{error}</p>}
    </div>
}

export default GetSelectedMailing