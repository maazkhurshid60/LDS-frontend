import React from "react";
import { formatDate } from "../../../../../utils/dateFormate"
export interface bodyProps {
  sex?: string;
  skinColor?: string;
  age?: string | number;
  height?: string | number
  weight?: string | number
  hair?: string
  dateOfService?: string
  serverName?: string
  serverAddress?: string
  serverLicense?: string | number
  mailingAddressDate?: string
  name?: string
  address?: string
}
const Body: React.FC<bodyProps> = (item) => {
  return <div className="flex flex-col items-start gap-y-2 text-sm">
    <p>I &nbsp;<span className="font-semibold">{item?.serverName ? item?.serverName : "______________________________"}</span>&nbsp;,beign duly swom, deposes and says:</p>
    <p>I am the Petitioner-Landlord's agent and I reside in or have offices in the Country of Bronx</p>

    <p>I have been requested by the attomey for the Petitioner-Landlord to make an investigation to ascertain if the above name Tentant(s)
      (and undertentant) is at the present time in the millitary service.
    </p>
    <p className="font-bold">ON &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item?.dateOfService ? formatDate(item?.dateOfService) : "______________________________"} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      {/* AT SOME_TIME_WILL_BE_THERE_FROM_BACKEND_API */}
      , I went to:&nbsp;<span className="font-semibold">{item?.address ? item?.address : "______________________________"}</span>&nbsp;</p>
    <p> Sex:<span className="font-semibold">{item?.sex}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Skin Color:<span className="font-semibold">{item?.skinColor}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      Age:<span className="font-semibold">{item?.age}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Height:<span className="font-semibold">{item?.height}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      Weight:<span className="font-semibold">{item?.weight}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Hair:<span className="font-semibold">{item?.hair}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    </p>
    <p>And had a conservation with &nbsp;<span className="font-semibold">{item?.name ? item?.name : "______________________________"}</span>&nbsp; at the subject of premises, I confirmed it was. Because I asked him/her if he/she was the tenant and he/she replied yes I asked the person(s)
      spoken to whether said ternant(s) and/or Undertenant(s) sued here in was in the service of the United State of New York in any capacity and the
      person(s) informed me that said tenant(s)/undertentant(s) were not in the military service, nor was the tenant(s)/undertentant(s) or any one in said tenant(s)/undertentant(s) faimly
      dependent on any person in the military service of the United States.
    </p>
    <p>In addition I asked if &nbsp;<span className="font-semibold">{item?.name ? item?.name : "______________________________"}</span>&nbsp; was in the military service of the United State or the state of New York
      in any capcity and the person(s) informed me that said tenant(s)/undertentant(s) were not in the military service, nor was the tenant(s)/undertentant(s) or any one in said tenant(s)/undertentant(s) faimly
      dependent on any person in the military service of the New York, United States or any allied naition.</p>
    <p>
      From the facts above set forth, I am convinced that the said tenant(s) is not in or financially dependent upon someone in the military service of the military service of
      the United States or of New York State at the present time.
    </p>
    <div className="font-semibold flex items-center justify-between w-full">
      <div>
        <p>Sworn to before me on</p>
        <p>{item?.mailingAddressDate ? formatDate(item?.mailingAddressDate) : "______________________________"}</p>
      </div>
      <div>
        <p><span className="font-semibold">{item?.serverName ? item?.serverName : "______________________________"}</span></p>
        <p>Lic#{item?.serverLicense ? item?.serverLicense : "______________________________"}</p>
        <p><span className="font-semibold capitalize">{item?.serverAddress ? item?.serverAddress : "______________________________"}</span>
        </p>

      </div>

    </div>
  </div>
}
export default Body