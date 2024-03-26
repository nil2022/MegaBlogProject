import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        // TODO: add postSlice reducer for posts
        // ? post: postReducer
    }
})

export default store;