import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "../features/users/userSlice"
import { currentArticleReducer } from "../features/articles/currentArticleSlice"

export const store = configureStore({
    reducer: {
        user: userReducer,
        currentArticle: currentArticleReducer
    }
});         