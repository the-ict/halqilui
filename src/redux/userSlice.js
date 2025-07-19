import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: null,
    loading: false,
    error: false
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true
        },
        loginSuccess: (state, action) => {
            console.log("action payload: ", action.payload)
            state.loading = false
            state.user = action.payload
        },
        loginFailure: (state) => {
            state.loading = false;
            state.error = true
        },
        addSavedProblem: (state, action) => {
            if (state.user) {
                state.user.saved_problems.push(action.payload);
            }
        },
        removeSavedProblem: (state, action) => {
            if (state.user) {
                state.user.saved_problems = state.user.saved_problems.filter(
                    (problem) => problem._id !== action.payload._id
                );
            }
        },
        logout: () => {
            return initialState;
        }
    }
})


export const { loginStart, loginFailure, loginSuccess, logout, addSavedProblem, removeSavedProblem } = userSlice.actions

export default userSlice.reducer