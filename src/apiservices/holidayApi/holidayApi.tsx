import { holidayType } from "../../type/holidayType/holidayType";
import api from "../axiosInstance";
const accessToken = localStorage.getItem("accessToken");

//  ADD HOLIDAY API
export const addHolidayApi = async (data: holidayType[]) => {
    try {

        const response = await api.post(`/holiday/create`, data)
        return response
    } catch (error) {
        throw new Error(error)
    }
}

// DELETE SERVICE RESULT API
export const deleteHolidayApi = async (id: string) => {
    try {

        const response = await api.delete(`/holiday/delete`, {
            data: {
                holidayId: id
            }
        });
        return response;
    } catch (error) {
        throw Error(error)
    }
}
// UPDATE SERVICE RESULT API
export const updateHolidayApi = async (data: holidayType) => {

    try {
        const accessToken = localStorage.getItem("accessToken");

        const response = await api.patch(`/holiday/update`, data)

        return response
    } catch (error) {

        throw Error(error)
    }
}