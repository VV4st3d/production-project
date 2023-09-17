import { configureStore } from '@reduxjs/toolkit'
import {StateScheme} from "./StateScheme";
import {counterReducer} from "entities/Counter";


export function createReduxStore(initialState?: StateScheme){
    return configureStore<StateScheme>({
        reducer: {
            counter: counterReducer
        },
        devTools: __IS_DEV__,
        preloadedState: initialState
    })
}

// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch
