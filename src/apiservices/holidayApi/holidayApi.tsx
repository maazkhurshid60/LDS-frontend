import axios from "axios";
import { baseUrl } from "../baseUrl/baseUrl"
//  ADD HOLIDAY API
export const addHolidayApi = async (data: any) => {
    try {
        // console.log(data)
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.post(`${baseUrl}/holiday/create`, data, {
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
