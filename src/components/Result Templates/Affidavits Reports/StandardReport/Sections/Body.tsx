import React from "react";
import { GrCheckboxSelected, GrCheckbox } from "react-icons/gr";
export interface BodyProps {
    dateOfService?: string
    firstAttemptDate?: string
    firstAttemptTime?: string
    secondAttemptDate?: string
    secondAttemptTime?: string
    apt?: string | number
    sex?: string;
    skinColor?: string;
    age?: string | number;
    height?: string | number
    weight?: string | number
    hair?: string
    otherFeature?: boolean
    recipientTitle?: string
    dateOfMailing?: string
    lic?: string | number
    serverName?: string
    serverAddress?: string
}
const Body: React.FC<BodyProps> = (item) => {
    return <div className="flex flex-col gap-y-4">
        <p>Says: Deponent is not a party here in, is over 18 year of age and resides at:</p>
        <p>On <span className="font-semibold"> {item?.dateOfService ? item?.dateOfService : "______________________________"}</span> Apt#/Desc: <span className="font-semibold">{item?.apt ? item?.apt : "______________________________"} </span>

        </p>
        <p>We served on:</p>
        <p className="flex justify-start gap-x-4"><GrCheckbox size={18} /><span className="font-semibold">Personal</span> service on individual: individually served the within-named person with true copy(ies)of the paper(s) afore mentioned.</p>
        <p className="flex justify-start gap-x-4"><GrCheckbox size={18} /><span className="font-semibold"></span> ______________________________</p>

        <p className="flex justify-start gap-x-4"><GrCheckbox size={30} /> <span className="font-semibold">Corporation</span> served the within named domestic corporation by delivering a true copy of the papers aforementioned to ______________________________ /employee/ of said corporation(s) and authoraized agent thereof _______________________________
        </p>
        <div className="flex justify-start gap-x-4"><GrCheckbox size={30} />
            <div>
                <p><span className="font-semibold">Posted on door</span> posted a true
                    copy to the door of said premises. Said premises is receipient's dwelling within the state. Deponent was unable, with the diligent to find
                    either recepient or person of suitable age and descretion, there at, having attemped service on the following dates:
                </p>
                <p>First Attempt Made On: <span className="font-semibold"> {item?.firstAttemptDate ? item?.firstAttemptDate : "______________________________"}</span> at <span className="font-semibold"> {item?.firstAttemptTime ? item?.firstAttemptTime : "______________________________"}</span>  </p>
                <p>Second Attempt Made On:<span className="font-semibold"> {item?.secondAttemptDate ? item?.secondAttemptDate : "______________________________"}</span> at <span className="font-semibold"> {item?.secondAttemptTime ? item?.secondAttemptTime : "______________________________"}</span>   </p>
                <p>Date of Service:<span className="font-semibold"> {item?.dateOfService ? item?.dateOfService : "______________________________"}</span>
                    {/* at SOMETEXTWILLBETHEREFROMBACKENDAPI   */}
                </p>
            </div>
        </div>
        <div className="flex flex-row justify-start items-start gap-x-4">
            <GrCheckbox size={60} />
            <div>
                <p><span className="font-semibold">Mailing</span>: within 20 days of service of the papers of forementoined, deponent also
                    mailed the copy of the same post paid by first-class mail properly addressed to receipient at &nbsp;&nbsp;<span className="font-semibold"> {item?.recipientTitle ? item?.recipientTitle : "______________________________"}</span>&nbsp;&nbsp; on &nbsp;&nbsp;<span className="font-semibold"> {item?.dateOfMailing ? item?.dateOfMailing : "______________________________"}</span>&nbsp;&nbsp;
                    in an envelope marked "PERSONAL & CONFIDIENTAL" and not indicating thereon that the communication was from an attorney or petained to an action
                    against the defendant and deposited said envelope in a US postal office under exclusive care and custody of the US Postal service in New York State.                </p>
                <p>Approx, Description: Sex:<span className="font-semibold">{item?.sex ? item?.sex : "______________________________"}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Skin Color:<span className="font-semibold">{item?.skinColor ? item?.skinColor : "______________________________"}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    Age:<span className="font-semibold">{item?.age ? item?.age : "______________________________"}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Height:<span className="font-semibold">{item?.height ? item?.height : "______________________________"}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    Weight:<span className="font-semibold">{item?.height ? item?.height : "______________________________"}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Hair:<span className="font-semibold">{item?.hair ? item?.hair : "______________________________"}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    other identifying features/comments:<span className="font-semibold">{item?.otherFeature ? item?.otherFeature : "______________________________"}</span>
                </p>
            </div>
        </div>

        <p className="flex justify-start items-start gap-x-4"><GrCheckbox size={18} /> <span className="font-semibold">Witness Fee</span> the authorized
            traveling expenses and one day witness fee of $18 was paid(tendered) to the receipient.
        </p>

        <div className="font-semibold flex items-center justify-between w-full">
            <div>
                <p>Sworn to before me on</p>
                <p>{item?.dateOfMailing ? item?.dateOfMailing : "______________________________"}</p>
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