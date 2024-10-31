import React from "react";
import { GrCheckboxSelected, GrCheckbox } from "react-icons/gr";
import { formatDate } from "../../../../../utils/dateFormate";
import { formatTime } from "../../../../../utils/timeFormate";
import { RxCross2 } from "react-icons/rx";

export interface BodyProps {
    //RESULT
    apt?: string | number;
    reciepientTitle?: string;
    firstTimeAttempt?: string;
    firstDateAttempt?: string;
    secondTimeAttempt?: string;
    secondDateAttempt?: string;
    dateOfMailing?: string;
    dateOfService?: string
    sex?: string;
    skinColor?: string;
    age?: string | number;
    height?: string | number
    weight?: string | number
    hair?: string
    otherFeatures?: string
    lic?: string | number
    locks?: string | number
    //SERVICES
    inputDate?: string
    time?: string
    address?: string
    firstNames?: string
    serverName?: string
    serverAddress?: string
    firstAttemptTime?: string
    secondAttemptTime?: string
    timeOfService?: string
    serviceTypeLTOrStandard?: string
    affidavitName?: string
}
const Body: React.FC<BodyProps> = (item) => {
    return <div className="flex flex-col gap-y-4 text-sm">
        <p>State of New York, County of Queens ss:</p>
        <p>I, <span className="mx-6 font-semibold capitalize ">{item?.serverName ? item?.serverName : "__________________"}</span> Being duly sworn, deposes and says that deponent is not party to this proceeding, is over 18 years of age and resides in
            <span className="mx-6 font-semibold capitalize ">{item?.serverAddress ? item?.serverAddress : "__________________"}</span>, New York  That on <span className="mx-6 font-semibold capitalize ">{item?.dateOfService ? formatDate(item?.dateOfService) : "__________________"}</span> at <span className="mx-6 font-semibold">{item?.timeOfService ? formatTime(item?.timeOfService) : "__________________"}</span>Apt# <span className="mx-6 font-semibold capitalize ">{item?.apt ? item?.apt : "__________________"}</span>.</p>
        <p>At the property sought to be recovered at <span className="mx-6 font-semibold capitalize ">{item?.address ? item?.address : "__________________"}</span> </p>
        <p>The <span className="mx-6 font-semibold">{item?.serviceTypeLTOrStandard ? item?.serviceTypeLTOrStandard : "__________________"}</span> <br /> was served on : <span className="mx-6 font-semibold">{item?.firstNames ? item?.firstNames : "__________________"}</span></p>
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
                    a person of suitable age and discertion , who was willing to receive same and who <span className="mx-6 font-semibold italic">resided</span>  at said property deponent as said therein</p>

            </div>
            {/* } */}
        </div>
        <br />
        <div className="flex justify-start gap-x-4">
            {(item?.affidavitName === "conspicuous") ? <RxCross2 className="border-[2px] border-solid border-[#101010] w-[60px] h-[20px]" size={18} /> : <GrCheckbox size={65} />}
            <div>
                <p>Posted on door: by affixing a true copy thereof  for each respondent on conspicuous part to with the entrance door of said property
                    , the tenant(s)/ occupant(s) place of bussiness premises is recipients <span className="mx-6 font-semibold capitalize ">{item?.reciepientTitle ? item?.reciepientTitle : "__________________"}</span> with in state. Deponent was unable to find
                    respondent(s) or to find a person suitable age and discretion who __________________ there at during either of the two service
                    attempts made on the following dates:
                </p>
                <p>Prior Attempt Made On:<span className="mx-6 font-semibold capitalize ">{item?.firstDateAttempt ? formatDate(item?.firstDateAttempt) : "__________________"}</span>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; at <span className="mx-6 font-semibold capitalize ">{item?.firstAttemptTime ? formatTime(item?.firstAttemptTime) : "__________________"} </span> </p>
                <p>Second Attempt Made On:<span className="mx-6 font-semibold capitalize ">{item?.secondDateAttempt ? formatDate(item?.secondDateAttempt) : "__________________"}</span>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; at <span className="mx-6 font-semibold capitalize ">{item?.secondAttemptTime ? formatTime(item?.secondAttemptTime) : "__________________"}</span>  </p>
                <p>Approx, Door Description:  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <p>
                        Color:<span className="mx-6 font-semibold capitalize ">{item?.skinColor ? item?.skinColor : "__________________"}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        Locks:<span className="mx-6 font-semibold capitalize ">{item?.locks ? item?.locks : "__________________"}</span>
                    </p>
                </p>
                <p>Approx, Description: Sex:<span className="mx-6 font-semibold capitalize ">{item?.sex ? item?.sex : "__________________"}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Skin Color:<span className="mx-6 font-semibold capitalize ">{item?.skinColor ? item?.skinColor : "__________________"}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    Age:<span className="mx-6 font-semibold capitalize ">{item?.age ? item?.age : "__________________"}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Height:<span className="mx-6 font-semibold capitalize ">{item?.height ? item?.height : "__________________"}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    Weight:<span className="mx-6 font-semibold capitalize ">{item?.height ? item?.height : "__________________"}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Hair:<span className="mx-6 font-semibold capitalize ">{item?.hair ? item?.hair : "__________________"}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    other identifying features/comments:<span className="mx-6 font-semibold capitalize ">{item?.otherFeatures ? item?.otherFeatures : "__________________"}</span>
                </p>
            </div>
        </div>
        <p className="text-center">Addtional copies mailed regular and certified:</p>
        <div className="font-semibold flex items-center justify-between w-full">
            <div>
                <p>Sworn to before me on</p>
                <p>{item?.dateOfMailing ? formatDate(item?.dateOfMailing) : "__________________"}</p>
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
