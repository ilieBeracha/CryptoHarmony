import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

const token = window.localStorage.getItem('token');
let initialState = null;

if (token) {
    const { firstName, lastName, sub } = jwtDecode<{ firstName: string, lastName: string, sub: number }>(token);
    initialState = { firstName, lastName, sub };
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginRedux: (state, action: PayloadAction<string>) => {
            const { firstName, lastName, sub } = jwtDecode<{ firstName: string, lastName: string, sub: number }>(action.payload);
            state = { firstName, lastName, sub };
            window.localStorage.setItem('token', action.payload);
            return state;
        },
        logoutRedux: (state:any) => {
            window.localStorage.removeItem(`token`);
            return null;
        },
    }
})

export const { loginRedux, logoutRedux } = authSlice.actions;

export default authSlice.reducer;
