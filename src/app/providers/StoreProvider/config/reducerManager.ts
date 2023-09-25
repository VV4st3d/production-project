import {AnyAction, combineReducers, Reducer, ReducersMapObject} from "@reduxjs/toolkit";
import {StateScheme, StateSchemeKey, reducerManager} from "./StateScheme";



export function createReducerManager(initialReducers: ReducersMapObject<StateScheme>):reducerManager {
    const reducers = { ...initialReducers }

    let combinedReducer = combineReducers(reducers)

    let keysToRemove: Array<StateSchemeKey> = []

    return {
        getReducerMap: () => reducers,
        reduce: (state: StateScheme, action: AnyAction) => {
            if (keysToRemove.length > 0) {
                state = { ...state }
                keysToRemove.forEach((key)=>{
                    delete state[key]
                })
                // for (let key of keysToRemove) {
                //     delete state[key]
                // }
                keysToRemove = []
            }

            return combinedReducer(state, action)
        },

        add: (key:StateSchemeKey, reducer:Reducer) => {
            if (!key || reducers[key]) {
                return
            }

            reducers[key] = reducer

            combinedReducer = combineReducers(reducers)
        },

        remove: (key:StateSchemeKey) => {
            if (!key || !reducers[key]) {
                return
            }
            delete reducers[key]
            keysToRemove.push(key)
            combinedReducer = combineReducers(reducers)
        }
    }
}
