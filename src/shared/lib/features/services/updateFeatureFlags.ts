import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { updateFeatureFlagsMutation } from '@/shared/lib/features/api/featuresFlagsApi';
import { FeaturesFlags } from '@/shared/types/featuresFlags';
import {
    getAllFeatureFlag,
    setFeatureFlags,
} from '@/shared/lib/features/lib/setGetFeatuers';

interface UpdateFeatureFlagsOptions {
    userId: string;
    newFeatures: Partial<FeaturesFlags>;
}

export const updateAllFeatureFlags = createAsyncThunk<
    void,
    UpdateFeatureFlagsOptions,
    ThunkConfig<string>
>('updateFeatureFlags', async ({ userId, newFeatures }, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;

    const allFeatures = {
        ...getAllFeatureFlag(),
        ...newFeatures,
    };

    try {
        await dispatch(
            updateFeatureFlagsMutation({
                userId,
                features: allFeatures,
            }),
        );

        setFeatureFlags(allFeatures);
        // window.location.reload();        перезагрузка страницы, как альтернативный вариант
        return undefined;
    } catch (e) {
        console.log(e);
        return rejectWithValue('');
    }
});
