// import React from "react"
// import { FieldValues, UseFormRegister, Path } from "react-hook-form"

// interface CheckBox<TFieldValues extends FieldValues> {
//   register: UseFormRegister<TFieldValues>
//   name: Path<TFieldValues>
//   label: string
//   error?: string
// }

// const CustomCheckBox = <TFieldValues extends FieldValues>({
//   register,
//   name,
//   label,
//   error,
// }: CheckBox<TFieldValues>) => {
//   return (
//     <div>
//       <input type="checkbox" id={name} {...register(name)} />
//       <label htmlFor={name} className="text-sm sm:font-semibold capitalize ml-3">{label}</label>
//       {error && <p className="text-redColor text-xs">{error}</p>}
//     </div>
//   )
// }

// export default CustomCheckBox

import React, { useState } from "react";
import { FieldValues, UseFormRegister, Path } from "react-hook-form";

interface CheckBoxProps<TFieldValues extends FieldValues> {
  register: UseFormRegister<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  checked: boolean;
  onChange: () => void;
  error?: string;
  onKeyDown?:any
}

const CustomCheckBox = <TFieldValues extends FieldValues>({
  register,
  name,
  label,
  checked,
  onChange,
  error,
  onKeyDown
}: CheckBoxProps<TFieldValues>) => {
  return (
    <div>
      <input
        type="checkbox"
        id={name}
        {...register(name)}
        checked={checked}
        onChange={onChange}
        onKeyDown={onKeyDown} 
      />
      <label
        htmlFor={name}
        className="text-sm sm:font-semibold capitalize ml-3"
      >
        {label}
      </label>
      {error && <p className="text-redColor text-xs">{error}</p>}
    </div>
  );
};
export default CustomCheckBox