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
        // const response= await axios.get (`${baseUrl}/user/all-users`,{ headers: {
        //     "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        // } })
        const response = await api.get(`/user/all-users`)
        return response
    } catch (error) {
        throw Error(error)
    }
}

// UPDATE USER API
export const updateUserApi = async (data) => {
    try {
        // const response = await axios.patch(`${baseUrl}/user/update`, data, {
        //     headers: {
        //         "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        //     }
        // })
        const response = await api.patch(`${baseUrl}/user/update`, data)
        return response
    } catch (error) {
        console.log(error)
        toast.error(`${error?.response?.data?.message}`)
    }
}
// export const deleteUserApi=async(id)=>{
// console.log("",id)
// try {
//     const response= await axios.delete(`${baseUrl}/user/delete-user`,{ headers: {
//         "Authorization": `Bearer ${accessToken}`
//     } 
//     ,data:{userId:id}
// })
//     return response
// } catch (error) {
//     console.log(error)
//     throw Error (error)
// }
// }



// UPDATE USER ROLE API
export const updateUserRoleApi = async (data: any) => {
    console.log("><><><><", data)
    try {
        // const response = await axios.patch(`${baseUrl}/user/update-user-roles`, data, {
        //     headers: {
        //         "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        //     }
        // })
        const response = await api.patch(`${baseUrl}/user/update-user-roles`, data)
        return response
    } catch (error) {
        throw Error(error)
    }
}

