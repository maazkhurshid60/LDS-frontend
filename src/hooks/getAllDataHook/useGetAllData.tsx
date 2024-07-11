import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "../../apiservices/baseUrl/baseUrl";
import axios from "axios";


  
export const useGetAllData = (endPointName: string) => {
    const accessToken = localStorage.getItem("accessToken");

    // with tenstack starts
    const { isLoading, error, data } = useQuery< any, Error>({
      queryKey: ['data', endPointName], // Specify queryKey array here
      queryFn: async () => {
        const response= await axios.get(`${baseUrl}${endPointName}`, { 
          
          headers: {
            "Authorization": `Bearer ${accessToken}`
        } })
          if (!response) {
              throw new Error('Network response was not ok');
          }
          return response?.data?.data;
      }
  });

  return { isLoading, error, data };
  // without tenstack ends
    

}


