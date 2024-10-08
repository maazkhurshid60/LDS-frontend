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
    console.log("legalDeliveryDataa?.data?.inputDate", resultData[0]?.serviceResultServerId)

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
        serverAddress: ""
    })
    useEffect(() => {
        setResultData(legalDeliveryDataa?.data)

        // if (legalDeliveryDataa?.searchResult === "service" || legalDeliveryDataa?.searchResult === "standard") {
        //     // SERVICES STARTS
        //     setHeader(prev => ({
        //         ...prev,
        //         index: legalDeliveryDataa?.data?.oLTIndexNo,
        //         affidavitName: legalDeliveryDataa?.data?.serviceType?.serviceTypeCode,
        //         serverName:  legalDeliveryDataa?.data?.resultFormId?.serviceResultServerId?.firstName,
        //         lic: legalDeliveryDataa?.data?.resultFormId?.serviceResultServerId?.licenseNo,
        //         serverAddress: legalDeliveryDataa?.data?.resultFormId?.serviceResultServerId?.address1,


        //     }))
        //     setBodyData(prev => ({
        //         ...prev,
        //         apt: legalDeliveryDataa?.data?.aptServe,
        //         inputDate: legalDeliveryDataa?.data?.inputDate,
        //         time: legalDeliveryDataa?.data?.updatedAt,
        //         address: legalDeliveryDataa?.data?.lTSAddress,
        //         firstNames: legalDeliveryDataa?.data?.lTSFirstName,
        //         dateOfService: legalDeliveryDataa?.data?.resultFormId?.serviceResultDateOfService,
        //         dateOfMailing: legalDeliveryDataa?.data?.resultFormId?.serviceResultDateOfMailing,
        //         serverName: legalDeliveryDataa?.data?.resultFormId?.serviceResultServerId?.firstName,
        //         reciepientTitle: legalDeliveryDataa?.data?.resultFormId?.serviceResultRecipientTitle,
        //         firstTimeAttempt: legalDeliveryDataa?.data?.resultFormId?.serviceResultFirstTimeOfService,
        //         firstDateAttempt: legalDeliveryDataa?.data?.resultFormId?.serviceResultFirstAttemptDate,
        //         secondTimeAttempt: legalDeliveryDataa?.data?.resultFormId?.serviceResultSecondTimeOfService,
        //         secondDateAttempt: legalDeliveryDataa?.data?.resultFormId?.serviceResultSecondAttemptDate,
        //         sex: legalDeliveryDataa?.data?.resultFormId?.serviceResultSex,
        //         skinColor: legalDeliveryDataa?.data?.resultFormId?.serviceResultSkinColor,
        //         age: legalDeliveryDataa?.data?.resultFormId?.serviceResultAge,
        //         height: legalDeliveryDataa?.data?.resultFormId?.serviceResultHeight,
        //         weight: legalDeliveryDataa?.data?.resultFormId?.serviceResultWeight,
        //         hair: legalDeliveryDataa?.data?.resultFormId?.serviceResultHair,
        //         otherFeatures: legalDeliveryDataa?.data?.resultFormId?.serviceResultOtherFeatures,
        //         licNo: legalDeliveryDataa?.data?.resultFormId?.serviceResultServerId?.licenseNo,
        //         locks: legalDeliveryDataa?.data?.resultFormId?.serviceResultDoorLocks,
        //         serverAddress: legalDeliveryDataa?.data?.resultFormId?.serviceResultServerId?.address1
        //      }))
        //     // SERVICES ENDS

        // } else if (legalDeliveryDataa?.searchResult === "result") {
        //     setHeader(prev => ({
        //         ...prev,
        //         index: legalDeliveryDataa?.data?.queryInformationLTIndexNo,
        //         affidavitName: legalDeliveryDataa?.data?.serviceResultScvType?.serviceTypeCode,
        //         serverName:  legalDeliveryDataa?.data?.serviceResultServerId?.firstName,
        //         lic: legalDeliveryDataa?.data?.serviceResultServerId?.licenseNo,
        //         serverAddress: legalDeliveryDataa?.data?.serviceResultServerId?.address1,
        //     }))
        //     setBodyData(prev => ({
        //         ...prev,
        //         apt: legalDeliveryDataa?.data?.serviceFormId?.aptServe,
        //         inputDate: legalDeliveryDataa?.data?.serviceFormId?.inputDate,
        //         time: legalDeliveryDataa?.data?.serviceFormId?.updatedAt,
        //         address: legalDeliveryDataa?.data?.serviceFormId?.lTSAddress,
        //         firstNames: legalDeliveryDataa?.data?.serviceFormId?.lTSFirstName,
        //         dateOfService: legalDeliveryDataa?.data?.serviceResultDateOfService,
        //         dateOfMailing: legalDeliveryDataa?.data?.serviceResultDateOfMailing,
        //         serverName: legalDeliveryDataa?.data?.serviceResultServerId?.firstName,
        //         reciepientTitle: legalDeliveryDataa?.data?.serviceResultRecipientTitle,
        //         firstTimeAttempt: legalDeliveryDataa?.data?.serviceResultFirstTimeOfService,
        //         firstDateAttempt: legalDeliveryDataa?.data?.serviceResultFirstAttemptDate,
        //         secondTimeAttempt: legalDeliveryDataa?.data?.serviceResultSecondTimeOfService,
        //         secondDateAttempt: legalDeliveryDataa?.data?.serviceResultSecondAttemptDate,
        //         sex: legalDeliveryDataa?.data?.serviceResultSex,
        //         skinColor: legalDeliveryDataa?.data?.serviceResultSkinColor,
        //         age: legalDeliveryDataa?.data?.serviceResultAge,
        //         height: legalDeliveryDataa?.data?.serviceResultHeight,
        //         weight: legalDeliveryDataa?.data?.serviceResultWeight,
        //         hair: legalDeliveryDataa?.data?.serviceResultHair,
        //         otherFeatures: legalDeliveryDataa?.data?.serviceResultOtherFeatures,
        //         licNo: legalDeliveryDataa?.data?.serviceResultServerId?.licenseNo,
        //         locks: legalDeliveryDataa?.data?.serviceResultDoorLocks,
        //         serverAddress: legalDeliveryDataa?.data?.serviceResultServerId?.address1

        //     }))
        // }
    }, [])
    return (
        <>
            <div className="absolute h-[83.5vh] overflow-y-scroll relative">
                {resultData?.map(data => {
                    return <>
                        <TemplateOutlet>
                            {data?.serviceResultServerId?.serverCode === undefined ? <>  <Header
                                index=""
                                affidavitName=""
                                lic=""
                                serverName=""
                                serverAddress=""

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
                                />
                                <Footer /></> : <>  <Header
                                    index={data?.oLTIndexNo}
                                    affidavitName={data?.serviceType?.serviceTypeCod}
                                    lic={data?.serviceResultServerId?.licenseNo}
                                    serverName={data?.serviceResultServerId?.firstName}
                                    serverAddress={data?.serviceResultServerId?.address1}

                                />

                                <Body
                                    //RESULTS
                                    apt={data?.aptServe}
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
                                    lic={data?.serviceResultServerId?.licenseNo}
                                    //SERVICES
                                    inputDate={data?.inputDate}
                                    time={data?.updatedAt}
                                    address={data?.lTSAddress}
                                    firstNames={data?.lTSFirstName}
                                    serverName={data?.serviceResultServerId?.firstName}
                                    serverAddress={data?.serviceResultServerId?.address1}
                                    locks={data?.serviceResultDoorLocks}
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
                                    lic=""
                                    serverName=""
                                    serverAddress=""

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
                                    />
                                    <Footer /></> : <>  <Header
                                        index={data?.oLTIndexNo}
                                        affidavitName={data?.serviceType?.serviceTypeCod}
                                        lic={data?.serviceResultServerId?.licenseNo}
                                        serverName={data?.serviceResultServerId?.firstName}
                                        serverAddress={data?.serviceResultServerId?.address1}

                                    />

                                    <Body
                                        //RESULTS
                                        apt={data?.aptServe}
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
                                        lic={data?.serviceResultServerId?.licenseNo}
                                        //SERVICES
                                        inputDate={data?.inputDate}
                                        time={data?.updatedAt}
                                        address={data?.lTSAddress}
                                        firstNames={data?.lTSFirstName}
                                        serverName={data?.serviceResultServerId?.firstName}
                                        serverAddress={data?.serviceResultServerId?.address1}
                                        locks={data?.serviceResultDoorLocks}
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