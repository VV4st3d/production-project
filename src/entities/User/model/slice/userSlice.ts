import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, userScheme } from '../types/user';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { setFeatureFlags } from '@/shared/features';
import { saveJsonSettings } from '@/entities/User/model/services/saveJsonSettings';
import { JsonSettings } from '@/entities/User/model/types/jsonSettings';

const initialState: userScheme = {
    _inited: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<User>) => {
            state.authData = action.payload;
            setFeatureFlags(action.payload.features);
        },
        initAuthData: (state) => {
            const user = localStorage.getItem(USER_LOCALSTORAGE_KEY);
            if (user) {
                const json = JSON.parse(user) as User;
                state.authData = json;
                setFeatureFlags(json.features);
            }
            state._inited = true;
        },
        logout: (state) => {
            state.authData = undefined;
            localStorage.removeItem(USER_LOCALSTORAGE_KEY);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            saveJsonSettings.fulfilled,
            (state, action: PayloadAction<JsonSettings>) => {
                if (state.authData) {
                    state.authData.jsonSettings = action.payload;
                }
            },
        );
    },
});

// Action creators are generated for each case reducer function
export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
