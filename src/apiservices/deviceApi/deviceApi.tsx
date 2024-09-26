import axios from "axios";
import { baseUrl } from "../baseUrl/baseUrl"
import { deviceType } from "../../type/deviceType/deviceType";
const accessToken = localStorage.getItem("accessToken");
//  ADD SERVICE RESULT API
export const addDeviceApi = async (data: deviceType[]) => {
    try {

        const response = await axios.post(`${baseUrl}/device/create`, data, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        })
        return response
    } catch (error) {

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

        return response;
    } catch (error) {

        throw Error(error)
    }
}
// UPDATE SERVICE RESULT API
export const updateDeviceApi = async (data: deviceType) => {

    try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.patch(`${baseUrl}/device/update`, data, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        })

        return response
    } catch (error) {

        throw Error(error)
    }
}