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
    const [dataTable, setDataTable] = useState({
        caseNo: "",
        index: "",
        address: "",
        apt: "",
        ltnames: "",
        extraname: []

    })
    console.log("legalDeliveryDataa", legalDeliveryDataa?.data?.lTSFirstName)
    useEffect(() => {
        const ltName = legalDeliveryDataa?.data?.lTSFirstName.split(',')
        const extraltName = ltName?.splice(1)
  
      
        if (legalDeliveryDataa?.searchResult === "service") {
            setDataTable(prev => ({
                ...prev,
                caseNo: legalDeliveryDataa?.data?.caseNo,
                index: legalDeliveryDataa?.data?.oSSTIndexNo,
                address: legalDeliveryDataa?.data?.lTSAddress,
                apt: legalDeliveryDataa?.data?.lTSApt,
                ltnames:legalDeliveryDataa?.data?.lTSFirstName,
                extraname: extraltName
            }))
        }
    }, [])
    return <>
        <div className="absolute h-[83.5vh] overflow-y-scroll relative">
            <TemplateOutlet>
                <div className="w-full flex justify-center">
                    <h1 className="font-bold flex items-center gap-x-2 text-xl uppercase  ">L&T Extra Names Report</h1>
                </div>
                <DataTable
                    caseNo={dataTable?.caseNo}
                    index={dataTable?.index}
                    address={dataTable?.address}
                    apt={dataTable?.apt}
                    ltnames={dataTable?.ltnames}
                    extraname={dataTable?.extraname}
                />
            </TemplateOutlet>
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
            <div ref={ltExtraNameReportPrintRef}>
                <TemplateOutlet>
                    <div className="w-full flex justify-center">
                        <h1 className="font-bold flex items-center gap-x-2 text-xl uppercase  ">L&T Extra Names Report</h1>
                    </div>
                    <DataTable
                    caseNo={dataTable?.caseNo}
                    index={dataTable?.index}
                    address={dataTable?.address}
                    apt={dataTable?.apt}
                    ltnames={dataTable?.ltnames}
                    extraname={dataTable?.extraname}
                />                </TemplateOutlet>
            </div>
        </div>
    </>
}

export default LTExtraNameReport