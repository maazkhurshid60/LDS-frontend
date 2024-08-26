import React, { forwardRef, useEffect, useRef, useState } from "react";
import TemplateOutlet from "../../TemplateOutlet";
import Header from "./Section/Header";
import Body from "./Section/Body";
import Footer from "../Agencylic/Sections/Footer";
import ReactToPrint from "react-to-print";
import Button from "../../../Buttons/Button/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";

export interface TransPerSlipReportProps {
    props?: any;
}

const TransPerSlipReport = () => {
    const TransPerSlipReportPrintRef = useRef<HTMLButtonElement | null>(null);
    const legalDeliveryDataa = useSelector((state: RootState) => state?.legalDelivery.selectedLegalDeliveryData)
    console.log("legalDeliveryDataa", legalDeliveryDataa?.data)
    const [bodyData, setBodyData] = useState({
        name: "",
        lic: "",
        titleAction: "",
        nameServicesFirstName: "",
        paperServed: "",
        index: "",
        address: "",
        apt: "",
        city: "",
        zip: "",
        country: "",
        typeOfService: "",
        serviceCompleted: "",
        description: "",
        personServed: "",
        date: "",
        time: "",
        dateOfmailing: "",
        sex: "",
        skinColor: "",
        age: "",
        height: "",
        weight: "",
        hair: "",
        entry: "",
        wall: "",
        floor: "",
        door: "",
        locks: "",
        noOfLocks: "",
        commentOtherFeature: "",

    })

    useEffect(()=>{
        if (legalDeliveryDataa?.searchResult === "result") {
            setBodyData(prev => ({
                ...prev,
                index: legalDeliveryDataa?.data?.queryInformationLTIndexNo,
                address:legalDeliveryDataa?.data?.queryInformationLTAddress,
                typeOfService:legalDeliveryDataa?.data?.serviceResultScvType,
                personServed:legalDeliveryDataa?.data?.serviceResultlTServed,
                date:legalDeliveryDataa?.data?.serviceResultInputDate,
                dateOfmailing:legalDeliveryDataa?.data?.serviceResultDateOfMailing,
                sex:legalDeliveryDataa?.data?.serviceResultSex,
                skinColor:legalDeliveryDataa?.data?.serviceResultSkinColor,
                age:legalDeliveryDataa?.data?.serviceResultAge,
                height:legalDeliveryDataa?.data?.serviceResultHeight,
                weight:legalDeliveryDataa?.data?.serviceResultWeight,
                hair:legalDeliveryDataa?.data?.serviceResultHair,
                entry:legalDeliveryDataa?.data?.serviceResultEntry,
                wall:legalDeliveryDataa?.data?.serviceResultWall,
                floor:legalDeliveryDataa?.data?.serviceResultFloor,
                locks:legalDeliveryDataa?.data?.serviceResultDoorLocks,
                noOfLocks:legalDeliveryDataa?.data?.serviceResultLock,
                door:legalDeliveryDataa?.data?.serviceResultDoor, 
                lic:legalDeliveryDataa?.data?.serviceResultServerId?.licenseNo,       
                name:legalDeliveryDataa?.data?.serviceFormId?.firstNameServe ,
                nameServicesFirstName:legalDeliveryDataa?.data?.serviceFormId?.lTSFirstName ,
            }))
        }else  if (legalDeliveryDataa?.searchResult === "service"){
            setBodyData(prev => ({
                ...prev, 
                name:legalDeliveryDataa?.data?.firstNameServe ,
                nameServicesFirstName:legalDeliveryDataa?.data?.lTSFirstName ,
                index: legalDeliveryDataa?.data?.oLTIndexNo,
                address: legalDeliveryDataa?.data?.addressServe,
                apt: legalDeliveryDataa?.data?.lTSApt,
                city: legalDeliveryDataa?.data?.lTSCity,
                zip: legalDeliveryDataa?.data?.lTSZip,
                typeOfService: legalDeliveryDataa?.data?.lTServiceType?.name,
                description: legalDeliveryDataa?.data?.oLTDescription,
                personServed: legalDeliveryDataa?.data?.firstNameServe,
                date: legalDeliveryDataa?.data?.inputDate,
                lic:legalDeliveryDataa?.data?.resultFormId?.serviceResultServerId?.licenseNo,   
                dateOfmailing:legalDeliveryDataa?.data?.resultFormId?.serviceResultDateOfMailing,
                sex:legalDeliveryDataa?.data?.resultFormId?.serviceResultSex,
                skinColor:legalDeliveryDataa?.data?.resultFormId?.serviceResultSkinColor,
                age:legalDeliveryDataa?.data?.resultFormId?.serviceResultAge,
                height:legalDeliveryDataa?.data?.resultFormId?.serviceResultHeight,
                weight:legalDeliveryDataa?.data?.resultFormId?.serviceResultWeight,
                hair:legalDeliveryDataa?.data?.resultFormId?.serviceResultHair,
                entry:legalDeliveryDataa?.data?.resultFormId?.serviceResultEntry,
                wall:legalDeliveryDataa?.data?.resultFormId?.serviceResultWall,
                floor:legalDeliveryDataa?.data?.resultFormId?.serviceResultFloor,
                locks:legalDeliveryDataa?.data?.resultFormId?.serviceResultDoorLocks,
                noOfLocks:legalDeliveryDataa?.data?.resultFormId?.serviceResultLock,
                door:legalDeliveryDataa?.data?.resultFormId?.serviceResultDoor,
                

            }))
        } else  if (legalDeliveryDataa?.searchResult === "standard"){
            setBodyData(prev => ({
                ...prev, 
                name:legalDeliveryDataa?.data?.firstNameServe ,
                nameServicesFirstName:legalDeliveryDataa?.data?.lTSFirstName ,
                index: legalDeliveryDataa?.data?.oLTIndexNo,
                address: legalDeliveryDataa?.data?.addressServe,
                apt: legalDeliveryDataa?.data?.lTSApt,
                city: legalDeliveryDataa?.data?.lTSCity,
                zip: legalDeliveryDataa?.data?.lTSZip,
                typeOfService: legalDeliveryDataa?.data?.lTServiceType?.name,
                description: legalDeliveryDataa?.data?.oLTDescription,
                personServed: legalDeliveryDataa?.data?.firstNameServe,
                date: legalDeliveryDataa?.data?.inputDate,     
                lic:legalDeliveryDataa?.data?.resultFormId?.serviceResultServerId?.licenseNo,   
                dateOfmailing:legalDeliveryDataa?.data?.resultFormId?.serviceResultDateOfMailing,
                sex:legalDeliveryDataa?.data?.resultFormId?.serviceResultSex,
                skinColor:legalDeliveryDataa?.data?.resultFormId?.serviceResultSkinColor,
                age:legalDeliveryDataa?.data?.resultFormId?.serviceResultAge,
                height:legalDeliveryDataa?.data?.resultFormId?.serviceResultHeight,
                weight:legalDeliveryDataa?.data?.resultFormId?.serviceResultWeight,
                hair:legalDeliveryDataa?.data?.resultFormId?.serviceResultHair,
                entry:legalDeliveryDataa?.data?.resultFormId?.serviceResultEntry,
                wall:legalDeliveryDataa?.data?.resultFormId?.serviceResultWall,
                floor:legalDeliveryDataa?.data?.resultFormId?.serviceResultFloor,
                locks:legalDeliveryDataa?.data?.resultFormId?.serviceResultDoorLocks,
                noOfLocks:legalDeliveryDataa?.data?.resultFormId?.serviceResultLock,
                door:legalDeliveryDataa?.data?.resultFormId?.serviceResultDoor,   
            }))
        }
    },[])
    return (
        <>
            <div className="absolute h-[83.5vh] overflow-y-scroll relative">
                <TemplateOutlet>
                    <Header />
                    <Body
                        name={bodyData?.name}
                        lic={bodyData?.lic}
                        titleAction={bodyData?.titleAction}
                        nameServicesFirstName={bodyData?.nameServicesFirstName}
                        paperServed={bodyData?.paperServed}
                        index={bodyData?.index}
                        address={bodyData?.address}
                        apt={bodyData?.apt}
                        city={bodyData?.city}
                        zip={bodyData?.zip}
                        country={bodyData?.country}
                        typeOfService={bodyData?.typeOfService}
                        serviceCompleted={bodyData?.serviceCompleted}
                        description={bodyData?.description}
                        personServed={bodyData?.personServed}
                        date={bodyData?.date}
                        time={bodyData?.time}
                        dateOfmailing={bodyData?.dateOfmailing}
                        sex={bodyData?.sex}
                        skinColor={bodyData?.skinColor}
                        age={bodyData?.age}
                        height={bodyData?.height}
                        weight={bodyData?.weight}
                        hair={bodyData?.hair}
                        entry={bodyData?.entry}
                        wall={bodyData?.wall}
                        floor={bodyData?.floor}
                        door={bodyData?.door}
                        locks={bodyData?.locks}
                        noOfLocks={bodyData?.noOfLocks}
                        commentOtherFeature={bodyData?.commentOtherFeature}
                    />
                </TemplateOutlet>
                <div className="flex justify-end mt-5 mb-5 mr-5">
                    <ReactToPrint
                        trigger={() => (
                            <div className="w-[10%]">
                                <Button text="Print" />
                            </div>
                        )}
                        content={() => TransPerSlipReportPrintRef.current}
                    />
                </div>
            </div>
            <div style={{ display: "none" }}>
                {/* The content to print */}
                <div ref={TransPerSlipReportPrintRef}>
                <TemplateOutlet>
                    <Header />
                    <Body
                        name={bodyData?.name}
                        lic={bodyData?.lic}
                        titleAction={bodyData?.titleAction}
                        nameServicesFirstName={bodyData?.nameServicesFirstName}
                        paperServed={bodyData?.paperServed}
                        index={bodyData?.index}
                        address={bodyData?.address}
                        apt={bodyData?.apt}
                        city={bodyData?.city}
                        zip={bodyData?.zip}
                        country={bodyData?.country}
                        typeOfService={bodyData?.typeOfService}
                        serviceCompleted={bodyData?.serviceCompleted}
                        description={bodyData?.description}
                        personServed={bodyData?.personServed}
                        date={bodyData?.date}
                        time={bodyData?.time}
                        dateOfmailing={bodyData?.dateOfmailing}
                        sex={bodyData?.dateOfmailing}
                        skinColor={bodyData?.skinColor}
                        age={bodyData?.age}
                        height={bodyData?.height}
                        weight={bodyData?.weight}
                        hair={bodyData?.hair}
                        entry={bodyData?.entry}
                        wall={bodyData?.wall}
                        floor={bodyData?.floor}
                        door={bodyData?.door}
                        locks={bodyData?.locks}
                        noOfLocks={bodyData?.noOfLocks}
                        commentOtherFeature={bodyData?.commentOtherFeature}
                    />
                </TemplateOutlet>
                </div>
            </div>
        </>
    );
};
export default TransPerSlipReport