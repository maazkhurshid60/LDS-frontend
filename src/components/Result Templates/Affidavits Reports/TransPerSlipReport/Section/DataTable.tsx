import React from "react";
const DataTable = () => {
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
                           <p>Sex: FROM_BACKEND_API</p>
                           <p>Skin: FROM_BACKEND_API</p>
                           <p>Hair: FROM_BACKEND_API</p>
                           <p>Age: FROM_BACKEND_API</p>
                           <p>Height: FROM_BACKEND_API</p>
                           <p>Weight: FROM_BACKEND_API</p>
                        </th>
                        <th scope="row" className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                           <p>Entry: FROM_BACKEND_API</p>
                           <p>Wall: FROM_BACKEND_API</p>
                           <p>Floor: FROM_BACKEND_API</p>
                           <p>Door: FROM_BACKEND_API</p>
                           <p>Locks: FROM_BACKEND_API</p>
                           <p>No of Locks: FROM_BACKEND_API</p>
                        </th>
                       
                    </tr>

                </tbody>
            </table>
        </div>
    </div>
}

export default DataTable