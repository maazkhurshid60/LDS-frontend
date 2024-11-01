import React from "react";
export interface DataTableProps {

    testCaseLength?: string | number
    data?: any

}
const DataTable: React.FC<DataTableProps> = (item) => {
    // Calculate the total extra names count
    const totalExtraNamesCount = item?.data?.reduce((total, item) => {
        const extraNames = item?.serviceResultlTNotServed?.split(",") || [];
        return total + extraNames?.length;
    }, 0);
    const totalNamesCount = item?.data?.reduce((total, item) => {
        const extraNames = item?.serviceResultlTServed?.split(",") || [];
        return total + extraNames?.length;
    }, 0);
    return < div className="relative overflow-x-auto mt-4" >
        <table className="w-full text-sm border-[2px] border-solid border-blackColor">
            {/* Move the header outside the table */}
            <thead className="text-xs border-[2px] border-solid border-blackColor">
                <tr>
                    <th colSpan={10} className="text-center px-1 py-1 border-[1px] border-solid border-blackColor">
                        <div className="w-[500px] mx-auto items-center flex justify-center print-header">
                            <h1 className="font-bold flex items-center justify-center gap-x-2 text-xl uppercase">L&T Extra Names Report</h1>
                        </div>
                    </th>
                </tr>
                <tr>
                    <th scope="col" className="px-1 py-1 text-xs border-[1px] border-solid border-blackColor">Case#/DOM</th>
                    <th scope="col" className="px-1 py-1 text-xs border-[1px] border-solid border-blackColor">Case Paper</th>
                    <th scope="col" className="px-1 py-1 text-xs border-[1px] border-solid border-blackColor">Index No</th>
                    <th scope="col" className="px-1 py-1 text-xs border-[1px] border-solid border-blackColor">Address</th>
                    <th scope="col" className="px-1 py-1 text-xs border-[1px] border-solid border-blackColor">APT</th>
                    <th scope="col" className="px-1 py-1 text-xs border-[1px] border-solid border-blackColor">LT Names</th>
                    <th scope="col" className="px-1 py-1 text-xs border-[1px] border-solid border-blackColor">LT Extra Names</th>
                    <th scope="col" className="px-1 py-1 text-xs border-[1px] border-solid border-blackColor">Add</th>
                    <th scope="col" className="px-1 py-1 text-xs border-[1px] border-solid border-blackColor">Xtr</th>
                    <th scope="col" className="px-1 py-1 text-xs border-[1px] border-solid border-blackColor">RRR</th>
                </tr>
            </thead>
            <tbody>
                {item?.data?.map(data => (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-[2px] border-solid border-blackColor" key={data.caseNo}>
                        <th scope="row" className="px-3 py-3 text-xs border-[1px] border-solid border-blackColor text-gray-900 whitespace-nowrap dark:text-white">
                            {data?.caseNo ? data?.caseNo : "________"}
                        </th>
                        <td className="px-3 py-3 text-xs border-[1px] border-solid border-blackColor">Dispo/HO</td>
                        <td className="px-3 py-3 text-xs border-[1px] border-solid border-blackColor">
                            {data?.oLTIndexNo ? data?.oLTIndexNo : "________"}
                        </td>
                        <td className="px-3 py-3 text-xs border-[1px] border-solid border-blackColor">
                            {data?.lTSAddress ? data?.lTSAddress : "________"}
                        </td>
                        <td className="px-3 py-3 text-xs border-[1px] border-solid border-blackColor">
                            {data?.lTSApt ? data?.lTSApt : "________"}
                        </td>
                        <td className="px-3 py-3 text-xs border-[1px] border-solid border-blackColor">
                            {data?.serviceResultlTServed ? data?.serviceResultlTServed : "________"}
                        </td>
                        <td className="px-3 py-3 text-xs border-[1px] border-solid border-blackColor">
                            {data?.serviceResultlTNotServed ? data?.serviceResultlTNotServed : "________"}
                        </td>
                        <td className="px-3 py-3 text-xs border-[1px] border-solid border-blackColor">-</td>
                        <td className="px-3 py-3 text-xs border-[1px] border-solid border-blackColor">
                            {data?.serviceResultlTNotServed?.split(",")?.length > 0 ? data?.serviceResultlTNotServed?.split(",")?.length : "________"}
                        </td>
                        <td className="px-3 py-3 text-xs border-[1px] border-solid border-blackColor">-</td>
                    </tr>
                ))}
            </tbody>
        </table>

        {/* SUMMARY STARTS */}
        <div className="flex items-center justify-between gap-x-8 font-bold text-base mt-8">
            <h1>Test Cases: {item?.testCaseLength}</h1>
            <h1>Total Add Names:   {totalNamesCount}</h1>
            <h1>Total Add Extra Names: {totalExtraNamesCount}</h1>
            <h1>Total RRR Names: 0</h1>


        </div>
        {/* SUMMARY ENDS */}
    </div >

}

export default DataTable