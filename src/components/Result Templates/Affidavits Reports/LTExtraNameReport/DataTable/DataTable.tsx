import React from "react";
const DataTable = () => {
    return <div>


        <div className="relative overflow-x-auto">
            <table className="w-full text-sm border-[2px] border-solid border-blackColor ">
                <thead className="text-xs  border-[2px] border-solid border-blackColor">
                    <tr>
                        <th scope="col" className="px-6 py-3 border-[1px] border-solid border-blackColor">
                            Case#/DOM
                        </th>
                        <th scope="col" className="px-6 py-3 border-[1px] border-solid border-blackColor">
                            Case Paper
                        </th>
                        <th scope="col" className="px-6 py-3 border-[1px] border-solid border-blackColor">
                            Index No
                        </th>
                        <th scope="col" className="px-6 py-3 border-[1px] border-solid border-blackColor">
                            Adress
                        </th>
                        <th scope="col" className="px-6 py-3 border-[1px] border-solid border-blackColor">
                            APT
                        </th>
                        <th scope="col" className="px-6 py-3 border-[1px] border-solid border-blackColor">
                            LT Names
                        </th>
                        <th scope="col" className="px-6 py-3 border-[1px] border-solid border-blackColor">
                            LT Extra Names
                        </th>
                        <th scope="col" className="px-6 py-3 border-[1px] border-solid border-blackColor">
                            Add
                        </th>
                        <th scope="col" className="px-6 py-3 border-[1px] border-solid border-blackColor">
                            Xtr
                        </th>
                        <th scope="col" className="px-6 py-3 border-[1px] border-solid border-blackColor">
                            RRR
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-[2px] border-solid border-blackColor">
                        <th scope="row" className="px-6 py-4 border-[1px] border-solid border-blackColor text-gray-900 whitespace-nowrap dark:text-white">
                            SG54555
                        </th>
                        <td className="px-6 py-4 border-[1px] border-solid border-blackColor">
                            Dispo/HO
                        </td>
                        <td className="px-6 py-4 border-[1px] border-solid border-blackColor">
                            331172/22
                        </td>
                        <td className="px-6 py-4 border-[1px] border-solid border-blackColor">
                            240 CROWN ST 
                        </td>
                        <td className="px-6 py-4 border-[1px] border-solid border-blackColor">
                            4N
                        </td>
                        <td className="px-6 py-4 border-[1px] border-solid border-blackColor">
                            Marie Bussereth
                        </td>
                        <td className="px-6 py-4 border-[1px] border-solid border-blackColor">
                            -
                        </td>
                        <td className="px-6 py-4 border-[1px] border-solid border-blackColor">
                            -
                        </td><td className="px-6 py-4 border-[1px] border-solid border-blackColor">
                            -
                        </td>

                    </tr>
                    
                </tbody>
            </table>
        </div>

    {/* SUMMARY STARTS */}
    <div className="flex items-center justify-between gap-x-8 font-bold text-base mt-8">
            <h1>Test Cases: 1</h1>
            <h1>Total Add Names: 0</h1>
            <h1>Total Add Extra Names: 0</h1>
            <h1>Total RRR Names: 0</h1>

    
    </div>
    {/* SUMMARY ENDS */}

    </div>
}

export default DataTable