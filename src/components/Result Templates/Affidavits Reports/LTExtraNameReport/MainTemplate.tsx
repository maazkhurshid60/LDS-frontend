import React, { forwardRef, useEffect, useRef, useState } from "react";
import TemplateOutlet from "../../TemplateOutlet";
import DataTable from "./DataTable/DataTable";
import ReactToPrint from "react-to-print";
import Button from "../../../Buttons/Button/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
export interface LiNonReportsProps {
    props?: any;
}
const LTExtraNameReport = () => {
    const ltExtraNameReportPrintRef = useRef<HTMLButtonElement | null>(null);
    const legalDeliveryDataa = useSelector((state: RootState) => state?.legalDelivery.selectedLegalDeliveryData)
    const [resultData, setResultData] = useState([]);
    const [extraltName, setExtraltName] = useState([]);

    console.log("legalDeliveryDataa", resultData?.map(data => data?.serviceResultDateOfMailing))
    const [dataTable, setDataTable] = useState({
        caseNo: "",
        index: "",
        address: "",
        apt: "",
        ltnames: "",
        extraname: []

    })
    console.log("legalDeliveryDataa", resultData[0]?.caseNo)
    useEffect(() => {

        setResultData(legalDeliveryDataa?.data)


        // if (legalDeliveryDataa?.searchResult === "service") {
        //     setDataTable(prev => ({
        //         ...prev,
        //         caseNo: legalDeliveryDataa?.data?.caseNo,
        //         index: legalDeliveryDataa?.data?.oSSTIndexNo,
        //         address: legalDeliveryDataa?.data?.lTSAddress,
        //         apt: legalDeliveryDataa?.data?.lTSApt,
        //         ltnames: legalDeliveryDataa?.data?.lTSFirstName,
        //         extraname: extraltName
        //     }))
        // }
    }, [])
    return <>
        <div className="absolute h-[83.5vh] overflow-y-scroll relative">
            {resultData?.map(data => {
                return <>
                    <TemplateOutlet>
                        {data?.serviceResultServerId?.serverCode === undefined ? <><div className="w-full flex justify-center">
                            <h1 className="font-bold flex items-center gap-x-2 text-xl uppercase  ">L&T Extra Names Report</h1>
                        </div>

                            <DataTable
                                caseNo=""
                                index=""
                                address=""
                                apt=""
                                ltnames=""
                                extraname=""
                            /></> : <><div className="w-full flex justify-center">
                                <h1 className="font-bold flex items-center gap-x-2 text-xl uppercase  ">L&T Extra Names Report</h1>
                            </div>

                            <DataTable
                                caseNo={data?.caseNo}
                                index={data?.oSSTIndexNo}
                                address={data?.lTSAddress}
                                apt={data?.lTSApt}
                                ltnames={data?.lTSFirstName}

                                extraname={data?.lTSFirstName.split(",")}
                            /></>}

                    </TemplateOutlet>
                </>
            })}


            <div className="flex justify-end mt-5 mb-5 mr-5">
                <ReactToPrint
                    trigger={() => (
                        <div className="w-[10%]">
                            <Button text="Print" />
                        </div>
                    )}
                    content={() => ltExtraNameReportPrintRef.current}
                />
            </div>
        </div>
        <div style={{ display: "none" }}>
            {/* The content to print */}
            <div ref={ltExtraNameReportPrintRef} className="">
                {resultData?.map(data => {
                    return <>
                        <TemplateOutlet>
                            {data?.serviceResultServerId?.serverCode === undefined ? <><div className="w-full flex justify-center">
                                <h1 className="font-bold flex items-center gap-x-2 text-xl uppercase  ">L&T Extra Names Report</h1>
                            </div>

                                <DataTable
                                    caseNo=""
                                    index=""
                                    address=""
                                    apt=""
                                    ltnames=""
                                    extraname=""
                                /></> : <><div className="w-full flex justify-center">
                                    <h1 className="font-bold flex items-center gap-x-2 text-xl uppercase  ">L&T Extra Names Report</h1>
                                </div>

                                <DataTable
                                    caseNo={data?.caseNo}
                                    index={data?.oSSTIndexNo}
                                    address={data?.lTSAddress}
                                    apt={data?.lTSApt}
                                    ltnames={data?.lTSFirstName}

                                    extraname={data?.lTSFirstName.split(",")}
                                /></>}

                        </TemplateOutlet>
                    </>
                })}
            </div>
        </div>
    </>
}

export default LTExtraNameReport