import React, { forwardRef, useRef } from "react";
import TemplateOutlet from "../../TemplateOutlet"
import Header from "./Sections/Header"
import Footer from "./Sections/Footer"
import Body from "./Sections/Body"
import ReactToPrint from "react-to-print";
import Button from "../../../Buttons/Button/Button";

const MarshalReport=() => {
    const MarshalReportPrintRef = useRef<HTMLButtonElement | null>(null);
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
                        content={() => MarshalReportPrintRef.current}
                        />
                </div>
        </div>    
        <div style={{ display: "none" }}>
              {/* The content to print */}
                <div ref={MarshalReportPrintRef}>
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
export default MarshalReport