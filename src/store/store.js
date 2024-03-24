import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        // TODO: add postSlice reducer for posts
    }
})

export default store;