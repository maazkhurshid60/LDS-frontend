import React, { useState } from 'react';
import { Controller } from 'react-hook-form';

interface FormatedIndexInputFieldProps {
    name: string;
    control: any;
    label: string;
    error?: any;
    placeholder?: string;
}

const FormatedIndexInputField: React.FC<FormatedIndexInputFieldProps> = ({
    name,
    control,
    label,
    error,
    placeholder,
}) => {
    const currentYear = new Date().getFullYear().toString().slice(-2);
    const [inputValue, setInputValue] = useState('');

    const handleChange = (event) => {
        const value = event.target.value;

        // Allow only letters and numbers, limit to 6 characters before the year
        if (/^[a-zA-Z0-9]*$/.test(value) && value.length <= 6) {
            setInputValue(value);
        } else if (value.length < 7) {
            setInputValue(value);
        }
    };

    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <input
                        {...field}
                        type="text"
                        id={name}
                        className="bg-primaryColor text-whiteColor"
                        // value={inputValue + (inputValue ? `/${currentYear}` : '')}
                        value={inputValue + `/${currentYear}`}

                        onChange={(e) => {
                            handleChange(e);
                            field.onChange(inputValue); // Update form value in react-hook-form
                        }}
                        placeholder={placeholder}
                    />
                )}
            />
            {error && <p style={{ color: 'red' }}>{error.message}</p>}
        </div>
    );
};

export default FormatedIndexInputField;
