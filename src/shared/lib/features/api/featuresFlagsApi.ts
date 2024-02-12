import { rtkApi } from '@/shared/api/rtkApi';
import { FeaturesFlags } from '@/shared/types/featuresFlags';

interface UpdateFeatureFlagsOptions {
    userId: string;
    features: Partial<FeaturesFlags>;
}

const featuresFlagsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        updateFeatureFlags: build.mutation<void, UpdateFeatureFlagsOptions>({
            query: ({ userId, features }) => ({
                url: '/users/' + userId,
                method: 'PATCH', //потому что меняем только одно поле, а не всего пользователя
                body: {
                    features,
                },
            }),
        }),
    }),
});

export const updateFeatureFlagsMutation =
    featuresFlagsApi.endpoints.updateFeatureFlags.initiate;
