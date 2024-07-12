import axios from "axios";
import { baseUrl } from "../baseUrl/baseUrl";
import { serviceTypeType } from "../../type/serviceResultType/serviceResultType";
const accessToken = localStorage.getItem("accessToken");
// GET ADD SERVICE RESULT API
export const addServiceTypeApi=async(data:any)=>{
    try {
        const response= await axios.post(`${baseUrl}/service-type/create`,data, { headers: {
            "Authorization": `Bearer ${accessToken}`
        } })
        return response
    } catch (error) {
        throw Error (error)
    }
    }

    
// DELETE SERVICE RESULT API
export const deleteServiceTypeApi=async(id:string)=>{
    try {
             const response = await axios.delete(`${baseUrl}/service-type/delete`, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
            data:{
                serviceTypeId: id
            } 
        });
        console.log(response)
        return response;
    } catch (error) {
        throw Error (error)
    }
    }

    // UPDATE SERVICE RESULT API
export const updateServiceTypeApi=async(data:serviceTypeType)=>{
    console.log(">>>>>>>>>>>",data)
    try {
        const accessToken = localStorage.getItem("accessToken");
        const response= await axios.patch(`${baseUrl}/service-type/update`,data, { headers: {
            "Authorization": `Bearer ${accessToken}`
        } })
        console.log(response)
        return response
    } catch (error) {
        throw Error (error)
        console.log(error)
    }
    }
