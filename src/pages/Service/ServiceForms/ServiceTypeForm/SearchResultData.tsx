import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import TableWithoutAction from "../../../../components/Tables/TableWithoutAction";
import { getIsSearchServiceForm, getSelectedSearchServicetData } from "../../../../redux/slice/serviceForm";
const SearchResultData = () => {
    const searchResultFormData = useSelector((state: RootState) => state.serviceForm.allSearchServiceFormData)
    const headersResult = ["Job No", "input Date", "client Id", "service Type",
        "case No", "caption", "lT Service Type", "LT Index No", "Other LT Description",
        "lTS First Name", "lTS Business Name", "lTS Zip", "lTS State", "lTS City", "lTS Apt", "lTS Address", "lTS Description"
    ];

    const searchResultFormTableData = searchResultFormData?.map(data => {
        return {
            _id: data?._id, jobNo: data?.jobNo, inputDate: data?.inputDate, clientid: data?.clientId?.code, serviceType: data?.serviceType?.serviceTypeCode,
            caseno: data?.caseNo, caption: data?.caption, ltServiceType: data?.lTServiceType?.name, lTIndexNo: data?.oLTIndexNo,
            oLTDescription: data?.oLTDescription, lTSFirstName: data?.lTSFirstName, lTSBusinessName: data?.lTSBusinessName,
            lTSZip: data?.lTSZip, lTSState: data?.lTSState, lTSCity: data?.lTSCity, lTSApt: data?.lTSApt, lTSAddress: data?.lTSAddress, lTSDescription: data?.lTSDescription
        }
    })
    const dispatch = useDispatch()
    const getSelectedData = (data) => {
        const selectedData = searchResultFormData?.filter(formData => formData?._id === data)
        dispatch(getSelectedSearchServicetData(selectedData))
        dispatch(getIsSearchServiceForm(false))

    }
    return <TableWithoutAction headers={headersResult} tableData={searchResultFormTableData} getRowData={getSelectedData} />
}
export default SearchResultData