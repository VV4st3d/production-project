import {updateProfileData} from "./updateProfileData";
import {TestAsyncThunk} from "@/shared/lib/Tests/TestAsyncThunk/TestAsyncThunk";
import {Country} from "@/entities/Country";
import {Currency} from "@/entities/Currency";

import {ValidateProfileError} from "../../consts/consts";

const data  ={
    first: "Антон1231",
    lastname: "Майоров123",
    age: 20,
    currency: Currency.EUR,
    country: Country.Russia,
    city: "Likino123",
    username: "admin",
    avatar: "https://t3.ftcdn.net/jpg/04/94/77/88/360_F_494778843_LX41b5WqqZ3aTDxccu2UuYBqCWrQa2Ej.jpg"
}

describe('updateProfileData.test', ()=>{
    test('success', async ()=>{
        const thunk = new TestAsyncThunk(updateProfileData, {
            profile:{
                form: data,
            }
        })
        thunk.api.put.mockReturnValue(Promise.resolve({data}))

        const result = await thunk.callFunc()

        expect(thunk.api.put).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(result.payload).toEqual(data)
    })
    test('error', async ()=>{
        const thunk = new TestAsyncThunk(updateProfileData, {
            profile:{
                form: data,
            }
        })
        thunk.api.put.mockReturnValue(Promise.resolve({status: 403}))

        const result = await thunk.callFunc()

        expect(result.meta.requestStatus).toBe('rejected')
        expect(result.payload).toEqual([ValidateProfileError.SERVER_ERROR])
    })
    test('validate error', async ()=>{
        const thunk = new TestAsyncThunk(updateProfileData, {
            profile:{
                form: {...data, first: ''}
            }
        })

        const result = await thunk.callFunc()

        expect(result.meta.requestStatus).toBe('rejected')
        expect(result.payload).toEqual([ValidateProfileError.INCORRECT_USER_DATA])
    })
})
