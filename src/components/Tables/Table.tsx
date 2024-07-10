import React from "react";

interface Table2ColProps {
    headers: string[];
    tableData: Record<string, any>[]; // Assuming all rows have similar structure
    onClick?:(rowIndex:number)=>void 
}

const Table2Col: React.FC<Table2ColProps> = ({ headers, tableData,onClick }) => {
    return (
        <div className="relative w-full overflow-x-auto rounded-lg mt-4 border-[1px] border-borderColor border-solid rounded-xl capitalize text-sm sm:text-base">
            <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400 ">
                <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr className="bg-[#5D87B2] text-whiteColor">
                        {headers.map((header, index) => (
                            <th key={index} scope="col" className="px-6 py-3">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((rowData, rowIndex) => (
                        <tr key={rowIndex}  className={`cursor-pointer bg-white ${rowIndex % 2 === 0 ? "bg-XwhiteColor" : "bg-[#F1F5F8]"} font-medium text-sm sm:text-base`}
                        onClick={()=>onClick && onClick(rowIndex)}>
                            {Object.values(rowData).map((value, colIndex) => (
                                <td key={colIndex} className="px-6 py-2 font-normal text-sm " >
                                    {value}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table2Col;
