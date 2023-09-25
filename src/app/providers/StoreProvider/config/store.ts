import {configureStore, DeepPartial, ReducersMapObject} from '@reduxjs/toolkit'
import {StateScheme} from "./StateScheme";
import {counterReducer} from "entities/Counter";
import {userReducer} from "entities/User";
import {createReducerManager} from "./reducerManager";



export function createReduxStore(
    initialState?: StateScheme, asyncReducers?: ReducersMapObject<StateScheme>
) {
    const rootReducer: ReducersMapObject<StateScheme> = {
        ...asyncReducers,
        counter: counterReducer,
        user: userReducer,
    }
    const reducerManager = createReducerManager(rootReducer)

    const store = configureStore<StateScheme>({
        reducer: reducerManager.reduce,
        devTools: __IS_DEV__,
        preloadedState: initialState
    })

    // @ts-ignore
    store.reducerManager = reducerManager

    return store
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];

// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch
