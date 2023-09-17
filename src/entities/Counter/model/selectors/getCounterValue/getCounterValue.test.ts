import {getCounterValue} from "entities/Counter/model/selectors/getCounterValue/getCounterValue";
import {DeepPartial} from "@reduxjs/toolkit";
import {StateScheme} from "app/providers/StoreProvider";


describe('getCounterValue.test', ()=>{
    test('', ()=>{
        const state: DeepPartial<StateScheme> = {
            counter: {
                value: 0
            }
        }
        expect(getCounterValue(state as StateScheme)).toEqual(0);
    })
})

