import React from "react";
import { GrCheckboxSelected, GrCheckbox } from "react-icons/gr";

const Body = () => {
    return <div className="flex flex-col gap-y-4">
        <p>Says: Deponent is not a party here in, is over 18 year of age and resides at:</p>
        <p>On DATE_FROM_BACKEND at TIME_FROM_BACKEND Apt#/Desc: APT/DESC_FROM_BACKEND</p>
        <p>We served on:</p>
        <p className="flex justify-start gap-x-4"><GrCheckbox size={18} /><span className="font-semibold">Personal</span> service on individual: individually served the within-named person with true copy(ies)of the paper(s) afore mentioned.</p>
        <p className="flex justify-start gap-x-4"><GrCheckbox size={30} /> <span className="font-semibold">Corporation</span> served the within named domestic corporation by delivering a true copy of the papers aforementioned to NAME_FROM_BACKEND employee of said corporation(s) and authoraized agent there of NAME_FROM_BACKEND_OPTIONAL
        </p>
        <div className="flex justify-start gap-x-4"><GrCheckbox size={30} />
        <div>
            <p><span className="font-semibold">Posted on door</span> posted a true
                copy to the door of said premises. Said premises is receipient's dwelling within the state. Deponent was unable, with the deligent to find
                either recepient or person of suitable age and descretion, there at, having attemped service on the following dates:
            </p>
            <p>First Attempt Made On:SOMETEXTWILLBETHEREFROMBACKENDAPI at SOMETEXTWILLBETHEREFROMBACKENDAPI  </p>
            <p>Second Attempt Made On:SOMETEXTWILLBETHEREFROMBACKENDAPI at SOMETEXTWILLBETHEREFROMBACKENDAPI  </p>
            <p>Date of Service:SOMETEXTWILLBETHEREFROMBACKENDAPI at SOMETEXTWILLBETHEREFROMBACKENDAPI  </p>
            </div>
        </div>

        <p className="flex justify-start gap-x-4"><GrCheckbox size={18} /> <span className="font-semibold">Witness Fee</span> the authorized 
        traveling expenses and one day witness fee of $18 was paid(tendered) to the reciepient.
        </p>
    </div>
}
export default Body