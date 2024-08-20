import React from "react";
import { GrCheckboxSelected, GrCheckbox } from "react-icons/gr";
export interface BodyProps{
    sex?: string;
    skinColor?: string;
    age?: string | number;
    height?: string | number
    weight?: string | number
    hair?: string
    otherFeatures?:string
    reciepientTitle?:string;
    firstTimeAttempt?:string;
    firstDateAttempt?:string;
    secondTimeAttempt?:string;
    secondDateAttempt?:string;
    apt?:string | number;
    locks?:string | number
}
const Body:React.FC<BodyProps> =(item)=>{
    return <div className="flex flex-col gap-y-4">
         <p>state of new york, country of queens ss:</p>
        <p>i, SOMETEXTWILLBETHEREFROMBACKENDAPI being duly sworn, deposes and says that deponent is not party to this proceeding, is over 18 years of age and resides in
            PLACENAMEWILLTHERE, New York SOMETEXTWILLBETHEREFROMBACKENDAPI(OPTIONAL) that on SOMETEXTWILLBETHEREFROMBACKENDAPI(OPTIONAL) at SOMETEXTWILLBETHEREFROMBACKENDAPI(OPTIONAL).</p>
        <p>At the property sought to be recovered at SOMETEXTWILLBETHEREFROMBACKENDAPI Apt# {item?.apt ? item?.apt :"--N/A--"}</p>
        <p>The SOMETEXTWILLBETHEREFROMBACKENDAPI(OPTIONAL) was served on</p>
        <p className="flex justify-start gap-x-4"><GrCheckbox size={18} /> Personal service on individual: individually served the within-named person with true copy(ies)of the paper(s) afore mentioned.</p>
        <div className="flex justify-start gap-x-4"><GrCheckboxSelected size={18} />
            <div>
                <p>Deponent was unable to serve:</p>
                <p>Additional respodents by personal delivery but by gaining admittance to said property and delivery and leaving a true copy there of each</p>

            </div>
        </div>
        <div className="flex justify-start gap-x-4">
            <GrCheckbox size={50} />
            <div>
                <p>Posted on door: by affixing a true copy there of  for each respondent on conspicuous part to with the entrance dorr of said property 
                   , the tenant(s)/ occupant(s) place of bussiness premises is recipients {item?.reciepientTitle ? item?.reciepientTitle :"--N/A--"} with in state. Deponent was unable to find 
                   respodent(s) or to find a person suitable age and discretion who SOMETEXTWILLBETHEREFROMBACKENDAPI there at during either of the two service 
                   attempts made on the following dates: 
                </p>
                <p>Prior Attempt Made On: <span className="font-semibold">{item?.firstDateAttempt ? item?.firstDateAttempt :"--N/A--"}</span> at <span className="font-semibold">{item?.firstTimeAttempt ? item?.firstTimeAttempt :"--N/A--"}</span>  </p>
                <p>Second Attempt Made On:<span className="font-semibold">{item?.secondDateAttempt ? item?.secondDateAttempt :"--N/A--"}</span> at <span className="font-semibold">{item?.secondTimeAttempt ? item?.secondTimeAttempt :"--N/A--"}</span>  </p>
                <p>Approx, Door Description:  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                    <p>
                    Color:<span className="font-semibold">{item?.skinColor ? item?.skinColor :"--N/A--"}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   
                Locks:<span className="font-semibold">{item?.locks ? item?.locks :"--N/A--"}</span>
                    </p>
                </p>
                <p>Approx, Description: Sex:<span className="font-semibold">{item?.sex ? item?.sex :"--N/A--"}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Skin Color:<span className="font-semibold">{item?.skinColor ? item?.skinColor :"--N/A--"}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   
                Age:<span className="font-semibold">{item?.age ? item?.age :"--N/A--"}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Height:<span className="font-semibold">{item?.height ? item?.height :"--N/A--"}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                Weight:<span className="font-semibold">{item?.height ? item?.height :"--N/A--"}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Hair:<span className="font-semibold">{item?.hair ? item?.hair :"--N/A--"}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                other identifying features/comments:<span className="font-semibold">{item?.otherFeatures ? item?.otherFeatures :"--N/A--"}</span>
                </p>
            </div>
        </div>
        <p>Addtional copies mailed regular and certified: SOMETEXTWILLBETHEREFROMBACKENDAPI</p>

    </div>
}
export default Body