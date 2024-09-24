// import React, { useState } from 'react';
// import { Controller } from 'react-hook-form';

// interface FormatedIndexInputFieldProps {
//     name: string;
//     control: any;
//     label: string;
//     error?: any;
//     placeholder?: string;
// }

// const FormatedIndexInputField: React.FC<FormatedIndexInputFieldProps> = ({
//     name,
//     control,
//     label,
//     error,
//     placeholder,
// }) => {
//     const currentYear = new Date().getFullYear().toString().slice(-2);
//     const [inputValue, setInputValue] = useState('');

//     const handleChange = (event) => {
//         const value = event.target.value;

//         // Allow only letters and numbers, limit to 6 characters before the year
//         if (/^[a-zA-Z0-9]*$/.test(value) && value.length <= 6) {
//             setInputValue(value);
//         } else if (value.length < 7) {
//             setInputValue(value);
//         }
//     };

//     return (
//         <div>
//             <label htmlFor={name}>{label}</label>
//             <Controller
//                 name={name}
//                 control={control}
//                 render={({ field }) => (
//                     <div
//                         className={`w-full border-[1px] flex border-borderColor/10 bg-grayColorLight/50 border-solid rounded-lg px-2 py-1 focus:border-primaryColor focus:outline-primaryColor`}

//                     >
//                         <input
//                             {...field}
//                             type="text"
//                             id={name}
//                             className="focus:outline-none bg-grayColorLight/50  w-[50px]"
//                             // value={inputValue + (inputValue ? `/${currentYear}` : '')}
//                             value={inputValue}

//                             onChange={(e) => {
//                                 handleChange(e);
//                                 field.onChange(inputValue); // Update form value in react-hook-form
//                             }}
//                             placeholder={placeholder}
//                         />
//                         {inputValue &&
//                             <p>/{currentYear}</p>

//                         }
//                     </div>

//                 )}
//             />
//             {error && <p style={{ color: 'red' }}>{error.message}</p>}
//         </div>
//     );
// };

// export default FormatedIndexInputField;
import React, { useState, forwardRef, useEffect } from 'react';

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
    year
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

    const [currentYear, setCurrentYear] = useState();
    const [inputValue, setInputValue] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        if (/^[a-zA-Z0-9]*$/.test(value) && value.length <= 6) {
            setInputValue(value);
            if (register) {
                register(name).onChange(value); // Update value in react-hook-form
            }
            if (onChange) {
                onChange(value); // Notify parent of the change
            }
        }
    };

    useEffect(() => {
        console.log("oltIndexValue", oltIndexValue)
        if (oltIndexValue) {
            const newIndex = oltIndexValue.split('/')[0];
            const year = oltIndexValue.split('/')[1];
            setCurrentYear(year);
            setInputValue(newIndex);
        } else {
            setCurrentYear("");
            setInputValue("");
        }
    }, [oltIndexValue]);
    useEffect(() => {
        setCurrentYear(new Date().getFullYear().toString().slice(-2))
    }, []);

    console.log(currentYear)
    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <div className={`w-full border-[1px] flex border-borderColor/10 bg-grayColorLight/50 border-solid rounded-lg px-2 py-1 focus:border-primaryColor focus:outline-primaryColor`}>
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
                    onKeyDown={onKeyDown}
                    defaultValue={defaultValue}
                />
                {inputValue && <p>/{year}</p>}
            </div>
            {error && <p style={{ color: 'red' }}>{error.message}</p>}
        </div>
    );
});

export default FormatedIndexInputField;
