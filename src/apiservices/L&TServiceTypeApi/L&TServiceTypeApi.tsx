import api from "../axiosInstance";
const accessToken = localStorage.getItem("accessToken");

//  ADD HOLIDAY API
export const addLtServiceTypeApi = async (data: any) => {
    try {
        const response = await api.post(`/ltservice-type/create`, data)
        return response
    } catch (error) {

        throw new Error(error)
    }
}


// DELETE SERVICE RESULT API
export const deleteLtServiceTypeApi = async (id: string) => {
    try {
        const response = await api.delete(`/ltservice-type/delete`, {

            data: {
                lTServiceTypeId: id
            }
        });
        return response;
    } catch (error) {
        throw Error(error)
    }
}
// UPDATE SERVICE RESULT API
export const updateLtServiceTypeApi = async (data: any) => {
    try {
        const accessToken = localStorage.getItem("accessToken");

        const response = await api.patch(`/ltservice-type/update`, data)
        return response
    } catch (error) {

        throw Error(error)
    }
}