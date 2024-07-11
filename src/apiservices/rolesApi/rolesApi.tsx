import axios from "axios";
import { baseUrl } from "../baseUrl/baseUrl";

const accessToken = localStorage.getItem("accessToken");

console.log(accessToken)

 // GET ALL ROLE API
 export const getAllRoleApi=async()=>{
    try {
        const response= await axios.get (`${baseUrl}/role/all-roles`,{ headers: {
            "Authorization": `Bearer ${accessToken}`
        } })
        return response
    } catch (error) {
        throw Error (error)
    }
    }

// ADD ROLE API
export const addRoleApi=async(data:any)=>{
    try {
        const response= await axios.post(`${baseUrl}/role/create`,data, { headers: {
            "Authorization": `Bearer ${accessToken}`
        } })
        return response
    } catch (error) {
        throw Error (error)
    }
    }

    
// DELETE DELETE API
export const deleteRoleApi=async(id:any)=>{
    const roleIdData={roleId:id}
    
    try {
        console.log(accessToken,roleIdData)

        const response = await axios.delete(`${baseUrl}/role/delete`, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
            data:roleIdData  // Assuming 'data' contains any parameters for the delete request
        });
        console.log(response)
        return response;
    } catch (error) {
        throw Error (error)
    }
    }

     // UPDATE ROLE API
export const updateRoleApi=async(data)=>{
    try {
        const response= await axios.patch (`${baseUrl}/role/update`,data,{ headers: {
            "Authorization": `Bearer ${accessToken}`
        } })
        return response
    } catch (error) {
        throw Error (error)
    }
    }