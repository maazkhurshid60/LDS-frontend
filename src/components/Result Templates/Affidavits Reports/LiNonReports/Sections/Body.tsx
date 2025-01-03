import React from "react"
import { formatDate } from "../../../../../utils/dateFormate";
export interface bodyProps {
    //RESULTS
    sex?: string;
    skinColor?: string;
    age?: string | number;
    height?: string | number
    weight?: string | number
    hair?: string
    dateOfService?: string
    dateOfMailing?: string;
    serverName?: string
    lic?: string | number
    address?: string
}
const Body: React.FC<bodyProps> = (item) => {
    return <div className="flex flex-col gap-y-4">
        <p>
            I  <span className="font-semibold">{item?.serverName ? item?.serverName : "__________________"}</span> being duly swom, deposes and says: I am  Petitioner/Landlord's agent and I reside in
            or have offices in the country of Kings I have been requested by the attomey for the Petitioner Landlord to make an investigation
            to as certain if the above name Tenant(s) and Undertenant(s) are the present time in the military service.
        </p>
        <p>ON <span className="font-semibold">{item?.dateOfService ? formatDate(item?.dateOfService) : "__________________"}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {/* AT SOME_TIME_WILL_BE_THERE_FROM_BACKEND_API */} , I went to __________________
        </p>

        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;And had a conservation with __________________ (relative/resides at premises) at the subject premises, I asked
            the person(s) spoken to whether said tenant(s) and/or Undertenant(s) sued here in as __________________ and
            __________________ was in the military service of United Service or the State of New York in any capacity
            and the person(s) informed me that said tenant(s)/Undertenant(s) were not in the military service, nor was the tenant(s)/Undertenant(s)
            or any one in said tenant(s)/Undertenant(s) family dependent on any person in the military service of the United States.
        </p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;And had a conservation with __________________ who is employed as superintendent, and lives at the same address
            in the building complex, by petitioner concerning the tenant(s) and/or Undertenant(s) living mode. He/She has informed me that he/she
            has known the tenant(s) and/or Undertenant(s) to have lived in said premises and based on numerous conservations with and obervations of
            the tenant(s) and/or Undertenant(s) to their best knowledge neither the tenant(s) and Undertenant(s) nor anyone in the Tanent(s)
            or Undertenant(s) family is, or is dependent upon a member of the military service of New York, United State or any allied naiton.
        </p>
        <p>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;And had a conservation with __________________ (relative/resides at premises) at the subject premises,I asked
            the person(s) spoken to whether said tenant(s) and/or Undertenant(s) sued here in as __________________ and
            __________________ was in the military service of United Service or the State of New York in any capacity
            and the person(s) informed me that said tenant(s)/Undertenant(s) were not in the military service, nor was the tenant(s)/Undertenant(s)
            or any one in said tenant(s)/Undertenant(s) family dependent on any person in the military service of the United States.
        </p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;And had a conservation with __________________ who is employed as superintendent, and lives at the same address
            in the building complex, by petitioner concerning the tenant(s) and/or Undertenant(s) living mode. He/She has informed me that he/she
            has known the tenant(s) and/or Undertenant(s) to have lived in said premises and based on numerous conservations with and obervations of
            the tenant(s) and/or Undertenant(s) to their best knowledge neither the tenant(s) and Undertenant(s) nor anyone in the Tanent(s)
            or Undertenant(s) family is, or is dependent upon a member of the military service of New York, United State or any allied naiton.
        </p>
        <p>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;And had a conservation with __________________ (relative/resides at premises) at the subject premises,I asked
            the person(s) spoken to whether said tenant(s) and/or Undertenant(s) sued here in as __________________ and
            __________________ was in the military service of United Service or the State of New York in any capacity
            and the person(s) informed me that said tenant(s)/Undertenant(s) were not in the military service, nor was the tenant(s)/Undertenant(s)
            or any one in said tenant(s)/Undertenant(s) family dependent on any person in the military service of the United States.
        </p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;And had a conservation with __________________ who is employed as superintendent, and lives at the same address
            in the building complex, by petitioner concerning the tenant(s) and/or Undertenant(s) living mode. He/She has informed me that he/she
            has known the tenant(s) and/or Undertenant(s) to have lived in said premises and based on numerous conservations with and obervations of
            the tenant(s) and/or Undertenant(s) to their best knowledge neither the tenant(s) and Undertenant(s) nor anyone in the Tanent(s)
            or Undertenant(s) family is, or is dependent upon a member of the military service of New York, United State or any allied naiton.
        </p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;And had a conservation with __________________ who is employed as Administrator by the petitioner concerning the
            tenant(s) and/or Undertenant(s) living mode. He/She has informed me that he/she
            has known the tenant(s) and/or Undertenant(s) to have lived in said premises and based on numerous conservations with and obervations of
            the tenant(s) and/or Undertenant(s) to their best knowledge neither the tenant(s) and Undertenant(s) nor anyone in the Tanent(s)
            or Undertenant(s) family is, or is dependent upon a member of the military service of New York, United State or any allied naiton.
        </p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            I am personally familiar with the tenant(s) and have spoken to them on other occasions. I am familiar with the terms living mode
            and have never seen them in military uniform.
        </p>
        <p>
            From the facts above set forth, I am convinced that the said tenant(s) is not in or financially dependent upon someone in  the military service of
            the United State or of New York State at the present time.
        </p>
        <div className="font-semibold flex items-center justify-between w-full">
            <div>
                <p>Sworn to before me on</p>
                <p>{item?.dateOfMailing ? formatDate(item?.dateOfMailing) : "__________________"}</p>
            </div>
            <div>
                <p>{item?.serverName ? item?.serverName : "__________________"}</p>
                <p>Lic#{item?.lic ? item?.lic : "__________________"}</p>
                <p>{item?.address ? item?.address : "__________________"}</p>

            </div>

        </div>
    </div>
}
export default Body