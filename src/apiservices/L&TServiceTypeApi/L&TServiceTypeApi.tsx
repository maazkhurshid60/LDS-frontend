import axios from "axios";
import { baseUrl } from "../baseUrl/baseUrl"
import { holidayType } from "../../type/holidayType/holidayType";
import api from "../axiosInstance";
const accessToken = localStorage.getItem("accessToken");

//  ADD HOLIDAY API
export const addLtServiceTypeApi = async (data: any) => {
    try {
        // console.log(data)
        // const response = await axios.post(`${baseUrl}/ltservice-type/create`, data, {
        //     headers: {
        //         "Authorization": `Bearer ${accessToken}`
        //     }
        // })
        const response = await api.post(`/ltservice-type/create`, data)
        return response
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}


// DELETE SERVICE RESULT API
export const deleteLtServiceTypeApi = async (id: string) => {
    try {
        // const response = await axios.delete(`${baseUrl}/ltservice-type/delete`, {
        //     headers: {
        //         "Authorization": `Bearer ${accessToken}`
        //     },
        //     data: {
        //         lTServiceTypeId: id
        //     }
        // });
        const response = await api.delete(`/ltservice-type/delete`, {

            data: {
                lTServiceTypeId: id
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
export const updateLtServiceTypeApi = async (data: any) => {
    console.log(">>>>>>>>>>>", data)
    try {
        const accessToken = localStorage.getItem("accessToken");
        // const response = await axios.patch(`${baseUrl}/ltservice-type/update`, data, {
        //     headers: {
        //         "Authorization": `Bearer ${accessToken}`
        //     }
        // })
        const response = await api.patch(`/ltservice-type/update`, data)
        console.log(response)
        return response
    } catch (error) {
        // alert(`${error?.response?.data?.message}`)
        console.log(error?.response?.data)
        throw Error(error)
    }
}