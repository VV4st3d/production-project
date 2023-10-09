import {createAsyncThunk} from "@reduxjs/toolkit";
import {User, userActions} from "entities/User";
import {USER_LOCALSTORAGE_KEY} from "shared/const/localstorage";
import {ThunkConfig} from "app/providers/StoreProvider";

interface loginByUsernameProps {
    username: string,
    password: string
}


export const loginByUsername = createAsyncThunk<
    User,
    loginByUsernameProps,
    ThunkConfig<string>
>(
    'login/loginByUsername',
    async (authData, thunkAPI) => {
        const {dispatch, rejectWithValue, extra} = thunkAPI
        try {
            const response = await extra.api.post<User>('/login', authData)
            if (!response.data){
                throw new Error()
            }
            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data))
            dispatch(userActions.setAuthData(response.data))
            // extra.navigate?.('/about') -- пока ненужно
            return response.data
        } catch (e) {
            console.log(e)
            return rejectWithValue('error')
        }
    }
)

