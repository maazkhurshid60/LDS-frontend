// import React, { useState } from "react";

// interface TableWithoutActionProps {
//     headers: string[];
//     tableData: any; // Assuming all rows have a similar structure
//     getRowData?: (rowIndex: number) => void;
// }

// const TableWithoutAction: React.FC<TableWithoutActionProps> = ({ headers, tableData, getRowData }) => {
//     const [clickedRowIndex, setClickedRowIndex] = useState<number | null>(null);

//     // Function to filter out unnecessary keys and their values from rowData
//     const filterOutIdKeys = (rowData: Record<string, any>): Record<string, any> => {
//         const filteredData: Record<string, any> = {};
//         Object.keys(rowData).forEach((key) => {
//             if (
//                 key !== "_id" &&
//                 key !== "createdAt" &&
//                 key !== "updatedAt" &&
//                 key !== "__v" &&
//                 key !== "roles" &&
//                 key !== "isActive" &&
//                 key !== "mailingAddresses" &&
//                 key !== "noOfAddLMailings"
//             ) {
//                 const value = rowData[key];
//                 if (typeof value === 'object' && value !== null) {
//                     // Check for specific nested objects and extract the required fields
//                     if (key === 'clientId' && value.code) {
//                         filteredData[key] = value.code;
//                     } else if (key === 'lTServiceType' && value.name) {
//                         filteredData[key] = value.name;
//                     } else if (key === 'lastUpdatedBy' && value.userName) {
//                         filteredData[key] = value.userName;
//                     } else if (key === 'serviceFormCreatedBy' && value.userName) {
//                         filteredData[key] = value.userName;
//                     } else if (key === 'serviceType' && value.serviceTypeCode) {
//                         filteredData[key] = value.serviceTypeCode;
//                     } else if (key === 'standardServiceType' && value.name) {
//                         filteredData[key] = value.name;
//                     } else {
//                         // Handle other nested objects if necessary
//                         filteredData[key] = JSON.stringify(value); // or another appropriate value
//                     }
//                 } else {
//                     filteredData[key] = value;
//                 }
//             }
//         });
//         return filteredData;
//     };

//     const handleRowClick = (rowData: string, rowIndex: number) => {
//         setClickedRowIndex(rowIndex);
//         if (getRowData) {
//             getRowData(rowData, rowIndex);
//         }
//     };

//     return (
//         <div className="relative w-full overflow-x-auto rounded-lg mt-4 border-[1px] border-borderColor border-solid rounded-xl capitalize text-sm sm:text-base">
//             <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
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
//                     {tableData.map((rowData: any, rowIndex: number) => {
//                         const filteredData = filterOutIdKeys(rowData);
//                         return (
//                             <tr
//                                 key={rowIndex}
//                                 className={`cursor-pointer hover:bg-borderColor hover:text-blackColor ${
//                                     clickedRowIndex === rowIndex ? "bg-borderColor" : rowIndex % 2 === 0 ? "bg-XwhiteColor" : "bg-[#F1F5F8]"
//                                 } font-medium text-sm sm:text-base`}
//                                 onClick={() => handleRowClick(rowData?._id, rowIndex)}
//                             >
//                                 {Object.values(filteredData).map((value, colIndex) => (
//                                     <td key={colIndex} className="px-6 py-2 font-normal text-sm">
//                                         {console.log("Key-Value Pair", headers[colIndex], value)}
//                                         {value !== null && value !== undefined ? value : 'N/A'}
//                                     </td>
//                                 ))}
//                             </tr>
//                         );
//                     })}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default TableWithoutAction;




import React, { useState } from "react";

interface TableWithoutActionProps {
    headers: string[];
    tableData: any; // Assuming all rows have similar structure
    getRowData?: (rowIndex: number) => void;
}

const TableWithoutAction: React.FC<TableWithoutActionProps> = ({ headers, tableData, getRowData }) => {
    const [clickedRowIndex, setClickedRowIndex] = useState<number | null>(null);
console.log("tableData",tableData)
    // Function to filter out unnecessary keys from rowData
    // const filterOutIdKeys = (rowData: Record<string, any>): Record<string, any> => {
    //     const filteredData: Record<string, any> = {};
    //     Object.keys(rowData).forEach((key) => {
    //         if (key !== "_id" && key !== "createdAt" && key !== "updatedAt" && key !== "__v" && key !== "roles" && key !== "isActive" && key !== "mailingAddresses" && key !== "noOfAddLMailings" ) {
    //             filteredData[key] = rowData[key];
    //         }
    //     });
    //     return filteredData;
    // };

    const filterOutIdKeys = (rowData: Record<string, any>): Record<string, any> => {
        const filteredData: Record<string, any> = {};
        Object.keys(rowData).forEach((key) => {
            if (
                key !== "_id" &&
                key !== "createdAt" &&
                key !== "updatedAt" &&
                key !== "__v" &&
                key !== "roles" &&
                key !== "isActive" &&
                key !== "mailingAddresses" &&
                key !== "noOfAddLMailings"
            ) {
                const value = rowData[key];
                if (typeof value === 'object' && value !== null) {
                    // Check for specific nested objects and extract the required fields
                    if (key === 'clientId' && value.code) {
                        filteredData[key] = value.code;
                    } else if (key === 'lTServiceType' && value.name) {
                        filteredData[key] = value.name;
                    } else if (key === 'lastUpdatedBy' && value.userName) {
                        filteredData[key] = value.userName;
                    }else if (key === 'serviceFormCreatedBy' && value.userName) {
                        filteredData[key] = value.userName;
                    } else if (key === 'serviceType' && value.serviceTypeCode) {
                        filteredData[key] = value.serviceTypeCode;
                    }  else if (key === 'standardServiceType' && value.name) {
                        filteredData[key] = value.name;
                    } else {
                        // Handle other nested objects if necessary
                        filteredData[key] = JSON.stringify(value); // or another appropriate value
                    }
                } else {
                    filteredData[key] = value;
                }
            }
        });
        return filteredData;
    };
    

    const handleRowClick = (rowData:string,rowIndex: number) => {
        setClickedRowIndex(rowIndex);
        if (getRowData) {
            getRowData(rowData,rowIndex);
        }
    };
    console.log(tableData)

    return (
        <div className="relative w-full overflow-x-auto rounded-lg mt-4 border-[1px] border-borderColor border-solid rounded-xl capitalize text-sm sm:text-base">
            <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
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
                        const filteredData = filterOutIdKeys(rowData);
                        return (
                            <tr
                                key={rowIndex}
                                className={`cursor-pointer  hover:bg-borderColor hover:text-blackColor  ${clickedRowIndex === rowIndex ? "bg-borderColor" : rowIndex % 2 === 0 ? "bg-XwhiteColor" : "bg-[#F1F5F8]"} font-medium text-sm sm:text-base`}
                                onClick={() => handleRowClick(rowData?._id,rowIndex)}
                            >
                                {Object.values(filteredData).map((value, colIndex) => (
                                    <td key={colIndex} className="px-6 py-2 font-normal text-sm">                                        
                                      {/* {typeof value === 'string' && value.length > 4 ? `${value.slice(0, 4)}...` : value} */}
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
