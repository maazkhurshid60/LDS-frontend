import axios from "axios";
import { baseUrl } from "../baseUrl/baseUrl"
import { holidayType } from "../../type/holidayType/holidayType";
const accessToken = localStorage.getItem("accessToken");

//  ADD HOLIDAY API
export const addStandardServiceTypeApi = async (data: any) => {
    try {
        // console.log(data)
        const response = await axios.post(`${baseUrl}/standard-service-type/create`, data, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        })
        return response
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}


// DELETE SERVICE RESULT API
export const deleteStandardServiceTypeApi = async (id: string) => {
    try {
        const response = await axios.delete(`${baseUrl}/standard-service-type/delete`, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
            data: {
                standardServiceTypeId: id
            }
        });
        // console.log(response)
        return response;
    } catch (error) {
        console.log("error", error)
        throw Error(error)
    }
}
// UPDATE SERVICE RESULT API
export const updateStandardServiceTypeApi = async (data:any) => {
    console.log(">>>>>>>>>>>",data)
    try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.patch(`${baseUrl}/standard-service-type/update`, data, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        })
        console.log(response)
        return response
    } catch (error) {
        // alert(`${error?.response?.data?.message}`)
        console.log(error?.response?.data)
        throw Error (error)
    }
}