import axios from "axios";
import { baseUrl } from "../baseUrl/baseUrl"
import { serverType } from "../../type/serverType/serverType";
import api from "../axiosInstance";
const accessToken = localStorage.getItem("accessToken");
//  ADD SERVICE RESULT API
export const addServerApi = async (data: any) => {
    try {

        const response = await api.post(`${baseUrl}/server/create`, data, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        })
        return data
    } catch (error) {
        throw Error(error)
    }
}
// DELETE SERVICE RESULT API
export const deleteServerApi = async (id: string) => {
    try {

        const response = await api.delete(`/server/delete`, {

            data: {
                serverId: id
            }
        });
        return response;
    } catch (error) {
        throw Error(error)
    }
}
// UPDATE SERVICE RESULT API
export const updateServerApi = async (data: serverType) => {
    try {
        const accessToken = localStorage.getItem("accessToken");

        const response = await api.patch(`/server/update`, data)
        return response

    } catch (error) {
        toast.error(`${error?.response?.data?.message}`)

    }
}