// import React from "react";

// interface Table2ColProps {
//     headers: string[];
//     tableData: Record<string, any>[]; // Assuming all rows have similar structure
//     onClick?:(rowIndex:number)=>void 
// }

// const Table2Col: React.FC<Table2ColProps> = ({ headers, tableData,onClick }) => {
//     return (
//         <div className="relative w-full overflow-x-auto rounded-lg mt-4 border-[1px] border-borderColor border-solid rounded-xl capitalize text-sm sm:text-base">
//             <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400 ">
//                 <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//                     <tr className="bg-[#5D87B2] text-whiteColor">
//                         {headers.map((header, index) => (
//                             <th key={index} scope="col" className="px-6 py-3">
//                                 {header}
//                             </th>
//                         ))}
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {tableData.map((rowData, rowIndex) => (
//                         <tr key={rowIndex}  className={`cursor-pointer bg-white ${rowIndex % 2 === 0 ? "bg-XwhiteColor" : "bg-[#F1F5F8]"} font-medium text-sm sm:text-base`}
//                         onClick={()=>onClick && onClick(rowIndex)}>
//                             {Object.values(rowData).map((value, colIndex) => (
//                                 <td key={colIndex} className="px-6 py-2 font-normal text-sm " >
//                                     {value}
//                                 </td>
//                             ))}
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default Table2Col;

import React from "react";
import { DeleteIcon } from "../Icons/DeleteIcon";
import { EditIcon } from "../Icons/EditIcon";

interface TableWithoutActionProps {
    headers: string[];
    tableData: Record<string, any>[]; // Assuming all rows have similar structure
      getRowData?: (rowIndex: number) => void;
}

const TableWithoutAction: React.FC<TableWithoutActionProps> = ({ headers, tableData,getRowData }) => {
    // Function to filter out _id keys from rowData
    const filterOutIdKeys = (rowData: Record<string, any>): Record<string, any> => {
        const filteredData: Record<string, any> = {};
        Object.keys(rowData).forEach((key) => {
            if (key !== "_id" && key !== "createdAt" && key !== "updatedAt" && key !== "__v" && key !== "roles"  && key !== "isActive" ) {
                filteredData[key] = rowData[key];
            }
        });
        return filteredData;
    };

    const deleteData=(id:number)=>{
console.log(id)
    }

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
                    {tableData.map((rowData, rowIndex) => {
                        const filteredData = filterOutIdKeys(rowData); // Filter out _id key
                        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.",filteredData)
                        return (
                            <tr
                                key={rowIndex}
                                className={`cursor-pointer bg-white ${rowIndex % 2 === 0 ? "bg-XwhiteColor" : "bg-[#F1F5F8]"} font-medium text-sm sm:text-base`}
                               onClick={()=>getRowData && getRowData(rowIndex)}
                            >
                                {Object.values(filteredData).map((value, colIndex) => (
                                    <td key={colIndex} className="px-6 py-2 font-normal text-sm">
                                        {value}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default TableWithoutAction;

