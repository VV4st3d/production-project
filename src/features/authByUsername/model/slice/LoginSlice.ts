import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginScheme } from '../types/LoginScheme';
import { loginByUsername } from '../services/loginByUsername/loginByUsername';

const initialState: LoginScheme = {
    username: '',
    password: '',
    isLoading: false,
};

export const LoginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginByUsername.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(loginByUsername.fulfilled, (state, action) => {
                state.isLoading = false;
                state.username = action.payload.username;
            })
            .addCase(loginByUsername.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

// Action creators are generated for each case reducer function
export const { actions: LoginActions } = LoginSlice;
export const { reducer: LoginReducer } = LoginSlice;
