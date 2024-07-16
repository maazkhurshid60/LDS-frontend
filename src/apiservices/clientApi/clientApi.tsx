import axios from "axios";
import { baseUrl } from "../baseUrl/baseUrl";
import { clientType } from "../../type/clientType/clientType";
const accessToken = localStorage.getItem("accessToken");

// GET ADD SERVICE RESULT API
export const addClientApi=async(data:any)=>{
    try {
        const response= await axios.post(`${baseUrl}/client/create`,data, { headers: {
            "Authorization": `Bearer ${accessToken}`
        } })
        return response
    } catch (error) {
        throw Error (error)
    }
    }


    // DELETE SERVICE RESULT API
export const deleteClientApi=async(id:string)=>{
    try {
             const response = await axios.delete(`${baseUrl}/client/delete`, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
            data:{
                clientId: id
            } 
        });
        console.log(response)
        return response;
    } catch (error) {
        console.log("error",error)
        throw Error (error)
    }
    }

    // UPDATE SERVICE RESULT API
export const updateClientApi=async(data:clientType)=>{
    console.log(">>>>>>>>>>>",data)
    try {
        const accessToken = localStorage.getItem("accessToken");
        const response= await axios.patch(`${baseUrl}/client/update`,data, { headers: {
            "Authorization": `Bearer ${accessToken}`
        } })
        console.log(response)
        return response
    } catch (error) {
        console.log(error)
        throw Error (error)
 
    }
    }