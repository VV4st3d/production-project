import {profileActions, profileReducer} from "./profileSlice";
import {Currency} from "@/entities/Currency";
import {Country} from "@/entities/Country";
import {updateProfileData} from "../services/updateProfileData/updateProfileData";
import {ProfileScheme} from "@/features/editableProfileCard";
import {ValidateProfileError} from "../consts/consts";

const data = {
    first: "Антон1231",
    lastname: "Майоров123",
    age: 20,
    currency: Currency.EUR,
    country: Country.Russia,
    city: "Likino123",
    username: "admin",
    avatar: "https://t3.ftcdn.net/jpg/04/94/77/88/360_F_494778843_LX41b5WqqZ3aTDxccu2UuYBqCWrQa2Ej.jpg"
}


describe('profileSlice.test', () => {
    test('set readonly', () => {
        const state: DeepPartial<ProfileScheme> = {
            readonly: false
        }
        expect(profileReducer(
            state as ProfileScheme,
            profileActions.setReadonly(true)
        )).toEqual({readonly: true})
    })
    test('cancel edit', () => {
        const state: DeepPartial<ProfileScheme> = {
            data,
            readonly: false,
            form: data,
            validateErrors: []
        }
        expect(profileReducer(
            state as ProfileScheme,
            profileActions.cancelEdit()
        )).toEqual({data, form: data,readonly: true, validateErrors: undefined})
    })
    test('update profile', () => {
        const state: DeepPartial<ProfileScheme> = {
            form: data
        }
        expect(profileReducer(
            state as ProfileScheme,
            profileActions.updateProfile(data)
        )).toEqual({form: data})
    })

    test('test update profile service pending', () => {
        const state: DeepPartial<ProfileScheme> = {
            isLoading: false,
            validateErrors: [ValidateProfileError.SERVER_ERROR]
        }
        expect(profileReducer(
            state as ProfileScheme,
            updateProfileData.pending
        )).toEqual({isLoading: true,
            validateErrors: undefined})
    })
    test('test update profile service fulfilled #1', () => {
        const state: DeepPartial<ProfileScheme> = {
            isLoading: true,
            readonly: false,
            validateErrors: [ValidateProfileError.SERVER_ERROR],
            data: data,
            form: data
        }
        expect(profileReducer(
            state as ProfileScheme,
            updateProfileData.fulfilled({username: 'zxc'}, '')
        )).toEqual({isLoading: false, readonly: true, data: {username: 'zxc'}, form: {username: 'zxc'},
            validateErrors: undefined})
    })
    test('test update profile service fulfilled #2', () => {
        const state: DeepPartial<ProfileScheme> = {
            isLoading: true,
        }
        expect(profileReducer(
            state as ProfileScheme,
            updateProfileData.fulfilled(data, '')
        )).toEqual({isLoading: false, readonly: true, data, form: data,
            validateErrors: undefined})
    })
})
