import axios from "axios";
import { baseUrl } from "../baseUrl/baseUrl";
import { clientType } from "../../type/clientType/clientType";
import api from "../axiosInstance";
const accessToken = localStorage.getItem("accessToken");

// GET ADD SERVICE RESULT API
export const addClientApi = async (data: any) => {
    try {
        // const response= await axios.post(`${baseUrl}/client/create`,data, { headers: {
        //     "Authorization": `Bearer ${accessToken}`
        // } })
        const response = await api.post(`/client/create`, data)
        return response
    } catch (error) {
        console.log(error)
        throw Error(error)
    }
}


// DELETE SERVICE RESULT API
export const deleteClientApi = async (id: string) => {
    try {
        // const response = await axios.delete(`${baseUrl}/client/delete`, {
        //     headers: {
        //         "Authorization": `Bearer ${accessToken}`
        //     },
        //     data: {
        //         clientId: id
        //     }
        // });
        const response = await api.delete(`/client/delete`, {
            data: {
                clientId: id
            }
        });
        console.log(response)
        return response;
    } catch (error) {
        console.log("error", error)
        throw Error(error)
    }
}

// UPDATE SERVICE RESULT API
export const updateClientApi = async (data: clientType) => {
    console.log(">>>>>>>>>>>", data)
    try {
        const accessToken = localStorage.getItem("accessToken");
        // const response = await axios.patch(`${baseUrl}/client/update`, data, {
        //     headers: {
        //         "Authorization": `Bearer ${accessToken}`
        //     }
        // })
        const response = await api.patch(`/client/update`, data)
        console.log(response)
        return response
    } catch (error) {
        console.log(error)
        throw Error(error)

    }
}