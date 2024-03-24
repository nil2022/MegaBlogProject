import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    posts: [],
}

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers:{
        setPosts: (state, action) => {
            state.posts = action.payload
        }
    }
})

export const {} = postSlice.actions

export default postSlice.reducer