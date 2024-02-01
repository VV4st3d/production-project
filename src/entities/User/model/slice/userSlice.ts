import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, userScheme } from '../types/user';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { setFeatureFlags } from '@/shared/features';
import { saveJsonSettings } from '../services/saveJsonSettings';
import { JsonSettings } from '../../model/types/jsonSettings';
import { initAuthData } from '../services/initAuthData';

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
            localStorage.setItem(USER_LOCALSTORAGE_KEY, action.payload.id);
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
        builder.addCase(
            initAuthData.fulfilled,
            (state, action: PayloadAction<User>) => {
                state.authData = action.payload;
                setFeatureFlags(action.payload.features);
                state._inited = true;
            },
        );
        builder.addCase(initAuthData.rejected, (state) => {
            state._inited = true;
        });
    },
});

// Action creators are generated for each case reducer function
export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
