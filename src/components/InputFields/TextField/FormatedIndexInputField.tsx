import React, { useState, forwardRef, useEffect, useRef } from 'react';

interface FormatedIndexInputFieldProps {
    label: string;
    register?: any;
    error?: any;
    name: string;
    placeholder?: string;
    type?: string;
    defaultValue?: string;
    onKeyDown?: any;
    required?: boolean;
    readOnly?: boolean;
    onChange?: (value: string) => void; // Updated type
    id?: string;
    oltIndexValue?: string; // Ensure this is a string
    year: string; // Current year passed as prop
}

const FormatedIndexInputField = forwardRef<HTMLInputElement, FormatedIndexInputFieldProps>((props, ref) => {
    const {
        label,
        register,
        error,
        name,
        placeholder,
        type = "text",
        defaultValue,
        onChange,
        onKeyDown,
        id,
        oltIndexValue,
        year
    } = props;

    const [inputValue, setInputValue] = useState<string>(''); // The whole input value
    const [currentYear, setCurrentYear] = useState<string>(year); // Set the year as editable
    const indexInputRef = useRef<HTMLInputElement>(null);
    const yearInputRef = useRef<HTMLInputElement>(null);

    // Handle change of index and year
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const splitValue = value.split('/'); // Split value into index and year

        if (splitValue.length === 2) {
            // If both parts (index and year) are provided
            const newIndex = splitValue[0];
            const newYear = splitValue[1];

            // Validate index part (alphanumeric, length <= 6)
            if (/^[a-zA-Z0-9]*$/.test(newIndex) && newIndex.length <= 6) {
                setInputValue(value); // Set input value
                setCurrentYear(newYear); // Set the year part
                if (register) {
                    register(name).onChange(value); // Update value in react-hook-form
                }
                if (onChange) {
                    onChange(value); // Notify parent of the change
                }
            }
        } else {
            // If it's only the index or incomplete value, just update the index part
            const newIndex = value.split('/')[0];

            if (/^[a-zA-Z0-9]*$/.test(newIndex) && newIndex.length <= 6) {
                setInputValue(value); // Update input value
                if (register) {
                    register(name).onChange(value); // Update value in react-hook-form
                }
                if (onChange) {
                    onChange(value); // Notify parent of the change
                }
            }
        }
    };

    // Handle changes to the year field
    const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newYear = event.target.value;
        setCurrentYear(newYear);

        // Update the full value with the new year
        const newFullValue = `${inputValue}/${newYear}`;
        setInputValue(newFullValue);

        if (onChange) {
            onChange(newFullValue); // Notify parent of the change
        }
    };

    // Handle the backspace behavior
    const handleBackspace = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Backspace' && currentYear === '') {
            // If the year input is empty and backspace is pressed, focus back on the index input
            if (indexInputRef.current) {
                indexInputRef.current.focus(); // Move focus back to the index input field
            }
        }
    };

    // Set initial state based on `oltIndexValue` (if provided)
    useEffect(() => {
        if (oltIndexValue) {
            const newIndex = oltIndexValue.split('/')[0];
            const newYear = oltIndexValue.split('/')[1];
            setCurrentYear(newYear || year); // Set the year part from the provided value, or use current year
            setInputValue(newIndex);
        } else {
            setInputValue('');
            setCurrentYear(year); // Default to current year
        }
    }, [oltIndexValue, year]);

    // Initial setup for current year when component mounts
    useEffect(() => {
        setCurrentYear(new Date().getFullYear().toString().slice(-2)); // Set current year as default
    }, []);

    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <div className={`w-full border-[1px] flex border-borderColor/10 bg-grayColorLight/50 border-solid rounded-lg px-2 py-1 focus:border-primaryColor focus:outline-primaryColor`}>
                {/* Index input field */}
                <input
                    ref={(e) => {
                        if (register) {
                            register(name).ref(e);
                        }
                        if (typeof ref === 'function') {
                            ref(e);
                        } else if (ref) {
                            ref.current = e;
                        }
                    }}
                    id={id}
                    type={type}
                    className="focus:outline-none bg-grayColorLight/50 w-[55px]"
                    placeholder={placeholder}
                    name={name}
                    value={inputValue}
                    onChange={handleChange}
                    onKeyDown={(e) => {
                        onKeyDown?.(e); // Call parent onKeyDown if available
                        handleBackspace(e); // Handle backspace key
                    }}
                    defaultValue={defaultValue}
                />
                {inputValue && (
                    <>
                        <span>/</span>
                        {/* Year input field */}
                        <input
                            type="text"
                            value={currentYear} // Show the current year as default
                            onChange={handleYearChange} // Handle year changes
                            maxLength={2} // Allow only 2 digits for the year
                            className="focus:outline-none bg-grayColorLight/50 w-[30px] text-center"
                            placeholder="YY"
                            ref={yearInputRef}
                            onKeyDown={(e) => {
                                onKeyDown?.(e); // Call parent onKeyDown if available
                                handleBackspace(e); // Handle backspace key
                            }}
                        />
                    </>
                )}
            </div>
            {error && <p style={{ color: 'red' }}>{error.message}</p>}
        </div>
    );
});

export default FormatedIndexInputField;



// import React, { useState, forwardRef, useEffect, useRef } from 'react';

// interface FormatedIndexInputFieldProps {
//     label: string;
//     register?: any;
//     error?: any;
//     name: string;
//     placeholder?: string;
//     type?: string;
//     defaultValue?: string;
//     onKeyDown?: any;
//     required?: boolean;
//     readOnly?: boolean;
//     onChange?: (value: string) => void; // Updated type
//     id?: string;
//     oltIndexValue?: string; // Ensure this is a string
//     year: string; // Current year passed as prop
// }

// const FormatedIndexInputField = forwardRef<HTMLInputElement, FormatedIndexInputFieldProps>((props, ref) => {
//     const {
//         label,
//         register,
//         error,
//         name,
//         placeholder,
//         type = "text",
//         defaultValue,
//         onChange,
//         onKeyDown,
//         id,
//         oltIndexValue,
//         year
//     } = props;

//     const [inputValue, setInputValue] = useState<string>(''); // The whole input value
//     const [currentYear, setCurrentYear] = useState<string>(year); // Set the year as editable
//     const indexInputRef = useRef<HTMLInputElement>(null);
//     const yearInputRef = useRef<HTMLInputElement>(null);

//     // Handle change of index and year
//     const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const value = event.target.value;
//         const splitValue = value.split('/'); // Split value into index and year

//         if (splitValue.length === 2) {
//             // If both parts (index and year) are provided
//             const newIndex = splitValue[0];
//             const newYear = splitValue[1];

//             // Validate index part (alphanumeric, length <= 6)
//             if (/^[a-zA-Z0-9]*$/.test(newIndex) && newIndex.length <= 6) {
//                 setInputValue(value); // Set input value
//                 setCurrentYear(newYear); // Set the year part
//                 if (register) {
//                     register(name).onChange(value); // Update value in react-hook-form
//                 }
//                 if (onChange) {
//                     onChange(value); // Notify parent of the change
//                 }
//             }
//         } else {
//             // If it's only the index or incomplete value, just update the index part
//             const newIndex = value.split('/')[0];

//             if (/^[a-zA-Z0-9]*$/.test(newIndex) && newIndex.length <= 6) {
//                 setInputValue(value); // Update input value
//                 if (register) {
//                     register(name).onChange(value); // Update value in react-hook-form
//                 }
//                 if (onChange) {
//                     onChange(value); // Notify parent of the change
//                 }
//             }
//         }
//     };

//     // Handle the backspace behavior
//     const handleBackspace = (event: React.KeyboardEvent<HTMLInputElement>) => {
//         if (event.key === 'Backspace' && currentYear === '') {
//             // If the year input is empty and backspace is pressed, focus back on the index input
//             if (indexInputRef.current) {
//                 indexInputRef.current.focus(); // Move focus back to the index input field
//             }
//         }
//     };

//     // Set initial state based on `oltIndexValue` (if provided)
//     useEffect(() => {
//         if (oltIndexValue) {
//             const newIndex = oltIndexValue.split('/')[0];
//             const newYear = oltIndexValue.split('/')[1];
//             setCurrentYear(newYear || year); // Set the year part from the provided value, or use current year
//             setInputValue(newIndex);
//         } else {
//             setInputValue('');
//             setCurrentYear(year); // Default to current year
//         }
//     }, [oltIndexValue, year]);

//     // Initial setup for current year when component mounts
//     useEffect(() => {
//         setCurrentYear(new Date().getFullYear().toString().slice(-2)); // Set current year as default
//     }, []);

//     return (
//         <div>
//             <label htmlFor={name}>{label}</label>
//             <div className={`w-full border-[1px] flex border-borderColor/10 bg-grayColorLight/50 border-solid rounded-lg px-2 py-1 focus:border-primaryColor focus:outline-primaryColor`}>
//                 {/* Index input field */}
//                 <input
//                     ref={(e) => {
//                         if (register) {
//                             register(name).ref(e);
//                         }
//                         if (typeof ref === 'function') {
//                             ref(e);
//                         } else if (ref) {
//                             ref.current = e;
//                         }
//                     }}
//                     id={id}
//                     type={type}
//                     className="focus:outline-none bg-grayColorLight/50 w-[55px]"
//                     placeholder={placeholder}
//                     name={name}
//                     value={inputValue}
//                     onChange={handleChange}
//                     onKeyDown={(e) => {
//                         onKeyDown?.(e); // Call parent onKeyDown if available
//                         handleBackspace(e); // Handle backspace key
//                     }}
//                     defaultValue={defaultValue}
//                 // ref={indexInputRef}
//                 />
//                 {inputValue && <> <span>/</span>
//                     {/* Year input field */}
//                     <input
//                         type="text"
//                         value={currentYear} // Show the current year as default
//                         onChange={(e) => setCurrentYear(e.target.value)} // Allow editing the year
//                         maxLength={2} // Allow only 2 digits for the year
//                         className="focus:outline-none bg-grayColorLight/50 w-[30px] text-center"
//                         placeholder="YY"
//                         ref={yearInputRef}
//                         onKeyDown={(e) => {
//                             onKeyDown?.(e); // Call parent onKeyDown if available
//                             handleBackspace(e); // Handle backspace key
//                         }}
//                     />
//                 </>
//                 }


//             </div>
//             {error && <p style={{ color: 'red' }}>{error.message}</p>}
//         </div>
//     );
// });

// export default FormatedIndexInputField;