import axios from "axios"
import { baseUrl } from "../baseUrl/baseUrl"

// GET ALLRESULT API
export const getAllServiceResultApi=async()=>{
try {
    const accessToken = localStorage.getItem("accessToken");
    const response= await axios.get(`${baseUrl}/service-result/all-service-results`, { headers: {
        "Authorization": `Bearer ${accessToken}`
    } })
    return response?.data
} catch (error) {
    throw Error (error)
}
}