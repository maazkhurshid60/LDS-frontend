import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import ReactToPrint from 'react-to-print';
import TemplateOutlet from "../../TemplateOutlet"
import Button from "../../../Buttons/Button/Button"
import { RootState } from "../../../../redux/store"
import DataTable from './DataTable/DataTable';
const LTExtraNameReport = () => {
    const ltExtraNameReportPrintRef = useRef<HTMLDivElement | null>(null);
    const legalDeliveryData = useSelector((state: RootState) => state.legalDelivery.selectedLegalDeliveryData);
    const [resultData, setResultData] = useState([]);

    useEffect(() => {
        setResultData(legalDeliveryData?.data || []);
    }, [legalDeliveryData]);

    return (
        <>
            <div className="absolute h-[83.5vh] overflow-y-scroll relative">
                <TemplateOutlet>

                    <DataTable data={resultData} testCaseLength={resultData.length} />
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

            {/* Hidden print container */}
            <div style={{ display: "none" }}>
                <div ref={ltExtraNameReportPrintRef} className="mt-2 print-container">
                    {/* Print each page with the header */}
                    {Array.from({ length: Math.ceil(resultData.length / 20) }).map((_, pageIndex) => (
                        <div key={pageIndex} className="page">

                            <DataTable data={resultData.slice(pageIndex * 20, (pageIndex + 1) * 20)} testCaseLength={resultData.length} />
                            {/* Page break */}
                            <div style={{ pageBreakAfter: 'always' }} />
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                @media print {
                    .print-container {
                        page-break-inside: avoid;
                    }
                    
                    .print-header {
                        display: block;
                        font-weight: bold;
                        text-align: center;
                        font-size: 18px;
                        padding: 10px 0;
                        border-bottom: 1px solid #000;
                        margin-bottom: 10px;
                    }

                    .page {
                        page-break-after: always;
                    }

                    .DataTable-row {
                        page-break-inside: avoid;
                        page-break-after: auto;
                    }
                }
            `}</style>
        </>
    );
};

export default LTExtraNameReport;