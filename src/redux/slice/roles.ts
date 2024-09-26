import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllUserApi, updateUserApi } from "../../apiservices/user/userApi";
import { addRoleApi, deleteRoleApi, getAllRoleApi, updateRoleApi } from "../../apiservices/rolesApi/rolesApi";
import { toast } from "react-toastify";
import { showSpinnerReducer } from "./spinner";




export type User = {
    name: string;
    description: string;
    _id?: any
};

interface InitialStateType {
    allRoles: {
        tableData: User[];
    };
    singleRole: any
    status: "idle" | "loading" | "success" | "error"; // Add status field
}

const initialState: InitialStateType = {
    allRoles: {
        tableData: [],
    },
    singleRole: null,
    status: "idle", // Initial status

};

const userId = createSlice({
    name: "userId",
    initialState: initialState,

    reducers: {
        getOneRole: (state, action) => {
            const allRoleData = JSON.stringify(state.allRoles.tableData)
            const allRoleDataArray = JSON.parse(allRoleData)
            const oneUser = allRoleDataArray?.find((data, id) => data?._id === action.payload);
            state.singleRole = oneUser;
        },
        emptyOneRole: (state) => {
            state.singleRole = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllRoles.pending, (state) => {
            state.status = "loading"; // Set status to "loading" while fetching
        });
        builder.addCase(getAllRoles.fulfilled, (state, action) => {
            // Update state with the fetched data
            state.allRoles.tableData = action.payload;
            state.status = "success"; // Set status to "success" on successful fetch
        });
        builder.addCase(getAllRoles.rejected, (state, action) => {
            // Handle error state if needed
            state.status = "error"; // Set status to "error" on fetch failure
        });

        builder.addCase(addRole.pending, (state) => {
            state.status = "loading"; // Set status to "loading" while fetching
        });
        builder.addCase(addRole.fulfilled, (state, action) => {
            // Update state with the fetched data
            state.allRoles.tableData.push = action.payload;
            state.status = "success"; // Set status to "success" on successful fetch
        });
        builder.addCase(addRole.rejected, (state, action) => {
            // Handle error state if needed
            state.status = "error"; // Set status to "error" on fetch failure
        });
        builder.addCase(deleteRole.pending, (state) => {
            state.status = "loading"; // Set status to "loading" while fetching
        });
        builder.addCase(deleteRole.fulfilled, (state, action) => {
            // Update state with the fetched data
            state.status = "success"; // Set status to "success" on successful fetch
        });
        builder.addCase(deleteRole.rejected, (state, action) => {
            // Handle error state if needed
            state.status = "error"; // Set status to "error" on fetch failure
        });
        builder.addCase(updateRole.pending, (state) => {
            state.status = "loading"; // Set status to "loading" while fetching
        });
        builder.addCase(updateRole.fulfilled, (state, action) => {
            // Update state with the fetched data

            state.status = "success"; // Set status to "success" on successful fetch
        });
        builder.addCase(updateRole.rejected, (state, action) => {
            // Handle error state if needed
            state.status = "error"; // Set status to "error" on fetch failure
        });
    },

});

export const { getOneRole, emptyOneRole } = userId.actions;
export default userId.reducer;


// GET ALL USERS API
export const getAllRoles = createAsyncThunk<User[]>(
    "userId/getAllRoles",
    async (_, thunkAPI) => {
        const { dispatch } = thunkAPI;
        dispatch(showSpinnerReducer(true));
        try {
            const res = await getAllRoleApi();
            return res?.data?.data; // Assuming data is in res.data.data, adjust as per your API response structure
        } catch (error) {
            throw new Error("Failed to fetch all roles");
        } finally {
            dispatch(showSpinnerReducer(false));
        }
    }
);



// ADD ROLE API
export const addRole = createAsyncThunk<any>(
    "userId/addRole",
    async (data, { dispatch }) => {
        dispatch(showSpinnerReducer(true))

        try {
            const res = await addRoleApi(data);
            toast.success(`${res?.data?.message}`)
            return res.data.data; // Assuming data is in res.data.data, adjust as per your API response structure
        } catch (error) {
            throw new Error("Failed to fetch all users");
        } finally {
            dispatch(showSpinnerReducer(false))

        }
    }
);

// DELETE ROLE API
export const deleteRole = createAsyncThunk<any>(
    "userId/deleteRole",
    async (data, { dispatch }) => {
        dispatch(showSpinnerReducer(true))

        try {
            const res = await deleteRoleApi(data);
            toast.success(`${res?.data?.message}`)
            return res.data.data; // Assuming data is in res.data.data, adjust as per your API response structure
        } catch (error) {
            throw new Error("Failed to fetch all users");
        } finally {
            dispatch(showSpinnerReducer(false))

        }
    }
);



// // GET ALL USERS API
export const updateRole = createAsyncThunk<any>(
    "userId/updateRole",
    async (data, { dispatch }) => {
        dispatch(showSpinnerReducer(true))
        try {
            const res = await updateRoleApi(data);
            toast.success(`${res?.data?.message}`)
            return res.data.data; // Assuming data is in res.data.data, adjust as per your API response structure
        } catch (error) {
            throw new Error("Failed to fetch all users");
        } finally {
            dispatch(showSpinnerReducer(false))

        }
    }
);
