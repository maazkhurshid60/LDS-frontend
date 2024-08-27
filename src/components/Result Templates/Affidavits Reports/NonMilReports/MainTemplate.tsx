import React, { forwardRef, useEffect, useRef, useState } from "react";
import TemplateOutlet from "../../TemplateOutlet";
import Header from "./Sections/Header";
import Body from "./Sections/Body";
import Footer from "./Sections/Footer";
import ReactToPrint from "react-to-print";
import Button from "../../../Buttons/Button/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";

const NonMilReport = () => {
    const NonMilReportPrintRef = useRef<HTMLButtonElement | null>(null);
    const legalDeliveryDataa = useSelector((state: RootState) => state?.legalDelivery.selectedLegalDeliveryData)
    const [header, setHeader] = useState({
        index: "",
        petitioner: "",
        against: "",

    })
    const [bodyData, setBodyData] = useState({
        dateOfService: "",
        sex: "",
        skinColor: "",
        age: "",
        height: "",
        weight: "",
        hair: "",
        serverName: "",
        serverAddress: "",
        serverLicense: "",
        mailingAddressDate: "",
        name: "",
        address: ""


    })
    useEffect(() => {
        if (legalDeliveryDataa?.searchResult === "service" || legalDeliveryDataa?.searchResult === "standard") {
            setHeader(prev => ({
                ...prev,
                index: legalDeliveryDataa?.data?.oLTIndexNo,

            }))
            setBodyData(prev => ({
                ...prev,
                dateOfService: legalDeliveryDataa?.data?.resultFormId?.serviceResultDateOfService,
                sex: legalDeliveryDataa?.data?.resultFormId?.serviceResultSex,
                skinColor: legalDeliveryDataa?.data?.resultFormId?.serviceResultSkinColor,
                age: legalDeliveryDataa?.data?.resultFormId?.serviceResultAge,
                height: legalDeliveryDataa?.data?.resultFormId?.serviceResultHeight,
                weight: legalDeliveryDataa?.data?.resultFormId?.serviceResultWeight,
                hair: legalDeliveryDataa?.data?.resultFormId?.serviceResultHair,
                serverName: legalDeliveryDataa?.data?.resultFormId?.serviceResultServerId?.firstName,
                serverAddress: legalDeliveryDataa?.data?.resultFormId?.serviceResultServerId?.address1,
                serverLicense: legalDeliveryDataa?.data?.resultFormId?.serviceResultServerId?.licenseNo,
                mailingAddressDate: legalDeliveryDataa?.data?.resultFormId?.serviceResultDateOfMailing,
                name: legalDeliveryDataa?.data?.lTSFirstName,
                address: legalDeliveryDataa?.data?.lTSAddress,


            }))
        } else if (legalDeliveryDataa?.searchResult === "result") {
            setHeader(prev => ({
                ...prev,
                index: legalDeliveryDataa?.data?.serviceFormId?.oLTIndexNo,

            }))
            setBodyData(prev => ({
                ...prev,
                dateOfService: legalDeliveryDataa?.data?.serviceResultDateOfService,
                sex: legalDeliveryDataa?.data?.serviceResultSex,
                skinColor: legalDeliveryDataa?.data?.serviceResultSkinColor,
                age: legalDeliveryDataa?.data?.serviceResultAge,
                height: legalDeliveryDataa?.data?.serviceResultHeight,
                weight: legalDeliveryDataa?.data?.serviceResultWeight,
                hair: legalDeliveryDataa?.data?.serviceResultHair,
                serverName: legalDeliveryDataa?.data?.serviceResultServerId?.firstName,
                serverAddress: legalDeliveryDataa?.data?.serviceResultServerId?.address1,
                serverLicense: legalDeliveryDataa?.data?.serviceResultServerId?.licenseNo,
                mailingAddressDate: legalDeliveryDataa?.data?.serviceResultDateOfMailing,
                name: legalDeliveryDataa?.data?.serviceFormId?.lTSFirstName,
                address: legalDeliveryDataa?.data?.serviceFormId?.lTSAddress,
            }))
        }
    }, [])

    console.log(legalDeliveryDataa?.data?.lTSAddress
    )
    return (
        <>
            <div className="absolute h-[83.5vh] overflow-y-scroll relative">
                <TemplateOutlet>
                    <Header index={header?.index} />
                    <Body
                        sex={bodyData?.sex}
                        skinColor={bodyData?.skinColor}
                        age={bodyData?.age}
                        height={bodyData?.height}
                        weight={bodyData?.weight}
                        hair={bodyData?.hair}
                        dateOfService={bodyData?.dateOfService}
                        serverName={bodyData?.serverName}
                        serverAddress={bodyData?.serverAddress}
                        serverLicense={bodyData?.serverLicense}
                        mailingAddressDate={bodyData?.mailingAddressDate}
                        address={bodyData?.address}
                        name={bodyData?.name}

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
                        content={() => NonMilReportPrintRef.current}
                    />
                </div>
            </div>
            <div style={{ display: "none" }}>
                {/* The content to print */}
                <div ref={NonMilReportPrintRef}>
                <TemplateOutlet>
                    <Header index={header?.index} />
                    <Body
                        sex={bodyData?.sex}
                        skinColor={bodyData?.skinColor}
                        age={bodyData?.age}
                        height={bodyData?.height}
                        weight={bodyData?.weight}
                        hair={bodyData?.hair}
                        dateOfService={bodyData?.dateOfService}
                        serverName={bodyData?.serverName}
                        serverAddress={bodyData?.serverAddress}
                        serverLicense={bodyData?.serverLicense}
                        mailingAddressDate={bodyData?.mailingAddressDate}
                        address={bodyData?.address}
                        name={bodyData?.name}

                    />
                    <Footer />
                </TemplateOutlet>
                </div>
            </div>
        </>
    );
};
export default NonMilReport