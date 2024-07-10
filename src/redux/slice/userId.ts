import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type User = {
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
};

interface InitialStateType {
    userId: number;
    allUser: {
        totalDocs: number;
        tableData: User[];
    };
    singleUser: User[] | null;
}

const initialState: InitialStateType = {
    userId: 0,
    allUser: {
        totalDocs: 5,
        tableData: [
            { userName: "Harry Poter", firstName: "Harry", lastName: "Poter", email: "harry@gmail.com" },
            { userName: "Samith Park", firstName: "Samith", lastName: "Park", email: "samith@gmail.com" },
            { userName: "Starck Smith", firstName: "Starck", lastName: "Smith", email: "starck@gmail.com" },
            { userName: "Mornie Morkel", firstName: "Mornie", lastName: "Morkel", email: "mornie@gmail.com" },
            { userName: "AD Symonds", firstName: "AD", lastName: "Symonds", email: "adsymonds@gmail.com" },
        ],
    },
    singleUser: null,
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
});

export const { getUserId, deleteUser, getOneUser, getPreviousUser, getNextUser, getFirstUser, getLastUser } = userId.actions;
export default userId.reducer;


// import { createSlice } from "@reduxjs/toolkit";
// export type User = {
//     userName: string;
//     firstName: string;
//     lastName: string;
//     email: string;
// };
// const initialState = {
//     userId: 0, allUser: {
//         totalDocs: 5, tableData: [
//         { userName: "Harry Poter", firstName: "Harry", lastName: "Poter", email: "harry@gmail.com" },
//         { userName: "Samith Park", firstName: "Samith", lastName: "Park", email: "samith@gmail.com" },
//         { userName: "Starck Smith", firstName: "Starck", lastName: "Smith", email: "starck@gmail.com" },
//         { userName: "Mornie Morkel", firstName: "Mornie", lastName: "Morkel", email: "mornie@gmail.com" },
//         { userName: "AD Symonds", firstName: "AD", lastName: "Symonds", email: " adsymonds@gmail.com" },
//     ]},
//     singleUser: null,  
// }
// const userId = createSlice({
//     name: "userId",
//     initialState: initialState,
//     reducers: {
//         getUserId: (state, action) => { state.userId = action.payload },
//         getOneUser: (state) => {
//             const allUserData = JSON.stringify(state.allUser.tableData)
//             const allUserDataArray = JSON.parse(allUserData)
//             const oneUser = allUserDataArray?.filter((_, id) => id === state.userId)
//             state.singleUser = oneUser
//         },
//         getPreviousUser: (state) => {
//             if (state.userId > 0) {
//                 state.userId--; // Decrement userId to get the previous user
//                 state.singleUser = state.allUser.tableData[state.userId]; // Update singleUser based on new userId
//             }
            
//         },
//         getNextUser: (state) => {
//                      if (state.userId < state.allUser.tableData.length - 1) {
//                 state.userId++;
//             }

//         },
//         getFirstUser:(state)=>{
//             state.userId=0
//         },
//         getLastUser:(state)=>{
//             state.userId=state.allUser.tableData.length-1
            
//         },
//         deleteUser: (state, action) => {
//             const { userId } = action.payload
//             const allUserData = JSON.stringify(state.allUser.tableData)
//             const allUserDataArray = JSON.parse(allUserData)
//             const oneUser = allUserDataArray?.filter((_, id) => id !== userId)
//             state.allUser.tableData = oneUser

//         }
//     }
// })
// export const { getUserId, deleteUser, getOneUser, getPreviousUser, getNextUser ,getFirstUser,getLastUser} = userId.actions
// export default userId.reducer