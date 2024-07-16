import axios from "axios";
import { baseUrl } from "../baseUrl/baseUrl"
import { serverType } from "../../type/serverType/serverType";
const accessToken = localStorage.getItem("accessToken");
//  ADD SERVICE RESULT API
export const addServerApi = async (data: any) => {
    try {
        console.log(data)
   
        const response = await axios.post(`${baseUrl}/server/create`, data, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        })
        alert(`${response?.data?.message}`)
    } catch (error) {
        console.log(">>>>error",error)
       alert(`${error?.response?.data?.message}`)
    }
}
    // DELETE SERVICE RESULT API
    export const deleteServerApi=async(id:string)=>{
        try {
                 const response = await axios.delete(`${baseUrl}/server/delete`, {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                },
                data:{
                    serverId: id
                } 
            });
            console.log(response)
            return response;
        } catch (error) {
            console.log("error",error)
            throw Error (error)
        }
        }
    //     // UPDATE SERVICE RESULT API
    export const updateServerApi=async(data:serverType)=>{
        console.log(">>>>>>>>>>>",data)
        try {
            const accessToken = localStorage.getItem("accessToken");
            const response= await axios.patch(`${baseUrl}/server/update`,data, { headers: {
                "Authorization": `Bearer ${accessToken}`
            } })
            console.log(response)
            return response

        } catch (error) {
            console.log(error)
            alert(`${error?.response?.data?.message}`)
     
        }
        }