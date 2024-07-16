// import { useQuery, UseQueryResult } from "@tanstack/react-query"; // Import useQuery and UseQueryResult
// import { baseUrl } from "../../apiservices/baseUrl/baseUrl";
// import axios from "axios";

// export const useGetAllDataParameter = (endPointName: string): UseQueryResult<any, Error> => {
//     const accessToken = localStorage.getItem("accessToken");
// const fetchDataParameter={noOfDocsEachPage : 10,
//     currentPageNumber : 0}
//     return useQuery({
//         queryKey: ['data', endPointName],
//         queryFn: async () => {
//             const response = await axios.get(`${baseUrl}${endPointName}`, {
//                 params: fetchDataParameter, // Attach fetchData as query parameters
//                 headers: {
//                     "Authorization": `Bearer ${accessToken}`
//                 }
//             });
//             if (!response) {
//                 throw new Error('Network response was not ok');
//             }
//             return response; // Adjusted to return the correct data structure
//         }
//     });
// };

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { baseUrl } from "../../apiservices/baseUrl/baseUrl";
import axios from "axios";



export const useGetAllDataParameter = (endPointName: string): UseQueryResult<any, Error> => {
  const accessToken = localStorage.getItem("accessToken");
  const fetchData = {
    noOfDocsEachPage: 10,
    currentPageNumber: 0
  };

  return useQuery({
    queryKey: ['data', endPointName],
    queryFn: async () => {
      try {
        const response = await axios.get(`${baseUrl}${endPointName}`, {
          params: fetchData,
          headers: {
            "Authorization": `Bearer ${accessToken}`
          }
        });

        if (response.status !== 200) {
          throw new Error('Failed to fetch data');
        }
        return response; // Return only the data part of the response

      } catch (error) {
        throw new Error(`Error fetching data: ${error.message}`);
      }
    }
  });
};