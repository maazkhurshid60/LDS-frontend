// import React, { useState } from "react";
// import { useJsApiLoader, GoogleMap,  Autocomplete , DirectionsRenderer, MarkerF} from '@react-google-maps/api';


// const GPSReport = () => {
//     const center = { lat:33.648069, lng:72.967827 };
// const [map, setMap] = useState(null)

// const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY, // Use import.meta.env
//     libraries: ["places"]
// });
//     return <div className="flex items-start gap-y-6 ">
//         {/* LEFT PART STARTS */}
//         <div className="w-[50%] font-medium text-base">
//         <h1 className="">Job No: JOBNO_FROM_BACKEND_API</h1>
//         <h1 className="">Agency DCA Lic: AgencyDCALic_FROM_BACKEND_API</h1>
//         <h1 className="">Process Server Lic: ProcessServerLic_FROM_BACKEND_API</h1>
//         <h1 className="">Plaintiff/Petitioner: Petitioner_FROM_BACKEND_API</h1>
//         <h1 className="">Index: Index_FROM_BACKEND_API</h1>
//         <h1 className="">Serve To: ServeTo_FROM_BACKEND_API</h1>
//         <h1 className="">Address: Address_FROM_BACKEND_API</h1>
//         <h1 className="">Person Served: person Served_FROM_BACKEND_API</h1>
//         <h1 className="">Network Provided: NetworkProvided_FROM_BACKEND_API</h1>
//         <h1 className="">Address: Address_FROM_BACKEND_API</h1>
//         <h1 className="">Date and Time of Service: DateTime_FROM_BACKEND_API</h1>
//         <h1 className="">GPS: GPSLong_FROM_BACKEND_API  GPSLat_FROM_BACKEND_API</h1>


//         </div>
//         {/* LEFT PART ENDS */}

//         {/* RIGHT(MAP) PART STARTS */}
//         <div className="w-[48%]">
           
//         <div>
//                 <GoogleMap
//                     center={center}
//                     zoom={15}
//                     mapContainerStyle={{ width: "80vw", height: "80vh" }}
                    
//                     onLoad={map => setMap(map)}
//                 >
//                     <MarkerF position={center} />
                   
//           </GoogleMap>
//             </div>
//         </div>
//         {/* RIGHT(MAP) PART ENDS */}


//     </div>
// }
// export default GPSReport