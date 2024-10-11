import React, { useEffect, useRef, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
export interface DropdownProp {
    options: option[];
    value: string;
    onChange: (value: string) => void;
    onValueChange?: (value: string) => void;
    required?: boolean;
    error: string;
    label: string;
    isOpenOption?: boolean;
    id?: string;
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
    required = false,
    isOpenOption = false,
    id,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [highlightedIndex, setHighlightedIndex] = useState<number>(-1); // No item highlighted initially
    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Toggle dropdown visibility
    const handleSelectClick = () => {
        setIsOpen(!isOpen);
    };

    // Handle option selection
    const handleOptionClick = (optionValue: string) => {
        onChange(optionValue);
        if (onValueChange) {
            onValueChange(optionValue);
        }
        setIsOpen(false); // Close dropdown after selection
    };

    // Close dropdown if clicked outside
    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    // Listen for click events outside the dropdown
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Sync dropdown state based on parent prop `isOpenOption`
    useEffect(() => {
        setIsOpen(isOpenOption);
    }, [isOpenOption]);

    // Filter options based on search query
    const filteredOptions = options.filter((option) =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Focus input field when dropdown is open
    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
        }
    }, [isOpen]);

    // Handle keydown events (arrow keys and enter)
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setHighlightedIndex((prevIndex) =>
                prevIndex === -1 // Start with the first option if no item is highlighted
                    ? 0
                    : Math.min(filteredOptions.length - 1, prevIndex + 1) // Move down the list
            );
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setHighlightedIndex((prevIndex) =>
                prevIndex === -1 // Start with the first option if no item is highlighted
                    ? 0
                    : Math.max(0, prevIndex - 1) // Move up the list
            );
        } else if (e.key === 'Enter' && highlightedIndex >= 0) {
            e.preventDefault();
            const selectedOption = filteredOptions[highlightedIndex];
            onChange(selectedOption.value); // Update selected value
            if (onValueChange) {
                onValueChange(selectedOption.value);
            }
            setIsOpen(false); // Close dropdown after selection
        }
    };

    // Handle search query change
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);

        // Automatically select the option if the query matches any option label
        const matchedOption = options.find(option =>
            option.label.toLowerCase() === query.toLowerCase()
        );
        if (matchedOption) {
            // If we found an exact match, automatically select it
            onChange(matchedOption.value); // Update the field value
            if (onValueChange) {
                onValueChange(matchedOption.value);
            }
            // Close the dropdown after automatic selection
            setIsOpen(false); // Close the dropdown
            // Simulate the "Enter" key press to move to the next field
            const simulatedEvent = {
                target: {
                    form: document.querySelector("form"), // Assuming the dropdown is in a form
                },
            };
            handleEnterKeyPress(simulatedEvent, matchedOption.value, 0); // Call your function with simulated event
        } else {
            setHighlightedIndex(-1); // Reset highlighted index when no match
        }
    };

    // Get the label of the selected value (this will be shown in the input)
    const selectedLabel = options.find(option => option.value === value)?.label || 'Select an option';

    // Get the label of the highlighted option
    const highlightedLabel = highlightedIndex >= 0 ? filteredOptions[highlightedIndex].label : '';

    return (
        <div
            className="w-full"
            ref={dropdownRef}
            onKeyDown={handleKeyDown} // Ensure key events are captured
            tabIndex={0} // Allow focus for keyboard navigation
            id={id}
        >
            <label className="sm:font-medium text-sm capitalize">
                {label}
                {required && <span className="text-redColor">*</span>}
            </label>
            <div className="w-full relative">
                <div
                    onClick={handleSelectClick}
                    className="w-full border-[1px] border-borderColor/10 bg-grayColorLight/50 border-solid rounded-lg px-2 py-1 focus:border-primaryColor focus:outline-primaryColor cursor-pointer"
                >
                    {highlightedIndex >= 0 ? highlightedLabel : selectedLabel} {/* Show highlighted or selected option */}
                    <span className="absolute top-[10px] right-2">
                        {isOpen ? <FaAngleUp size={15} /> : <FaAngleDown size={15} />}
                    </span>
                </div>

                {/* Dropdown list */}
                {isOpen && (
                    <div className="absolute z-10 bg-grayColorLight w-full bg-whiteColor border-[1px] border-borderColor rounded-md">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full border-b border-borderColor p-2 bg-whiteColor"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            ref={inputRef}
                        />
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option, index) => (
                                <div
                                    key={option.value}
                                    onClick={() => handleOptionClick(option.value)}
                                    className={`cursor-pointer capitalize font-medium hover:bg-whiteColor p-2 text-xs 
                    ${highlightedIndex === index ? 'bg-primaryColorLight text-whiteColor' : ''}`} // Highlight selected option
                                >
                                    {option.label}
                                </div>
                            ))
                        ) : (
                            <div className="p-2 text-xs text-gray-500">No options found</div>
                        )}
                    </div>
                )}
            </div>
            {error && <p className="text-xs text-redColor">{error}</p>}
        </div>
    );
};

export default Dropdown;





// import React, { useEffect, useRef, useState } from "react";
// import { FaAngleDown, FaAngleUp } from "react-icons/fa";

// export interface DropdownProp {
//     options: option[];
//     value: string;
//     onChange: (value: string) => void;
//     onValueChange?: (value: string) => void;
//     required?: boolean;
//     error: string;
//     label: string;
//     isOpenOption?: boolean;
//     id?: string;
// }

// export interface option {
//     value: string;
//     label: string;
// }

// const Dropdown: React.FC<DropdownProp> = ({
//     options = [],
//     error,
//     value,
//     label,
//     onChange,
//     onValueChange,
//     required = false,
//     isOpenOption = false,
//     id,
// }) => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [highlightedIndex, setHighlightedIndex] = useState<number>(-1); // No item highlighted initially
//     const dropdownRef = useRef<HTMLDivElement>(null);
//     const inputRef = useRef<HTMLInputElement>(null);

//     // Toggle dropdown visibility
//     const handleSelectClick = () => {
//         setIsOpen(!isOpen);
//     };

//     // Handle option selection
//     const handleOptionClick = (optionValue: string) => {
//         onChange(optionValue);
//         if (onValueChange) {
//             onValueChange(optionValue);
//         }
//         setIsOpen(false); // Close dropdown after selection
//     };

//     // Close dropdown if clicked outside
//     const handleClickOutside = (event: MouseEvent) => {
//         if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//             setIsOpen(false);
//         }
//     };

//     // Listen for click events outside the dropdown
//     useEffect(() => {
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => {
//             document.removeEventListener("mousedown", handleClickOutside);
//         };
//     }, []);

//     // Sync dropdown state based on parent prop `isOpenOption`
//     useEffect(() => {
//         setIsOpen(isOpenOption);
//     }, [isOpenOption]);

//     // Filter options based on search query
//     const filteredOptions = options.filter((option) =>
//         option.label.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     // Focus input field when dropdown is open
//     useEffect(() => {
//         if (isOpen) {
//             inputRef.current?.focus();
//         }
//     }, [isOpen]);

//     // Handle keydown events (arrow keys and enter)
//     const handleKeyDown = (e: React.KeyboardEvent) => {
//         if (e.key === 'ArrowDown') {
//             e.preventDefault();
//             setHighlightedIndex((prevIndex) =>
//                 prevIndex === -1 // Start with the first option if no item is highlighted
//                     ? 0
//                     : Math.min(filteredOptions.length - 1, prevIndex + 1) // Move down the list
//             );
//         } else if (e.key === 'ArrowUp') {
//             e.preventDefault();
//             setHighlightedIndex((prevIndex) =>
//                 prevIndex === -1 // Start with the first option if no item is highlighted
//                     ? 0
//                     : Math.max(0, prevIndex - 1) // Move up the list
//             );
//         } else if (e.key === 'Enter' && highlightedIndex >= 0) {
//             e.preventDefault();
//             const selectedOption = filteredOptions[highlightedIndex];
//             onChange(selectedOption.value); // Update selected value
//             if (onValueChange) {
//                 onValueChange(selectedOption.value);
//             }
//             setIsOpen(false); // Close dropdown after selection
//         }
//     };

//     // Handle search query change
//     const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setSearchQuery(e.target.value);
//         setHighlightedIndex(-1); // Reset highlighted index when searching
//     };

//     // Get the label of the selected value (this will be shown in the input)
//     const selectedLabel = options.find(option => option.value === value)?.label || 'Select an option';

//     // Get the label of the highlighted option
//     const highlightedLabel = highlightedIndex >= 0 ? filteredOptions[highlightedIndex].label : '';

//     return (
//         <div
//             className="w-full"
//             ref={dropdownRef}
//             onKeyDown={handleKeyDown} // Ensure key events are captured
//             tabIndex={0} // Allow focus for keyboard navigation
//             id={id}
//         >
//             <label className="sm:font-medium text-sm capitalize">
//                 {label}
//                 {required && <span className="text-redColor">*</span>}
//             </label>
//             <div className="w-full relative">
//                 <div
//                     onClick={handleSelectClick}
//                     className="w-full border-[1px] border-borderColor/10 bg-grayColorLight/50 border-solid rounded-lg px-2 py-1 focus:border-primaryColor focus:outline-primaryColor cursor-pointer"
//                 >
//                     {highlightedIndex >= 0 ? highlightedLabel : selectedLabel} {/* Show highlighted or selected option */}
//                     <span className="absolute top-[10px] right-2">
//                         {isOpen ? <FaAngleUp size={15} /> : <FaAngleDown size={15} />}
//                     </span>
//                 </div>

//                 {/* Dropdown list */}
//                 {isOpen && (
//                     <div className="absolute z-10 bg-grayColorLight w-full bg-whiteColor border-[1px] border-borderColor rounded-md">
//                         <input
//                             type="text"
//                             placeholder="Search..."
//                             className="w-full border-b border-borderColor p-2 bg-whiteColor"
//                             value={searchQuery}
//                             onChange={handleSearchChange}
//                             ref={inputRef}
//                         />
//                         {filteredOptions.length > 0 ? (
//                             filteredOptions.map((option, index) => (
//                                 <div
//                                     key={option.value}
//                                     onClick={() => handleOptionClick(option.value)}
//                                     className={`cursor-pointer capitalize font-medium hover:bg-whiteColor p-2 text-xs
//                     ${highlightedIndex === index ? 'bg-primaryColorLight text-whiteColor' : ''}`} // Highlight selected option
//                                 >
//                                     {option.label}
//                                 </div>
//                             ))
//                         ) : (
//                             <div className="p-2 text-xs text-gray-500">No options found</div>
//                         )}
//                     </div>
//                 )}
//             </div>
//             {error && <p className="text-xs text-redColor">{error}</p>}
//         </div>
//     );
// };

// export default Dropdown;











// import React, { useEffect, useRef, useState } from "react";
// import { FaAngleDown, FaAngleUp } from "react-icons/fa";

// export interface DropdownProp {
//     options: option[];
//     value: string;
//     onChange: (value: string) => void;
//     onValueChange?: (value: string) => void;
//     required?: boolean;
//     error: string;
//     label: string;
//     isOpenOption?: boolean;
//     onKeyDown?: any
//     id?: string
// }

// export interface option {
//     value: string;
//     label: string;
// }

// const Dropdown: React.FC<DropdownProp> = ({
//     options = [],
//     error,
//     value,
//     label,
//     onChange,
//     onValueChange,
//     required = false,
//     isOpenOption = false,
//     onKeyDown,
//     id
// }) => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [searchQuery, setSearchQuery] = useState('');
//     const dropdownRef = useRef<HTMLDivElement>(null);
//     const inputRef = useRef<HTMLInputElement>(null);
//     const handleSelectClick = () => {
//         setIsOpen(!isOpen);
//     };

//     const handleOptionClick = (optionValue: string) => {
//         onChange(optionValue);
//         if (onValueChange) {
//             onValueChange(optionValue);
//         }
//         setIsOpen(false);
//     };

//     const openDropdown = () => {
//         setIsOpen(true);
//     };

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
//     useEffect(() => {
//         const handleNewFormAddingChange = () => {
//             setIsOpen(isOpenOption);
//         };
//         handleNewFormAddingChange()
//     }, [isOpenOption])

//     const filteredOptions = options.filter(option =>
//         option.label.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     useEffect(() => {
//         if (isOpen) {
//             inputRef.current?.focus(); // Focus the input field when dropdown opens
//         }
//     }, [isOpen]);
//     return (
//         <div className="w-full" ref={dropdownRef} onKeyDown={onKeyDown} tabIndex={0} id={id}>
//             <label className="sm:font-medium text-sm capitalize">
//                 {label}
//                 {required && <span className="text-redColor">*</span>}
//             </label>
//             <div className="w-full relative">
//                 <div
//                     onClick={handleSelectClick}
//                     className="w-full border-[1px] border-borderColor/10 bg-grayColorLight/50 border-solid rounded-lg px-2 py-1
//                     focus:border-primaryColor focus:outline-primaryColor cursor-pointer"
//                 >
//                     {options.find((option) => option.value === value)?.label || "Select an option"}
//                     <span className="absolute top-[10px] right-2">
//                         {isOpen ? <FaAngleUp size={15} /> : <FaAngleDown size={15} />}
//                     </span>
//                 </div>
//                 {isOpen && (
//                     <div className="absolute z-10 bg-grayColorLight w-full bg-whiteColor border-[1px] border-borderColor rounded-md">
//                         <input
//                             type="text"
//                             placeholder="Search..."
//                             className="w-full border-b border-borderColor p-2 bg-whiteColor"
//                             value={searchQuery}
//                             onChange={(e) => setSearchQuery(e.target.value)}
//                             ref={inputRef}
//                         />
//                         {filteredOptions.length > 0 ? (
//                             filteredOptions.map((option) => (
//                                 <div
//                                     key={option.value}
//                                     onClick={() => handleOptionClick(option.value)}
//                                     className="cursor-pointer capitalize bg-grayColorLight font-medium hover:bg-whiteColor p-2 text-xs"
//                                 >
//                                     {option.label}
//                                 </div>
//                             ))
//                         ) : (
//                             <div className="p-2 text-xs text-gray-500">No options found</div>
//                         )}
//                     </div>
//                 )}
//             </div>
//             {error && <p className="text-xs text-redColor">{error}</p>}
//         </div >
//     );
// };

// export default Dropdown;