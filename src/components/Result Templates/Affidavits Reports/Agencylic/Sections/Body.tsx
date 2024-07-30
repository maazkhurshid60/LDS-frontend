import React from "react";
import { GrCheckboxSelected, GrCheckbox } from "react-icons/gr";

const Body = () => {
    return <div className="flex flex-col items-start gap-y-2 text-sm">
        <p>state of new york, country of queens ss:</p>
        <p>i, SOMETEXTWILLBETHEREFROMBACKENDAPI being duly sworn, deposes and says that deponent is not party to this proceeding, is over 18 years of age and resides in
            PLACENAMEWILLTHERE, New York SOMETEXTWILLBETHEREFROMBACKENDAPI(OPTIONAL) that on SOMETEXTWILLBETHEREFROMBACKENDAPI(OPTIONAL) at SOMETEXTWILLBETHEREFROMBACKENDAPI(OPTIONAL).</p>
        <p>At the property sought to be recovered at SOMETEXTWILLBETHEREFROMBACKENDAPI Apt# APTNUMBER</p>
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
                <p>Posted on door: by affixing a true copy there of  for each respondent on conspicuous part to with the entrance door of said property 
                   , the tenant(s)/ occupant(s) place of bussiness premises is recipients SOMETEXTWILLBETHEREFROMBACKENDAPI with in state. Deponent was unable to find 
                   respodent(s) or to find a person suitable age and discretion who SOMETEXTWILLBETHEREFROMBACKENDAPI there at during either of the two service 
                   attempts made on the following dates: 
                </p>
                <p>Prior Attempt Made On:SOMETEXTWILLBETHEREFROMBACKENDAPI at SOMETEXTWILLBETHEREFROMBACKENDAPI  </p>
                <p>Second Attempt Made On:SOMETEXTWILLBETHEREFROMBACKENDAPI at SOMETEXTWILLBETHEREFROMBACKENDAPI  </p>
                <p>Approx, Description: Sex:SOMETEXTWILLBETHEREFROMBACKENDAPI &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Skin Color:SOMETEXTWILLBETHEREFROMBACKENDAPI &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   
                Age:SOMETEXTWILLBETHEREFROMBACKENDAPI &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Height:SOMETEXTWILLBETHEREFROMBACKENDAPI &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                Weight:SOMETEXTWILLBETHEREFROMBACKENDAPI &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Hair:SOMETEXTWILLBETHEREFROMBACKENDAPI &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                other identifying features/comments:SOMETEXTWILLBETHEREFROMBACKENDAPI
                </p>
            </div>
        </div>
        <p className="flex justify-start gap-x-4"><GrCheckbox size={50} />State of New York, country of Queens,beign duly sworn and says that I am not a party to this action and I am over 18 age.
        On SOMETEXTWILLBETHEREFROMBACKENDAPI I mailed a true copy to each respodent of the above mentioned notification properly enclosed, addressed and mailed in postpaid 
        envelops by regular first class and certified mail (marked personal and confidiential) within New York state to each respodent at the 
        address sought to be recovered which is respodents residence or corporate respodent(s) principal office or principal place of bussiness.</p>
        <p>Addtional copies mailed regular and certified: SOMETEXTWILLBETHEREFROMBACKENDAPI</p>


    </div>
}
export default Body