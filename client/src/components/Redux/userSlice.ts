import { createSlice, PayloadAction } from "@reduxjs/toolkit";



export interface Usertype {
    uid: string; // Firebase UID
    email: string;
    userName?: string; // Can store displayName from Firebase
    profilePic?: string;
    isAdmin?:false // Firebase photoURL
    
}

export interface UserState {
    user: Usertype | null;
   
}

const initialState: UserState = {
    user: null
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action:PayloadAction<Usertype|null>) => {
            state.user= action.payload; // Set the user state to the payload
        },
        clearUser: (state) => {
            state.user= null; // Clear the user state by returning null
        },
    },
})




export const { setUser, clearUser } = userSlice.actions; // Export the actions for use in components
// export const selectUser = (state: RootState) => state.user; // Selector to access the user state
export default userSlice.reducer; // Export the reducer to be used in the store