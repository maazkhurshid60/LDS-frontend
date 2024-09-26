
import React, { forwardRef, useRef } from "react";
import { FieldValues, UseFormRegister, Path } from "react-hook-form";

interface CheckBoxProps<TFieldValues extends FieldValues> {
  register: UseFormRegister<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  checked?: boolean;
  onChange?: () => void;
  error?: string;
  onKeyDown?: any;
}

const CustomCheckBox = forwardRef<HTMLInputElement, CheckBoxProps<any>>(({
  register,
  name,
  label,
  checked,
  onChange,
  error,
  onKeyDown,
}, ref) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={name}
        {...register(name)}
        checked={checked}
        onChange={onChange}
        onKeyDown={onKeyDown}
        ref={ref} // Attach the ref here
      />

      <label
        htmlFor={name}
        className="text-sm sm:font-semibold capitalize ml-3 cursor-pointer w-[250px]"
        onClick={onChange}
      >
        {label}
      </label>
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
});

export default CustomCheckBox;


