import React, { forwardRef, useEffect, useRef, useState } from "react";
import TemplateOutlet from "../../TemplateOutlet"
import Header from "./Sections/Header"
import Footer from "./Sections/Footer"
import Body from "./Sections/Body"
import ReactToPrint from "react-to-print";
import Button from "../../../Buttons/Button/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";

const MarshalReport = () => {
    const MarshalReportPrintRef = useRef<HTMLButtonElement | null>(null);
    const legalDeliveryDataa = useSelector((state: RootState) => state?.legalDelivery.selectedLegalDeliveryData)
    const [resultData, setResultData] = useState([]);

    const [header, setHeader] = useState({
        index: "",
        affidavitName: "",
        serverName: "",
        lic: "",
        serverAddress: "",

    })
    const [bodyData, setBodyData] = useState({
        apt: "",
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
        locks: "",
        serverAddress: "",
        firstAttemptTime: "",
        secondAttemptTime: ""
    })
    useEffect(() => {
        setResultData(legalDeliveryDataa?.data)
    }, [])
    console.log(">>>>>>>>>>>>>>", resultData);

    return (
        <>
            <div className="absolute h-[83.5vh] overflow-y-scroll relative">
                {resultData?.map(data => {
                    return <>
                        <TemplateOutlet>
                            {data?.serviceResultServerId?.serverCode === undefined ? <>  <Header
                                index=""
                                affidavitName=""
                                serverName=""
                                serverAddress=""
                                lic=""

                            />

                                <Body
                                    //RESULTS
                                    apt=""
                                    reciepientTitle=""
                                    firstTimeAttempt=""
                                    firstDateAttempt=""
                                    secondTimeAttempt=""
                                    secondDateAttempt=""
                                    sex=""
                                    skinColor=""
                                    age=""


                                    serviceResultSubstitudeDeliveredTo=""
                                    height=""
                                    weight=""
                                    hair=""
                                    otherFeatures=""
                                    dateOfMailing=""
                                    dateOfService=""
                                    lic=""
                                    //SERVICES
                                    inputDate=""
                                    time=""
                                    address=""
                                    firstNames=""
                                    serverName=""
                                    serverAddress=""
                                    locks=""
                                    firstAttemptTime=""
                                    secondAttemptTime=""
                                    timeOfService=""
                                    serviceTypeLTOrStandard=""
                                    affidavitName=""



                                />
                                <Footer /></> : <>  <Header
                                    index={data?.oLTIndexNo}
                                    affidavitName={data?.serviceResultResults}
                                    lic={data?.serviceResultServerId?.licenseNo}
                                    serverName={data?.serviceResultServerId?.firstName + " " + data?.serviceResultServerId?.lastName}
                                    serverAddress={data?.serviceResultServerId?.address1}



                                />

                                <Body
                                    //RESULTS
                                    apt={data?.lTSApt}
                                    reciepientTitle={data?.serviceResultRecipientTitle}
                                    firstTimeAttempt={data?.serviceResultFirstTimeOfService}
                                    firstDateAttempt={data?.serviceResultFirstAttemptDate}
                                    secondTimeAttempt={data?.serviceResultSecondTimeOfService}
                                    secondDateAttempt={data?.serviceResultSecondAttemptDate}
                                    sex={data?.serviceResultSex}
                                    skinColor={data?.serviceResultSkinColor}
                                    age={data?.serviceResultAge}
                                    affidavitName={data?.serviceResultResults}
                                    serviceResultSubstitudeDeliveredTo={data?.serviceResultSubstitudeDeliveredTo}
                                    firstAttemptTime={data?.serviceResultFirstTimeOfService}
                                    secondAttemptTime={data?.serviceResultSecondTimeOfService}

                                    height={data?.serviceResultHeight}
                                    weight={data?.serviceResultWeight}
                                    hair={data?.serviceResultHair}
                                    otherFeatures={data?.serviceResultOtherFeatures}
                                    dateOfMailing={data?.serviceResultDateOfMailing}
                                    dateOfService={data?.serviceResultDateOfService}
                                    lic={data?.serviceResultServerId?.licenseNo}
                                    //SERVICES
                                    inputDate={data?.inputDate}
                                    time={data?.updatedAt}
                                    address={data?.lTSAddress}
                                    firstNames={data?.lTSFirstName}
                                    serverName={data?.serviceResultServerId?.firstName + " " + data?.serviceResultServerId?.lastName}
                                    serverAddress={data?.serviceResultServerId?.address1}
                                    locks={data?.serviceResultDoorLocks}
                                    timeOfService={data?.serviceResultTimeOfService}
                                    serviceTypeLTOrStandard={data?.lTServiceType?.name}


                                />
                                <Footer /></>}

                        </TemplateOutlet></>
                })}

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
                    {resultData?.map(data => {
                        return <>
                            <TemplateOutlet>
                                {data?.serviceResultServerId?.serverCode === undefined ? <>  <Header
                                    index=""
                                    affidavitName=""
                                    serverName=""
                                    serverAddress=""
                                    lic=""

                                />

                                    <Body
                                        //RESULTS
                                        apt=""
                                        reciepientTitle=""
                                        firstTimeAttempt=""
                                        firstDateAttempt=""
                                        secondTimeAttempt=""
                                        secondDateAttempt=""
                                        sex=""
                                        skinColor=""
                                        age=""


                                        serviceResultSubstitudeDeliveredTo=""
                                        height=""
                                        weight=""
                                        hair=""
                                        otherFeatures=""
                                        dateOfMailing=""
                                        dateOfService=""
                                        lic=""
                                        //SERVICES
                                        inputDate=""
                                        time=""
                                        address=""
                                        firstNames=""
                                        serverName=""
                                        serverAddress=""
                                        locks=""
                                        firstAttemptTime=""
                                        secondAttemptTime=""
                                        timeOfService=""
                                        serviceTypeLTOrStandard=""
                                        affidavitName=""



                                    />
                                    <Footer /></> : <>  <Header
                                        index={data?.oLTIndexNo}
                                        affidavitName={data?.serviceResultResults}
                                        lic={data?.serviceResultServerId?.licenseNo}
                                        serverName={data?.serviceResultServerId?.firstName + " " + data?.serviceResultServerId?.lastName}
                                        serverAddress={data?.serviceResultServerId?.address1}



                                    />

                                    <Body
                                        //RESULTS
                                        apt={data?.lTSApt}
                                        reciepientTitle={data?.serviceResultRecipientTitle}
                                        firstTimeAttempt={data?.serviceResultFirstTimeOfService}
                                        firstDateAttempt={data?.serviceResultFirstAttemptDate}
                                        secondTimeAttempt={data?.serviceResultSecondTimeOfService}
                                        secondDateAttempt={data?.serviceResultSecondAttemptDate}
                                        sex={data?.serviceResultSex}
                                        skinColor={data?.serviceResultSkinColor}
                                        age={data?.serviceResultAge}
                                        affidavitName={data?.serviceResultResults}
                                        serviceResultSubstitudeDeliveredTo={data?.serviceResultSubstitudeDeliveredTo}
                                        firstAttemptTime={data?.serviceResultFirstTimeOfService}
                                        secondAttemptTime={data?.serviceResultSecondTimeOfService}

                                        height={data?.serviceResultHeight}
                                        weight={data?.serviceResultWeight}
                                        hair={data?.serviceResultHair}
                                        otherFeatures={data?.serviceResultOtherFeatures}
                                        dateOfMailing={data?.serviceResultDateOfMailing}
                                        dateOfService={data?.serviceResultDateOfService}
                                        lic={data?.serviceResultServerId?.licenseNo}
                                        //SERVICES
                                        inputDate={data?.inputDate}
                                        time={data?.updatedAt}
                                        address={data?.lTSAddress}
                                        firstNames={data?.lTSFirstName}
                                        serverName={data?.serviceResultServerId?.firstName + " " + data?.serviceResultServerId?.lastName}
                                        serverAddress={data?.serviceResultServerId?.address1}
                                        locks={data?.serviceResultDoorLocks}
                                        timeOfService={data?.serviceResultTimeOfService}
                                        serviceTypeLTOrStandard={data?.lTServiceType?.name}


                                    />
                                    <Footer /></>}

                            </TemplateOutlet></>
                    })}
                </div>
            </div>
        </>
    );
};
export default MarshalReport