import React from 'react';
import { LoadScript, GoogleMap, DistanceMatrixService } from '@react-google-maps/api';
import { toast } from 'react-toastify';

interface MyMapComponentProps {
    previousForm: any, currentAddress: any, allServiceForm: any, serviceFormIndex: any, convertDurationToMinutes: any
}
const MyMapComponent: React.FC<MyMapComponentProps> = ({ previousForm, currentAddress, allServiceForm, serviceFormIndex, convertDurationToMinutes }) => {

    const handleDistanceMatrixResponse = (response) => {
        if (response && response.rows[0].elements[0].status === "OK") {
            const distance = response.rows[0].elements[0].distance.text; // e.g., "13 km"
            const duration = response.rows[0].elements[0].duration.text; // e.g., "30 mins"
            const totalMinutes = convertDurationToMinutes(duration);

            toast.success(`Distance: ${distance}, Duration: ${duration}`);
        } else {
            toast.error("Distance Matrix API request failed or returned an error.");
        }
    };

    return (
        <LoadScript
            googleMapsApiKey="AIzaSyBfvS4dtfUAJ1yTsXYd6VCI39Ktod98rUg" // Replace with your actual API key
            loadingElement={<div>Loading...</div>} // Optional loading element
        >
            <GoogleMap
                center={{ lat: -34.397, lng: 150.644 }} // Set to a relevant location
                zoom={8}
            >
                {previousForm?.serviceResultServerId?._id !== undefined && allServiceForm[serviceFormIndex]?.serviceResultServerId?._id !== undefined && (
                    <DistanceMatrixService
                        options={{
                            origins: [currentAddress || ''], // Current address
                            destinations: [previousForm?.lTSAddress || ''], // Previous address
                            travelMode: 'DRIVING', // Use the travel mode you prefer
                        }}
                        callback={handleDistanceMatrixResponse}
                    />
                )}
            </GoogleMap>
        </LoadScript>
    );
};

export default MyMapComponent;
