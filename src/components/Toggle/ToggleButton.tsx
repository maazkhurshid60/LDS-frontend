import React from 'react';

interface ToggleButtonProps {
    label: string;
    value: boolean;
    onChange: () => void; // Add an onChange prop for handling state changes
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ label, value, onChange }) => {
    return (
        <div className='m-auto'>
            <label className="inline-flex items-center cursor-pointer flex items-center w-full gap-x-3 ">
                <span className="capitalize font-medium text-sm md:text-lg opacity-[65%]">{label}</span>
                <input
                    type="checkbox"
                    checked={value} // Bind the checked state to `value`
                    onChange={onChange} // Call `onChange` when the toggle is clicked
                    className="sr-only peer"
                />
                <div className="relative w-9 h-4 bg-primaryColor peer-focus:ring-blue-300 
                dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full
                rtl:peer-checked:after:-translate-x-full peer-checked:after:border-accentBlue peer-checked:after:border-[2px] 
                peer-checked:after:border-solid after:content-[''] after:absolute after:top-[0px] after:start-[4px] 
                after:bg-whiteColor after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 
                after:transition-all after:duration-[500ms] dark:border-accentBlue peer-checked:bg-blue-600">
                </div>

                {/* <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div> */}

            </label>
        </div>
    );
};

export default ToggleButton;
