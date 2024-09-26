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
        setResultData(legalDeliveryDataa?.data)


    }, [])
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
                            <div className="">
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
                            </div>
                        </>
                    })}


                </div>
            </div>
        </>
    );
};

export default AgencyLic;
