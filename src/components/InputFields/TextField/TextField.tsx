


import React, { forwardRef, useEffect } from "react";
import { toast } from "react-toastify";

export interface TextFieldProps {
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
    onChange?: any;
    id?: string; // Add id to props
    shouldFocus?: boolean;
    maxLength?: any
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
    const { label, register, error, name, placeholder, maxLength, type = "text", defaultValue, onChange, onKeyDown, required = false, readOnly = false, id, shouldFocus } = props;

    return (
        <div className="flex flex-col w-full items-start gap-1">
            <label className="font-normal sm:font-medium text-sm capitalize">
                {label} {required && <span className="text-redColor">*</span>}
            </label>
            <input
                ref={(e) => {
                    if (register) {
                        register(name).ref(e); // Register the input with React Hook Form
                    }
                    if (typeof ref === 'function') {
                        ref(e); // Call the forwarded ref if it's a function
                    } else if (ref) {
                        ref.current = e; // Assign to the current ref if it's an object
                    }
                }}
                maxLength={maxLength}
                id={id} // Use the id prop here
                type={type}
                className={`w-full border-[1px] border-borderColor/10 bg-grayColorLight/50 border-solid rounded-lg px-2 py-1 focus:border-primaryColor focus:outline-primaryColor`}

                placeholder={placeholder}
                name={name}
                {...register?.(name, { onChange })}
                defaultValue={defaultValue}
                onKeyDown={onKeyDown}
                readOnly={readOnly}
            />
            {error && <p className="text-xs text-redColor capitalize">{error?.message}</p>}
        </div>
    );
});

export default TextField;
