import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AddCommentFormScheme} from "../types/addCommentForm";


const initialState:AddCommentFormScheme = {
    text: '',

}

export const addCommentFormSlice = createSlice({
    name: 'addCommentForm',
    initialState,
    reducers: {
        setText:(state, action: PayloadAction<string>)=>{
            state.text = action.payload
        }
    },
    // extraReducers:(builder) => {
    //     builder
    //         .addCase(loginByUsername.pending, (state, action) => {
    //             state.error = undefined;
    //             state.isLoading = true
    //         })
    //         .addCase(loginByUsername.fulfilled, (state, action) => {
    //             state.isLoading = false
    //             state.username = action.payload.username
    //         })
    //         .addCase(loginByUsername.rejected, (state, action) => {
    //             state.isLoading = false
    //             state.error = action.payload
    //         })
    // },
})

// Action creators are generated for each case reducer function
export const {actions: addCommentFormSliceActions} = addCommentFormSlice
export const {reducer: addCommentFormSliceReducer} = addCommentFormSlice
