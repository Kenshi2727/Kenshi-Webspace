import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: null,
    firstName: null,
    lastName: null,
    email: null,
    role: null,
    tagline: null,
    createdAt: null,
    updatedAt: null
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            Object.assign(state, action.payload);
            console.log("Current state:", action.payload);
        },
        clearUser: () => initialState,
    }
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;