import {StateScheme} from "app/providers/StoreProvider";
import {getProfileForm} from "entities/Profile";

describe('getProfileForm.test', ()=>{
    test('should return value', ()=>{
        const state: DeepPartial<StateScheme> = {
            profile:{
                form: {
                    first: 'anton'
                }
            }
        }
        expect(getProfileForm(state as StateScheme)).toEqual({first: 'anton'});
    })
    test('with empty state', ()=>{
        const state: DeepPartial<StateScheme> = {
        }
        expect(getProfileForm(state as StateScheme)).toEqual(undefined);
    })
})
