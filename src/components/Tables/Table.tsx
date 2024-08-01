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

interface Table2ColProps {
    headers: string[];
    tableData: Record<string, any>[]; // Assuming all rows have similar structure
    onClick?: (rowIndex: string) => void;
    getRowData?: (rowIndex: number) => void;
    onUpdateClick?: (rowIndex: string) => void;
}

const Table2Col: React.FC<Table2ColProps> = ({ headers, tableData, onClick,getRowData,onUpdateClick }) => {
    // Function to filter out _id keys from rowData
    const filterOutIdKeys = (rowData: Record<string, any>): Record<string, any> => {
        const filteredData: Record<string, any> = {};
        Object.keys(rowData).forEach((key) => {
            if (key !== "_id" && key !== "createdAt" && key !== "updatedAt" && key !== "__v" && key !== "roles" && key !== "isActive" 
                && key !== "fax"
            && key !== "zip"
         
            ) {
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
                            <th key={index} scope="col" className="px-2 py-3">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((rowData, rowIndex) => {
                        const filteredData = filterOutIdKeys(rowData); // Filter out _id key
                        return (
                            <tr
                                key={rowIndex}
                                className={`cursor-pointer bg-white ${rowIndex % 2 === 0 ? "bg-XwhiteColor" : "bg-[#F1F5F8]"} font-medium text-sm sm:text-base`}
                               onClick={()=>getRowData && getRowData(rowIndex)}
                            >
                                {Object.values(filteredData).map((value, colIndex) => (
                                    <td key={colIndex} className="px-6 py-2 font-normal text-sm">
                                        {typeof value === "string" && value.length > 10 ? `${value.slice(0, 15)}...` : value}
                                        </td>
                                ))}
  <td key={rowIndex} className="px-6 py-2 font-normal text-sm flex flex-row gap-x-4 items-center justify-center">
                                       <DeleteIcon  onClick={() => onClick && onClick(rowData?._id)}/>
                                       <EditIcon  onClick={() => onUpdateClick && onUpdateClick(rowData?._id)}/>

                                    </td>

                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Table2Col;

