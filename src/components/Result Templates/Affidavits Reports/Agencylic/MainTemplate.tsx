import React, { useEffect, useRef, useState } from "react";
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
    const legalDeliveryDataa = useSelector((state: RootState) => state?.legalDelivery.selectedLegalDeliveryData)
    const [resultData, setResultData] = useState([]);

    const [header, setHeader] = useState({
        index: "",
        affidavitName: "",
        serverName: "",
        serverAddress: "",
        licNo: "",

    })
    const [bodyData, setBodyData] = useState({
        apt: "",
        affidavitName: "",
        reciepientTitle: "",
        firstTimeAttempt: "",
        firstDateAttempt: "",
        secondTimeAttempt: "",
        secondDateAttempt: "",
        sex: "",
        skinColor: "",
        age: "",
        height: "",
        weight: "",
        hair: "",
        otherFeatures: "",
        dateOfMailing: "",
        dateOfService: "",
        address: "",
        firstNames: "",
        serverName: "",
        licNo: "",
        serverAddress: "",
        substituteDelivered: ""
    })
    useEffect(() => {
        setResultData(legalDeliveryDataa?.data)


    }, [])

    console.log("resultData", resultData[0])
    return (
        <>
            <div className="absolute overflow-y-scroll relative">
                {resultData?.map(data => {
                    return <>
                        <div>
                            <TemplateOutlet>
                                {data?.serviceResultServerId?.serverCode === undefined ? <> <Header
                                    index=""
                                    affidavitName=""
                                    serverName=""
                                    serverAddress=""
                                    licNo=""
                                />
                                    <Body
                                        //RESULTS
                                        apt=""
                                        affidavitName=""
                                        serviceTypeLTOrStandard=""
                                        substituteDelivered=""
                                        reciepientTitle=""
                                        firstTimeAttempt=""
                                        firstDateAttempt=""
                                        secondTimeAttempt=""
                                        secondDateAttempt=""
                                        sex=""
                                        skinColor=""
                                        age=""
                                        height=""
                                        weight=""
                                        hair=""
                                        otherFeatures=""
                                        dateOfMailing=""
                                        dateOfService=""
                                        lic=""
                                        serviceResultSubstitudeDeliveredTo=""
                                        //SERVICES
                                        inputDate=""
                                        time=""
                                        address=""
                                        firstNames=""
                                        serverName=""
                                        serverAddress=""
                                    />
                                    <Footer /></> : <> <Header
                                        index={data?.oLTIndexNo}
                                        affidavitName={data?.serviceResultResults}
                                        licNo={data?.serviceResultServerId?.licenseNo}
                                        serverName={data?.serviceResultServerId?.firstName + " " + data?.serviceResultServerId?.lastName}
                                        serverAddress={data?.serviceResultServerId?.address1}
                                    />
                                    <Body
                                        //RESULTS
                                        apt={data?.lTSApt}
                                        serviceResultSubstitudeDeliveredTo={data?.serviceResultSubstitudeDeliveredTo}
                                        affidavitName={data?.serviceResultResults}
                                        substituteDelivered={data?.serviceResultSubstitudeDeliveredTo}
                                        reciepientTitle={data?.serviceResultRecipientTitle}
                                        firstTimeAttempt={data?.serviceResultFirstTimeOfService}
                                        firstDateAttempt={data?.serviceResultFirstAttemptDate}
                                        secondTimeAttempt={data?.serviceResultSecondTimeOfService}
                                        secondDateAttempt={data?.serviceResultSecondAttemptDate}
                                        sex={data?.serviceResultSex}
                                        skinColor={data?.serviceResultSkinColor}
                                        age={data?.serviceResultAge}
                                        height={data?.serviceResultHeight}
                                        weight={data?.serviceResultWeight}
                                        hair={data?.serviceResultHair}
                                        otherFeatures={data?.serviceResultOtherFeatures}
                                        dateOfMailing={data?.serviceResultDateOfMailing}
                                        dateOfService={data?.serviceResultDateOfService}
                                        timeOfService={data?.serviceResultTimeOfService}

                                        lic={data?.serviceResultServerId?.licenseNo}
                                        //SERVICES
                                        inputDate={data?.inputDate}
                                        time={data?.updatedAt}
                                        address={data?.lTSAddress}
                                        firstNames={data?.lTSFirstName}
                                        serverName={data?.serviceResultServerId?.firstName + " " + data?.serviceResultServerId?.lastName}
                                        serverAddress={data?.serviceResultServerId?.address1}
                                        serviceTypeLTOrStandard={data?.lTServiceType?.name}
                                    />
                                    <Footer /></>
                                }

                            </TemplateOutlet>
                        </div>
                    </>
                })}

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
                    {resultData?.map(data => {
                        return <>
                            <div>
                                <TemplateOutlet>
                                    {data?.serviceResultServerId?.serverCode === undefined ? <> <Header
                                        index=""
                                        affidavitName=""
                                        serverName=""
                                        serverAddress=""
                                        licNo=""
                                    />
                                        <Body
                                            //RESULTS
                                            apt=""
                                            affidavitName=""
                                            serviceTypeLTOrStandard=""
                                            substituteDelivered=""
                                            reciepientTitle=""
                                            firstTimeAttempt=""
                                            firstDateAttempt=""
                                            secondTimeAttempt=""
                                            secondDateAttempt=""
                                            sex=""
                                            skinColor=""
                                            age=""
                                            height=""
                                            weight=""
                                            hair=""
                                            otherFeatures=""
                                            dateOfMailing=""
                                            dateOfService=""
                                            lic=""
                                            serviceResultSubstitudeDeliveredTo=""
                                            //SERVICES
                                            inputDate=""
                                            time=""
                                            address=""
                                            firstNames=""
                                            serverName=""
                                            serverAddress=""
                                        />
                                        <Footer /></> : <> <Header
                                            index={data?.oLTIndexNo}
                                            affidavitName={data?.serviceResultResults}
                                            licNo={data?.serviceResultServerId?.licenseNo}
                                            serverName={data?.serviceResultServerId?.firstName + " " + data?.serviceResultServerId?.lastName}
                                            serverAddress={data?.serviceResultServerId?.address1}
                                        />
                                        <Body
                                            //RESULTS
                                            apt={data?.lTSApt}
                                            serviceResultSubstitudeDeliveredTo={data?.serviceResultSubstitudeDeliveredTo}
                                            affidavitName={data?.serviceResultResults}
                                            substituteDelivered={data?.serviceResultSubstitudeDeliveredTo}
                                            reciepientTitle={data?.serviceResultRecipientTitle}
                                            firstTimeAttempt={data?.serviceResultFirstTimeOfService}
                                            firstDateAttempt={data?.serviceResultFirstAttemptDate}
                                            secondTimeAttempt={data?.serviceResultSecondTimeOfService}
                                            secondDateAttempt={data?.serviceResultSecondAttemptDate}
                                            sex={data?.serviceResultSex}
                                            skinColor={data?.serviceResultSkinColor}
                                            age={data?.serviceResultAge}
                                            height={data?.serviceResultHeight}
                                            weight={data?.serviceResultWeight}
                                            hair={data?.serviceResultHair}
                                            otherFeatures={data?.serviceResultOtherFeatures}
                                            dateOfMailing={data?.serviceResultDateOfMailing}
                                            dateOfService={data?.serviceResultDateOfService}
                                            timeOfService={data?.serviceResultTimeOfService}

                                            lic={data?.serviceResultServerId?.licenseNo}
                                            //SERVICES
                                            inputDate={data?.inputDate}
                                            time={data?.updatedAt}
                                            address={data?.lTSAddress}
                                            firstNames={data?.lTSFirstName}
                                            serverName={data?.serviceResultServerId?.firstName + " " + data?.serviceResultServerId?.lastName}
                                            serverAddress={data?.serviceResultServerId?.address1}
                                            serviceTypeLTOrStandard={data?.lTServiceType?.name}
                                        />
                                        <Footer /></>
                                    }

                                </TemplateOutlet>
                            </div>
                        </>
                    })}

                </div>
            </div>
        </>
    );
};

export default AgencyLic;
