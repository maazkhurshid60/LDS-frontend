import React from "react";
import { GrCheckboxSelected, GrCheckbox } from "react-icons/gr";
import { RxCross2 } from "react-icons/rx";

import { formatDate } from "../../../../../utils/dateFormate";
import { formatTime } from "../../../../../utils/timeFormate";

export interface BodyProps {
    //RESULTS
    apt?: string | number;
    reciepientTitle?: string;
    firstTimeAttempt?: string;
    firstDateAttempt?: string;
    secondTimeAttempt?: string;
    secondDateAttempt?: string;
    dateOfMailing?: string;
    dateOfService?: string
    timeOfService?: string
    sex?: string;
    skinColor?: string;
    age?: string | number;
    height?: string | number
    weight?: string | number
    hair?: string
    otherFeatures?: string
    lic?: string | number
    //SERVICES
    inputDate?: string
    time?: string
    address?: string
    firstNames?: string
    serverName?: string
    serverAddress?: string
    affidavitName?: string
    substituteDelivered?: string
    serviceTypeLTOrStandard?: any
}
const Body: React.FC<BodyProps> = (item) => {
    console.log(item?.serviceTypeLTOrStandard);

    const timeString = item?.time
    const date = new Date(timeString);
    const time = date.toLocaleTimeString('en-US', { hour12: false });
    return <div className="flex flex-col items-start gap-y-2 text-sm">
        <p>State of New York, County of <span className="mx-6 font-semibold capitalize ">{item?.serverAddress ? item?.serverAddress : "__________________"}</span> ss:</p>
        <p>I, <span className="mx-6 font-semibold mx-3">{item?.serverName ? item?.serverName : "__________________"}</span> being duly sworn, deposes and says that deponent is not party to this proceeding, is over 18 years of age and resides in
            &nbsp; <span className="mx-6 font-semibold capitalize">{item?.serverAddress ? item?.serverAddress : "__________________"}</span>, New York  that on <span className="mx-6 font-semibold">{item?.dateOfService ? formatDate(item?.dateOfService) : "__________________"}</span> at <span className="mx-6 font-semibold">{item?.timeOfService ? formatTime(item?.timeOfService) : "__________________"}</span>.</p>
        <p>At the property sought to be recovered at <span className="mx-6 font-semibold">{item?.address ? item?.address : "__________________"}</span> Apt# <span className="mx-6 font-semibold">{item?.apt ? item?.apt : "__________________"}</span></p>
        <p>The <span className="mx-6 font-semibold">{item?.serviceTypeLTOrStandard ? item?.serviceTypeLTOrStandard : "__________________"}</span>  was served on : <span className="mx-6 font-semibold">{item?.firstNames ? item?.firstNames : "__________________"}</span></p>
        <p className="flex justify-start gap-x-4"> {(item?.affidavitName === "personal" || item?.affidavitName === "personalplus") ? <RxCross2 className="border-[2px] border-solid border-[#101010]" size={18} /> : <GrCheckbox size={18} />}  Personal service on Individual: Individually served the within-named person with true copy(ies) of the paper(s) aforementioned.</p>
        <div className="flex justify-start gap-x-4"><GrCheckbox size={44} />
            <div>
                <p>Deponent was unable to serve:</p>
                <p>Additional respondents by personal delivery but by gaining admittance to said property and delivery and leaving a true copy thereof for each respondent personally with aftermentioned respondent who was
                    willing to accept same and was of suitable age and discretion who threat...thereby completing service to all respondents.
                </p>

            </div>
        </div>
        <div className="flex justify-start gap-x-4">
            {(item?.affidavitName === "substitute") ? <RxCross2 className="border-[2px] border-solid border-[#101010] h-[20px]" size={34} /> : <GrCheckbox size={40} />}
            {/* {(item?.affidavitName === "substitute") &&  */}
            <div>
                <p>Suitable age person: substitute served by delivering thereat a true copy for each respondent personally with <span className="mx-6 font-semibold">{item?.substituteDelivered ? item?.substituteDelivered : "__________________"} </span>,
                    a person of suitable age and discertion , who was willing to receive same and who <span className="mx-6 font-semibold italic">resided</span>  at said property</p>

                {item?.affidavitName === "substitute" && <p className="text-[18px]">(person to whom papers were delivered refused to reveal his/her name)</p>}
            </div>
            {/* } */}
        </div>


        <div className="flex justify-start gap-x-4">
            {(item?.affidavitName === "conspicuous") ? <RxCross2 className="border-[2px] border-solid border-[#101010] w-[60px] h-[20px]" size={18} /> : <GrCheckbox size={65} />}
            <div>
                <p>Posted on door: by affixing a true copy thereof  for each respondent on conspicuous part to wit; the entrance door of said property
                    , the tenant(s)/ occupant(s) place of bussiness premises is recipients <span className="mx-6 font-semibold">{item?.reciepientTitle ? item?.reciepientTitle : "__________________"}</span> with in state. Deponent was unable to find
                    respondent(s) or to find a person suitable age and discretion who __________________ thereat during either of the two service
                    attempts made on the following dates....
                </p>
                <p>Prior Attempt Made On:<span className="mx-6 font-semibold">{(item?.affidavitName === "personal" || item?.affidavitName === "personalplus" || item?.affidavitName === "substitute") ? "________________________" : item?.firstDateAttempt ? formatDate(item?.firstDateAttempt) : "__________________"}</span>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; at <span className="mx-6 font-semibold">{(item?.affidavitName === "personal" || item?.affidavitName === "personalplus" || item?.affidavitName === "substitute") ? "________________________" : item?.firstTimeAttempt ? formatTime(item?.firstTimeAttempt) : "__________________"} </span> </p>
                <p>Second Attempt Made On:<span className="mx-6 font-semibold">{(item?.affidavitName === "personal" || item?.affidavitName === "personalplus" || item?.affidavitName === "substitute") ? "________________________" : item?.secondDateAttempt ? formatDate(item?.secondDateAttempt) : "__________________"}</span>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; at <span className="mx-6 font-semibold">{(item?.affidavitName === "personal" || item?.affidavitName === "personalplus" || item?.affidavitName === "substitute") ? "________________________" : item?.secondTimeAttempt ? formatTime(item?.secondTimeAttempt) : "__________________"}</span>  </p>
                <p>Approx, Description: Sex:<span className="mx-6 font-semibold">{item?.affidavitName === "conspicuous" ? "__________________" : item?.sex ? item?.sex : "__________________"}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Skin Color:<span className="mx-6 font-semibold">{item?.affidavitName === "conspicuous" ? "___________________" : item?.skinColor ? item?.skinColor : "__________________"}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    Age:<span className="mx-6 font-semibold">{item?.affidavitName === "conspicuous" ? "__________________" : item?.age ? item?.age : "__________________"}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Height:<span className="mx-6 font-semibold">{item?.affidavitName === "conspicuous" ? "____________________" : item?.height ? item?.height : "__________________"}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    Weight:<span className="mx-6 font-semibold">{item?.affidavitName === "conspicuous" ? "________________" : item?.weight ? item?.weight : "__________________"}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Hair:<span className="mx-6 font-semibold">{item?.affidavitName === "conspicuous" ? "______________________" : item?.hair ? item?.hair : "__________________"}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    other identifying features/comments:<span className="mx-6 font-semibold">{item?.otherFeatures ? item?.otherFeatures : "__________________"}</span>
                </p>
            </div>
        </div>
        <div className="flex justify-start gap-x-4">

            {(item?.affidavitName === "substitute" || item?.affidavitName === "conspicuous") ? <RxCross2 className="border-[2px] border-solid border-[#101010] w-[60px] h-[20px]" size={18} /> : <GrCheckbox size={64} />}
            <p> State of New York, Country of <span className="mx-6 font-semibold"> {item?.serverAddress ? item?.serverAddress : "__________________"}</span> ,being duly sworn and says that I am not a party to this action and I am over 18 years of age.
                On <span className="mx-6 font-semibold"> {(item?.affidavitName == "conspicuous" || item?.affidavitName == "substitute") ? item?.dateOfMailing ? formatDate(item?.dateOfMailing) : "__________________" : "________________________"}</span> I mailed a true copy to each respondent of the above mentioned notification properly enclosed, addressed and mailed in postpaid
                envelops by regular first class and certified mail <span className="mx-6 font-semibold underline"> (marked personal and confidiential)</span> within New York state to each respondent at the
                address sought to be recovered which is respondents residence or corporate respondent(s) principal office or principal place of bussiness.</p>
        </div>
        <div className="text-center w-[100%]">

            <p >Additional copies mailed regular and certified to:</p>

        </div>
        <div className=" flex items-center justify-between w-full">
            <div>
                <p>Sworn to before me on</p>
                <p className="font-semibold">{item?.dateOfMailing ? formatDate(item?.dateOfMailing) : "__________________"}</p>
            </div>
            <div className="font-semibold capitalize border-t-[1.5px] border-t-[#000]">
                <p><span >{item?.serverName ? item?.serverName : "__________________"}</span></p>
                <p>Lic#{item?.lic ? item?.lic : "__________________"}</p>
                <p><span  >{item?.serverAddress ? item?.serverAddress : "__________________"}</span>
                </p>

            </div>

        </div>


    </div>
}
export default Body