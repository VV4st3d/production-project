import { FeaturesFlags } from '@/shared/types/featuresFlags';
import { ReactElement } from 'react';
import { getFeatureFlag } from '../lib/setGetFeatuers';

interface ToggleFeaturesProps {
    feature: keyof FeaturesFlags;
    on: ReactElement;
    off: ReactElement;
}

export const ToggleFeatures = (props: ToggleFeaturesProps) => {
    const { feature, on, off } = props;

    if (getFeatureFlag(feature)) {
        return on;
    }
    return off;
};
