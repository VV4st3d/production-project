import { StateScheme } from '@/app/providers/StoreProvider';
import {
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsIsLoading,
} from './articleDetails';

describe('getProfileData.test', () => {
    test('should return value', () => {
        const data = {
            id: '1',
            title: 'title',
        };
        const state: DeepPartial<StateScheme> = {
            articleDetails: {
                data: data,
            },
        };
        expect(getArticleDetailsData(state as StateScheme)).toEqual(data);
    });
    test('should return isLoading', () => {
        const state: DeepPartial<StateScheme> = {
            articleDetails: {
                isLoading: true,
            },
        };
        expect(getArticleDetailsIsLoading(state as StateScheme)).toEqual(true);
    });
    test('should return isLoading', () => {
        const state: DeepPartial<StateScheme> = {};
        expect(getArticleDetailsIsLoading(state as StateScheme)).toEqual(false);
    });
    test('should return error', () => {
        const state: DeepPartial<StateScheme> = {
            articleDetails: {
                error: 'error',
            },
        };
        expect(getArticleDetailsError(state as StateScheme)).toEqual('error');
    });
    test('with empty state', () => {
        const state: DeepPartial<StateScheme> = {};
        expect(getArticleDetailsData(state as StateScheme)).toEqual(undefined);
    });
});
