import { StateScheme } from '@/app/providers/StoreProvider';
import { getLoginIsLoading } from './getLoginIsLoading';

describe('getLoginIsLoading.test', () => {
    test('should return value', () => {
        const state: DeepPartial<StateScheme> = {
            loginForm: {
                isLoading: true,
            },
        };
        expect(getLoginIsLoading(state as StateScheme)).toEqual(true);
    });
    test('with empty state', () => {
        const state: DeepPartial<StateScheme> = {};
        expect(getLoginIsLoading(state as StateScheme)).toEqual(false);
    });
});
