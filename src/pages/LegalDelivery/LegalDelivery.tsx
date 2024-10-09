import React, { useEffect, useRef, useState } from "react";
import OutletLayout from "../../components/OutletLayout/OutletLayout";
import OutletLayoutHeader from "../../components/OutletLayout/OutLayoutHeader";
import Searchbar from "../../components/Searchbar/Searchbar";
import Filter from "../../components/Filter/Filter";
import Table from "../../components/Tables/Table";
import { headersResult, headersService, headersStandard, tableData } from "../../constdata/LegalDeliveryData";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import Pagination from "../../components/Pagination/Pagination";
import FilterMenu from "./FilterSection/FilterMenu/FilterMenu";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { emptyLegalDeliveryReducer, getAllServiceFormThunk, getSingleLegalDeliveryReducer } from "../../redux/slice/legalDelivery";
import TableWithoutAction from "../../components/Tables/TableWithoutAction";
import { RootState } from "../../redux/store";
import { usePaginationCalc } from "../../hooks/paginationCalc/usePaginationCalc";
import { toast } from "react-toastify";
import Hints from "../Result/Hints/Hints";
const LegalDelivery = () => {
    const [showFilterMenu, setShowFilterMenu] = useState(false)
    const [showDropDown, setShowDropDown] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch()
    const filteredData = useSelector((state: RootState) => state?.legalDelivery?.filteredLegalData || [])
    const todayAllLegalData = useSelector((state: RootState) => state?.legalDelivery?.legalDeliveryData || [])
    // console.log("search data<<<<<<<<<<<", filteredData)

    const searchDataName = useSelector((state: RootState) => state?.legalDelivery?.selectedLegalDeliveryData?.searchResult)
    let searchLegalData
    const [isSearchData, setIsSearchData] = useState<any>([])
    const [searchQuery, setSearchQuery] = useState("");
    const [isTodaySearchData, setIsTodaySearchData] = useState<any>([])

    const handlePrint = () => {

        setShowDropDown(false);

    }

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setShowDropDown(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [])

    const serviceTableHeader = ["Job", "Client Code", "Input Date", "Server Code", "Full Name", "Case Paper Type", "Bussiness Name", "Address", "Caption", "City", "Zip", "Serv City", "Case No", "Service Type"]






    useEffect(() => {
        // Add event listener for keydown to detect Ctrl+A
        document.addEventListener('keydown', handleCtrlA);

        // Cleanup event listener on unmount
        return () => {
            document.removeEventListener('keydown', handleCtrlA);
        };
    }, [isSearchData, isTodaySearchData]);
    // useEffect(() => {
    //     // Add event listener for keydown to detect Ctrl+A
    //     document.addEventListener('keydown', handleCtrlA);

    //     // Cleanup event listener on unmount
    //     return () => {
    //         document.removeEventListener('keydown', handleCtrlA);
    //     };
    // }, [isTodaySearchData]);


    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

    const todayServiceForm = todayAllLegalData
        ?.filter((data: any) => {
            // First, filter by today's date
            const createdDate = new Date(data?.createdAt).toISOString().split('T')[0]; // Extract the date part (YYYY-MM-DD)



            return createdDate === currentDate; // Compare dates as strings
        })
        ?.filter((data: any) => {
            // Then, filter based on the search query
            const searchLower = searchQuery?.toLowerCase(); // Convert search query to lowercase for case-insensitive search

            return (
                data?.jobNo?.toString()?.toLowerCase()?.includes(searchLower) ||
                data?.inputDate?.toLowerCase()?.includes(searchLower) ||
                data?.clientId?.code?.toLowerCase()?.includes(searchLower) ||
                data?.serviceType?.serviceTypeCode?.toLowerCase()?.includes(searchLower) ||
                data?.caseNo?.toString()?.toLowerCase()?.includes(searchLower) ||
                data?.caption?.toLowerCase()?.includes(searchLower) ||
                data?.lTServiceType?.name?.toLowerCase()?.includes(searchLower) ||
                data?.oLTIndexNo?.toString()?.toLowerCase()?.includes(searchLower) ||
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
        })
        .map((item: any) => ({
            _id: item?._id,
            jobNo: item?.jobNo,
            clientCode: item?.clientId?.code,
            inputDate: item?.inputDate,
            serverCode: item?.serviceResultServerId?.serverCode,
            fullName: item?.lTSFirstName,
            casePaperType: "",  // Static value
            bussinessName: item?.lTSBusinessName,
            address: item?.lTSAddress,
            caption: item?.caption,
            city: item?.lTSCity,
            zip: item?.lTSZip,
            servCity: item?.cityServe,
            caseNo: item?.caseNo,
            serviceType: item?.serviceType?.serviceTypeDescription
        }));






    useEffect(() => {
        dispatch(getAllServiceFormThunk())
    }, [])



    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };
    // console.log("sadjkgfdsgf idsa iugfdsa gff", isSearchData)
    const getUserIdFunction = (userId: string, index) => {

        if (todayAllLegalData?.length > 0) {
            const selectedData = todayAllLegalData?.filter((data, id) => data?._id === userId)
            dispatch(getSingleLegalDeliveryReducer(selectedData))
        }
        if (filteredData?.length > 0) {
            const selectedData = filteredData?.filter((data, id) => data?._id === userId)
            dispatch(getSingleLegalDeliveryReducer(selectedData))
        }


    }



    const handleCtrlA = (event: KeyboardEvent) => {
        if (event.ctrlKey && event.key === 'a') {

            console.log("<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>", isSearchData);

            event.preventDefault(); // Prevent default Ctrl+A browser action (selecting text)
            selectAllRecords();
        }
    };
    console.log("isSearchData<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>isSearchData", isSearchData);

    const selectAllRecords = () => {

        // Check if filteredData is not empty
        if (filteredData?.length > 0) {

            const commonData = filteredData?.filter(item =>
                isSearchData?.some(newItem => newItem?._id === item?._id)
            );
            dispatch(getSingleLegalDeliveryReducer(commonData));
            console.log("commonData", commonData)


            toast.success("All Data has been selected. Generate any reportttt.")
        } else if (todayAllLegalData?.length > 0) {
            // const todayServiceForm = todayAllLegalData?.filter((data) => {
            //     // Filter today's data by date
            //     const createdDate = new Date(data?.createdAt).toISOString().split('T')[0]; // Extract the date part (YYYY-MM-DD)
            //     return createdDate === currentDate; // Compare dates as strings
            // });
            const commonData = todayAllLegalData?.filter(item =>
                isTodaySearchData?.some(newItem => newItem?._id === item?._id)
            );
            dispatch(getSingleLegalDeliveryReducer(commonData));
            console.log("commonData....", isTodaySearchData, commonData)

            toast.success("All Data has been selected..... Generate any report.");
        }
    };

    useEffect(() => {
        setIsSearchData(Array.isArray(filteredData)
            && filteredData
                .filter((data) => {
                    const searchLower = searchQuery.toLowerCase(); // Convert search query to lowercase for case-insensitive search
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
                })
                .map(item => ({
                    _id: item?._id,
                    jobNo: item?.jobNo,
                    clientCode: item?.clientId?.code,
                    inputDate: item?.inputDate,
                    serverCode: item?.serviceResultServerId?.serverCode,
                    fullName: item?.lTSFirstName,
                    casePaperType: "",  // Static value
                    bussinessName: item?.lTSBusinessName,
                    address: item?.lTSAddress,
                    caption: item?.caption,
                    city: item?.lTSCity,
                    zip: item?.lTSZip,
                    servCity: item?.cityServe,
                    caseNo: item?.caseNo,
                    serviceType: item?.serviceType?.serviceTypeDescription
                }))
        )


    }, [searchQuery])



    useEffect(() => { setIsSearchData(filteredData) }, [filteredData])
    useEffect(() => {
        setIsTodaySearchData(


            todayAllLegalData
                ?.filter((data: any) => {
                    // First, filter by today's date
                    const createdDate = new Date(data?.createdAt).toISOString().split('T')[0]; // Extract the date part (YYYY-MM-DD)



                    return createdDate === currentDate; // Compare dates as strings
                })
                ?.filter((data: any) => {
                    // Then, filter based on the search query
                    const searchLower = searchQuery?.toLowerCase(); // Convert search query to lowercase for case-insensitive search

                    return (
                        data?.jobNo?.toString()?.toLowerCase()?.includes(searchLower) ||
                        data?.inputDate?.toLowerCase()?.includes(searchLower) ||
                        data?.clientId?.code?.toLowerCase()?.includes(searchLower) ||
                        data?.serviceType?.serviceTypeCode?.toLowerCase()?.includes(searchLower) ||
                        data?.caseNo?.toString()?.toLowerCase()?.includes(searchLower) ||
                        data?.caption?.toLowerCase()?.includes(searchLower) ||
                        data?.lTServiceType?.name?.toLowerCase()?.includes(searchLower) ||
                        data?.oLTIndexNo?.toString()?.toLowerCase()?.includes(searchLower) ||
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
                })
                .map((item: any) => ({
                    _id: item?._id,
                    jobNo: item?.jobNo,
                    clientCode: item?.clientId?.code,
                    inputDate: item?.inputDate,
                    serverCode: item?.serviceResultServerId?.serverCode,
                    fullName: item?.lTSFirstName,
                    casePaperType: "",  // Static value
                    bussinessName: item?.lTSBusinessName,
                    address: item?.lTSAddress,
                    caption: item?.caption,
                    city: item?.lTSCity,
                    zip: item?.lTSZip,
                    servCity: item?.cityServe,
                    caseNo: item?.caseNo,
                    serviceType: item?.serviceType?.serviceTypeDescription
                }))




        )




    }, [searchQuery])





    return <div className="w-[95%] m-auto">
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

            {/* {filteredData?.length > 0 && */}
            <div className="flex flex-wrap items-center gap-x-8 justify-start font-medium text-sm mt-4 capitalize">
                <div ref={dropdownRef}>
                    <div className="flex flex-row items-center gap-x-1 cursor-pointer" onClick={() => setShowDropDown(!showDropDown)}>
                        {/* {filteredData?.length > 0 && */}
                        <div className="flex flex-wrap items-center gap-x-8 justify-start font-medium text-sm mt-4 capitalize">
                            <div ref={dropdownRef}>
                                <div className="flex flex-row items-center gap-x-1 cursor-pointer" onClick={() => setShowDropDown(!showDropDown)}>

                                    <p className="" >Affidavits Reports
                                        <p className="" >Affidavits Reports

                                        </p>
                                        <IoIosArrowDown
                                            size={12}
                                            className={`${showDropDown ? "rotate-[180deg]" : "rotate-[0deg]"}`}
                                        />
                                    </p>
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
                        </div>
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

                <p className="cursor-pointer" onClick={() => dispatch(emptyLegalDeliveryReducer())}>clear filter</p>
                <Hints keyName="Ctrl + A " label="Select All Record" />
                <p className="cursor-pointer" onClick={() => dispatch(emptyLegalDeliveryReducer())}>clear filter</p>
                <Hints keyName="Ctrl + A " label="Select All Record" />


            </div>
            <div className="mt-4 flex flex-col  gap-4
                            sm:flex-row sm:items-center">
                <Searchbar value={searchQuery} onChange={handleSearchChange} />
            </div>
            {/* } */}
            {/* {filteredData?.length > 0 ?
                <> */}
            <TableWithoutAction
                headers={
                    searchDataName === "result"
                        ? serviceTableHeader
                        : searchDataName === "standard"
                            ? serviceTableHeader
                            : serviceTableHeader
                }
                tableData={isSearchData?.length > 0 ? isSearchData : isTodaySearchData}


                getRowData={getUserIdFunction}
            />




        </OutletLayout>

    </div>
}
export default LegalDelivery


