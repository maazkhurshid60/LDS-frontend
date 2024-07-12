import axios from "axios"
import { baseUrl } from "../baseUrl/baseUrl"
import { serviceResultType } from "../../type/serviceResultType/serviceResultType";


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


    // UPDATE SERVICE RESULT API
export const updateServiceResultApi=async(data:serviceResultType)=>{
    console.log(">>>>>>>>>>>",data)
    try {
        const accessToken = localStorage.getItem("accessToken");
        const response= await axios.patch(`${baseUrl}/service-result/update`,data, { headers: {
            "Authorization": `Bearer ${accessToken}`
        } })
        return response
    } catch (error) {
        throw Error (error)
    }
    }

