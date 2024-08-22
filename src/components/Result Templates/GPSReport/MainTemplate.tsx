import React, { useEffect, useRef, useState } from "react";
import { useJsApiLoader, GoogleMap, Autocomplete, DirectionsRenderer, MarkerF } from '@react-google-maps/api';
import ReactToPrint from "react-to-print";
import Button from "../../Buttons/Button/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { toast } from "react-toastify";

export interface TransPerSlipReportProps {
    props?: any;
}

const GPSReport = () => {
    const TransPerSlipReportPrintRef = useRef<HTMLButtonElement | null>(null);
    const [address, setAddress] = useState(null);
    const center = { lat: 33.64228, lng: 72.99323 };
    const legalDeliveryDataa = useSelector((state: RootState) => state?.legalDelivery.selectedLegalDeliveryData);
    const [searchResultData, setSearchResultData] = useState()
    const [searchAddress, setSearchResultCity] = useState()
    const [searchStandardData, setSearchStandardData] = useState()
    const [searchServiceData, setSearchServiceData] = useState()
    const [resultData, setResultData] = useState({
        jobNo: "",
        agencyLic: "",
        serverLic: "",
        plaintiffPetitioner: "",
        index: "",
        serveTo: "",
        address: "",
        personServed: "",
        dateOfService: ""
    })
    const mapKey = "AIzaSyDfkcgoTZ8x9oDnDcGgNuyV6ivVJGOjzfo"
    console.log("geo map????????????", resultData);
    const { isLoaded } = useJsApiLoader({
        // googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY, // Ensure this key is valid
        googleMapsApiKey: mapKey, // Ensure this key is valid

        libraries: ["places"]
    });

    useEffect(() => {

        if (legalDeliveryDataa?.searchResult === "result") {

            setResultData(prevState => ({
                ...prevState,
                index: legalDeliveryDataa?.data?.serviceFormId?.queryInformationLTIndexNo,
                serveTo: legalDeliveryDataa?.data?.serviceFormId?.queryInformationStandardServeTo,
                address: legalDeliveryDataa?.data?.queryInformationLTAddress,
                personServed: legalDeliveryDataa?.data?.serviceFormId?.serviceResultServerId,
                dateOfService: legalDeliveryDataa?.data?.serviceFormId?.serviceResultDateOfService,
                jobNo: legalDeliveryDataa?.data?.serviceFormId?.jobNo
            }));
        } else if (legalDeliveryDataa?.searchResult === "standard") {

            setResultData(prevState => ({
                ...prevState,
                index: legalDeliveryDataa?.data?.oSSTIndexNo,
                jobNo: legalDeliveryDataa?.data?.jobNo,
                plaintiffPetitioner: legalDeliveryDataa?.data?.sSDPlaintiff,
                // serveTo: legalDeliveryDataa?.data?.queryInformationStandardServeTo,
                address: legalDeliveryDataa?.data?.addressServe,
                personServed: legalDeliveryDataa?.data?.serviceResultlTServed,
                dateOfService: legalDeliveryDataa?.data?.inputDate,
            }));

        } else if (legalDeliveryDataa?.searchResult === "service") {
            setResultData(prevState => ({
                ...prevState,
                index: legalDeliveryDataa?.data?.oLTIndexNo
                ,
                jobNo: legalDeliveryDataa?.data?.jobNo,
                // plaintiffPetitioner:legalDeliveryDataa?.data?.sSDPlaintiff,
                // serveTo: legalDeliveryDataa?.data?.queryInformationStandardServeTo,
                address: legalDeliveryDataa?.data?.lTSAddress,
                personServed: legalDeliveryDataa?.data?.serviceResultlTServed,
                dateOfService: legalDeliveryDataa?.data?.inputDate,
            }));
        }
    }, [])

    // GETTING LATITUDE AND LONGITUDE ON THE BASIS OF ADDRESS STARTS
    const getLatiLongi = () => {
        if (isLoaded) {
            const geoCoder = new window.google.maps.Geocoder();
            console.log('RESULT DATA: ', resultData);

            geoCoder.geocode({ address: resultData?.address }, (results, status) => {
                console.log('GEO STATUS ==> ', status);

                if (status === "OK") {
                    const location = results[0].geometry.location;
                    setAddress({
                        lat: location.lat(),
                        lng: location.lng(),
                    });
                } else {

                    alert('Geocode was not successful for the given address');
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
    return <>
        <div ref={TransPerSlipReportPrintRef} className=" p-6 bg-whiteColor capitalize">
            <div>
            <div className="h-[10vh] w-full bg-grayColor/70 mb-6"></div>
            <div className="flex items-start justify-center gap-y-6">
                {/* LEFT PART STARTS */}
                <div className="w-[50%]  text-base font-bold flex flex-col gap-y-4">
                    <div className="bg-grayColor/10 p-1 flex flex-col gap-y-2">
                        <div className="flex items-start gap-x-2">
                            <h1 className="w-[45%] ">Job No:</h1>
                            <p className="w-[40%] font-normal">{resultData?.jobNo}</p>
                        </div>
                        <h1 className="">Agency DCA Lic: </h1>
                        <h1 className="">Process Server Lic: </h1>
                    </div>

                    <div className="flex items-start gap-x-2 mb-2">
                        <h1 className="w-[45%] ">Plaintiff/Petitioner:</h1>
                        <p className="w-[40%] font-normal">{resultData?.plaintiffPetitioner}</p>
                    </div>
                    <div className="bg-grayColor/10 p-1 flex flex-col gap-y-2">
                        <div className="flex items-start gap-x-2">
                            <h1 className="w-[45%] ">Index:</h1>
                            <p className="w-[40%] font-normal">{resultData?.index}</p>
                        </div>
                        <div className="flex items-start gap-x-2">
                            <h1 className="w-[45%] ">Serve To:</h1>
                            <p className="w-[40%] font-normal">{resultData?.serveTo}</p>
                        </div>
                        <div className="flex items-start gap-x-2">
                            <h1 className="w-[45%] ">Address:</h1>
                            <p className="w-[40%] font-normal">{resultData?.address}</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-x-2 mb-2">
                        <h1 className="w-[45%] ">Person Served:</h1>
                        <p className="w-[40%] font-normal">{resultData?.personServed}</p>
                    </div>
                    <h1 className="">Network Provided</h1>
                    <div className="bg-grayColor/10 p-1 flex flex-col gap-y-2">
                        <div className="flex items-start gap-x-2">
                            <h1 className="w-[45%] ">date Of Service:</h1>
                            <p className="w-[40%] font-normal">{resultData?.dateOfService}</p>
                        </div>
                        <div className="flex items-start gap-x-2">
                            <h1 className="w-[45%] ">GPS:</h1>
                            <p className="w-[40%] font-normal"><span className=" mr-10">{address?.lat}</span>  <span>{address?.lng}</span></p>
                        </div>

                    </div>
                </div>
                {/* LEFT PART ENDS */}

                {/* RIGHT(MAP) PART STARTS */}
                <div className="w-[50%] h-[40vh]">

                    <div className="w-full">

                        <GoogleMap
                            center={address}
                            zoom={15}
                            mapContainerStyle={{ height: "40vh" }}
                        >
                            <MarkerF position={address} />

                        </GoogleMap>
                    </div>
                </div>
            </div>
            <div className="h-[10vh] w-full bg-grayColor/70 mt-6"></div>

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
        <div style={{ display: "none" }} >
            {/* The content to print */}
            <div className=" border-solid border-[6px] border-grayColor p-6 bg-whiteColor ">
                {/* LEFT PART STARTS */}
                <div className="w-[50%] font-medium text-base font-semibold">
                    <h1 className="">Job No: {resultData?.jobNo}</h1>
                    <h1 className="">Agency DCA Lic: AgencyDCALic_FROM_BACKEND_API</h1>
                    <h1 className="">Process Server Lic: ProcessServerLic_FROM_BACKEND_API</h1>
                    <h1 className="">Plaintiff/Petitioner: Petitioner_FROM_BACKEND_API</h1>
                    <h1 className="">Index: {resultData?.index}</h1>
                    <h1 className="">Serve To: {resultData?.serveTo}</h1>
                    <h1 className="">Address: {resultData?.address}</h1>
                    <h1 className="">Person Served: {resultData?.personServed}</h1>
                    <h1 className="">Network Provided: NetworkProvided_FROM_BACKEND_API</h1>
                    <h1 className="">Date and Time of Service:  {resultData?.dateOfService}
                    </h1>
                    <h1 className="">GPS: <span className="ml-10 mr-10">{address?.lat}</span>  <span>{address?.lng}</span></h1>


                </div>
                {/* LEFT PART ENDS */}

                {/* RIGHT(MAP) PART STARTS */}
                <div className="w-[48%] h-[36vh]">

                    <div className="w-full">
                        <GoogleMap
                            center={address}
                            zoom={15}
                            mapContainerStyle={{ width: "36vw", height: "36vh" }}
                        >
                            <MarkerF position={address} />

                        </GoogleMap>
                    </div>
                </div>
            </div>
        </div>
    </>
}
export default GPSReport