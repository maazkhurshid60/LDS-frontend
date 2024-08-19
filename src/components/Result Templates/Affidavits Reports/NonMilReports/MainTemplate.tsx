import React, { forwardRef, useEffect, useRef, useState } from "react";
import TemplateOutlet from "../../TemplateOutlet";
import Header from "./Sections/Header";
import Body from "./Sections/Body";
import Footer from "./Sections/Footer";
import ReactToPrint from "react-to-print";
import Button from "../../../Buttons/Button/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";

const NonMilReport =() => {
    const NonMilReportPrintRef = useRef<HTMLButtonElement | null>(null);
    const legalDeliveryDataa = useSelector((state: RootState) => state?.legalDelivery.selectedLegalDeliveryData)
    console.log("legalDeliveryDataa", legalDeliveryDataa)
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
        } else if (legalDeliveryDataa?.searchResult === "result") {
            setHeader(prev => ({
                ...prev,
                index: legalDeliveryDataa?.queryInformationLTIndexNo,

            }))
            setBodyData(prev => ({
                ...prev,
                dateOfService:legalDeliveryDataa?.data?.serviceResultDateOfService,
                sex: legalDeliveryDataa?.data?.serviceResultSex,
                skinColor: legalDeliveryDataa?.data?.serviceResultSkinColor,
                age: legalDeliveryDataa?.data?.serviceResultAge,
                height: legalDeliveryDataa?.data?.serviceResultHeight,
                weight: legalDeliveryDataa?.data?.serviceResultWeight,
                hair: legalDeliveryDataa?.data?.serviceResultHair,

            }))
        }
    }, [])
    return (
        <>
        <div className="absolute h-[83.5vh] overflow-y-scroll relative">
            <TemplateOutlet>
            <Header index={header?.index} />
                    <Body 
                     sex= {bodyData?.sex}
                     skinColor= {bodyData?.skinColor}
                     age= {bodyData?.age}
                     height= {bodyData?.height}
                     weight= {bodyData?.weight}
                     hair= {bodyData?.hair}
             
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
                        <Header />
                        <Body />
                        <Footer />
                    </TemplateOutlet>
                </div>
            </div>
            </>
    );
};
export default NonMilReport