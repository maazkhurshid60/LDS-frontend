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
const libraries = ["places"]

const GPSReport = () => {
    const TransPerSlipReportPrintRef = useRef<HTMLButtonElement | null>(null);
    const [address, setAddress] = useState([]);
    const center = { lat: 33.64228, lng: 72.99323 };
    const legalDeliveryDataa = useSelector((state: RootState) => state?.legalDelivery.selectedLegalDeliveryData);
    const [resultData, setResultData] = useState([]);
    const mapKey = "AIzaSyCVarmzRfQK8gU8fFh6bTmOtThP5iNfYaY"
    console.log("<<<<<<<<<<", resultData)
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyCVarmzRfQK8gU8fFh6bTmOtThP5iNfYaY",


        libraries: libraries
    })


    const getLatiLongi = (allAddresses) => {
        if (isLoaded && allAddresses?.length > 0) {
            const geoCoder = new window.google.maps.Geocoder();
            const allResults = []; // Array to hold all address results

            // Step 1: Process each address
            allAddresses.forEach(address => {
                if (!address || address.trim() === "") {
                    // If the address is empty, store it with valid: false
                    allResults.push({ address: "Empty address", valid: false });
                } else {
                    // For valid addresses, geocode them
                    const geocodePromise = new Promise((resolve) => {
                        geoCoder.geocode({ address }, (results, status) => {
                            if (status === "OK" && results?.length > 0) {
                                const location = results[0]?.geometry?.location;
                                resolve({ lat: location?.lat(), lng: location?.lng(), address, valid: true });
                            } else {
                                resolve({ address, valid: false }); // Store the invalid address
                            }
                        });
                    });

                    allResults.push(geocodePromise);
                }
            });

            // Step 2: Handle the results
            Promise.all(allResults).then((results) => {
                setAddress(results); // Set all results, valid and invalid
            });
        }
    };

    // Populate data based on `legalDeliveryDataa`
    useEffect(() => {
        if (legalDeliveryDataa?.data && Array?.isArray(legalDeliveryDataa?.data)) {
            setResultData(legalDeliveryDataa?.data);
        }
    }, [legalDeliveryDataa]);

    // Call geocoding on address update
    useEffect(() => {
        if (isLoaded && resultData.length > 0) {
            const addresses = resultData.map(item => item?.lTSAddress); // Extract all addresses
            getLatiLongi(addresses); // Geocode all addresses
        }
    }, [isLoaded, resultData]);

    if (!isLoaded) {
        return <h1>Loading....</h1>;
    };
    const valid = {
        lat: 33.5888559, lng: 71.44292860000002
    }
    const mapCenter = address.length > 0 && address[0]
    console.log("address", address, "resultData", resultData)
    return (
        <>
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
            <div ref={TransPerSlipReportPrintRef} className="p-6 bg-whiteColor capitalize">

                <div className="flex h-full">
                    <div className="w-[60%] flex flex-col">
                        {resultData?.map((item, index) => (
                            <div key={index} className="mb-6 w-full mt-4 flex-grow page-break"> {/* Added page-break class */}
                                <h2 className="font-bold">Record #{index + 1}</h2>
                                <div className="flex items-start justify-center gap-y-6 w-full h-full">
                                    {/* LEFT PART STARTS */}
                                    <div className="w-full text-base font-bold flex flex-col gap-y-4">
                                        <div className="bg-grayColor/10 p-1 flex flex-col gap-y-2">
                                            <div className="flex items-start gap-x-2">
                                                <h1 className="w-[45%]">Job No#:</h1>
                                                <p className="w-[100%] font-normal">{item?.jobNo || "______________________________"}</p>
                                            </div>
                                            <h1>Agency DCA Lic#: </h1>
                                            <h1>Process Server Lic#: </h1>
                                        </div>
                                        <div className="flex items-start gap-x-2 mb-2">
                                            <h1 className="w-[45%]">Plaintiff/Petitioner:</h1>
                                            <p className="w-[100%] font-normal">{item?.sSDPlaintiff || "______________________________"}</p>
                                        </div>
                                        <div className="bg-grayColor/10 p-1 flex flex-col gap-y-2">
                                            <div className="flex items-start gap-x-2">
                                                <h1 className="w-[45%]">Index#:</h1>
                                                <p className="w-[100%] font-normal">{item?.oLTIndexNo || "______________________________"}</p>
                                            </div>
                                            <div className="flex items-start gap-x-2">
                                                <h1 className="w-[45%]">Serve To:</h1>
                                                <p className="w-[100%] font-normal">{item?.serviceResultlTServed || "______________________________"}</p>
                                            </div>
                                            <div className="flex items-start gap-x-2">
                                                <h1 className="w-[45%]">Address:</h1>
                                                <p className="w-[100%] font-normal">{item?.lTSAddress || "______________________________"}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-x-2 mb-2">
                                            <h1 className="w-[45%]">Person Served:</h1>
                                            <p className="w-[100%] font-normal">{item?.serviceResultlTServed || "______________________________"}</p>
                                        </div>
                                        <h1>Network Provided</h1>
                                        <div className="bg-grayColor/10 p-1 flex flex-col gap-y-2">
                                            <div className="flex items-start gap-x-2">
                                                <h1 className="w-[45%]">Date and Time Of Service:</h1>
                                                <p className="w-[100%] font-normal">
                                                    {item?.serviceResultDateOfService && item?.serviceResultTimeOfService
                                                        ? `${item.serviceResultDateOfService} ${item.serviceResultTimeOfService} hrs`
                                                        : "______________________________"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* LEFT PART ENDS */}
                                </div>
                            </div>
                        ))}


                    </div>
                    <div className="w-[35%] flex flex-col mt-4">
                        {address?.length > 0 ? address?.map((item, idx) => (
                            <div className="mt-2 flex-grow mb-4" key={idx}>
                                {item.valid ? (
                                    <GoogleMap
                                        center={{ lat: item?.lat, lng: item?.lng }}
                                        zoom={15}
                                        mapContainerStyle={{ height: "60vh" }}
                                    >
                                        <MarkerF
                                            position={{ lat: item?.lat, lng: item?.lng }}
                                            label={`Location ${idx}`}
                                        />
                                    </GoogleMap>
                                ) : (
                                    <div className="text-center border-dashed border-grayColor border-[1px] px-4 py-6 h-[65vh] flex items-center justify-center">{item.address || "No address found"}</div>
                                )}
                            </div>
                        )) : (
                            <div className="text-center border-dashed border-grayColor border-[1px] px-4 py-6 h-[65vh]">No addresses available</div>
                        )}
                    </div>
                </div>
            </div>

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


        </>
    );
}

<style jsx>{`
@media print {
.page-break {
page-break-after: always; /* This will ensure a new page for each record */
}
}
`}</style>
export default GPSReport;
