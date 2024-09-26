import axios from "axios";
import { baseUrl } from "../baseUrl/baseUrl"
import api from "../axiosInstance";
const accessToken = localStorage.getItem("accessToken");

//  ADD HOLIDAY API
export const addStandardServiceTypeApi = async (data: any) => {
    try {
        const response = await axios.post(`${baseUrl}/standard-service-type/create`, data, {
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
export const deleteStandardServiceTypeApi = async (id: string) => {
    try {

        const response = await api.delete(`${baseUrl}/standard-service-type/delete`, {

            data: {
                standardServiceTypeId: id
            }
        });
        return response;
    } catch (error) {
        throw Error(error)
    }
}
// UPDATE SERVICE RESULT API
export const updateStandardServiceTypeApi = async (data: any) => {
    try {
        const accessToken = localStorage.getItem("accessToken");

        const response = await api.patch(`/standard-service-type/update`, data)
        return response
    } catch (error) {

        throw Error(error)
    }
}