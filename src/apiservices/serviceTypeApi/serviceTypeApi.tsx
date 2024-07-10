import axios from "axios";
import { baseUrl } from "../baseUrl/baseUrl";

// GET ADD SERVICE RESULT API
export const addServiceTypeApi=async(data:any)=>{
    try {
        const accessToken = localStorage.getItem("accessToken");
        const response= await axios.post(`${baseUrl}/service-type/create`,data, { headers: {
            "Authorization": `Bearer ${accessToken}`
        } })
        return response
    } catch (error) {
        throw Error (error)
    }
    }

    
// DELETE SERVICE RESULT API
export const deleteServiceTypeApi=async(data:any)=>{
    console.log(data)
    try {
        const accessToken = localStorage.getItem("accessToken");
        console.log(accessToken,data)

        const response = await axios.delete(`${baseUrl}/service-result/delete`, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
            data  // Assuming 'data' contains any parameters for the delete request
        });
        console.log(response)
        return response;
    } catch (error) {
        throw Error (error)
    }
    }