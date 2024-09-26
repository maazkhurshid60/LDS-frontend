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
    const [resultData, setResultData] = useState([]);

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

    useEffect(() => {
        setResultData(legalDeliveryDataa?.data)

    }, [])
    return (
        <>
            <div className="absolute h-[83.5vh] overflow-y-scroll relative">
                {resultData?.map(data => {
                    return <>

                        <TemplateOutlet>
                            {data?.serviceResultServerId?.serverCode === undefined || data?.serviceResultServerId?.serverCode === null ? <>

                                <Header />
                                <Body
                                    name=""
                                    lic=""
                                    titleAction=""
                                    nameServicesFirstName=""
                                    paperServed=""
                                    index=""
                                    address=""
                                    apt=""
                                    city=""
                                    zip=""
                                    typeOfService=""
                                    serviceCompleted=""
                                    description=""
                                    personServed=""
                                    date=""
                                    time=""
                                    dateOfmailing=""
                                    sex=""
                                    skinColor=""
                                    age=""
                                    height=""
                                    weight=""
                                    hair=""
                                    entry=""
                                    wall=""
                                    floor=""
                                    door=""
                                    locks=""
                                    noOfLocks=""
                                    commentOtherFeature=""
                                />
                            </> : <>

                                <Header />
                                <Body
                                    name={data?.firstNameServe}
                                    lic={data?.serviceResultServerId?.licenseNo}
                                    titleAction={data?.titleAction}
                                    nameServicesFirstName={data?.lTSFirstName}
                                    paperServed={data?.paperServed}
                                    index={data?.oLTIndexNo}
                                    address={data?.addressServe}
                                    apt={data?.lTSApt}
                                    city={data?.lTSCity}
                                    zip={data?.lTSZip}
                                    typeOfService={data?.lTServiceType?.name}
                                    serviceCompleted={data?.serviceCompleted}
                                    description={data?.oLTDescription}
                                    personServed={data?.firstNameServe}
                                    date={data?.inputDate}
                                    time={data?.time}
                                    dateOfmailing={data?.serviceResultDateOfMailing}
                                    sex={data?.serviceResultSex}
                                    skinColor={data?.serviceResultSkinColor}
                                    age={data?.serviceResultAge}
                                    height={data?.serviceResultHeight}
                                    weight={data?.serviceResultWeight}
                                    hair={data?.serviceResultHair}
                                    entry={data?.serviceResultEntry}
                                    wall={data?.serviceResultWall}
                                    floor={data?.serviceResultFloor}
                                    door={data?.serviceResultDoorLocks}
                                    locks={data?.serviceResultLock}
                                    noOfLocks={data?.serviceResultDoor}
                                    commentOtherFeature={data?.serviceResultOtherDescription}
                                /></>}

                        </TemplateOutlet>
                    </>
                })}

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
                    {resultData?.map(data => {
                        return <>

                            <TemplateOutlet>
                                {data?.serviceResultServerId?.serverCode === undefined || data?.serviceResultServerId?.serverCode === null ? <>

                                    <Header />
                                    <Body
                                        name=""
                                        lic=""
                                        titleAction=""
                                        nameServicesFirstName=""
                                        paperServed=""
                                        index=""
                                        address=""
                                        apt=""
                                        city=""
                                        zip=""
                                        typeOfService=""
                                        serviceCompleted=""
                                        description=""
                                        personServed=""
                                        date=""
                                        time=""
                                        dateOfmailing=""
                                        sex=""
                                        skinColor=""
                                        age=""
                                        height=""
                                        weight=""
                                        hair=""
                                        entry=""
                                        wall=""
                                        floor=""
                                        door=""
                                        locks=""
                                        noOfLocks=""
                                        commentOtherFeature=""
                                    />
                                </> : <>

                                    <Header />
                                    <Body
                                        name={data?.firstNameServe}
                                        lic={data?.serviceResultServerId?.licenseNo}
                                        titleAction={data?.titleAction}
                                        nameServicesFirstName={data?.lTSFirstName}
                                        paperServed={data?.paperServed}
                                        index={data?.oLTIndexNo}
                                        address={data?.addressServe}
                                        apt={data?.lTSApt}
                                        city={data?.lTSCity}
                                        zip={data?.lTSZip}
                                        typeOfService={data?.lTServiceType?.name}
                                        serviceCompleted={data?.serviceCompleted}
                                        description={data?.oLTDescription}
                                        personServed={data?.firstNameServe}
                                        date={data?.inputDate}
                                        time={data?.time}
                                        dateOfmailing={data?.serviceResultDateOfMailing}
                                        sex={data?.serviceResultSex}
                                        skinColor={data?.serviceResultSkinColor}
                                        age={data?.serviceResultAge}
                                        height={data?.serviceResultHeight}
                                        weight={data?.serviceResultWeight}
                                        hair={data?.serviceResultHair}
                                        entry={data?.serviceResultEntry}
                                        wall={data?.serviceResultWall}
                                        floor={data?.serviceResultFloor}
                                        door={data?.serviceResultDoorLocks}
                                        locks={data?.serviceResultLock}
                                        noOfLocks={data?.serviceResultDoor}
                                        commentOtherFeature={data?.serviceResultOtherDescription}
                                    /></>}

                            </TemplateOutlet>
                        </>
                    })}
                </div>
            </div>
        </>
    );
};
export default TransPerSlipReport