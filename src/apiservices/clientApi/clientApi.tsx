import { clientType } from "../../type/clientType/clientType";
import api from "../axiosInstance";
const accessToken = localStorage.getItem("accessToken");

// GET ADD SERVICE RESULT API
export const addClientApi = async (data: any) => {
    try {
        const response = await api.post(`/client/create`, data)
        return response
    } catch (error) {
        throw Error(error)
    }
}


// DELETE SERVICE RESULT API
export const deleteClientApi = async (id: string) => {
    try {
        const response = await api.delete(`/client/delete`, {
            data: {
                clientId: id
            }
        });

        return response;
    } catch (error) {

        throw Error(error)
    }
}

// UPDATE SERVICE RESULT API
export const updateClientApi = async (data: clientType) => {

    try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await api.patch(`/client/update`, data)

        return response
    } catch (error) {

        throw Error(error)

    }
}