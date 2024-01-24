import { StateScheme } from '@/app/providers/StoreProvider';
import { getProfileReadonly } from './getProfileReadonly';

describe('getProfileReadonly.test', () => {
    test('should return value', () => {
        const state: DeepPartial<StateScheme> = {
            profile: {
                readonly: false,
            },
        };
        expect(getProfileReadonly(state as StateScheme)).toEqual(false);
    });
    test('with empty state', () => {
        const state: DeepPartial<StateScheme> = {};
        expect(getProfileReadonly(state as StateScheme)).toEqual(undefined);
    });
});
