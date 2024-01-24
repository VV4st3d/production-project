import { LoginScheme } from '../types/LoginScheme';
import { LoginActions, LoginReducer } from './LoginSlice';

describe('LoginSlice.test', () => {
    test('set username', () => {
        const state: DeepPartial<LoginScheme> = {
            username: '123',
        };
        expect(
            LoginReducer(
                state as LoginScheme,
                LoginActions.setUsername('123123'),
            ),
        ).toEqual({ username: '123123' });
    });
    test('set password', () => {
        const state: DeepPartial<LoginScheme> = {
            password: '123',
        };
        expect(
            LoginReducer(
                state as LoginScheme,
                LoginActions.setPassword('123123'),
            ),
        ).toEqual({ password: '123123' });
    });
    test('set isLoading', () => {
        // const state: DeepPartial<LoginScheme> = {
        //     isLoading: false
        // }
        // loginByUsername.pending(true, undefined)
    });
    test('set error', () => {});
});
