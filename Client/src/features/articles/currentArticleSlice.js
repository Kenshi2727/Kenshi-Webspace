import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoaded: false,
    id: null,
    title: "",
    excerpt: "",
    category: "",
    thumbnail: "",
    coverImage: "",
    content: "",
    readTime: null,
    authorId: null,
    authorImage: "",
    author: null,
    PostActions: [],
    likes: 0,
    views: 0,
    bookmarks: 0,
    downloads: 0,
    featured: false,
    status: "",
    referenceStatus: false,
    createdAt: null,
    updatedAt: null,
}

export const currentArticleSlice = createSlice({
    name: "currentArticle",
    initialState,
    reducers: {
        setCurrentArticle: (_state, action) => ({
            ...initialState,
            ...action.payload,
            isLoaded: Boolean(action.payload?.id),
        }),
        clearCurrentArticle: () => ({ ...initialState }),
    }
});

export const { setCurrentArticle, clearCurrentArticle } = currentArticleSlice.actions;

export const currentArticleReducer = currentArticleSlice.reducer;
