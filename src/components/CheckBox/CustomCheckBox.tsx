
import React from "react";
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

const CustomCheckBox = <TFieldValues extends FieldValues>({
  register,
  name,
  label,
  checked,
  onChange,
  error,
  onKeyDown,
}: CheckBoxProps<TFieldValues>) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={name}
        {...register(name)}
        checked={checked}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className="hidden"
      />

      <div
        className={`h-4 w-4 rounded border-2 border-gray-300 flex justify-center items-center cursor-pointer ${checked ? "text-[#fff] bg-primaryColor" : "bg-[#fff]"
          }`}
        onClick={onChange}
      >
        {checked && (
          <svg
            className="h-3 w-3 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </div>
      <label
        htmlFor={name}
        className="text-sm sm:font-semibold capitalize ml-3 cursor-pointer"
        onClick={onChange}
      >
        {label}
      </label>
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default CustomCheckBox;
