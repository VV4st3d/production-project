import {CounterScheme} from "@/entities/Counter";
import {userScheme} from "@/entities/User";
import {LoginScheme} from "@/features/authByUsername";
import {AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject} from "@reduxjs/toolkit";
import {AxiosInstance} from "axios";
import {ArticleDetailsScheme} from "@/entities/Article";
import {ArticleDetailsPageScheme} from "@/pages/ArticlesDetailsPage";
import {AddCommentFormScheme} from "@/features/addNewComment";
import {articlePageScheme} from "@/pages/ArticlesPage";
import {UIScheme} from "@/features/UI";
import {rtkApi} from "@/shared/api/rtkApi";
import {ProfileScheme} from "@/features/editableProfileCard";

export interface StateScheme {
    counter: CounterScheme,
    user: userScheme,
    ui: UIScheme
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>

    //асинхронные редюсеры
    loginForm?: LoginScheme,
    profile?: ProfileScheme,
    articleDetails?: ArticleDetailsScheme,
    addCommentForm?: AddCommentFormScheme,
    articlesPage?: articlePageScheme,
    articleDetailsPage?: ArticleDetailsPageScheme,
}

export type StateSchemeKey = keyof StateScheme

export type MountedReducers = OptionalRecord<StateSchemeKey, boolean>

export interface reducerManager {
    getReducerMap: ()=>ReducersMapObject<StateScheme>;
    reduce: (state: StateScheme, action: AnyAction) => CombinedState<StateScheme>;
    add: (key:StateSchemeKey, reducer:Reducer) => void
    remove: (key:StateSchemeKey) => void
    //true-вмонтирован false-не был вмонтирован или удален после вмонтирования(демонтирован)
    getMountedReducers: ()=>MountedReducers
}

export interface ReduxStoreWithManager extends EnhancedStore<StateScheme>{
    reducerManager: reducerManager
}

export interface ThunkExtraArg {
    api: AxiosInstance;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateScheme
}


