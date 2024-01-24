import { PayloadAction } from '@reduxjs/toolkit';
import { CounterScheme } from '../types/counterScheme';
import { buildSlice } from '@/shared/lib/store';

const initialState: CounterScheme = {
    value: 0,
};

export const counterSlice = buildSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        add: (state, { payload }: PayloadAction<number>) => {
            state.value += payload;
        },
    },
});

// Action creators are generated for each case reducer function
//export как (что_экспортируем: название для этого) = откуда
export const {
    actions: counterActions,
    reducer: counterReducer,
    useActions: useCounterActions,
} = counterSlice;
