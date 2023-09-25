import {CounterScheme} from "entities/Counter";
import {userScheme} from "entities/User";
import {LoginScheme} from "features/authByUsername";
import {AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject} from "@reduxjs/toolkit";

export interface StateScheme {
    counter: CounterScheme,
    user: userScheme,

    //асинхронные редюсеры
    loginForm?: LoginScheme
}

export type StateSchemeKey = keyof StateScheme



export interface reducerManager {
    getReducerMap: ()=>ReducersMapObject<StateScheme>;
    reduce: (state: StateScheme, action: AnyAction) => CombinedState<StateScheme>;
    add: (key:StateSchemeKey, reducer:Reducer) => void
    remove: (key:StateSchemeKey) => void
}

export interface ReduxStoreWithManager extends EnhancedStore<StateScheme>{
    reducerManager: reducerManager
}


