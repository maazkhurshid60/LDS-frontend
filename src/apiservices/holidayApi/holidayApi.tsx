import axios from "axios";
import { baseUrl } from "../baseUrl/baseUrl"
import { holidayType } from "../../type/holidayType/holidayType";
const accessToken = localStorage.getItem("accessToken");

//  ADD HOLIDAY API
export const addHolidayApi = async (data: holidayType[]) => {
    try {
        // console.log(data)
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


// DELETE SERVICE RESULT API
export const deleteHolidayApi = async (id: string) => {
    try {
        const response = await axios.delete(`${baseUrl}/holiday/delete`, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
            data: {
                holidayId: id
            }
        });
        // console.log(response)
        return response;
    } catch (error) {
        console.log("error", error)
        throw Error(error)
    }
}
// UPDATE SERVICE RESULT API
export const updateHolidayApi = async (data:holidayType) => {
    console.log(">>>>>>>>>>>",data)
    try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.patch(`${baseUrl}/holiday/update`, data, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        })
        console.log(response)
        return response
    } catch (error) {
        // alert(`${error?.response?.data?.message}`)
        console.log(error?.response?.data)
        throw Error (error)
    }
}