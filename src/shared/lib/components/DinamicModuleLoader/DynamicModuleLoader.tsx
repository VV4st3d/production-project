import {FC, useEffect} from "react";
import {useStore} from "react-redux";
import {ReduxStoreWithManager} from "app/providers/StoreProvider";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {StateSchemeKey} from "app/providers/StoreProvider/config/StateScheme";
import {Reducer} from "@reduxjs/toolkit";

export type ReducerList = {
    [name in StateSchemeKey]?: Reducer
}

type ReducerListEntry = [StateSchemeKey, Reducer]

interface DynamicModuleLoaderProps {
    reducers: ReducerList,
    removeAfterAmount?: boolean
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (props) => {
    const {children, reducers, removeAfterAmount} = props
    const store = useStore() as ReduxStoreWithManager
    const dispatch = useAppDispatch()

    useEffect(() => {
        Object.entries(reducers).forEach(([name, reducer]: ReducerListEntry)=>{
            store.reducerManager.add(name, reducer)
            dispatch({type: `@INIT ${name} reducer`})
        })
        return () => {
            if (removeAfterAmount) {
                Object.entries(reducers).forEach(([name, reducer]: ReducerListEntry)=>{
                    store.reducerManager.remove(name)
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
