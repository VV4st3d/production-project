import {loginByUsername} from "./loginByUsername";
import {Dispatch} from "@reduxjs/toolkit";
import {StateScheme} from "@/app/providers/StoreProvider";
import {userActions} from "@/entities/User";
import {TestAsyncThunk} from "@/shared/config/Tests/TestAsyncThunk/TestAsyncThunk";



describe('loginByUsername.test', ()=>{
    let dispatch: Dispatch;
    let getState: ()=>StateScheme

    beforeEach(()=>{
        dispatch = jest.fn();
        getState = jest.fn()
    })

    // test('success login', async ()=>{
    //     const userValue = {username: '123', id: '1'}
    //     mockedAxios.post.mockReturnValue(Promise.resolve({data: userValue}))
    //     const action = loginByUsername({username: '123', password: '123'})
    //     const result = await action(dispatch, getState, undefined)
    //
    //     expect(dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue))
    //     expect(mockedAxios.post).toHaveBeenCalled();
    //     expect(dispatch).toHaveBeenCalledTimes(3);
    //     expect(result.meta.requestStatus).toBe('fulfilled')
    //     expect(result.payload).toEqual(userValue)
    // })
    // test('403 status', async ()=>{
    //     mockedAxios.post.mockReturnValue(Promise.resolve({status: 403}))
    //     const action = loginByUsername({username: '123', password: '123'})
    //     const result = await action(dispatch, getState, undefined)
    //
    //     expect(dispatch).toHaveBeenCalledTimes(2);
    //     expect(mockedAxios.post).toHaveBeenCalled();
    //     expect(result.meta.requestStatus).toBe('rejected')
    //     expect(result.payload).toBe('error')
    // })
    test('success login', async ()=>{
        const userValue = {username: '123', id: '1'}
        const thunk = new TestAsyncThunk(loginByUsername)
        thunk.api.post.mockReturnValue(Promise.resolve({data: userValue}))

        const result = await thunk.callFunc({username: '123', password: '123'})

        expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue))
        expect(thunk.api.post).toHaveBeenCalled();
        expect(thunk.dispatch).toHaveBeenCalledTimes(3);
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(result.payload).toEqual(userValue)
    })
    test('403 status', async ()=>{
        const Thunk = new TestAsyncThunk(loginByUsername)
        Thunk.api.post.mockReturnValue(Promise.resolve({status: 403}))
        const result = await Thunk.callFunc({username: '123', password: '123'})

        expect(Thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(Thunk.api.post).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('rejected')
        expect(result.payload).toBe('error')
    })
})
