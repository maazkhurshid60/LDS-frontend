import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import TableWithoutAction from "../../../../components/Tables/TableWithoutAction";
import { getIsSearchServiceForm, getSelectedSearchServicetData } from "../../../../redux/slice/serviceForm";
import Searchbar from "../../../../components/Searchbar/Searchbar";

const SearchResultData = () => {
    // State to store search query
    const [searchQuery, setSearchQuery] = useState("");

    // Get the data from the Redux store
    const searchResultFormData = useSelector((state: RootState) => state.serviceForm.allSearchServiceFormData);

    // Headers for the table
    const headersResult = [
        "Job No", "Input Date", "Client Id", "Server Id", "Service Type", "Case No", "Caption", "LT Service Type",
        "LT Index No", "Other LT Description", "LTS First Name", "LTS Business Name", "LTS Zip", "LTS State",
        "LTS City", "LTS Apt", "LTS Address", "LTS Description"
    ];

    // Filter the data based on the search query
    const filteredSearchResultFormData = searchResultFormData?.filter(data => {
        const searchLower = searchQuery.toLowerCase();
        return (
            data?.jobNo?.toString().toLowerCase().includes(searchLower) ||
            data?.inputDate?.toLowerCase().includes(searchLower) ||
            data?.clientId?.code?.toLowerCase().includes(searchLower) ||
            data?.serviceType?.serviceTypeCode?.toLowerCase().includes(searchLower) ||
            data?.caseNo?.toString().toLowerCase().includes(searchLower) ||
            data?.caption?.toLowerCase().includes(searchLower) ||
            data?.lTServiceType?.name?.toLowerCase().includes(searchLower) ||
            data?.oLTIndexNo?.toString().toLowerCase().includes(searchLower) ||
            data?.oLTDescription?.toLowerCase().includes(searchLower) ||
            data?.lTSFirstName?.toLowerCase().includes(searchLower) ||
            data?.lTSBusinessName?.toLowerCase().includes(searchLower) ||
            data?.lTSZip?.toString().toLowerCase().includes(searchLower) ||
            data?.lTSState?.toLowerCase().includes(searchLower) ||
            data?.lTSCity?.toLowerCase().includes(searchLower) ||
            data?.lTSApt?.toLowerCase().includes(searchLower) ||
            data?.lTSAddress?.toLowerCase().includes(searchLower) ||
            data?.lTSDescription?.toLowerCase().includes(searchLower)
        );
    });

    // Map the filtered data into a new array for the table
    const searchResultFormTableData = filteredSearchResultFormData?.map(data => {
        return {
            _id: data?._id,
            jobNo: data?.jobNo,
            inputDate: data?.inputDate,
            clientid: data?.clientId?.code,
            serviceResultServerId: data?.serviceResultServerId?.serverCode,
            serviceType: data?.serviceType?.serviceTypeCode,
            caseno: data?.caseNo,
            caption: data?.caption,
            ltServiceType: data?.lTServiceType?.name,
            lTIndexNo: data?.oLTIndexNo,
            oLTDescription: data?.oLTDescription,
            lTSFirstName: data?.lTSFirstName,
            lTSBusinessName: data?.lTSBusinessName,
            lTSZip: data?.lTSZip,
            lTSState: data?.lTSState,
            lTSCity: data?.lTSCity,
            lTSApt: data?.lTSApt,
            lTSAddress: data?.lTSAddress,
            lTSDescription: data?.lTSDescription

        };
    });

    // Dispatch to get selected data
    const dispatch = useDispatch();
    const getSelectedData = (data) => {
        const selectedData = searchResultFormData?.filter(formData => formData?._id === data);
        dispatch(getSelectedSearchServicetData(selectedData));
        dispatch(getIsSearchServiceForm(false));
    };

    // Handle search input change
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <div>
            {/* Search input */}
            {/* <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
                style={{ marginBottom: "20px", padding: "8px", width: "100%" }}
            /> */}
            <div className="mt-4 flex flex-col  gap-4
                            sm:flex-row sm:items-center">
                <Searchbar value={searchQuery} onChange={handleSearchChange} />
            </div>

            {/* Table */}
            <TableWithoutAction
                headers={headersResult}
                tableData={searchResultFormTableData}
                getRowData={getSelectedData}
            />
        </div>
    );
};

export default SearchResultData;


// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../../../redux/store";
// import TableWithoutAction from "../../../../components/Tables/TableWithoutAction";
// import { getIsSearchServiceForm, getSelectedSearchServicetData } from "../../../../redux/slice/serviceForm";
// const SearchResultData = () => {
//     const searchResultFormData = useSelector((state: RootState) => state.serviceForm.allSearchServiceFormData)
//     const headersResult = ["Job No", "input Date", "client Id", "service Type",
//         "case No", "caption", "lT Service Type", "LT Index No", "Other LT Description",
//         "lTS First Name", "lTS Business Name", "lTS Zip", "lTS State", "lTS City", "lTS Apt", "lTS Address", "lTS Description"
//     ];

//     const searchResultFormTableData = searchResultFormData?.map(data => {
//         return {
//             _id: data?._id, jobNo: data?.jobNo, inputDate: data?.inputDate, clientid: data?.clientId?.code, serviceType: data?.serviceType?.serviceTypeCode,
//             caseno: data?.caseNo, caption: data?.caption, ltServiceType: data?.lTServiceType?.name, lTIndexNo: data?.oLTIndexNo,
//             oLTDescription: data?.oLTDescription, lTSFirstName: data?.lTSFirstName, lTSBusinessName: data?.lTSBusinessName,
//             lTSZip: data?.lTSZip, lTSState: data?.lTSState, lTSCity: data?.lTSCity, lTSApt: data?.lTSApt, lTSAddress: data?.lTSAddress, lTSDescription: data?.lTSDescription
//         }
//     })
//     const dispatch = useDispatch()
//     const getSelectedData = (data) => {
//         const selectedData = searchResultFormData?.filter(formData => formData?._id === data)
//         dispatch(getSelectedSearchServicetData(selectedData))
//         dispatch(getIsSearchServiceForm(false))

//     }
//     return <TableWithoutAction headers={headersResult} tableData={searchResultFormTableData} getRowData={getSelectedData} />
// }
// export default SearchResultData
