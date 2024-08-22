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
    console.log("legalDeliveryDataa?.data?.inputDate", legalDeliveryDataa?.data)

    const [header, setHeader] = useState({
        index: "",
        affidavitName: "",
        serviceName: "",
        licNo: "",

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
        licNo:""
    })
    useEffect(() => {
        if (legalDeliveryDataa?.searchResult === "service" || legalDeliveryDataa?.searchResult === "standard") {
            // SERVICES STARTS
            setHeader(prev => ({
                ...prev,
                index: legalDeliveryDataa?.data?.oLTIndexNo,
                affidavitName: legalDeliveryDataa?.data?.serviceType?.serviceTypeCode,
                serviceName: "",
                licNo: legalDeliveryDataa?.data?.resultFormId?.serviceResultServerId?.licenseNo,

            }))
            setBodyData(prev => ({
                ...prev,
                apt: legalDeliveryDataa?.data?.aptServe,
                inputDate: legalDeliveryDataa?.data?.inputDate,
                time: legalDeliveryDataa?.data?.updatedAt,
                address: legalDeliveryDataa?.data?.lTSAddress,
                firstNames: legalDeliveryDataa?.data?.lTSFirstName,
                dateOfService: legalDeliveryDataa?.data?.resultFormId?.serviceResultDateOfService,
                dateOfMailing:legalDeliveryDataa?.data?.resultFormId?.serviceResultDateOfMailing,
                serverName: legalDeliveryDataa?.data?.resultFormId?.serviceResultServerId?.firstName,
                reciepientTitle: legalDeliveryDataa?.data?.resultFormId?.serviceResultRecipientTitle,
                firstTimeAttempt: legalDeliveryDataa?.data?.resultFormId?.serviceResultFirstTimeOfService,
                firstDateAttempt: legalDeliveryDataa?.data?.resultFormId?.serviceResultFirstAttemptDate,
                secondTimeAttempt: legalDeliveryDataa?.data?.resultFormId?.serviceResultSecondTimeOfService,
                secondDateAttempt: legalDeliveryDataa?.data?.resultFormId?.serviceResultSecondAttemptDate,
                sex: legalDeliveryDataa?.data?.resultFormId?.serviceResultSex,
                skinColor: legalDeliveryDataa?.data?.resultFormId?.serviceResultSkinColor,
                age: legalDeliveryDataa?.data?.resultFormId?.serviceResultAge,
                height: legalDeliveryDataa?.data?.resultFormId?.serviceResultHeight,
                weight: legalDeliveryDataa?.data?.resultFormId?.serviceResultWeight,
                hair: legalDeliveryDataa?.data?.resultFormId?.serviceResultHair,
                otherFeatures: legalDeliveryDataa?.data?.resultFormId?.serviceResultOtherFeatures,
                licNo: legalDeliveryDataa?.data?.resultFormId?.serviceResultServerId?.licenseNo,
            }))
            // SERVICES ENDS

        } else if (legalDeliveryDataa?.searchResult === "result") {
            setHeader(prev => ({
                ...prev,
                index: legalDeliveryDataa?.data?.queryInformationLTIndexNo,
                affidavitName: legalDeliveryDataa?.data?.serviceResultScvType?.serviceTypeCode,
                serviceName: "",
                licNo: legalDeliveryDataa?.data?.serviceResultServerId?.licenseNo
            }))
            setBodyData(prev => ({
                ...prev,
                apt: legalDeliveryDataa?.data?.serviceFormId?.aptServe,
                inputDate: legalDeliveryDataa?.data?.serviceFormId?.inputDate,
                time: legalDeliveryDataa?.data?.serviceFormId?.updatedAt,
                address: legalDeliveryDataa?.data?.serviceFormId?.lTSAddress,
                firstNames: legalDeliveryDataa?.data?.serviceFormId?.lTSFirstName,
                dateOfService: legalDeliveryDataa?.data?.serviceResultDateOfService,
                dateOfMailing:legalDeliveryDataa?.data?.serviceResultDateOfMailing,
                serverName: legalDeliveryDataa?.data?.serviceResultServerId?.firstName,
                reciepientTitle: legalDeliveryDataa?.data?.serviceResultRecipientTitle,
                firstTimeAttempt: legalDeliveryDataa?.data?.serviceResultFirstTimeOfService,
                firstDateAttempt: legalDeliveryDataa?.data?.serviceResultFirstAttemptDate,
                secondTimeAttempt: legalDeliveryDataa?.data?.serviceResultSecondTimeOfService,
                secondDateAttempt: legalDeliveryDataa?.data?.serviceResultSecondAttemptDate,
                sex: legalDeliveryDataa?.data?.serviceResultSex,
                skinColor: legalDeliveryDataa?.data?.serviceResultSkinColor,
                age: legalDeliveryDataa?.data?.serviceResultAge,
                height: legalDeliveryDataa?.data?.serviceResultHeight,
                weight: legalDeliveryDataa?.data?.serviceResultWeight,
                hair: legalDeliveryDataa?.data?.serviceResultHair,
                otherFeatures: legalDeliveryDataa?.data?.serviceResultOtherFeatures,
                licNo: legalDeliveryDataa?.data?.serviceResultServerId?.licenseNo,
            }))
        }
    }, [])
    return (
        <>
            <div className="absolute h-[83.5vh] overflow-y-scroll relative">
                <TemplateOutlet>
                    <Header
                        index={header?.index}
                        affidavitName={header?.affidavitName}
                        licNo={header?.licNo}
                        serviceName={header?.serviceName} />
                    <Body
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
                        content={() => agencyLicPrintRef.current}
                    />
                </div>
            </div>

            <div style={{ display: "none" }}>
                {/* The content to print */}
                <div ref={agencyLicPrintRef}>
                <TemplateOutlet>
                    <Header
                        index={header?.index}
                        affidavitName={header?.affidavitName}
                        licNo={header?.licNo}
                        serviceName={header?.serviceName} />
                    <Body
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

                    />
                    <Footer />
                </TemplateOutlet>

                </div>
            </div>
        </>
    );
};

export default AgencyLic;
