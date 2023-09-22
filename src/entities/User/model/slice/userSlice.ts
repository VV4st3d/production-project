import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {User, userScheme} from "../types/user";
import {LOCAL_STORAGE_THEME_KEY} from "app/providers/ThemeProvider/lib/ThemeContext";
import {USER_LOCALSTORAGE_KEY} from "shared/const/localstorage";


const initialState:userScheme = {

}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<User>)=>{
            state.authData = action.payload
        },
        initAuthData: (state)=>{
            const user = localStorage.getItem(USER_LOCALSTORAGE_KEY)
            if (user){
                state.authData = JSON.parse(user)
            }
        },
        logout:(state)=>{
            state.authData = undefined;
            localStorage.removeItem(USER_LOCALSTORAGE_KEY)
        }
    },
})

// Action creators are generated for each case reducer function
export const {actions: userActions} = userSlice
export const {reducer: userReducer} = userSlice
