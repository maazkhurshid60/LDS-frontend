// import React, { useEffect, useRef, useState } from "react";
// import { useJsApiLoader, GoogleMap, Autocomplete, DirectionsRenderer, MarkerF } from '@react-google-maps/api';
// import ReactToPrint from "react-to-print";
// import Button from "../../Buttons/Button/Button";
// import { useSelector } from "react-redux";
// import { RootState } from "../../../redux/store";
// import { toast } from "react-toastify";

// export interface TransPerSlipReportProps {
//     props?: any;
// }

// const GPSReport = () => {
//     const TransPerSlipReportPrintRef = useRef<HTMLButtonElement | null>(null);
//     const [address, setAddress] = useState(null);
//     const center = { lat: 33.64228, lng: 72.99323 };
//     const legalDeliveryDataa = useSelector((state: RootState) => state?.legalDelivery.selectedLegalDeliveryData);
//     const [searchResultData, setSearchResultData] = useState()
//     const [searchAddress, setSearchResultCity] = useState()
//     const [searchStandardData, setSearchStandardData] = useState()
//     const [searchServiceData, setSearchServiceData] = useState()
//     const [resultData, setResultData] = useState({
//         jobNo: "",
//         agencyLic: "",
//         serverLic: "",
//         plaintiffPetitioner: "",
//         index: "",
//         serveTo: "",
//         address: "",
//         personServed: "",
//         dateOfService: ""
//     })
//     const mapKey = "AIzaSyBfvS4dtfUAJ1yTsXYd6VCI39Ktod98rUg"
//     console.log("geo map????????????", legalDeliveryDataa?.data);
//     const { isLoaded } = useJsApiLoader({
//         // googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY, // Ensure this key is valid
//         googleMapsApiKey: mapKey, // Ensure this key is valid

//         libraries: ["places"]
//     });

//     useEffect(() => {

//         // if (legalDeliveryDataa?.searchResult === "result") {

//         setResultData(prevState => ({
//             ...prevState,
//             index: legalDeliveryDataa?.data?.oLTIndexNo,
//             serveTo: legalDeliveryDataa?.data?.serviceFormId?.queryInformationStandardServeTo,
//             address: legalDeliveryDataa?.data?.lTSAddress,
//             dateOfService: legalDeliveryDataa?.data?.serviceResultDateOfService,
//             jobNo: legalDeliveryDataa?.data?.jobNo,
//             personServed: legalDeliveryDataa?.data?.lTSFirstName,
//             plaintiffPetitioner: legalDeliveryDataa?.data?.sSDPlaintiff


//         }));
//     }, [])

//     // GETTING LATITUDE AND LONGITUDE ON THE BASIS OF ADDRESS STARTS
//     const getLatiLongi = () => {
//         if (isLoaded) {
//             const geoCoder = new window.google.maps.Geocoder();
//             console.log('RESULT DATA: ', resultData);

//             geoCoder.geocode({ address: resultData?.address }, (results, status) => {
//                 console.log('GEO STATUS ==> ', status);

//                 if (status === "OK") {
//                     const location = results[0].geometry.location;
//                     setAddress({
//                         lat: location.lat(),
//                         lng: location.lng(),
//                     });
//                 } else {

//                     alert('Geocode was not successful for the given address');
//                 }
//             });
//         }
//     };

//     useEffect(() => {
//         if (isLoaded) {
//             getLatiLongi();
//         }
//     }, [isLoaded]);
//     // GETTING LATITUDE AND LONGITUDE ON THE BASIS OF ADDRESS ENDS

//     if (!isLoaded) {
//         return <h1>Loading....</h1>;
//     };
//     return <>
//         <div ref={TransPerSlipReportPrintRef} className=" p-6 bg-whiteColor capitalize">
//             <div>
//                 <div className="h-[10vh] w-full bg-grayColor/70 mb-6"></div>
//                 <div className="flex items-start justify-center gap-y-6">
//                     {/* LEFT PART STARTS */}
//                     <div className="w-[50%]  text-base font-bold flex flex-col gap-y-4">
//                         <div className="bg-grayColor/10 p-1 flex flex-col gap-y-2">
//                             <div className="flex items-start gap-x-2">
//                                 <h1 className="w-[45%] ">Job No#:</h1>
//                                 <p className="w-[40%] font-normal">{resultData?.jobNo ? resultData?.jobNo : "______________________________"}</p>
//                             </div>
//                             <h1 className="">Agency DCA Lic#: </h1>
//                             <h1 className="">Process Server Lic#: </h1>
//                         </div>

//                         <div className="flex items-start gap-x-2 mb-2">
//                             <h1 className="w-[45%] ">Plaintiff/Petitioner:</h1>
//                             <p className="w-[40%] font-normal">{resultData?.plaintiffPetitioner ? resultData?.plaintiffPetitioner : "______________________________"}</p>
//                         </div>
//                         <div className="bg-grayColor/10 p-1 flex flex-col gap-y-2">
//                             <div className="flex items-start gap-x-2">
//                                 <h1 className="w-[45%] ">Index#:</h1>
//                                 <p className="w-[40%] font-normal">{resultData?.index ? resultData?.index : "______________________________"}</p>
//                             </div>
//                             <div className="flex items-start gap-x-2">
//                                 <h1 className="w-[45%] ">Serve To:</h1>
//                                 <p className="w-[40%] font-normal">{resultData?.serveTo ? resultData?.serveTo : "______________________________"}</p>
//                             </div>
//                             <div className="flex items-start gap-x-2">
//                                 <h1 className="w-[45%] ">Address:</h1>
//                                 <p className="w-[40%] font-normal">{resultData?.address ? resultData?.address : "______________________________"}</p>
//                             </div>
//                         </div>
//                         <div className="flex items-start gap-x-2 mb-2">
//                             <h1 className="w-[45%] ">Person Served:</h1>
//                             <p className="w-[40%] font-normal">{resultData?.personServed ? resultData?.personServed : "______________________________"}</p>
//                         </div>
//                         <h1 className="">Network Provided</h1>
//                         <div className="bg-grayColor/10 p-1 flex flex-col gap-y-2">
//                             <div className="flex items-start gap-x-2">
//                                 <h1 className="w-[45%] ">date Of Service:</h1>
//                                 <p className="w-[40%] font-normal">{resultData?.dateOfService ? resultData?.dateOfService : "______________________________"}</p>
//                             </div>
//                             <div className="flex items-start gap-x-2">
//                                 <h1 className="w-[45%] ">GPS:</h1>
//                                 <p className="w-[40%] font-normal"><span className=" mr-10">{address?.lat}</span>  <span>{address?.lng}</span></p>
//                             </div>

//                         </div>
//                     </div>
//                     {/* LEFT PART ENDS */}

//                     {/* RIGHT(MAP) PART STARTS */}
//                     <div className="w-[50%] h-[40vh]">

//                         <div className="w-full">

//                             <GoogleMap
//                                 center={address}
//                                 zoom={15}
//                                 mapContainerStyle={{ height: "40vh" }}
//                             >
//                                 <MarkerF position={address} />

//                             </GoogleMap>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="h-[10vh] w-full bg-grayColor/70 mt-6"></div>

//             </div>
//         </div>
//         {/* RIGHT(MAP) PART ENDS */}
//         <div className="flex justify-end mt-5 mb-5 mr-5">
//             <ReactToPrint
//                 trigger={() => (
//                     <div className="w-[10%]">
//                         <Button text="Print" />
//                     </div>
//                 )}
//                 content={() => TransPerSlipReportPrintRef.current}
//             />
//         </div>
//         <div style={{ display: "none" }} >
//             {/* The content to print */}
//             <div className=" border-solid border-[6px] border-grayColor p-6 bg-whiteColor ">
//                 {/* LEFT PART STARTS */}
//                 <div className="w-[50%]  text-base font-bold flex flex-col gap-y-4">
//                     <div className="bg-grayColor/10 p-1 flex flex-col gap-y-2">
//                         <div className="flex items-start gap-x-2">
//                             <h1 className="w-[45%] ">Job No#:</h1>
//                             <p className="w-[40%] font-normal">{resultData?.jobNo ? resultData?.jobNo : "______________________________"}</p>
//                         </div>
//                         <h1 className="">Agency DCA Lic#: </h1>
//                         <h1 className="">Process Server Lic#: </h1>
//                     </div>

//                     <div className="flex items-start gap-x-2 mb-2">
//                         <h1 className="w-[45%] ">Plaintiff/Petitioner:</h1>
//                         <p className="w-[40%] font-normal">{resultData?.plaintiffPetitioner ? resultData?.plaintiffPetitioner : "______________________________"}</p>
//                     </div>
//                     <div className="bg-grayColor/10 p-1 flex flex-col gap-y-2">
//                         <div className="flex items-start gap-x-2">
//                             <h1 className="w-[45%] ">Index#:</h1>
//                             <p className="w-[40%] font-normal">{resultData?.index ? resultData?.index : "______________________________"}</p>
//                         </div>
//                         <div className="flex items-start gap-x-2">
//                             <h1 className="w-[45%] ">Serve To:</h1>
//                             <p className="w-[40%] font-normal">{resultData?.serveTo ? resultData?.serveTo : "______________________________"}</p>
//                         </div>
//                         <div className="flex items-start gap-x-2">
//                             <h1 className="w-[45%] ">Address:</h1>
//                             <p className="w-[40%] font-normal">{resultData?.address ? resultData?.address : "______________________________"}</p>
//                         </div>
//                     </div>
//                     <div className="flex items-start gap-x-2 mb-2">
//                         <h1 className="w-[45%] ">Person Served:</h1>
//                         <p className="w-[40%] font-normal">{resultData?.personServed ? resultData?.personServed : "______________________________"}</p>
//                     </div>
//                     <h1 className="">Network Provided</h1>
//                     <div className="bg-grayColor/10 p-1 flex flex-col gap-y-2">
//                         <div className="flex items-start gap-x-2">
//                             <h1 className="w-[45%] ">date Of Service:</h1>
//                             <p className="w-[40%] font-normal">{resultData?.dateOfService ? resultData?.dateOfService : "______________________________"}</p>
//                         </div>
//                         <div className="flex items-start gap-x-2">
//                             <h1 className="w-[45%] ">GPS:</h1>
//                             <p className="w-[40%] font-normal"><span className=" mr-10">{address?.lat}</span>  <span>{address?.lng}</span></p>
//                         </div>

//                     </div>
//                 </div>
//                 {/* LEFT PART ENDS */}

//                 {/* RIGHT(MAP) PART STARTS */}
//                 <div className="w-[48%] h-[36vh]">

//                     <div className="w-full">
//                         <GoogleMap
//                             center={address}
//                             zoom={15}
//                             mapContainerStyle={{ width: "36vw", height: "36vh" }}
//                         >
//                             <MarkerF position={address} />

//                         </GoogleMap>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </>
// }
// export default GPSReport

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
    const mapKey = "AIzaSyBfvS4dtfUAJ1yTsXYd6VCI39Ktod98rUg"

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyBfvS4dtfUAJ1yTsXYd6VCI39Ktod98rUg",
        libraries: libraries
    })
    console.log("<><><><><><", address)
    console.log("result data", resultData)

    const getLatiLongi = (allAddresses) => {
        console.log("All addresses:", allAddresses);

        if (isLoaded && allAddresses.length > 0) {
            const geoCoder = new window.google.maps.Geocoder();
            setAddress([]); // Clear previous addresses

            const geocodePromises = allAddresses.map((address) => {
                return new Promise((resolve, reject) => {
                    geoCoder.geocode({ address }, (results, status) => {
                        if (status === "OK" && results.length > 0) {
                            const location = results[0].geometry.location;
                            resolve({ lat: location.lat(), lng: location.lng() });
                        } else {
                            console.error('Geocode was not successful for the given address:', address);
                            resolve(null); // Resolve with null for unsuccessful geocodes
                        }
                    });
                });
            });

            Promise.all(geocodePromises).then((results) => {
                // Filter out null results and update the state
                const filteredResults = results.filter(result => result !== null);
                setAddress(filteredResults);
            });
        }
    };


    // const getLatiLongi = (allAddresses) => {
    //     console.log("All addresses:", allAddresses);

    //     if (isLoaded && allAddresses.length > 0) {
    //         const geoCoder = new window.google.maps.Geocoder();

    //         // Clear previous addresses
    //         setAddress([]);
    //         let testArray = []
    //         allAddresses.map((address) => {
    //             geoCoder.geocode({ address }, (results, status) => {
    //                 if (status === "OK" && results.length > 0) {
    //                     const location = results[0].geometry.location;
    //                     setAddress(prev => [
    //                         ...prev,
    //                         { lat: location.lat(), lng: location.lng() }
    //                     ]);
    //                 } else {
    //                     console.error('Geocode was not successful for the given address:', address);
    //                 }
    //             });
    //         });

    //     }
    // };

    // const getLatiLongi = (allAddresses) => {
    //     console.log("All addresses:", allAddresses);

    //     if (isLoaded && allAddresses.length > 0) {
    //         const geoCoder = new window.google.maps.Geocoder();

    //         // Clear previous addresses
    //         setAddress([]);
    //         let testArray = []
    //         allAddresses.map((address) => {
    //             geoCoder.geocode({ address }, (results, status) => {
    //                 if (status === "OK" && results.length > 0) {
    //                     const location = results[0].geometry.location;
    //                     // setAddress(prev => [
    //                     //     ...prev,
    //                     // testArray.push({ lat: location.lat(), lng: location.lng() })
    //                     return { lat: location.lat(), lng: location.lng() }
    //                     // ]);
    //                 } else {
    //                     console.error('Geocode was not successful for the given address:', address);
    //                 }
    //             });
    //         });
    //         console.log("testArray", testArray)
    //         setAddress(testArray)

    //     }
    // };

    // const getLatiLongi = (allAddresses) => {
    //     console.log("All addresses:", allAddresses);

    //     if (isLoaded && allAddresses.length > 0) {
    //         const geoCoder = new window.google.maps.Geocoder();

    //         allAddresses.forEach((address) => {
    //             geoCoder.geocode({ address }, (results, status) => {

    //                 if (status === "OK") {
    //                     // console.log("location", results[0]);
    //                     const location = results[0].geometry.location;
    //                     setAddress({
    //                         lat: location.lat(),
    //                         lng: location.lng(),
    //                     });
    //                 } else {
    //                     console.error('Geocode was not successful for the given address:', address);
    //                     // alert('Geocode was not successful for the given address: ' + address);
    //                 }
    //             });
    //         });
    //     }
    // };
    // Populate data based on `legalDeliveryDataa`
    useEffect(() => {
        if (legalDeliveryDataa?.data && Array.isArray(legalDeliveryDataa.data)) {
            setResultData(legalDeliveryDataa.data);
        }
    }, [legalDeliveryDataa]);

    // Call geocoding on address update
    useEffect(() => {
        // if (isLoaded && resultData.length > 0) {
        //     getLatiLongi(resultData[0]?.lTSAddress); // Use the first result for the map center, or change as needed
        // }

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
    console.log(address.length)
    return (
        <>
            <div ref={TransPerSlipReportPrintRef} className="p-6 bg-whiteColor capitalize">
                <div className="flex ">
                    <div className="w-[60%] ">
                        {resultData.map((item, index) => (
                            <div key={index} className="mb-6 w-[100%] mt-2  h-[100vh]">
                                <h2 className="font-bold">Record #{index + 1}</h2>
                                <div className="flex items-start justify-center gap-y-6 w-[100%] h-[60vh] ">
                                    {/* LEFT PART STARTS */}
                                    <div className="w-[100%] text-base font-bold flex flex-col gap-y-4">
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
                                                <p className="w-[100%] font-normal">{item?.serviceFormId?.queryInformationStandardServeTo || "______________________________"}</p>
                                            </div>
                                            <div className="flex items-start gap-x-2">
                                                <h1 className="w-[45%]">Address:</h1>
                                                <p className="w-[100%] font-normal">{item?.lTSAddress || "______________________________"}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-x-2 mb-2">
                                            <h1 className="w-[45%]">Person Served:</h1>
                                            <p className="w-[100%] font-normal">{item?.lTSFirstName || "______________________________"}</p>
                                        </div>
                                        <h1>Network Provided</h1>
                                        <div className="bg-grayColor/10 p-1 flex flex-col gap-y-2">
                                            <div className="flex items-start gap-x-2">
                                                <h1 className="w-[45%]">Date Of Service:</h1>
                                                <p className="w-[100%] font-normal">{item?.serviceResultDateOfService || "______________________________"}</p>
                                            </div>
                                            <div className="flex items-start gap-x-2">
                                                <h1 className="w-[45%]">GPS:</h1>
                                                <p className="w-[100%] font-normal"><span className="mr-10">{address?.lat}</span> <span>{address?.lng}</span></p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* LEFT PART ENDS */}

                                    {/* RIGHT(MAP) PART STARTS */}
                                    {/* <div className="w-[50%] h-[40vh]"> */}

                                    {/* <GoogleMap
                                    center={valid}
                                    zoom={15}
                                    mapContainerStyle={{ height: "40vh" }}
                                >
                                    <MarkerF position={valid} /> 
                                    {address.map((address, idx) => (
                                        <MarkerF
                                            key={idx}
                                            position={{ lat: address?.lat, lng: address?.lng }}
                                            label={address.label || `Location ${idx + 1}`} // Use dynamic label or fallback
                                        />
                                    ))}
                                </GoogleMap> */}

                                    {/* </div> */}
                                    {/* RIGHT(MAP) PART ENDS */}
                                </div>
                            </div>
                        ))}</div>
                    <div className="w-[35%] ">
                        {address?.map((item, idx) => (
                            <div className="mt-2  h-[100vh]">

                                <GoogleMap
                                    center={item}
                                    zoom={15}
                                    mapContainerStyle={{ height: "60vh" }}
                                >

                                    <MarkerF
                                        key={idx}
                                        position={item}
                                        label={`Location ${idx}`} // Use dynamic label or fallback
                                    />
                                </GoogleMap>
                            </div>
                        ))}</div>
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

export default GPSReport;
