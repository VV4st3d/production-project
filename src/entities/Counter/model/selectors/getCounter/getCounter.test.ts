import {getCounter} from "./getCounter";
import {StateScheme} from "app/providers/StoreProvider";

describe('getCounter test', ()=>{
    test('getCounter', ()=>{
        const state: DeepPartial<StateScheme> = {
            counter: {
                value: 0
            }
        }
        expect(getCounter(state as StateScheme)).toEqual({value: 0})
    })
})
