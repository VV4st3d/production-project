import {configureStore, ReducersMapObject} from '@reduxjs/toolkit'
import {StateScheme} from "./StateScheme";
import {counterReducer} from "entities/Counter";
import {userReducer} from "entities/User";


export function createReduxStore(initialState?: StateScheme) {
    const rootReducer: ReducersMapObject<StateScheme> = {
        counter: counterReducer,
        user: userReducer
    }
    return configureStore<StateScheme>({
        reducer: rootReducer,
        devTools: __IS_DEV__,
        preloadedState: initialState
    })
}

// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch
