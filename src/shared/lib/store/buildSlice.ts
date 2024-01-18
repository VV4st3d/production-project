import {bindActionCreators, createSlice} from "@reduxjs/toolkit";
import {SliceCaseReducers} from "@reduxjs/toolkit/dist";
import {CreateSliceOptions} from "@reduxjs/toolkit/dist";
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {useMemo} from "react";

export function buildSlice<
    State,
    CaseReducers extends SliceCaseReducers<State>,
    Name extends string = string
>( options: CreateSliceOptions<State, CaseReducers, Name>) {
    const slice = createSlice(options)

    const useActions = ():typeof slice.actions =>{
        const dispatch = useAppDispatch()

        // @ts-ignore
        return useMemo(()=> bindActionCreators(slice.actions, dispatch), [dispatch])
    }

    return {
        ...slice,
        useActions
    }
}
