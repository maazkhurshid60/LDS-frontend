import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import TableWithoutAction from "../../../components/Tables/TableWithoutAction";
import { emptySearchResultFormAddReducer, searchResultFormAddReducer, selectedSearchResultDataReducer } from "../../../redux/slice/resultForm";
const SearchResultData=()=>{
    const searchResultFormData=useSelector((state:RootState)=>state.resultForm.searchResultFormData)
    // console.log(searchResultFormData)
    const headersResult = [ "query Information LT Full Name","query Information LT IndexNo","query Information LT Address","query Information LT Business Name",
        "query Information LT Input Date","query Information Standard Serve To","query Information Standard Defendants","service Result Input Date","service Result Age",
        "service Result Client","service Result Date Of Mailing","Date Of Notary","Date Of Service","Result Door","Door Locks","Entry","First Attempt Date",
        "FirstTime Of Service","Floor","Hair","Height","JobNo","Lock","lT Not Served","lT Served","Other Description","Other Features","Recipient Title",
        "Results","Service Type","Second Attempt Date","Second Time Of Service","Server Id","Sex","Skin Color","Third Attempt Date","Third Time Of Service",
        "Wall","Weight"
    ];
    const dispatch=useDispatch()
    const getSelectedData=(data)=>{
// console.log(data)
const selectedData=searchResultFormData?.filter(formData=>formData?._id===data)

        dispatch(selectedSearchResultDataReducer(selectedData))
        dispatch(searchResultFormAddReducer(false))
        // dispatch(emptySearchResultFormAddReducer())
    }
    return <TableWithoutAction headers={headersResult} tableData={searchResultFormData} getRowData={getSelectedData}/>
}
export default SearchResultData