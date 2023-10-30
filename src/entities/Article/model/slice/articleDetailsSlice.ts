import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ArticleDetailsScheme} from "../types/ArticleDetailsScheme";
import {fetchArticleById} from "../services/fetchArticleById/fetchArticleById";
import {Article} from "../types/Article";


const initialState:ArticleDetailsScheme = {
    isLoading: false,
    data: undefined,
    error: undefined
}

export const articleDetailsSlice = createSlice({
    name: 'articleDetails',
    initialState,
    reducers: {

    },
    extraReducers:(builder) => {
        builder
            .addCase(fetchArticleById.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true
            })
            .addCase(fetchArticleById.fulfilled, (state, action: PayloadAction<Article>) => {
                state.isLoading = false
                state.data = action.payload
            })
            .addCase(fetchArticleById.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    }
})

export const {actions: articleDetailsActions} = articleDetailsSlice
export const {reducer: articleDetailsReducer} = articleDetailsSlice


