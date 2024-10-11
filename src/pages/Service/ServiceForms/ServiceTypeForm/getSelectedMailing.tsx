// import React, { useEffect, useRef, useState } from "react";
// import { FaAngleDown, FaAngleUp } from "react-icons/fa"
// export interface GetSelectedMailingProp {
//     options: option[]
//     value: string
//     onChange: (value: string) => void
//     getMailFunction: (value: string) => void
//     error: string
//     label: string
// }
// export interface option {
//     _id: string
//     firstName: string
// }
// const GetSelectedMailing: React.FC<GetSelectedMailingProp> = ({ options,
//     error,
//     value,
//     label,
//     onChange,
//     getMailFunction }) => {
//     const [isOpen, setIsOpen] = useState(false)
//     const dropdownRef = useRef<HTMLDivElement>(null);
//     const handleSelectClick = () => {
//         setIsOpen(!isOpen)
//     }
//     const handleOptionClick = (optionValue: string) => {
//         onChange(optionValue)

//         getMailFunction(optionValue);


//         setIsOpen(false)
//     }
//     const handleClickOutside = (event: MouseEvent) => {
//         if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//             setIsOpen(false);
//         }
//     };
//     useEffect(() => {
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => {
//             document.removeEventListener("mousedown", handleClickOutside);
//         };
//     }, []);
//     return <div className="w-full z-[99999999999]" ref={dropdownRef}>
//         <label className="font-medium text-sm capitalize">{label}</label>
//         <div className="w-full relative">
//             <div onClick={handleSelectClick}
//                 className="w-full border-[1px] border-borderColor/10 bg-grayColorLight/50 border-solid rounded-lg px-2  py-1
//         focus:border-primaryColor focus:outline-primaryColor cursor-pointer">
//                 Select a Mail
//                 <span className="absolute top-[10px] right-2">
//                     {isOpen ? <FaAngleUp size={15} /> : <FaAngleDown size={15} />}
//                 </span></div>
//             {/* LIST OF OPTIONS STARTS */}
//             {isOpen && (
//                 <div className=" bg-grayColorLight w-full  h-[100px] overflow-y-auto  bg-whiteColor border-[1px] border-borderColor rounded-md ">
//                     {options.map((option) => (
//                         <div
//                             key={option._id}
//                             onClick={() => handleOptionClick(option._id)}
//                             className="cursor-pointer  bg-grayColorLight font-medium hover:bg-whiteColor   p-2 text-xs"
//                         >
//                             {option.firstName}
//                         </div>
//                     ))}

//                 </div>
//             )}</div>
//         {/* LIST OF OPTIONS ENDS */}
//         {/* ERROR DISPLAY IF DROP DOWN IS EMPTY*/}
//         {error && <p className="text-xs text-redColor">{error}</p>}
//     </div>
// }

// export default GetSelectedMailing

import React, { useEffect, useRef, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

export interface GetSelectedMailingProp {
    options: option[];
    value: string;
    onChange: (value: string) => void;
    getMailFunction: (value: string) => void;
    error: string;
    label: string;
    isOpenOption?: boolean;
}

export interface option {
    _id: string;
    firstName: string;
}

const GetSelectedMailing: React.FC<GetSelectedMailingProp> = ({
    options,
    error,
    value,
    label,
    onChange,
    getMailFunction,
    isOpenOption = false,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState<number>(-1); // Track highlighted option
    const [searchQuery, setSearchQuery] = useState(''); // Search query for filtering
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Toggle dropdown visibility
    const handleSelectClick = () => {
        setIsOpen(!isOpen);
    };

    // Option click handler
    const handleOptionClick = (optionValue: string) => {
        onChange(optionValue);
        getMailFunction(optionValue);
        setIsOpen(false); // Close dropdown after selection
    };

    // Close dropdown if clicked outside
    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };
    useEffect(() => {
        setIsOpen(isOpenOption);
    }, [isOpenOption]);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Filter options based on search query
    const filteredOptions = options.filter((option) =>
        option.firstName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Handle keydown for arrow keys and enter
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setHighlightedIndex((prevIndex) =>
                prevIndex === -1
                    ? 0
                    : Math.min(filteredOptions.length - 1, prevIndex + 1)
            );
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setHighlightedIndex((prevIndex) =>
                prevIndex === -1
                    ? 0
                    : Math.max(0, prevIndex - 1)
            );
        } else if (e.key === 'Enter' && highlightedIndex >= 0) {
            e.preventDefault();
            const selectedOption = filteredOptions[highlightedIndex];
            onChange(selectedOption._id);
            getMailFunction(selectedOption._id);
            setIsOpen(false); // Close dropdown after selection
        }
    };

    // Handle search query input change
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setHighlightedIndex(-1); // Reset highlighted index when searching
    };

    // Get label of the selected value (for displaying in the input box)
    const selectedLabel = highlightedIndex >= 0
        ? filteredOptions[highlightedIndex].firstName
        : options.find((option) => option._id === value)?.firstName || 'Select a Mail';

    return (
        <div className=" z-[99999999999] absolute  top-0 left-0 w-[300px]" ref={dropdownRef} onKeyDown={handleKeyDown} tabIndex={0}>
            <label className="font-medium text-sm capitalize">{label}</label>
            <div className="w-full relative">
                <div
                    onClick={handleSelectClick}
                    className="w-full border-[1px] border-borderColor/10 bg-grayColorLight/50 border-solid rounded-lg px-2 py-1
                        focus:border-primaryColor focus:outline-primaryColor cursor-pointer"
                >
                    {selectedLabel} {/* Show highlighted option or selected value */}
                    <span className="absolute top-[10px] right-2">
                        {isOpen ? <FaAngleUp size={15} /> : <FaAngleDown size={15} />}
                    </span>
                </div>

                {/* Dropdown list */}
                {isOpen && (
                    <div className="bg-grayColorLight w-full  overflow-y-auto bg-whiteColor border-[1px] border-borderColor rounded-md">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full border-b border-borderColor p-2 bg-whiteColor"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option, index) => (
                                <div
                                    key={option._id}
                                    onClick={() => handleOptionClick(option._id)}
                                    className={`cursor-pointer bg-grayColorLight font-medium hover:bg-whiteColor p-2 text-xs
                                        ${highlightedIndex === index ? 'bg-primaryColor text-whiteColor' : ''}`}
                                >
                                    {option.firstName}
                                </div>
                            ))
                        ) : (
                            <div className="p-2 text-xs text-gray-500">No options found</div>
                        )}
                    </div>
                )}
            </div>

            {/* Display error if any */}
            {error && <p className="text-xs text-redColor">{error}</p>}
        </div>
    );
};

export default GetSelectedMailing;
