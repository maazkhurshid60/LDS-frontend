// import React, { forwardRef } from "react";
// import { FieldError, UseFormRegister } from "react-hook-form";

// export interface TextFieldProps {
//   label: string;
//   register?: UseFormRegister<any>;
//   error?: FieldError;
//   name: string;
//   placeholder?: string;
//   type?: string;
//   defaultValue?: string;
//   onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
//   required?: boolean;
//   // Add ref here
//   ref?: React.Ref<HTMLInputElement>;
// }

// const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
//   ({ label, register, error, name, placeholder, type = "text", defaultValue, onKeyDown, required = false }, ref) => {
//     return (
//       <div className="flex flex-col w-full items-start gap-1">
//         <label className="font-normal sm:font-medium text-sm capitalize">
//           {label} {required && <span className="text-redColor">*</span>}
//         </label>
//         <input
//           type={type}
//           className="w-full border-[1px] border-borderColor/10 bg-grayColorLight/50 border-solid rounded-lg px-2 py-1
//           focus:border-primaryColor focus:outline-primaryColor"
//           placeholder={placeholder}
//           {...register?.(name)}
//           defaultValue={defaultValue}
//           onKeyDown={onKeyDown}
//           ref={ref} // Attach ref here
//         />
//         {/* DISPLAY ERROR */}
//         {error && <p className="text-xs text-redColor capitalize">{error?.message}</p>}
//       </div>
//     );
//   }
// );

// TextField.displayName = 'TextField'; // Set displayName for debugging
// export default TextField;




// import React, { forwardRef } from "react";
// import { FieldError } from "react-hook-form";
// import "./textField.css"
// export interface TextFieldProps {
//     label: string
//     register?: any
//     error?: any
//     name: string
//     placeholder?: string
//     type?: string
//     defaultValue?: string
//     onKeyDown?: any
//     required?: boolean
//     readOnly?: boolean; // Add the readOnly prop here
//     ref?: any
// }



// const TextField: React.FC<TextFieldProps> = forwardRef<HTMLInputElement, any>(
//     ({ label, register, error, name, placeholder, type = "text", defaultValue, onKeyDown, required = false,
//         readOnly = false, }, ref) => {
//         return <div className="flex flex-col w-full items-start gap-1">
//             <label className=" font-normal sm:font-medium text-sm capitalize">{label} {required && <span className="text-redColor">*</span>}</label>
//             <input ref={ref} type={type} className="w-full border-[1px] border-borderColor/10 bg-grayColorLight/50 border-solid rounded-lg px-2  py-1
//         focus:border-primaryColor focus:outline-primaryColor" placeholder={placeholder} {...register(name)} defaultValue={defaultValue}
//                 onKeyDown={onKeyDown}
//                 readOnly={readOnly} // Apply readOnly here

//             />
//             {/* DISPLAY ERROR */}
//             {error && <p className="text-xs text-redColor capitalize">{error?.message}</p>}
//         </div>
//     })
// export default TextField


// import React, { forwardRef } from "react";

// export interface TextFieldProps {
//     label: string;
//     register?: any;
//     error?: any;
//     name: string;
//     placeholder?: string;
//     type?: string;
//     defaultValue?: string;
//     onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
//     required?: boolean;
//     readOnly?: boolean;
//     onChange?: any
//     ref?: any
//     id?: any
// }

// const TextField = forwardRef(function (props, ref) {
//     const { label, register, error, name, placeholder, type, id = "text", defaultValue, onChange, onKeyDown, required = false, readOnly = false }: any = props;
//     // console.log('CAPTION REF: ',  ref);

//     return (
//         <div className="flex flex-col w-full items-start gap-1">
//             <label className="font-normal sm:font-medium text-sm capitalize">
//                 {label} {required && <span className="text-redColor">*</span>}
//             </label>
//             <input
//                 ref={ref}
//                 id={id}

//                 type={type}
//                 className="w-full border-[1px] border-borderColor/10 bg-grayColorLight/50 border-solid rounded-lg px-2 py-1 focus:border-primaryColor focus:outline-primaryColor"
//                 placeholder={placeholder}
//                 {...register?.(name)}
//                 defaultValue={defaultValue}
//                 onKeyDown={onKeyDown}
//                 readOnly={readOnly}
//             // onChange={onChange}
//             />
//             {error && <p className="text-xs text-redColor capitalize">{error?.message}</p>}
//         </div>
//     );
// });

// export default TextField;


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
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
    const { label, register, error, name, placeholder, type = "text", defaultValue, onChange, onKeyDown, required = false, readOnly = false, id, shouldFocus } = props;
    console.log(ref)

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
                id={id} // Use the id prop here
                type={type}
                className={`w-full border-[1px] border-borderColor/10 bg-grayColorLight/50 border-solid rounded-lg px-2 py-1 focus:border-primaryColor focus:outline-primaryColor`}

                placeholder={placeholder}
                name={name}
                // {...register?.(name)             }
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
