import { clientType } from "../../type/clientType/clientType";
import api from "../axiosInstance";
const accessToken = localStorage.getItem("accessToken");
interface SetServerRequestBody {
    serverDownStatus: boolean;  // Assuming the status is a boolean
    statusId?: string
}

// GET ADD SERVICE RESULT API
export const addServerStatusApi = async (data: SetServerRequestBody) => {
    try {
        const response = await api.post(`/server-down/create`, data)
        return response
    } catch (error) {
        throw Error(error)
    }
}




// UPDATE SERVICE RESULT API
export const updateServerStatusApi = async (data: SetServerRequestBody) => {

    try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await api.patch(`/server-down/update`, data)

        return response
    } catch (error) {

        throw Error(error)

    }
}
// GET SERVICE RESULT API
export const getAllServerStatusApi = async () => {

    try {
        const response = await api.get(`/server-down/getall`)
        console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<", response);

        return response
    } catch (error) {

        console.log("<<<<<<<<<<<<<<<<<<<<<<<error<<<<<<<<<<<<<<", error);

        throw Error(error)

    }
}