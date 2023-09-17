import {createSelector} from "@reduxjs/toolkit";
import {getCounter} from "entities/Counter/model/selectors/getCounter/getCounter";
import {CounterScheme} from "../../types/counterScheme";

export const getCounterValue = createSelector(
    getCounter, (counter:CounterScheme) => counter.value
)
