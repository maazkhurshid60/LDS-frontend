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
    useEffect(() => {
        setResultData(legalDeliveryDataa?.data)

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