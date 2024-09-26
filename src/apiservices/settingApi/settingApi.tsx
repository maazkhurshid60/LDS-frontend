import axios from "axios";
import { baseUrl } from "../baseUrl/baseUrl"
import api from "../axiosInstance";
//  ADD SETTING RESULT API
export const addSettingApi = async (data: any) => {
    try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.post(`${baseUrl}/setting/create`, data, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        })
        return response
    } catch (error) {
        throw new Error(error)
    }
}

//  UPDATE SETTING RESULT API
export const updateSettingApi = async (updatedData: any) => {
    const accessToken = localStorage.getItem("accessToken");
    try {

        const response = await api.patch(`/setting/update`, {
            settings: updatedData
        })
        return response
    } catch (error) {
        throw new Error(error)
    }
}
