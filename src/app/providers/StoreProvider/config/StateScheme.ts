import {CounterScheme} from "entities/Counter";
import {userScheme} from "entities/User";
import {LoginScheme} from "features/authByUsername";
import {AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject} from "@reduxjs/toolkit";
import {ProfileScheme} from "entities/Profile";
import {AxiosInstance} from "axios";
import {To} from "@remix-run/router";
import {NavigateOptions} from "react-router-dom";
import {ArticleDetailsScheme} from "entities/Article";
import {ArticleDetailsCommentsScheme} from "pages/ArticlesDetailsPage";

export interface StateScheme {
    counter: CounterScheme,
    user: userScheme,

    //асинхронные редюсеры
    loginForm?: LoginScheme,
    profile?: ProfileScheme,
    articleDetails?: ArticleDetailsScheme,
    articleDetailsComments?: ArticleDetailsCommentsScheme
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

export interface ThunkExtraArg {
    api: AxiosInstance;
    navigate?: (to: To, options?: NavigateOptions)=>void,
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateScheme
}


