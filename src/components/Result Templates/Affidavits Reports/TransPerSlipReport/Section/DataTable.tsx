import React from "react";
export interface DataTableProps{
    sex?: string;
    skinColor?: string;
    age?: string | number;
    height?: string | number
    weight?: string | number
    hair?: string
    entry?: string | boolean | number
    wall?: string | number
    floor?: string | number
    door?: string | number
    locks?: string | number
    noOfLocks?: string | number
    commentOtherFeature?:string | number | boolean
}
const DataTable:React.FC<DataTableProps> = (item) => {
    return <div>


        <div className="relative overflow-x-auto">
            <table className="w-full text-sm  ">
                <thead className="bg-grayColor text-whiteColor  ">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Person Seen                        </th>
                        <th scope="col" className="px-6 py-3">
                            Conspicuous
                        </th>
                       
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-grayColorLight text-start">
                        <th scope="row" className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                           <p>Sex: <span className="font-semibold">{item?.sex ? item?.sex:"______________________________"}</span></p>
                           <p>Skin: <span className="font-semibold">{item?.skinColor ? item?.skinColor:"______________________________"}</span></p>
                           <p>Hair: <span className="font-semibold">{item?.hair ? item?.hair:"______________________________"}</span></p>
                           <p>Age: <span className="font-semibold">{item?.age ? item?.age:"______________________________"}</span></p>
                           <p>Height: <span className="font-semibold">{item?.height ? item?.height:"______________________________"}</span></p>
                           <p>Weight: <span className="font-semibold">{item?.weight ? item?.weight:"______________________________"}</span></p>
                        </th>
                        <th scope="row" className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                           <p>Entry: <span className="font-semibold">{item?.entry ? item?.entry:"______________________________"}</span></p>
                           <p>Wall: <span className="font-semibold">{item?.wall ? item?.wall:"______________________________"}</span></p>
                           <p>Floor: <span className="font-semibold">{item?.floor ? item?.floor:"______________________________"}</span></p>
                           <p>Door: <span className="font-semibold">{item?.door ? item?.door:"______________________________"}</span></p>
                           <p>Locks: <span className="font-semibold">{item?.locks ? item?.locks:"______________________________"}</span></p>
                           <p>No of Locks: <span className="font-semibold">{item?.noOfLocks ? item?.noOfLocks:"______________________________"}</span></p>
                        </th>
                       
                    </tr>

                </tbody>
            </table>
        </div>
    </div>
}

export default DataTable