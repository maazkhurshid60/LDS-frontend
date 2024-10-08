import axios from "axios";
import { baseUrl } from "../baseUrl/baseUrl"
import { deviceType } from "../../type/deviceType/deviceType";
const accessToken = localStorage.getItem("accessToken");
//  ADD SERVICE RESULT API
export const addDeviceApi = async (data: deviceType[]) => {
    try {
        console.log(data)
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
// DELETE SERVICE RESULT API
export const deleteDeviceApi = async (id: string) => {
    try {
        const response = await axios.delete(`${baseUrl}/device/delete`, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
            data: {
                id: id
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
export const updateDeviceApi = async (data:deviceType) => {
    console.log(">>>>>>>>>>>",data)
    try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.patch(`${baseUrl}/device/update`, data, {
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