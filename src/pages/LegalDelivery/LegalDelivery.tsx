import React, { useEffect, useRef, useState } from "react";
import OutletLayout from "../../components/OutletLayout/OutletLayout";
import OutletLayoutHeader from "../../components/OutletLayout/OutLayoutHeader";
import Searchbar from "../../components/Searchbar/Searchbar";
import Filter from "../../components/Filter/Filter";
import Table from "../../components/Tables/Table";
import {  headersResult, headersService, headersStandard, tableData } from "../../constdata/LegalDeliveryData";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import Pagination from "../../components/Pagination/Pagination";
import FilterMenu from "./FilterSection/FilterMenu/FilterMenu";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { emptyLegalDeliveryReducer, getSingleLegalDeliveryReducer } from "../../redux/slice/legalDelivery";
import TableWithoutAction from "../../components/Tables/TableWithoutAction";
import { RootState } from "../../redux/store";
import { usePaginationCalc } from "../../hooks/paginationCalc/usePaginationCalc";
const LegalDelivery = () => {
    const [showFilterMenu, setShowFilterMenu] = useState(false)
    const [showDropDown, setShowDropDown] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch()
    const filteredData = useSelector((state: RootState) => state?.legalDelivery?.legalDeliveryData)
    const searchDataName = useSelector((state: RootState) => state?.legalDelivery?.selectedLegalDeliveryData?.searchResult)

    const { totalPages, currentPage, currentTableData, dataLimit, onPageChange, checkLastRecord } = usePaginationCalc({ tableData: filteredData?.length > 0 && filteredData || [] })
    // const agencyLicRef = useRef<HTMLButtonElement | null>(null);
    // const LiNonReportsRef = useRef<HTMLButtonElement | null>(null);
    // const ltExtraNameReportRef = useRef<HTMLButtonElement | null>(null);
    // const MarshalReportRef = useRef<HTMLButtonElement | null>(null);
    // const nonMilRef = useRef<HTMLButtonElement | null>(null);
    // const standardRef = useRef<HTMLButtonElement | null>(null);
    // const transPerSlipRef = useRef<HTMLButtonElement | null>(null);
    // const agencyLicPrintRef = useRef<HTMLDivElement | null>(null);
    // const LiNonReportsPrintRef = useRef<HTMLButtonElement | null>(null);
    // const ltExtraNameReportPrintRef = useRef<HTMLButtonElement | null>(null);
    // const MarshalReportPrintRef = useRef<HTMLButtonElement | null>(null);
    // const nonMilPrintRef = useRef<HTMLButtonElement | null>(null);
    // const standardPrintRef = useRef<HTMLButtonElement | null>(null);
    // const transPerSlipPrintRef = useRef<HTMLButtonElement | null>(null);

    const handlePrint = () => {

        setShowDropDown(false);
        //     if (reportName === "agencyLicense") {
        //         agencyLicRef?.current?.click();
        //          setShowDropDown(false);
        //     }
        //     else if (reportName === "liNonReports") {
        //         LiNonReportsRef?.current.click()
        //         setShowDropDown(false);
        //     }
        //     else if (reportName === "lTExtraNameReports") {
        //         ltExtraNameReportRef?.current.click()
        //         setShowDropDown(false);
        //     }
        //     else if (reportName === "marshalReports") {
        //         MarshalReportRef?.current.click()
        //         setShowDropDown(false);
        //     }
        //     else if (reportName === "nonMilReports") {
        //         nonMilRef?.current.click()
        //         setShowDropDown(false);
        //     }
        //     else if (reportName === "standardReports") {
        //         standardRef?.current.click()
        //         setShowDropDown(false);
        //     }
        //     else if (reportName === "transPerSlipReports") {
        //         transPerSlipRef?.current.click()
        //         setShowDropDown(false);
        //     }
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setShowDropDown(false);
        }
    };
    const getUserIdFunction = (userId: string, index) => {
        const selectedData = filteredData?.find((data, id) => data?._id === userId)
        console.log(selectedData)
        dispatch(getSingleLegalDeliveryReducer(selectedData))
    }
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [])

    // useEffect(() => {
    //     dispatch(getSingleLegalDeliveryReducer(tableData?.tableData[0]))

    // }, [])
console.log("filteredData",filteredData)
const serviceTableHeader=["Job","Client Code","Input Date","Server Code","Full Name","Case Paper Type","Bussiness Name","Address","Caption","City","Zip","Serv City","Case No"]
const serviceDataTable =filteredData && filteredData?.map(item => ({
    _id:item?._id,
    jobNo: item?.jobNo,
    clientCode: item?.clientId?.code,
    inputDate: item?.inputDate,
    serverCode: item?.resultFormId?.serviceResultServerId?.serverCode,
    fullName: item?.lTSFirstName,
    casePaperType: "",  // Static value
    bussinessName: item?.lTSBusinessName,
    address: item?.lTSAddress,
    caption: item?.caption,
    city: item?.lTSCity,
    zip: item?.lTSZip,
    servCity: item?.cityServe,
    caseNo: item?.caseNo
  }));
  const resultDataTable=filteredData && filteredData?.map(item => ({
    _id:item?._id,
    jobNo:item?.serviceFormId?.jobNo,
    clientCode: item?.serviceResultClientId?.code,
    inputDate: item?.queryInformationLTInputDate,
    serverCode: item?.serviceResultServerId?.serverCode,
    fullName: item?.serviceFormId?.lTSFirstName,
    casePaperType: "",  // Static value
    bussinessName: item?.queryInformationLTBusinessName ,
    address: item?.queryInformationLTAddress,
    caption: item?.serviceFormId?.caption,
    city: item?.serviceFormId?.lTSCity,
    zip: item?.serviceFormId?.lTSZip,
    servCity: item?.serviceFormId?.cityServe,
    caseNo: item?.serviceFormId?.caseNo
  }));
  

    return <div className="w-[95%] m-auto">
        {/* <GPSReport/> */}
        <div className="relative bg-whiteColor ">
            {/* <div className={`absolute -top-4 sm:-top-6 md:-top-24  flex items-start transition-all duration-500 z-50  ${showFilterMenu ? "-right-5 xl:-right-[52px]" : "-right-5 xl:-right-[52px]"}`} > */}
            <div className={`fixed top-[65px] md:top-[20px]   flex items-start transition-all duration-500 z-50 rounded-tl-full rounded-bl-full  ${showFilterMenu ? "-right-2 lg:-right-0" : "-right-0 lg:right-[0px]"}`} >
                {/* SUB FILTER SHOW BUTTON STARTS*/}
                <div className="rounded-tl-full rounded-bl-full border-r-whiteColor absolute -left-[39px] p-1  border-[1px] border-borderColor border-solid bg-whiteColor
                                 w-[40px]  cursor-pointer">
                    <IoIosArrowDropleftCircle className={`text-primaryColor transition-all duration-500 ${showFilterMenu ? "rotate-[180deg]" : "rotate-[0deg]"}`} size={30} onClick={() => setShowFilterMenu(!showFilterMenu)} />
                </div>
                {/* SUB FILTER SHOW BUTTON ENDS*/}
                <div className={`p-4 border-[1px] border-borderColor border-solid  w-[275px] sm:w-[300px] bg-whiteColor ${showFilterMenu ? "inline-block" : "hidden opacity-0"}`}><FilterMenu /></div>
            </div>
        </div>
        <OutletLayout>
            <OutletLayoutHeader heading="Legal Delivery">
            </OutletLayoutHeader>
            {/* <div className="mt-4 flex flex-col  gap-4
            sm:flex-row sm:items-center">
                <Searchbar />
                <Filter onClick={() => setShowFilterMenu(!showFilterMenu)} />
            </div> */}
            {filteredData?.length > 0 &&
            <div className="flex flex-wrap items-center gap-x-8 justify-start font-medium text-sm mt-4 capitalize">
                <div ref={dropdownRef}>
                    <div className="flex flex-row items-center gap-x-1">

                        <p className="cursor-pointer" onClick={() => setShowDropDown(!showDropDown)}>Affidavits Reports

                        </p>
                        <IoIosArrowDown
                            size={12}
                            className={`${showDropDown ? "rotate-[180deg]" : "rotate-[0deg]"}`}
                        />
                    </div>
                    {showDropDown &&
                        <div className="absolute bg-whiteColor rounded-md border-solid border-[1px] border-borderColor mt-2 font-normal text-xs flex flex-col gap-y-1  p-2 z-50">
                            <Link to="/operations/legal-delivery/agency-license" target="_blank" className="cursor-pointer" onClick={handlePrint}  >Agency License</Link>
                            <Link to="/operations/legal-delivery/li-non-reports" target="_blank" className="cursor-pointer" onClick={handlePrint}  >Li Non Reports</Link>
                            <Link to="/operations/legal-delivery/lT-extra-name-reports" target="_blank" className="cursor-pointer" onClick={handlePrint} >L&T Extra Name Reports</Link>
                            <Link to="/operations/legal-delivery/marshal-reports" target="_blank" className="cursor-pointer" onClick={handlePrint} >Marshal Reports</Link>
                            <Link to="/operations/legal-delivery/non-mil-reports" target="_blank" className="cursor-pointer" onClick={handlePrint}  >Non Mil Reports</Link>
                            <Link to="/operations/legal-delivery/standard-reports" target="_blank" className="cursor-pointer" onClick={handlePrint}  >Standard Reports</Link>
                            <Link to="/operations/legal-delivery/trans-per-slip-reports" target="_blank" className="cursor-pointer" onClick={handlePrint} >Trans Per Slip Reports</Link>
                        </div>
                    }
                </div>
                <Link to="/operations/legal-delivery/gps-report" target="_blank" className="cursor-pointer"  >GPS Report</Link>

                <p className="cursor-pointer" onClick={()=>dispatch(emptyLegalDeliveryReducer())}>clear filter</p>
                {/* <p className="cursor-pointer">Column Layout</p>
                <p className="cursor-pointer">Enable Actions</p>
                <p className="cursor-pointer">Generate Geo Code</p>
                <p className="cursor-pointer">Sort Records</p> */}
            </div>}
            {/* <Table headers={headers} tableData={currentTableData} getRowData={getUserIdFunction} /> */}
            {filteredData?.length > 0 ?
                <>
                    <TableWithoutAction
                        headers={
                            searchDataName === "result"
                                ? serviceTableHeader
                                : searchDataName === "standard"
                                    ? serviceTableHeader
                                    : serviceTableHeader
                        }
                        // tableData={serviceDataTable}
                        tableData={  searchDataName === "result"
                            ? resultDataTable
                            : searchDataName === "standard"
                                ? serviceDataTable
                                : serviceDataTable}
                        getRowData={getUserIdFunction}
                    />                    
                    
                    <Pagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        dataLimit={dataLimit}
                        tableData={tableData?.tableData}
                        onchange={onPageChange} // Pass onPageChange as onchange prop

                    />
                </> : <div className="h-[57vh] w-[100%] flex items-center justify-center ">
                    <div className="">
                        <p className="text-sm capitalize">No data to show. <span className=" cursor-pointer underline text-primaryColor font-semibold" onClick={() => setShowFilterMenu(!showFilterMenu)}> FILTER DATA</span></p>
                    </div>
                </div>
            }

            {/* <StandardReport/> */}


        </OutletLayout>
        {/* PDF TEMPLATES STARTS */}
        {/* <div style={{ display: "none" }}>
            <ReactToPrint
                trigger={() => <button ref={agencyLicRef}>Hidden Print Button</button>}
                content={() => agencyLicPrintRef.current}
            />
            <AgencyLic ref={agencyLicPrintRef} />
        </div>
        <div style={{ display: "none" }}>
            <ReactToPrint
                trigger={() => <button ref={LiNonReportsRef}>Hidden Print Button</button>}
                content={() => LiNonReportsPrintRef.current}
            />
            <LiNonReports ref={LiNonReportsPrintRef} />
        </div>
        <div style={{ display: "none" }}>
            <ReactToPrint
                trigger={() => <button ref={ltExtraNameReportRef}>Hidden Print Button</button>}
                content={() => ltExtraNameReportPrintRef.current}
            />
            <LTExtraNameReport ref={ltExtraNameReportPrintRef} />
        </div>
        <div style={{ display: "none" }}>
            <ReactToPrint
                trigger={() => <button ref={MarshalReportRef}>Hidden Print Button</button>}
                content={() => MarshalReportPrintRef.current}
            />
            <MarshalReport ref={MarshalReportPrintRef} />
        </div>
        <div style={{ display: "none" }}>
            <ReactToPrint
                trigger={() => <button ref={nonMilRef}>Hidden Print Button</button>}
                content={() => nonMilPrintRef.current}
            />
            <NonMilReport ref={nonMilPrintRef} />
        </div>
        <div style={{ display: "none" }}>
            <ReactToPrint
                trigger={() => <button ref={standardRef}>Hidden Print Button</button>}
                content={() => standardPrintRef.current}
            />
            <StandardReport ref={standardPrintRef} />
        </div>
        <div style={{ display: "none" }}>
            <ReactToPrint
                trigger={() => <button ref={transPerSlipRef}>Hidden Print Button</button>}
                content={() => transPerSlipPrintRef.current}
            />
            <TransPerSlipReport ref={transPerSlipPrintRef} />
        </div> */}
        {/* PDF TEMPLATES ENDS */}
        {/* PDF TEMPLATES ENDS */}
    </div>
}
export default LegalDelivery
