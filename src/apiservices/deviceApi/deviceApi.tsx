import axios from "axios";
import { baseUrl } from "../baseUrl/baseUrl"
//  ADD SERVICE RESULT API
export const addDeviceApi = async (data: any) => {
    try {
        console.log(data)
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.post(`${baseUrl}/device/create`, data, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        })
        return response
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}
