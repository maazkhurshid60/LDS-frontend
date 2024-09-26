import axios from "axios"
import { serviceResultType } from "../../type/serviceResultType/serviceResultType";
import api from "../axiosInstance";


// GET ADD SERVICE RESULT API
export const addServiceResultApi = async (data: any) => {
    try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await api.post(`/service-result/create`, data)
        return response
    } catch (error) {
        throw Error(error)
    }
}


// DELETE SERVICE RESULT API
export const deleteServiceResultApi = async (id: string) => {
    try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await api.delete(`/service-result/delete`, {

            data: {
                serviceResultId: id
            } // Assuming 'data' contains any parameters for the delete request
        });
        return response;
    } catch (error) {
        throw Error(error)
    }
}


// UPDATE SERVICE RESULT API
export const updateServiceResultApi = async (data: serviceResultType) => {
    try {
        const accessToken = localStorage.getItem("accessToken");

        const response = await axios.patch(`/service-result/update`, data)
        return response
    } catch (error) {
        throw Error(error)
    }
}

