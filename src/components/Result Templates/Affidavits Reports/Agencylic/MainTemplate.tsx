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
    const [header, setHeader] = useState({
        index: "",
        affidavitName: "",
        serviceName: "",
        licNo: "",
        
    })
    const [bodyData,setBodyData]=useState({
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
    })

    useEffect(() => {
        if (legalDeliveryDataa?.searchResult === "service") {
            setHeader(prev => ({
                ...prev,
                index: legalDeliveryDataa?.data?.oLTIndexNo,
                affidavitName: "",
                serviceName: "",
                licNo: "",
               
            }))
        }else if (legalDeliveryDataa?.searchResult === "result") {
        setBodyData(prev=>({...prev,
            apt: "",
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
            hair:  legalDeliveryDataa?.data?.serviceResultHair,
            otherFeatures: legalDeliveryDataa?.data?.serviceResultOtherFeatures,
        }))}
    }, [])
    console.log("legal delivery data", legalDeliveryDataa)
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
                    />
                        <Footer />
                    </TemplateOutlet>
                </div>
            </div>
        </>
    );
};

export default AgencyLic;
