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
        recipientTitle:"",
        dateOfMailing:"",
        lic:""


    })
    console.log("legalDeliveryDataa", legalDeliveryDataa?.data)
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
                apt:legalDeliveryDataa?.data?.serviceFormId?.lTSApt,
                recipientTitle:legalDeliveryDataa?.data?.serviceResultRecipientTitle,
                dateOfMailing:legalDeliveryDataa?.data?.serviceResultDateOfMailing,
                lic:legalDeliveryDataa?.data?.serviceResultServerId?.licenseNo,


            }))
        }
       else if (legalDeliveryDataa?.searchResult === "service" || legalDeliveryDataa?.searchResult ==="standard") {
            setHeader(prev => ({
                ...prev,
                index: legalDeliveryDataa?.data?.resultFormId?.queryInformationLTIndexNo,
            }))
            setBodyData(prev => ({
                ...prev,
                dateOfService: legalDeliveryDataa?.data?.resultFormId?.serviceResultDateOfService,
                firstAttemptDate: legalDeliveryDataa?.data?.resultFormId?.serviceResultFirstAttemptDate,
                firstAttemptTime: legalDeliveryDataa?.data?.resultFormId?.serviceResultFirstTimeOfService,
                secondAttemptDate: legalDeliveryDataa?.data?.resultFormId?.serviceResultSecondAttemptDate,
                secondAttemptTime: legalDeliveryDataa?.data?.resultFormId?.serviceResultSecondTimeOfService,
                apt:legalDeliveryDataa?.data?.lTSApt,
                recipientTitle:legalDeliveryDataa?.data?.resultFormId?.serviceResultRecipientTitle,
                dateOfMailing:legalDeliveryDataa?.data?.resultFormId?.serviceResultDateOfMailing,
                lic:legalDeliveryDataa?.data?.resultFormId?.serviceResultServerId?.licenseNo,


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
                    recipientTitle={bodyData?.recipientTitle}
                    dateOfMailing={bodyData?.dateOfMailing}
                lic={bodyData?.lic}
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
                    <Header index={header?.index} />
                    <Body dateOfService={bodyData?.dateOfService}
                    firstAttemptDate={bodyData?.firstAttemptDate}
                    firstAttemptTime={bodyData?.firstAttemptTime}
                    secondAttemptDate={bodyData?.secondAttemptDate}
                    secondAttemptTime={bodyData?.secondAttemptTime}
                    recipientTitle={bodyData?.recipientTitle}
                    dateOfMailing={bodyData?.dateOfMailing}
                lic={bodyData?.lic}
                    />
                    <Footer />
                </TemplateOutlet>
                </div>
            </div>
        </>
    );
};
export default StandardReport