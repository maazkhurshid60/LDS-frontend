import axios from "axios"
import { baseUrl } from "../baseUrl/baseUrl"

// LOGIN API
export const loginApi=async(data)=>{
try {
    const response= await axios.post (`${baseUrl}/user/login`,data)
    return response
} catch (error) {
    throw Error (error)
}
}