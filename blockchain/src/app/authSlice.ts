import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

const token = window.localStorage.getItem('token');
let initialState = null;

if (token) {
    const { firstName, lastName, sub, role } = jwtDecode<{ firstName: string, lastName: string, sub: number, role: string }>(token);
    initialState = { firstName, lastName, sub, role };
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginRedux: (state, action: PayloadAction<string>) => {
            const { firstName, lastName, sub, role } = jwtDecode<{ firstName: string, lastName: string, sub: number, role: string }>(action.payload);
            state = { firstName, lastName, sub, role };
            window.localStorage.setItem('token', action.payload);
            return state;
        },
        logoutRedux: (state) => {
            window.localStorage.removeItem(`token`);
            return null;
        },
    }
})

export const { loginRedux, logoutRedux } = authSlice.actions;

export default authSlice.reducer;
