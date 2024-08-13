import React, { useEffect, useRef, useState } from "react";
import { useJsApiLoader, GoogleMap, Autocomplete, DirectionsRenderer, MarkerF } from '@react-google-maps/api';
import ReactToPrint from "react-to-print";
import Button from "../../Buttons/Button/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

export interface TransPerSlipReportProps {
    props?: any;
}

const GPSReport = () => {
    const TransPerSlipReportPrintRef = useRef<HTMLButtonElement | null>(null);
    const [address, setAddress] = useState(null);
    const center = { lat: 33.64228, lng: 72.99323 };
    const legalDeliveryDataa = useSelector((state: RootState) => state?.legalDelivery);
    console.log("geo map", legalDeliveryDataa?.legalDeliveryData?.City);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY, // Ensure this key is valid
        libraries: ["places"]
    });

   

    // GETTING LATITUDE AND LONGITUDE ON THE BASIS OF ADDRESS STARTS
    const getLatiLongi = () => {
        if (isLoaded) {
            const geoCoder = new window.google.maps.Geocoder();
            geoCoder.geocode({ address: legalDeliveryDataa?.legalDeliveryData?.City }, (results, status) => {
                if (status === "OK") {
                    const location = results[0].geometry.location;
                    setAddress({
                        lat: location.lat(),
                        lng: location.lng(),
                    });
                } else {
                    alert('Geocode was not successful for the following reason: ' + status);
                }
            });
        }
    };

    useEffect(() => {
        if (isLoaded) {
            getLatiLongi();
        }
    }, [isLoaded]);
    // GETTING LATITUDE AND LONGITUDE ON THE BASIS OF ADDRESS ENDS
    
    if (!isLoaded) {
        return <h1>Loading....</h1>;
    };
    return   <>
    <div className=" ">
        <div className="flex items-start gap-y-6">

        {/* LEFT PART STARTS */}
        <div className="w-[50%] font-medium text-base">
        <h1 className="">Job No: JOBNO_FROM_BACKEND_API</h1>
        <h1 className="">Agency DCA Lic: AgencyDCALic_FROM_BACKEND_API</h1>
        <h1 className="">Process Server Lic: ProcessServerLic_FROM_BACKEND_API</h1>
        <h1 className="">Plaintiff/Petitioner: Petitioner_FROM_BACKEND_API</h1>
        <h1 className="">Index: Index_FROM_BACKEND_API</h1>
        <h1 className="">Serve To: ServeTo_FROM_BACKEND_API</h1>
        <h1 className="">Address: {legalDeliveryDataa?.legalDeliveryData?.City}</h1>
        <h1 className="">Person Served: person Served_FROM_BACKEND_API</h1>
        <h1 className="">Network Provided: NetworkProvided_FROM_BACKEND_API</h1>
        <h1 className="">Address: {legalDeliveryDataa?.legalDeliveryData?.City}</h1>
        <h1 className="">Date and Time of Service: DateTime_FROM_BACKEND_API</h1>
        <h1 className="">GPS: GPSLong_FROM_BACKEND_API  GPSLat_FROM_BACKEND_API</h1>


        </div>
        {/* LEFT PART ENDS */}

        {/* RIGHT(MAP) PART STARTS */}
        <div className="w-[48%] h-[75vh]">
           
        <div className="w-full">
            
                <GoogleMap
                    center={address}
                    zoom={15}
                    mapContainerStyle={{ width: "36vw", height: "75vh" }}
                    >
                    <MarkerF position={address} />
                   
          </GoogleMap>
            </div>
        </div>
        </div>

        {/* RIGHT(MAP) PART ENDS */}
        <div className="flex justify-end mt-5 mb-5 mr-5">
                    <ReactToPrint
                        trigger={() => (
                            <div className="w-[10%]">
                                <Button text="Print" />
                            </div>
                        )}
                        content={() => TransPerSlipReportPrintRef.current}
                        />
                </div>

    </div>
    <div style={{ display: "none" }}>
              {/* The content to print */}
                <div ref={TransPerSlipReportPrintRef}>
                    {/* LEFT PART STARTS */}
        <div className="w-[50%] font-medium text-base">
        <h1 className="">Job No: JOBNO_FROM_BACKEND_API</h1>
        <h1 className="">Agency DCA Lic: AgencyDCALic_FROM_BACKEND_API</h1>
        <h1 className="">Process Server Lic: ProcessServerLic_FROM_BACKEND_API</h1>
        <h1 className="">Plaintiff/Petitioner: Petitioner_FROM_BACKEND_API</h1>
        <h1 className="">Index: Index_FROM_BACKEND_API</h1>
        <h1 className="">Serve To: ServeTo_FROM_BACKEND_API</h1>
        <h1 className="">Address: {legalDeliveryDataa?.legalDeliveryData?.City}</h1>
        <h1 className="">Person Served: person Served_FROM_BACKEND_API</h1>
        <h1 className="">Network Provided: NetworkProvided_FROM_BACKEND_API</h1>
        <h1 className="">Address: {legalDeliveryDataa?.legalDeliveryData?.City}</h1>
        <h1 className="">Date and Time of Service: DateTime_FROM_BACKEND_API</h1>
        <h1 className="">GPS: GPSLong_FROM_BACKEND_API  GPSLat_FROM_BACKEND_API</h1>


        </div>
        {/* LEFT PART ENDS */}

        {/* RIGHT(MAP) PART STARTS */}
        <div className="w-[48%] h-[75vh]">
           
        <div className="w-full">
                <GoogleMap
                    center={center}
                    zoom={15}
                    mapContainerStyle={{ width: "36vw", height: "75vh" }}
                    >
                    <MarkerF position={center} />
                   
          </GoogleMap>
            </div>
        </div>
                </div>
            </div>
                                        </>
}
export default GPSReport