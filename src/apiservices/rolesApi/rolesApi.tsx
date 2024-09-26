import axios from "axios";
import { baseUrl } from "../baseUrl/baseUrl";
import api from "../axiosInstance";

const accessToken = localStorage.getItem("accessToken");


// GET ALL ROLE API
export const getAllRoleApi = async () => {
    try {
        const response = await axios.get(`${baseUrl}/role/all-roles`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        return response
    } catch (error) {
        throw Error(error)
    }
}

// ADD ROLE API
export const addRoleApi = async (data: any) => {
    try {
        const response = await axios.post(`${baseUrl}/role/create`, data, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        return response
    } catch (error) {
        throw Error(error)
    }
}


// DELETE DELETE API
export const deleteRoleApi = async (id: any) => {
    const roleIdData = { roleId: id }

    try {

        const response = await axios.delete(`${baseUrl}/role/delete`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            },
            data: roleIdData  // Assuming 'data' contains any parameters for the delete request
        });
        return response;
    } catch (error) {
        throw Error(error)
    }
}

// UPDATE ROLE API
export const updateRoleApi = async (data) => {
    try {

        const response = await api.patch(`/role/update`, data, {

        })
        return response
    } catch (error) {
        throw Error(error)
    }
}