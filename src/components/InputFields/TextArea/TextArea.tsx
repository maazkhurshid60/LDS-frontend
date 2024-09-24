import React from 'react';
import { FieldError } from 'react-hook-form';
export interface TextAreaProps {
    label?: string;
    name?: string;
    register?: any;
    error?: any;
    required?: boolean
    row?: string | number
}

const TextArea = ({ label, name, register, error, required, row = 4 }) => {
    return <div className="flex flex-col w-full items-start gap-1">
        <label className="sm:font-medium text-sm capitalize">{label} {required && <span className="text-redColor">*</span>}</label>
        <textarea rows={row} type="text" className="w-full border-[1px] border-borderColor/10 bg-grayColorLight/50 border-solid rounded-lg px-2  py-1
        focus:border-primaryColor focus:outline-primaryColor" {...register(name)} />
        {/* DISPLAY ERROR */}
        {error && <p className="text-xs text-redColor capitalize">{error?.message}</p>}
    </div>
}

export default TextArea