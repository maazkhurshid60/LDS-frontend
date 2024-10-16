import { useQuery, UseQueryResult } from "@tanstack/react-query"; // Import useQuery and UseQueryResult
import { baseUrl } from "../../apiservices/baseUrl/baseUrl";
import axios from "axios";

export const useGetAllData = (endPointName: string): UseQueryResult<any, Error> => {
    const accessToken = localStorage.getItem("accessToken");

    return useQuery({
        queryKey: ['data', endPointName],
        queryFn: async () => {
            const response = await axios.get(`${baseUrl}${endPointName}`, {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            });
            if (!response) {
                throw new Error('Network response was not ok');
            }
            return response?.data?.data; // Adjusted to return the correct data structure
        }
    });
};
