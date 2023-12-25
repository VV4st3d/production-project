import {fetchProfileData} from "./fetchProfileData";
import {TestAsyncThunk} from "shared/config/Tests/TestAsyncThunk/TestAsyncThunk";
import {Country} from "entities/Country";
import {Currency} from "entities/Currency";

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

describe('loginByUsername.test', ()=>{
    test('success', async ()=>{
        const thunk = new TestAsyncThunk(fetchProfileData)
        thunk.api.get.mockReturnValue(Promise.resolve({data: data}))

        const result = await thunk.callFunc('1')

        expect(thunk.api.get).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(result.payload).toEqual(data)
    })
    test('error', async ()=>{
        const thunk = new TestAsyncThunk(fetchProfileData)
        thunk.api.get.mockReturnValue(Promise.resolve({status: 403}))
        const result = await thunk.callFunc('1')

        expect(thunk.api.get).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('rejected')
        expect(result.payload).toBe('error')
    })
})
