import React, { forwardRef, useEffect, useRef, useState } from "react";
import TemplateOutlet from "../../TemplateOutlet";
import Header from "./Sections/Header";
import Body from "./Sections/Body";
import Footer from "./Sections/Footer";
import ReactToPrint from "react-to-print";
import Button from "../../../Buttons/Button/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
export interface StandardReportProps {
    props?: any;
}

const StandardReport = () => {
    const StandardReportPrintRef = useRef<HTMLButtonElement | null>(null);
    const legalDeliveryDataa = useSelector((state: RootState) => state?.legalDelivery.selectedLegalDeliveryData)
    const [header, setHeader] = useState({
        index: ""
    })
    const [bodyData, setBodyData] = useState({
        dateOfService: "",
        apt:"",
        firstAttemptDate:"",
        firstAttemptTime:"",
        secondAttemptDate:"",
        secondAttemptTime:"",


    })
    console.log("legalDeliveryDataa", legalDeliveryDataa)
    useEffect(() => {
        if (legalDeliveryDataa?.searchResult === "result") {
            setHeader(prev => ({
                ...prev,
                index: legalDeliveryDataa?.data?.queryInformationLTIndexNo,
            }))
            setBodyData(prev => ({
                ...prev,
                dateOfService: legalDeliveryDataa?.data?.serviceResultDateOfService,
                firstAttemptDate: legalDeliveryDataa?.data?.serviceResultFirstAttemptDate,
                firstAttemptTime: legalDeliveryDataa?.data?.serviceResultFirstTimeOfService,
                secondAttemptDate: legalDeliveryDataa?.data?.serviceResultSecondAttemptDate,
                secondAttemptTime: legalDeliveryDataa?.data?.serviceResultSecondTimeOfService,


            }))
        }
    }, [])
    return (
        <>
            <div className="absolute h-[83.5vh] overflow-y-scroll relative">
                <TemplateOutlet>
                    <Header index={header?.index} />
                    <Body dateOfService={bodyData?.dateOfService}
                    firstAttemptDate={bodyData?.firstAttemptDate}
                    firstAttemptTime={bodyData?.firstAttemptTime}
                    secondAttemptDate={bodyData?.secondAttemptDate}
                    secondAttemptTime={bodyData?.secondAttemptTime}

                    />
                    <Footer />
                </TemplateOutlet>
                <div className="flex justify-end mt-5 mb-5 mr-5">
                    <ReactToPrint
                        trigger={() => (
                            <div className="w-[10%]">
                                <Button text="Print" />
                            </div>
                        )}
                        content={() => StandardReportPrintRef.current}
                    />
                </div>
            </div>
            <div style={{ display: "none" }}>
                {/* The content to print */}
                <div ref={StandardReportPrintRef}>
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
export default StandardReport