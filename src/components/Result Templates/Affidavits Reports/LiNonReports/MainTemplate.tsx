import React, { forwardRef, useEffect, useRef, useState } from "react"
import TemplateOutlet from "../../TemplateOutlet"
import Header from "./Sections/Header"
import Footer from "./Sections/Footer"
import Body from "./Sections/Body"
import ReactToPrint from "react-to-print"
import Button from "../../../Buttons/Button/Button"
import { useSelector } from "react-redux"
import { RootState } from "../../../../redux/store"
// export interface LiNonReportsProps {
//     props?: any;
// }
// const LiNonReports = forwardRef<HTMLDivElement, LiNonReportsProps>((props, ref) => {
//     return (
//         <div ref={ref}>
//             <p>hihi</p>
//             <TemplateOutlet>
//                 <Header />
//                 <Body />
//                 <Footer />
//             </TemplateOutlet>
//         </div>
//     );
// });

// export default LiNonReports

const LiNonReports = () => {
    const LiNonReportsPrintRef = useRef<HTMLButtonElement | null>(null);
    const legalDeliveryDataa = useSelector((state: RootState) => state?.legalDelivery.selectedLegalDeliveryData)
    console.log("legalDeliveryDataa", legalDeliveryDataa)
    const [header, setHeader] = useState({
        index: "",
        petitioner: "",
        against: "",
        firstNameServe:"",
        licNo:"",
        address:"",

    })
    const [bodyData, setBodyData] = useState({
        dateOfService: "",
        sex: "",
        skinColor: "",
        age: "",
        height: "",
        weight: "",
        hair: "",
        dateOfMailing:"",
        serverName:"",
        lic:"",
        address:""
    })
    useEffect(() => {
        if (legalDeliveryDataa?.searchResult === "service") {
            setHeader(prev => ({
                ...prev,
                index: legalDeliveryDataa?.data?.oLTIndexNo,
                firstNameServe: legalDeliveryDataa?.data?.firstNameServe,
                address: legalDeliveryDataa?.data?.lTSAddress,
                
            }))
            setBodyData(prev => ({
                ...prev,
                dateOfService:legalDeliveryDataa?.data?.resultFormId?.serviceResultDateOfService,
                sex: legalDeliveryDataa?.data?.resultFormId?.serviceResultSex,
                skinColor: legalDeliveryDataa?.data?.resultFormId?.serviceResultSkinColor,
                age: legalDeliveryDataa?.data?.resultFormId?.serviceResultAge,
                height: legalDeliveryDataa?.data?.resultFormId?.serviceResultHeight,
                weight: legalDeliveryDataa?.data?.resultFormId?.serviceResultWeight,
                hair: legalDeliveryDataa?.data?.resultFormId?.serviceResultHair,
                dateOfMailing:legalDeliveryDataa?.data?.resultFormId?.serviceResultDateOfMailing,
                serverName:legalDeliveryDataa?.data?.resultFormId?.serviceResultServerId?.firstName,
                lic:legalDeliveryDataa?.data?.resultFormId?.serviceResultServerId?.licenseNo,
                address:legalDeliveryDataa?.data?.resultFormId?.serviceResultServerId?.address1


            }))
        } else if (legalDeliveryDataa?.searchResult === "standard") {
            setHeader(prev => ({
                ...prev,
                index: legalDeliveryDataa?.data?.oSSTIndexNo,
                firstNameServe: legalDeliveryDataa?.data?.firstNameServe,
                address: legalDeliveryDataa?.data?.addressServe,
                
            }))
            setBodyData(prev => ({
                ...prev,
                dateOfService:legalDeliveryDataa?.data?.resultFormId?.serviceResultDateOfService,
                sex: legalDeliveryDataa?.data?.resultFormId?.serviceResultSex,
                skinColor: legalDeliveryDataa?.data?.resultFormId?.serviceResultSkinColor,
                age: legalDeliveryDataa?.data?.resultFormId?.serviceResultAge,
                height: legalDeliveryDataa?.data?.resultFormId?.serviceResultHeight,
                weight: legalDeliveryDataa?.data?.resultFormId?.serviceResultWeight,
                hair: legalDeliveryDataa?.data?.resultFormId?.serviceResultHair,
                dateOfMailing:legalDeliveryDataa?.data?.resultFormId?.serviceResultDateOfMailing,
                serverName:legalDeliveryDataa?.data?.resultFormId?.serviceResultServerId?.firstName,
                lic:legalDeliveryDataa?.data?.resultFormId?.serviceResultServerId?.licenseNo,
                address:legalDeliveryDataa?.data?.resultFormId?.serviceResultServerId?.address1


            }))
        }
            else if (legalDeliveryDataa?.searchResult === "result") {
            setHeader(prev => ({
                ...prev,
                index: legalDeliveryDataa?.data?.serviceFormId?.oLTIndexNo,
                firstNameServe: legalDeliveryDataa?.data?.serviceFormId?.firstNameServe,
                address: legalDeliveryDataa?.data?.serviceFormId?.lTSAddress,
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
                dateOfMailing:legalDeliveryDataa?.data?.serviceResultDateOfMailing,
                serverName:legalDeliveryDataa?.data?.serviceResultServerId?.firstName,
                lic:legalDeliveryDataa?.data?.serviceResultServerId?.licenseNo,
                address:legalDeliveryDataa?.data?.serviceResultServerId?.address1


            }))
        }
    }, [])
    return (
        <>
            <div className="absolute h-[83.5vh] overflow-y-scroll relative">
                <TemplateOutlet>
                    <Header index={header?.index} firstNameServe={header?.firstNameServe} address={header?.address}/>
                    <Body 
                     sex= {bodyData?.sex}
                     skinColor= {bodyData?.skinColor}
                     age= {bodyData?.age}
                     height= {bodyData?.height}
                     weight= {bodyData?.weight}
                     hair= {bodyData?.hair}
                     dateOfMailing={bodyData?.dateOfMailing}
                     serverName={bodyData?.serverName}
                     lic={bodyData?.lic}
                     address={bodyData?.address}
             
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
                        content={() => LiNonReportsPrintRef.current}
                    />
                </div>
            </div>
            <div style={{ display: "none" }}>
                {/* The content to print */}
                <div ref={LiNonReportsPrintRef}>
                <TemplateOutlet>
                    <Header index={header?.index} firstNameServe={header?.firstNameServe} address={header?.address}/>
                    <Body 
                     sex= {bodyData?.sex}
                     skinColor= {bodyData?.skinColor}
                     age= {bodyData?.age}
                     height= {bodyData?.height}
                     weight= {bodyData?.weight}
                     hair= {bodyData?.hair}
                     dateOfMailing={bodyData?.dateOfMailing}
                     serverName={bodyData?.serverName}
                     lic={bodyData?.lic}
                     address={bodyData?.address}
             
                    />
                    <Footer />
                </TemplateOutlet>
                </div>
            </div>
        </>
    );
};

export default LiNonReports