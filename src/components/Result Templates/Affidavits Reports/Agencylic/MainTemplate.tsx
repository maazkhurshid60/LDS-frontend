import React, { useRef, useState } from "react";
import Header from "./Sections/Header";
import TemplateOutlet from "../../TemplateOutlet";
import Footer from "./Sections/Footer";
import Body from "./Sections/Body";
import Button from "../../../Buttons/Button/Button";
import ReactToPrint from "react-to-print";
import { RootState } from "../../../../redux/store";
import { useSelector } from "react-redux";

const AgencyLic = () => {
    const agencyLicPrintRef = useRef<HTMLDivElement | null>(null);
    const legalDeliveryDataa=useSelector((state:RootState)=>state?.legalDelivery)
    console.log("legal delivery data",legalDeliveryDataa)
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
                        content={() => agencyLicPrintRef.current}
                    />
                </div>
            </div>

            <div style={{ display: "none" }}>
                {/* The content to print */}
                <div ref={agencyLicPrintRef}>
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

export default AgencyLic;
