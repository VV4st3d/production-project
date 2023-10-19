import {StateScheme} from "app/providers/StoreProvider";
import {getProfileValidateErrors, ValidateProfileError} from "entities/Profile";

describe('getProfileValidateErrors.test', ()=>{
    test('should return value', ()=>{
        const state: DeepPartial<StateScheme> = {
            profile:{
                validateErrors: [ValidateProfileError.INCORRECT_USER_DATA]
            }
        }
        expect(getProfileValidateErrors(state as StateScheme)).toEqual(['INCORRECT_USER_DATA']);
    })
    test('with empty state', ()=>{
        const state: DeepPartial<StateScheme> = {
        }
        expect(getProfileValidateErrors(state as StateScheme)).toEqual(undefined);
    })
})
