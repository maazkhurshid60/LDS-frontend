import React from "react";
import { GrCheckboxSelected, GrCheckbox } from "react-icons/gr";
import { formatDate } from "../../../../../utils/dateFormate"
import { formatTime } from "../../../../../utils/timeFormate"

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

}


// formatDate(item?.dateOfmailing)
// formatTime(item?.time)
const Body: React.FC<BodyProps> = (item) => {
    // const timeString = item?.time
    // const date = new Date(timeString);
    // const time = date?.toLocaleTimeString('en-US', { hour12: false });
    return <div className="flex flex-col items-start gap-y-2 text-sm">
        <p>State of New York, country of <span className="font-semibold capitalize">{item?.serverAddress ? item?.serverAddress : "______________________________"}</span> ss:</p>
        <p>I, <span className="font-semibold">{item?.serverName ? item?.serverName : "______________________________"}</span> being duly sworn, deposes and says that deponent is not party to this proceeding, is over 18 years of age and resides in
            &nbsp; <span className="font-semibold capitalize">{item?.serverAddress ? item?.serverAddress : "______________________________"}</span>, New York  that on <span className="font-semibold">{item?.dateOfService ? formatDate(item?.dateOfService) : "______________________________"}</span>.</p>
        <p>At the property sought to be recovered at <span className="font-semibold">{item?.address ? item?.address : "______________________________"}</span> Apt# <span className="font-semibold">{item?.apt ? item?.apt : "______________________________"}</span></p>
        <p>The <span className="font-semibold">{item?.firstNames ? item?.firstNames : "______________________________"}</span> was served on</p>
        <p className="flex justify-start gap-x-4"><GrCheckbox size={18} /> Personal service on individual: individually served the within-named person with true copy(ies) of the paper(s) aforementioned.</p>
        <div className="flex justify-start gap-x-4"><GrCheckbox size={18} />
            <div>
                <p>Deponent was unable to serve:</p>
                <p>Additional respondents by personal delivery but by gaining admittance to said property and delivery and leaving a true copy thereof each</p>

            </div>
        </div>
        <div className="flex justify-start gap-x-4">
            <GrCheckbox size={50} />
            <div>
                <p>Posted on door: by affixing a true copy thereof  for each respondent on conspicuous part to with the entrance door of said property
                    , the tenant(s)/ occupant(s) place of bussiness premises is recipients <span className="font-semibold">{item?.reciepientTitle ? item?.reciepientTitle : "______________________________"}</span> with in state. Deponent was unable to find
                    respondent(s) or to find a person suitable age and discretion who ______________________________ there at during either of the two service
                    attempts made on the following dates:
                </p>
                <p>Prior Attempt Made On:<span className="font-semibold">{item?.firstDateAttempt ? formatDate(item?.firstDateAttempt) : "______________________________"}</span>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; at <span className="font-semibold">{item?.firstDateAttempt ? formatTime(item?.firstDateAttempt) : "______________________________"} </span> </p>
                <p>Second Attempt Made On:<span className="font-semibold">{item?.secondDateAttempt ? formatDate(item?.secondDateAttempt) : "______________________________"}</span>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; at <span className="font-semibold">{item?.secondDateAttempt ? formatTime(item?.secondDateAttempt) : "______________________________"}</span>  </p>
                <p>Approx, Description: Sex:<span className="font-semibold">{item?.sex ? item?.sex : "______________________________"}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Skin Color:<span className="font-semibold">{item?.skinColor ? item?.skinColor : "______________________________"}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    Age:<span className="font-semibold">{item?.age ? item?.age : "______________________________"}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Height:<span className="font-semibold">{item?.height ? item?.height : "______________________________"}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    Weight:<span className="font-semibold">{item?.weight ? item?.weight : "______________________________"}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Hair:<span className="font-semibold">{item?.hair ? item?.hair : "______________________________"}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    other identifying features/comments:<span className="font-semibold">{item?.otherFeatures ? item?.otherFeatures : "______________________________"}</span>
                </p>
            </div>
        </div>
        <p className="flex justify-start gap-x-4"><GrCheckbox size={50} />State of New York, Country of {item?.serverAddress ? item?.serverAddress : "______________________________"} ,being duly sworn and says that I am not a party to this action and I am over 18 age.
            On {item?.dateOfMailing ? formatDate(item?.dateOfMailing) : "______________________________"} I mailed a true copy to each respondent of the above mentioned notification properly enclosed, addressed and mailed in postpaid
            envelops by regular first class and certified mail (marked personal and confidiential) within New York state to each respondent at the
            address sought to be recovered which is respondents residence or corporate respondent(s) principal office or principal place of bussiness.</p>
        <p>Additional copies mailed regular and certified to:</p>
        <div className="font-semibold flex items-center justify-between w-full">
            <div>
                <p>Sworn to before me on</p>
                <p>{item?.dateOfMailing ? formatDate(item?.dateOfMailing) : "______________________________"}</p>
            </div>
            <div>
                <p><span className="font-semibold">{item?.serverName ? item?.serverName : "______________________________"}</span></p>
                <p>Lic#{item?.lic ? item?.lic : "______________________________"}</p>
                <p><span className="font-semibold capitalize">{item?.serverAddress ? item?.serverAddress : "______________________________"}</span>
                </p>

            </div>

        </div>


    </div>
}
export default Body