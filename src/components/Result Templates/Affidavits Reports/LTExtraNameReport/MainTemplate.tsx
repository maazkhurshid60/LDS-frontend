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

    const [dataTable, setDataTable] = useState({
        caseNo: "",
        index: "",
        address: "",
        apt: "",
        ltnames: "",
        extraname: []

    })
    useEffect(() => {

        setResultData(legalDeliveryDataa?.data)


    }, [])

    console.log(resultData?.map(data => data?.caseNo))
    return <>
        <div className="absolute h-[83.5vh] overflow-y-scroll relative">
            <TemplateOutlet>

                <div className="w-full flex justify-center">
                    <h1 className="font-bold flex items-center gap-x-2 text-xl uppercase  ">L&T Extra Names Report</h1>
                </div>
                <DataTable data={resultData} testCaseLength={resultData?.length} />
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
            <div ref={ltExtraNameReportPrintRef} className="mt-2">
                <TemplateOutlet>

                    <div className="w-full flex justify-center ">
                        <h1 className="font-bold flex items-center gap-x-2 text-xl uppercase  ">L&T Extra Names Report</h1>
                    </div>
                    <DataTable data={resultData} testCaseLength={resultData?.length} />
                </TemplateOutlet>
            </div>
        </div>
    </>
}

export default LTExtraNameReport