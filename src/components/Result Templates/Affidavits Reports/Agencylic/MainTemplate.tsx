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
        serviceName: "",
        licNo: "",

    })
    console.log("legalDeliveryDataa?.data?.inputDate", resultData?.map(data => data?.serviceResultServerId?.serverCode === undefined))
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
        serverAddress: ""
    })
    useEffect(() => {

        // legalDeliveryDataa?.data?.map(data =>

        //     setHeader(prev => ({
        //         ...prev,
        //         index: data?.oLTIndexNo,
        //         affidavitName: data?.serviceType?.serviceTypeCode,
        //         serviceName: "",
        //         licNo: data?.serviceResultServerId?.licenseNo,

        //     }))
        // )
        setResultData(legalDeliveryDataa?.data)

        // if (legalDeliveryDataa?.searchResult === "service" || legalDeliveryDataa?.searchResult === "standard") {
        //     // SERVICES STARTS
        //     setHeader(prev => ({
        //         ...prev,
        //         index: legalDeliveryDataa?.data?.oLTIndexNo,
        //         affidavitName: legalDeliveryDataa?.data?.serviceType?.serviceTypeCode,
        //         serviceName: "",
        //         licNo: legalDeliveryDataa?.data?.resultFormId?.serviceResultServerId?.licenseNo,

        //     }))
        //     setBodyData(prev => ({
        //         ...prev,
        //         apt: legalDeliveryDataa?.data?.aptServe,
        //         inputDate: legalDeliveryDataa?.data?.inputDate,
        //         time: legalDeliveryDataa?.data?.updatedAt,
        //         address: legalDeliveryDataa?.data?.lTSAddress,
        //         firstNames: legalDeliveryDataa?.data?.lTSFirstName,
        //         dateOfService: legalDeliveryDataa?.data?.resultFormId?.serviceResultDateOfService,
        //         dateOfMailing:legalDeliveryDataa?.data?.resultFormId?.serviceResultDateOfMailing,
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
        //         serverAddress: legalDeliveryDataa?.data?.resultFormId?.serviceResultServerId?.address1,
        //     }))
        //     // SERVICES ENDS

        // } else if (legalDeliveryDataa?.searchResult === "result") {
        //     setHeader(prev => ({
        //         ...prev,
        //         index: legalDeliveryDataa?.data?.queryInformationLTIndexNo,
        //         affidavitName: legalDeliveryDataa?.data?.serviceResultScvType?.serviceTypeCode,
        //         serviceName: "",
        //         licNo: legalDeliveryDataa?.data?.serviceResultServerId?.licenseNo
        //     }))
        //     setBodyData(prev => ({
        //         ...prev,
        //         apt: legalDeliveryDataa?.data?.serviceFormId?.aptServe,
        //         inputDate: legalDeliveryDataa?.data?.serviceFormId?.inputDate,
        //         time: legalDeliveryDataa?.data?.serviceFormId?.updatedAt,
        //         address: legalDeliveryDataa?.data?.serviceFormId?.lTSAddress,
        //         firstNames: legalDeliveryDataa?.data?.serviceFormId?.lTSFirstName,
        //         dateOfService: legalDeliveryDataa?.data?.serviceResultDateOfService,
        //         dateOfMailing:legalDeliveryDataa?.data?.serviceResultDateOfMailing,
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
        //         serverAddress: legalDeliveryDataa?.data?.serviceResultServerId?.address1,

        //     }))
        // }
    }, [])
    return (
        <>
            <div className="absolute h-[83.5vh] overflow-y-scroll relative">
                {resultData?.map(data => {
                    return <>
                        <TemplateOutlet>
                            {data?.serviceResultServerId?.serverCode === undefined ? <> <Header
                                index=""
                                affidavitName=""
                                licNo=""
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
                                />
                                <Footer /></> : <> <Header
                                    index={data?.oLTIndexNo}
                                    affidavitName={data?.serviceType?.serviceTypeCode}
                                    licNo={data?.serviceResultServerId?.licenseNo}
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
                                />
                                <Footer /></>
                            }

                        </TemplateOutlet>
                    </>
                })}
                {/* <Header
                        index={header?.index}
                        affidavitName={header?.affidavitName}
                        licNo={header?.licNo}
                        serviceName={header?.serviceName} /> */}
                {/* <Body
                        //RESULTS
                        apt={bodyData?.apt}
                        reciepientTitle={bodyData?.reciepientTitle}
                        firstTimeAttempt={bodyData?.firstDateAttempt}
                        firstDateAttempt={bodyData?.firstTimeAttempt}
                        secondTimeAttempt={bodyData?.secondTimeAttempt}
                        secondDateAttempt={bodyData?.secondDateAttempt}
                        sex={bodyData?.sex}
                        skinColor={bodyData?.skinColor}
                        age={bodyData?.age}
                        height={bodyData?.height}
                        weight={bodyData?.weight}
                        hair={bodyData?.hair}
                        otherFeatures={bodyData?.otherFeatures}
                        dateOfMailing={bodyData?.dateOfMailing}
                        dateOfService={bodyData?.dateOfService}
                        lic={bodyData?.licNo}
                        //SERVICES
                        inputDate={bodyData?.inputDate}
                        time={bodyData?.time}
                        address={bodyData?.address}
                        firstNames={bodyData?.firstNames}
                        serverName={bodyData?.serverName}
                        serverAddress={bodyData?.serverAddress}
                    /> */}


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
                            <TemplateOutlet>
                                {data?.serviceResultServerId?.serverCode === undefined ? <> <Header
                                    index=""
                                    affidavitName=""
                                    licNo=""
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
                                    />
                                    <Footer /></> : <> <Header
                                        index={data?.oLTIndexNo}
                                        affidavitName={data?.serviceType?.serviceTypeCode}
                                        licNo={data?.serviceResultServerId?.licenseNo}
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
                                    />
                                    <Footer /></>
                                }

                            </TemplateOutlet>
                        </>
                    })}

                </div>
            </div>
        </>
    );
};

export default AgencyLic;
