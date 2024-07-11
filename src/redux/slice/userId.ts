import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllUserApi, updateUserApi } from "../../apiservices/user/userApi";




export type User = {
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    roles:string[]
    _id?:any
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
        builder.addCase(getAllUsers.pending, (state) => {
            state.status = "loading"; // Set status to "loading" while fetching
        });
        builder.addCase(getAllUsers.fulfilled, (state, action) => {
            // Update state with the fetched data
            state.allUser.tableData = action.payload;
            console.log("action..pakod",action.payload);
            state.status = "success"; // Set status to "success" on successful fetch
        });
        builder.addCase(getAllUsers.rejected, (state, action) => {
            // Handle error state if needed
            console.error("Error fetching all users:", action.error);
            state.status = "error"; // Set status to "error" on fetch failure
        });
        /////////////////
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


// GET ALL USERS API
export const updateUser = createAsyncThunk<any>(
    "userId/updateUser",
    async (data) => {
        try {
            const res = await updateUserApi(data);
            return res.data.data; // Assuming data is in res.data.data, adjust as per your API response structure
        } catch (error) {
            throw new Error("Failed to fetch all users");
        }
    }
);
