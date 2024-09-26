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
    const [resultData, setResultData] = useState([]);
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
        setResultData(legalDeliveryDataa?.data)

    }, [])


    return (
        <>
            <div className="absolute h-[83.5vh] overflow-y-scroll relative">
                {resultData?.map(data => {
                    return <TemplateOutlet>
                        {data?.serviceResultServerId?.serverCode === undefined ? <> <Header index="" />
                            <Body
                                sex=""
                                skinColor=""
                                age=""
                                height=""
                                weight=""
                                hair=""
                                dateOfService=""
                                serverName=""
                                serverAddress=""

                                serverLicense=""
                                mailingAddressDate=""
                                address=""
                                name=""

                            />
                            <Footer /></> : <> <Header index={data?.oLTIndexNo} />
                            <Body
                                sex={data?.serviceResultSex}
                                skinColor={data?.serviceResultSkinColor}
                                age={data?.serviceResultAge}
                                height={data?.serviceResultHeight}
                                weight={data?.serviceResultWeight}
                                hair={data?.serviceResultHair}
                                dateOfService={data?.dateOfService}
                                serverName={data?.serviceResultServerId?.firstName}
                                serverAddress={data?.serviceResultServerId?.address1}

                                serverLicense={data?.serviceResultServerId?.licenseNo}
                                mailingAddressDate={data?.mailingAddressDate}
                                address={data?.lTSAddress}
                                name={data?.lTSFirstName}

                            />
                            <Footer /></>}

                    </TemplateOutlet>
                })}

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
                    {resultData?.map(data => {
                        return <TemplateOutlet>
                            {data?.serviceResultServerId?.serverCode === undefined || data?.serviceResultServerId?.serverCode === null ? <>
                                <Header index="" />
                                <Body
                                    sex=""
                                    skinColor=""
                                    age=""
                                    height=""
                                    weight=""
                                    hair=""
                                    dateOfService=""
                                    serverName=""
                                    serverAddress=""

                                    serverLicense=""
                                    mailingAddressDate=""
                                    address=""
                                    name=""

                                />
                                <Footer /></> : <> <Header index={data?.oLTIndexNo} />
                                <Body
                                    sex={data?.serviceResultSex}
                                    skinColor={data?.serviceResultSkinColor}
                                    age={data?.serviceResultAge}
                                    height={data?.serviceResultHeight}
                                    weight={data?.serviceResultWeight}
                                    hair={data?.serviceResultHair}
                                    dateOfService={data?.dateOfService}
                                    serverName={data?.serviceResultServerId?.firstName}
                                    serverAddress={data?.serviceResultServerId?.address1}

                                    serverLicense={data?.serviceResultServerId?.licenseNo}
                                    mailingAddressDate={data?.mailingAddressDate}
                                    address={data?.lTSAddress}
                                    name={data?.lTSFirstName}

                                />
                                <Footer /></>}

                        </TemplateOutlet>
                    })}
                </div>
            </div>
        </>
    );
};
export default NonMilReport