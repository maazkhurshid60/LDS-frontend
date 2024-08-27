import React from "react";
import { GrCheckboxSelected, GrCheckbox } from "react-icons/gr";
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
    locks?:string | number
    //SERVICES
    inputDate?: string
    time?: string
    address?: string
    firstNames?: string
    serverName?: string
    serverAddress?:string
}
const Body: React.FC<BodyProps> = (item) => {
    return <div className="flex flex-col gap-y-4">
        <p>State of New York, country of Queens ss:</p>
        <p>I, <span className="font-semibold">{item?.serverName ? item?.serverName : "--N/A--"}</span> being duly sworn, deposes and says that deponent is not party to this proceeding, is over 18 years of age and resides in
            queens, New York  that on <span className="font-semibold">{item?.dateOfService ? item?.dateOfService : "--N/A--"}</span>.</p>
        <p>At the property sought to be recovered at <span className="font-semibold">{item?.address ? item?.address : "--N/A--"}</span> Apt# <span className="font-semibold">{item?.apt ? item?.apt : "--N/A--"}</span></p>
        <p>The _______________________________________  was served on <span className="font-semibold">{item?.firstNames ? item?.firstNames : "--N/A--"}</span></p>
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
                    , the tenant(s)/ occupant(s) place of bussiness premises is recipients <span className="font-semibold">{item?.reciepientTitle ? item?.reciepientTitle : "--N/A--"}</span> with in state. Deponent was unable to find
                    respondent(s) or to find a person suitable age and discretion who _____________________________________ there at during either of the two service
                    attempts made on the following dates:
                </p>
                <p>Prior Attempt Made On:<span className="font-semibold">{item?.firstDateAttempt ? item?.firstDateAttempt : "--N/A--"}</span>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; at <span className="font-semibold">{item?.firstDateAttempt ? item?.firstDateAttempt : "--N/A--"} </span> </p>
                <p>Second Attempt Made On:<span className="font-semibold">{item?.secondDateAttempt ? item?.secondDateAttempt : "--N/A"}</span>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; at <span className="font-semibold">{item?.secondDateAttempt ? item?.secondDateAttempt : "--N/A--"}</span>  </p>
                <p>Approx, Door Description:  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                    <p>
                    Color:<span className="font-semibold">{item?.skinColor ? item?.skinColor :"--N/A--"}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   
                Locks:<span className="font-semibold">{item?.locks ? item?.locks :"--N/A--"}</span>
                    </p>
                </p>
                <p>Approx, Description: Sex:<span className="font-semibold">{item?.sex ? item?.sex : "--N/A--"}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Skin Color:<span className="font-semibold">{item?.skinColor ? item?.skinColor : "--N/A--"}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    Age:<span className="font-semibold">{item?.age ? item?.age : "--N/A--"}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Height:<span className="font-semibold">{item?.height ? item?.height : "--N/A--"}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    Weight:<span className="font-semibold">{item?.height ? item?.height : "--N/A--"}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Hair:<span className="font-semibold">{item?.hair ? item?.hair : "--N/A--"}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    other identifying features/comments:<span className="font-semibold">{item?.otherFeatures ? item?.otherFeatures : "--N/A--"}</span>
                </p>
            </div>
        </div>
        <p className="text-center">Addtional copies mailed regular and certified:</p>
        <div className="font-semibold flex items-center justify-between w-full">
            <div>
            <p>Sworn to before me on</p>
            <p>{item?.dateOfMailing? item?.dateOfMailing:"--N/A--"}</p>
            </div>
            <div>
            <p><span className="font-semibold">{item?.serverName ? item?.serverName : "--N/A--"}</span></p>
            <p>Lic#{item?.lic? item?.lic:"--N/A--"}</p>
            <p><span className="font-semibold capitalize">{item?.serverAddress ? item?.serverAddress : "--N/A--"}</span>
            </p>

            </div>

        </div>
    </div>
}
export default Body
