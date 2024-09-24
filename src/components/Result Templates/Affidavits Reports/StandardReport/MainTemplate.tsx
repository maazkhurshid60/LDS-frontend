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
    const [resultData, setResultData] = useState([]);

    const [header, setHeader] = useState({
        index: ""
    })
    const [bodyData, setBodyData] = useState({
        dateOfService: "",
        apt: "",
        firstAttemptDate: "",
        firstAttemptTime: "",
        secondAttemptDate: "",
        secondAttemptTime: "",
        recipientTitle: "",
        dateOfMailing: "",
        lic: "",
        serverAddress: "",
        serverName: "",
        sex: "",
        skinColor: "",
        age: "",
        height: "",
        weight: "",
        hair: "",
        otherFeature: false


    })
    console.log("legalDeliveryDataa", legalDeliveryDataa?.data)
    useEffect(() => {
        setResultData(legalDeliveryDataa?.data)

        //     if (legalDeliveryDataa?.searchResult === "result") {
        //         setHeader(prev => ({
        //             ...prev,
        //             index: legalDeliveryDataa?.data?.queryInformationLTIndexNo,
        //         }))
        //         setBodyData(prev => ({
        //             ...prev,
        //             dateOfService: legalDeliveryDataa?.data?.serviceResultDateOfService,
        //             firstAttemptDate: legalDeliveryDataa?.data?.serviceResultFirstAttemptDate,
        //             firstAttemptTime: legalDeliveryDataa?.data?.serviceResultFirstTimeOfService,
        //             secondAttemptDate: legalDeliveryDataa?.data?.serviceResultSecondAttemptDate,
        //             secondAttemptTime: legalDeliveryDataa?.data?.serviceResultSecondTimeOfService,
        //             recipientTitle:legalDeliveryDataa?.data?.serviceResultRecipientTitle,
        //             dateOfMailing:legalDeliveryDataa?.data?.serviceResultDateOfMailing,
        //             lic:legalDeliveryDataa?.data?.serviceResultServerId?.licenseNo,
        //             serverAddress:legalDeliveryDataa?.data?.serviceResultServerId?.address1,
        //             serverName:legalDeliveryDataa?.data?.serviceResultServerId?.firstName,
        //             apt:legalDeliveryDataa?.data?.serviceResultServerId?.apt,
        //             sex:legalDeliveryDataa?.data?.serviceResultSex,
        //             skinColor:legalDeliveryDataa?.data?.serviceResultSkinColor,
        //             age:legalDeliveryDataa?.data?.serviceResultAge,
        //             height:legalDeliveryDataa?.data?.serviceResultHeight,
        //             weight:legalDeliveryDataa?.data?.serviceResultWeight,
        //             hair:legalDeliveryDataa?.data?.serviceResultHair,
        //             otherFeature:legalDeliveryDataa?.data?.serviceResultOtherDescription,


        //         }))
        //     }
        //    else if (legalDeliveryDataa?.searchResult === "service" || legalDeliveryDataa?.searchResult ==="standard") {
        //         setHeader(prev => ({
        //             ...prev,
        //             index: legalDeliveryDataa?.data?.resultFormId?.queryInformationLTIndexNo,
        //         }))
        //         setBodyData(prev => ({
        //             ...prev,
        //             dateOfService: legalDeliveryDataa?.data?.resultFormId?.serviceResultDateOfService,
        //             firstAttemptDate: legalDeliveryDataa?.data?.resultFormId?.serviceResultFirstAttemptDate,
        //             firstAttemptTime: legalDeliveryDataa?.data?.resultFormId?.serviceResultFirstTimeOfService,
        //             secondAttemptDate: legalDeliveryDataa?.data?.resultFormId?.serviceResultSecondAttemptDate,
        //             secondAttemptTime: legalDeliveryDataa?.data?.resultFormId?.serviceResultSecondTimeOfService,
        //             apt:legalDeliveryDataa?.data?.resultFormId?.serviceResultServerId?.apt,
        //             recipientTitle:legalDeliveryDataa?.data?.resultFormId?.serviceResultRecipientTitle,
        //             dateOfMailing:legalDeliveryDataa?.data?.resultFormId?.serviceResultDateOfMailing,
        //             lic:legalDeliveryDataa?.data?.resultFormId?.serviceResultServerId?.licenseNo,
        //             serverAddress:legalDeliveryDataa?.data?.resultFormId?.serviceResultServerId?.address1,
        //             serverName:legalDeliveryDataa?.data?.resultFormId?.serviceResultServerId?.firstName,
        //             sex:legalDeliveryDataa?.data?.resultFormId?.serviceResultSex,
        //             skinColor:legalDeliveryDataa?.data?.resultFormId?.serviceResultSkinColor,
        //             age:legalDeliveryDataa?.data?.resultFormId?.serviceResultAge,
        //             height:legalDeliveryDataa?.data?.resultFormId?.serviceResultHeight,
        //             weight:legalDeliveryDataa?.data?.resultFormId?.serviceResultWeight,
        //             hair:legalDeliveryDataa?.data?.resultFormId?.serviceResultHair,
        //             otherFeature:legalDeliveryDataa?.data?.resultFormId?.serviceResultOtherDescription,

        //         }))
        //     }
    }, [])
    return (
        <>
            <div className="absolute h-[83.5vh] overflow-y-scroll relative">
                {resultData?.map(data => {
                    return <>

                        <TemplateOutlet>
                            {data?.serviceResultServerId?.serverCode === undefined || data?.serviceResultServerId?.serverCode === null ? <>
                                <Header index="" />
                                <Body dateOfService=""
                                    firstAttemptDate=""
                                    firstAttemptTime=""
                                    secondAttemptDate=""
                                    secondAttemptTime=""
                                    recipientTitle=""
                                    dateOfMailing=""
                                    lic=""
                                    serverAddress=""
                                    serverName=""
                                    apt=""
                                    sex=""
                                    skinColor=""
                                    age=""
                                    height=""
                                    weight=""
                                    hair=""
                                    otherFeature=""

                                />
                                <Footer />

                            </> : <> <Header index={data?.oLTIndexNo} />
                                <Body dateOfService={data?.serviceResultDateOfService}
                                    firstAttemptDate={data?.serviceResultFirstAttemptDate}
                                    firstAttemptTime={data?.serviceResultFirstTimeOfService}
                                    secondAttemptDate={data?.serviceResultSecondAttemptDate}
                                    secondAttemptTime={data?.serviceResultSecondTimeOfService}
                                    recipientTitle={data?.serviceResultRecipientTitle}
                                    dateOfMailing={data?.serviceResultDateOfMailing}
                                    lic={data?.serviceResultServerId?.licenseNo}
                                    serverAddress={data?.serviceResultServerId?.address1}
                                    serverName={data?.serviceResultServerId?.firstName}
                                    apt={data?.serviceResultServerId?.apt}
                                    sex={data?.serviceResultSex}
                                    skinColor={data?.serviceResultSkinColor}
                                    age={data?.serviceResultAge}
                                    height={data?.serviceResultHeight}
                                    weight={data?.serviceResultWeight}
                                    hair={data?.serviceResultHair}
                                    otherFeature={data?.serviceResultOtherDescription}

                                />
                                <Footer /></>}

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
                        content={() => StandardReportPrintRef.current}
                    />
                </div>
            </div>
            <div style={{ display: "none" }}>
                {/* The content to print */}
                <div ref={StandardReportPrintRef}>
                    {resultData?.map(data => {
                        return <>

                            <TemplateOutlet>
                                {data?.serviceResultServerId?.serverCode === undefined || data?.serviceResultServerId?.serverCode === null ? <>
                                    <Header index="" />
                                    <Body dateOfService=""
                                        firstAttemptDate=""
                                        firstAttemptTime=""
                                        secondAttemptDate=""
                                        secondAttemptTime=""
                                        recipientTitle=""
                                        dateOfMailing=""
                                        lic=""
                                        serverAddress=""
                                        serverName=""
                                        apt=""
                                        sex=""
                                        skinColor=""
                                        age=""
                                        height=""
                                        weight=""
                                        hair=""
                                        otherFeature=""

                                    />
                                    <Footer />

                                </> : <> <Header index={data?.oLTIndexNo} />
                                    <Body dateOfService={data?.serviceResultDateOfService}
                                        firstAttemptDate={data?.serviceResultFirstAttemptDate}
                                        firstAttemptTime={data?.serviceResultFirstTimeOfService}
                                        secondAttemptDate={data?.serviceResultSecondAttemptDate}
                                        secondAttemptTime={data?.serviceResultSecondTimeOfService}
                                        recipientTitle={data?.serviceResultRecipientTitle}
                                        dateOfMailing={data?.serviceResultDateOfMailing}
                                        lic={data?.serviceResultServerId?.licenseNo}
                                        serverAddress={data?.serviceResultServerId?.address1}
                                        serverName={data?.serviceResultServerId?.firstName}
                                        apt={data?.serviceResultServerId?.apt}
                                        sex={data?.serviceResultSex}
                                        skinColor={data?.serviceResultSkinColor}
                                        age={data?.serviceResultAge}
                                        height={data?.serviceResultHeight}
                                        weight={data?.serviceResultWeight}
                                        hair={data?.serviceResultHair}
                                        otherFeature={data?.serviceResultOtherDescription}

                                    />
                                    <Footer /></>}

                            </TemplateOutlet>
                        </>
                    })}
                </div>
            </div>
        </>
    );
};
export default StandardReport