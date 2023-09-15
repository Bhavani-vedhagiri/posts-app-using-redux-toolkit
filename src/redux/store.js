import { configureStore } from "@reduxjs/toolkit";
import counterReducer from '../features/reducers/counterSlice'
import postReducer from "../features/reducers/posts/postsSlice";
import userReducer from "../features/reducers/posts/userSlice";

export const store = configureStore({
    //get the action and pass the state and updated state
    reducer:{
        counter: counterReducer,
        posts: postReducer,
        users: userReducer
    }
})

export default store;