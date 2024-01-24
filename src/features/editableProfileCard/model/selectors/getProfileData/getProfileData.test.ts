import { StateScheme } from '@/app/providers/StoreProvider';
import { getProfileData } from './getProfileData';

describe('getProfileData.test', () => {
    test('should return value', () => {
        const state: DeepPartial<StateScheme> = {
            profile: {
                data: {
                    first: 'Anton',
                    lastname: 'Maiorov',
                },
            },
        };
        expect(getProfileData(state as StateScheme)).toEqual({
            first: 'Anton',
            lastname: 'Maiorov',
        });
    });
    test('with empty state', () => {
        const state: DeepPartial<StateScheme> = {};
        expect(getProfileData(state as StateScheme)).toEqual(undefined);
    });
});
