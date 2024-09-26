import axios from "axios";
import { baseUrl } from "../baseUrl/baseUrl";
import { serviceTypeType } from "../../type/serviceResultType/serviceResultType";
import api from "../axiosInstance";
const accessToken = localStorage.getItem("accessToken");
// GET ADD SERVICE RESULT API
export const addServiceTypeApi = async (data: any) => {
    try {
        const response = await api.post(`/service-type/create`, data)
        return response
    } catch (error) {
        throw Error(error)
    }
}


// DELETE SERVICE RESULT API
export const deleteServiceTypeApi = async (id: string) => {
    try {

        const response = await api.delete(`/service-type/delete`, {

            data: {
                serviceTypeId: id
            }
        });
        return response;
    } catch (error) {
        throw Error(error)
    }
}

// UPDATE SERVICE RESULT API
export const updateServiceTypeApi = async (data: serviceTypeType) => {
    try {
        const accessToken = localStorage.getItem("accessToken");

        const response = await api.patch(`/service-type/update`, data,
        )
        return response
    } catch (error) {
        throw Error(error)
    }
}
