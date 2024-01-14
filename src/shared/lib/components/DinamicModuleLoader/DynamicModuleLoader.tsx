import {ReactNode, useEffect} from "react";
import {useStore} from "react-redux";
import {ReduxStoreWithManager, StateScheme, StateSchemeKey} from "@/app/providers/StoreProvider";
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {Reducer} from "@reduxjs/toolkit";

export type ReducerList = {
    [name in StateSchemeKey]?: Reducer<NonNullable<StateScheme[name]>>
}

interface DynamicModuleLoaderProps {
    reducers: ReducerList,
    removeAfterAmount?: boolean,
    children: ReactNode
}

export const DynamicModuleLoader = (props: DynamicModuleLoaderProps) => {
    const {children, reducers, removeAfterAmount = true} = props
    const store = useStore() as ReduxStoreWithManager
    const dispatch = useAppDispatch()

    useEffect(() => {
        const mountedReducers = store.reducerManager.getMountedReducers()
        Object.entries(reducers).forEach(([name, reducer]) => {
            const mounted = mountedReducers[name as StateSchemeKey]

            //добавляем новый редюсер только если его нет
            if (!mounted) {
                store.reducerManager.add(name as StateSchemeKey, reducer)
                dispatch({type: `@INIT ${name} reducer`})
            }
        })
        return () => {
            if (removeAfterAmount) {
                Object.entries(reducers).forEach(([name, reducer]) => {
                    store.reducerManager.remove(name as StateSchemeKey)
                    dispatch({type: `@DESTROY ${name} reducer`})
                })
            }
        }
    }, []);

    return (
        <>
            {children}
        </>
    );
};
