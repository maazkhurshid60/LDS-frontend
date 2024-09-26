import axios from "axios"
import { baseUrl } from "../baseUrl/baseUrl"
import { toast } from "react-toastify";
import api from "../axiosInstance";
const accessToken = localStorage.getItem("accessToken");

// LOGIN API
export const loginApi = async (data) => {
    try {
        const response = await axios.post(`${baseUrl}/user/login`, data)
        return response
    } catch (error) {
        throw Error(error)
    }
}

// REGISTER API
export const registerUserApi = async (data) => {
    try {
        const response = await axios.post(`${baseUrl}/user/register`, data)
        toast.success(`${response?.data?.message}`)
        return response
    } catch (error) {
        toast.error(`${error?.response?.data?.message}`)
    }
}

// GET ALL USER API
export const getAllUserApi = async () => {
    try {
        const response = await api.get(`/user/all-users`)
        return response
    } catch (error) {
        throw Error(error)
    }
}

// UPDATE USER API
export const updateUserApi = async (data) => {
    try {

        const response = await api.patch(`${baseUrl}/user/update`, data)
        return response
    } catch (error) {
        toast.error(`${error?.response?.data?.message}`)
    }
}




// UPDATE USER ROLE API
export const updateUserRoleApi = async (data: any) => {
    try {

        const response = await api.patch(`${baseUrl}/user/update-user-roles`, data)
        return response
    } catch (error) {
        throw Error(error)
    }
}

