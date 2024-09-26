import React, { forwardRef, useEffect, useRef, useState } from "react"
import TemplateOutlet from "../../TemplateOutlet"
import Header from "./Sections/Header"
import Footer from "./Sections/Footer"
import Body from "./Sections/Body"
import ReactToPrint from "react-to-print"
import Button from "../../../Buttons/Button/Button"
import { useSelector } from "react-redux"
import { RootState } from "../../../../redux/store"
const LiNonReports = () => {
    const LiNonReportsPrintRef = useRef<HTMLButtonElement | null>(null);
    const legalDeliveryDataa = useSelector((state: RootState) => state?.legalDelivery.selectedLegalDeliveryData)
    const [resultData, setResultData] = useState([]);

    const [header, setHeader] = useState({
        index: "",
        petitioner: "",
        against: "",
        firstNameServe: "",
        licNo: "",
        address: "",

    })
    const [bodyData, setBodyData] = useState({
        dateOfService: "",
        sex: "",
        skinColor: "",
        age: "",
        height: "",
        weight: "",
        hair: "",
        dateOfMailing: "",
        serverName: "",
        lic: "",
        address: ""
    })
    useEffect(() => {
        setResultData(legalDeliveryDataa?.data)

    }, [])
    return (
        <>
            <div className="absolute overflow-y-scroll relative">
                <div className="flex justify-end mt-5 mb-5 mr-5">
                    <ReactToPrint
                        trigger={() => (
                            <div className="w-[10%]">
                                <Button text="Print" />
                            </div>
                        )}
                        content={() => LiNonReportsPrintRef.current}
                    />
                </div>
                {
                    resultData?.map(data => {
                        return <>
                            <TemplateOutlet>
                                <div>
                                    {data?.serviceResultServerId?.serverCode === undefined ? <>
                                        <Header index="" firstNameServe="" address="" />
                                        <Body
                                            sex=""
                                            skinColor=""
                                            age=""
                                            height=""
                                            weight=""
                                            hair=""
                                            dateOfMailing=""
                                            serverName=""
                                            lic=""
                                            address=""
                                            dateOfService=""

                                        /></> : <> <Header index={data?.oLTIndexNo} firstNameServe={data?.firstNameServe} address={data?.lTSAddress} />
                                        <Body
                                            sex={data?.serviceResultSex}
                                            skinColor={data?.serviceResultSkinColor}
                                            age={data?.serviceResultAge}
                                            height={data?.serviceResultHeight}
                                            weight={data?.serviceResultWeight}
                                            hair={data?.serviceResultHair}
                                            dateOfMailing={data?.serviceResultDateOfMailing}
                                            serverName={data?.serviceResultServerId?.firstName}
                                            lic={data?.serviceResultServerId?.licenseNo}
                                            address={data?.serviceResultServerId?.address1}
                                            dateOfService={data?.serviceResultDateOfService}

                                        /></>}

                                </div>

                                <Footer />
                            </TemplateOutlet >
                        </>
                    })}
                <div className="flex justify-end mt-5 mb-5 mr-5">
                    <ReactToPrint
                        trigger={() => (
                            <div className="w-[10%]">
                                <Button text="Print" />
                            </div>
                        )}
                        content={() => LiNonReportsPrintRef.current}
                    />
                </div>
            </div>
            <div style={{ display: "none" }}>
                {/* The content to print */}
                <div ref={LiNonReportsPrintRef}>
                    {resultData?.map(data => {
                        return <>
                            <TemplateOutlet>
                                <div className="">
                                    {data?.serviceResultServerId?.serverCode === undefined ? <>
                                        <Header index="" firstNameServe="" address="" />
                                        <Body
                                            sex=""
                                            skinColor=""
                                            age=""
                                            height=""
                                            weight=""
                                            hair=""
                                            dateOfMailing=""
                                            serverName=""
                                            lic=""
                                            address=""
                                            dateOfService=""

                                        /></> : <> <Header index={data?.oLTIndexNo} firstNameServe={data?.firstNameServe} address={data?.lTSAddress} />
                                        <Body
                                            sex={data?.serviceResultSex}
                                            skinColor={data?.serviceResultSkinColor}
                                            age={data?.serviceResultAge}
                                            height={data?.serviceResultHeight}
                                            weight={data?.serviceResultWeight}
                                            hair={data?.serviceResultHair}
                                            dateOfMailing={data?.serviceResultDateOfMailing}
                                            serverName={data?.serviceResultServerId?.firstName}
                                            lic={data?.serviceResultServerId?.licenseNo}
                                            address={data?.serviceResultServerId?.address1}
                                            dateOfService={data?.serviceResultDateOfService}

                                        /></>}

                                </div>

                                <Footer />
                            </TemplateOutlet>
                        </>
                    })}
                </div>
            </div>
        </>
    );
};

export default LiNonReports