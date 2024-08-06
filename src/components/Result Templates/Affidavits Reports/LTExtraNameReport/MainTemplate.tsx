import React, { forwardRef, useRef } from "react";
import TemplateOutlet from "../../TemplateOutlet";
import DataTable from "./DataTable/DataTable";
import ReactToPrint from "react-to-print";
import Button from "../../../Buttons/Button/Button";
export interface LiNonReportsProps {
    props?: any;
}
const LTExtraNameReport = () => {
    const ltExtraNameReportPrintRef = useRef<HTMLButtonElement | null>(null);

    return <>
        <div className="absolute h-[83.5vh] overflow-y-scroll relative">
            <TemplateOutlet>
                <div className="w-full flex justify-center">
                    <h1 className="font-bold flex items-center gap-x-2 text-xl uppercase  ">L&T Extra Names Report</h1>
                </div>
                <DataTable />
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
                    <DataTable />
                </TemplateOutlet>
            </div>
        </div>
    </>
}

export default LTExtraNameReport