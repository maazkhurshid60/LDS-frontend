import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllUserApi, updateUserApi, updateUserRoleApi } from "../../apiservices/user/userApi";
import { toast } from "react-toastify";
import { Dispatch } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import axios from "axios";
import { baseUrl } from "../../apiservices/baseUrl/baseUrl";
import { showSpinnerReducer } from "./spinner";
const accessToken = localStorage.getItem("accessToken");
// const dispatch=useDispatch()
export type User = {
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    roles: string[]
    _id?: any
};

interface InitialStateType {
    userId: number;
    allUser: {
        totalDocs: number;
        tableData: User[];
    };
    singleUser: User[] | null;
    status: "idle" | "loading" | "success" | "error"; // Add status field
}

const initialState: InitialStateType = {
    userId: 0,
    allUser: {
        totalDocs: 5,
        tableData: [

        ],
    },
    singleUser: null,
    status: "idle", // Initial status

};

const userId = createSlice({
    name: "userId",
    initialState: initialState,

    reducers: {
        getUserId: (state, action: PayloadAction<number>) => {
            state.userId = action.payload;
        },
        getOneUser: (state) => {
            const oneUser = state.allUser.tableData[state.userId];
            state.singleUser = oneUser ? [oneUser] : null; // Correctly assign singleUser as User[] or null
        },
        getPreviousUser: (state) => {
            if (state.userId > 0) {
                state.userId--;
                state.singleUser = [state.allUser.tableData[state.userId]]; // Wrap in array if accessing a single user
            }
        },
        getNextUser: (state) => {
            if (state.userId < state.allUser.tableData.length - 1) {
                state.userId++;
                state.singleUser = [state.allUser.tableData[state.userId]]; // Wrap in array if accessing a single user
            }
        },
        getFirstUser: (state) => {
            state.userId = 0;
            state.singleUser = [state.allUser.tableData[state.userId]]; // Wrap in array if accessing a single user
        },
        getLastUser: (state) => {
            state.userId = state.allUser.tableData.length - 1;
            state.singleUser = [state.allUser.tableData[state.userId]]; // Wrap in array if accessing a single user
        },
        deleteUser: (state, action: PayloadAction<{ userId: number }>) => {
            const { userId } = action.payload;
            state.allUser.tableData = state.allUser.tableData.filter((user, id) => id !== userId);
            state.singleUser = null; // Reset singleUser after deletion
        },
    },
    extraReducers: (builder) => {
        /////////////////GET ALL USER ROLE API EXRTA REDUCERS
        builder.addCase(getAllUsers.pending, (state) => {
            state.status = "loading"; // Set status to "loading" while fetching
        });
        builder.addCase(getAllUsers.fulfilled, (state, action) => {
            // Update state with the fetched data
            state.allUser.tableData = action.payload;
            // console.log("action..pakod",action.payload);
            state.status = "success"; // Set status to "success" on successful fetch
        });
        builder.addCase(getAllUsers.rejected, (state, action) => {
            // Handle error state if needed
            console.error("Error fetching all users:", action.error);
            state.status = "error"; // Set status to "error" on fetch failure
        });
        /////////////////UPDATE USER API EXRTA REDUCERS
        builder.addCase(updateUser.pending, (state) => {
            state.status = "loading"; // Set status to "loading" while fetching
        });
        builder.addCase(updateUser.fulfilled, (state, action) => {
            // Update state with the fetched data
            // state.allUser.tableData = action.payload;
            // console.log("action..pakod",action.payload);
            state.status = "success"; // Set status to "success" on successful fetch
        });
        builder.addCase(updateUser.rejected, (state, action) => {
            // Handle error state if needed
            console.error("update use failed:", action.error);
            state.status = "error"; // Set status to "error" on fetch failure
        });
        /////////////////UPDATE USER ROLE API EXRTA REDUCERS
        builder.addCase(updateUserRole.pending, (state) => {
            state.status = "loading"; // Set status to "loading" while fetching
        });
        builder.addCase(updateUserRole.fulfilled, (state, action) => {
            // Update state with the fetched data
            // state.allUser.tableData = action.payload;
            // console.log("action..pakod",action.payload);
            state.status = "success"; // Set status to "success" on successful fetch
        });
        builder.addCase(updateUserRole.rejected, (state, action) => {
            // Handle error state if needed
            console.error("update use failed:", action.error);
            state.status = "error"; // Set status to "error" on fetch failure
        });
        /////////////////DELETE USER ROLE API EXRTA REDUCERS
        builder.addCase(deleteUserApi.pending, (state) => {
            state.status = "loading"
        })
        builder.addCase(deleteUserApi.fulfilled, (state) => {
            state.status = "success"
        })
        builder.addCase(deleteUserApi.rejected, (state) => {
            state.status = "error"
        })
    },

});

export const { getUserId, deleteUser, getOneUser, getPreviousUser, getNextUser, getFirstUser, getLastUser } = userId.actions;
export default userId.reducer;


// GET ALL USERS API
export const getAllUsers = createAsyncThunk<User[]>(
    "userId/getAllUsers",
    async () => {
        try {
            const res = await getAllUserApi();
            return res.data.data; // Assuming data is in res.data.data, adjust as per your API response structure
        } catch (error) {
            throw new Error("Failed to fetch all users");
        }
    }
);


// GET UPDATE USERS API
export const updateUser = createAsyncThunk<any>(
    "userId/updateUser",
    async (data, { dispatch }) => {
        dispatch(showSpinnerReducer(true))
        try {
            const res = await updateUserApi(data);
            toast.success(`${res?.data.message}`)
            // TO GET UPDATED DATA
            dispatch(getAllUsers());

        } catch (error) {
            toast.error("notupdated yet")
        }
        finally {
            dispatch(showSpinnerReducer(false))

        }
    }
);

// DELETE USER API
export const deleteUserApi = createAsyncThunk<any>(
    "deleteUser",
    async (data, { dispatch }) => {
dispatch(showSpinnerReducer(true))

        try {
            const response = await axios.delete(`${baseUrl}/user/delete-user`, {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
                , data: { userId: data }
            })
            toast.success(`${response?.data.message}`)
            // TO GET UPDATED DATA
            dispatch(getAllUsers());

        } catch (error) {
            console.log(error)
            toast.error("notupdated yet")
        }finally{
dispatch(showSpinnerReducer(false))

        }
    }
);
// export const deleteUserApi=async(id)=>{
//     console.log("",id)
//     try {
//         const response= await axios.delete(`${baseUrl}/user/delete-user`,{ headers: {
//             "Authorization": `Bearer ${accessToken}`
//         } 
//         ,data:{userId:id}
//     })
//         return response
//     } catch (error) {
//         console.log(error)
//         throw Error (error)
//     }
//     }

// UPDATE USER ROLE API
export const updateUserRole = createAsyncThunk<any>(
    "userId/updateUserRole",
    async (data, { dispatch }) => {
dispatch(showSpinnerReducer(true))
        
        try {
            const res = await updateUserRoleApi(data);
            // TO GET UPDATED DATA
            dispatch(getAllUsers());
            toast.success(`User Role Updated Successfully`)
        } catch (error) {
            toast.error("notupdated yet")
        }finally{
dispatch(showSpinnerReducer(false))

        }
    }
);

