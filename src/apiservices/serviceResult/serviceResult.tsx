import axios from "axios"
import { baseUrl } from "../baseUrl/baseUrl"


// GET ADD SERVICE RESULT API
export const addServiceResultApi=async(data:any)=>{
    try {
        const accessToken = localStorage.getItem("accessToken");
        const response= await axios.post(`${baseUrl}/service-result/create`,data, { headers: {
            "Authorization": `Bearer ${accessToken}`
        } })
        return response
    } catch (error) {
        throw Error (error)
    }
    }


// DELETE SERVICE RESULT API
export const deleteServiceResultApi=async(id:string)=>{
    console.log(id)
    try {
        const accessToken = localStorage.getItem("accessToken");
        console.log(accessToken,id)

        const response = await axios.delete(`${baseUrl}/service-result/delete`, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
            data:{
                serviceResultId: id
            } // Assuming 'data' contains any parameters for the delete request
        });
        console.log(response)
        return response;
    } catch (error) {
        throw Error (error)
    }
    }

// // GET ALLRESULT API
// export const getAllServiceResultApi=async()=>{
// try {
//     const accessToken = localStorage.getItem("accessToken");
//     const response= await axios.get(`${baseUrl}/service-result/all-service-results`, { headers: {
//         "Authorization": `Bearer ${accessToken}`
//     } })
//     return response?.data
// } catch (error) {
//     throw Error (error)
// }
// }

