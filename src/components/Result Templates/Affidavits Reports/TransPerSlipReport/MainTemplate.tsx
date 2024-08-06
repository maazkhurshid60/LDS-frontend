import React, { forwardRef, useRef } from "react";
import TemplateOutlet from "../../TemplateOutlet";
import Header from "./Section/Header";
import Body from "./Section/Body";
import Footer from "../Agencylic/Sections/Footer";
import ReactToPrint from "react-to-print";
import Button from "../../../Buttons/Button/Button";

export interface TransPerSlipReportProps {
    props?: any;
}

const TransPerSlipReport =() => {
    const TransPerSlipReportPrintRef = useRef<HTMLButtonElement | null>(null);
    return (
        <>
        <div className="absolute h-[83.5vh] overflow-y-scroll relative">
            <TemplateOutlet>
                <Header />
                <Body />
                <Footer />
            </TemplateOutlet>
            <div className="flex justify-end mt-5 mb-5 mr-5">
                    <ReactToPrint
                        trigger={() => (
                            <div className="w-[10%]">
                                <Button text="Print" />
                            </div>
                        )}
                        content={() => TransPerSlipReportPrintRef.current}
                        />
                </div>
        </div>    
        <div style={{ display: "none" }}>
              {/* The content to print */}
                <div ref={TransPerSlipReportPrintRef}>
                    <TemplateOutlet>
                        <Header />
                        <Body />
                        <Footer />
                    </TemplateOutlet>
                </div>
            </div>
            </>
    );
};
export default TransPerSlipReport