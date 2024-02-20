import { FeaturesFlags } from '@/shared/types/featuresFlags';
import { LOCAL_STORAGE_LAST_DESIGN_KEY } from '@/shared/const/localstorage';

const defaultFeatures: FeaturesFlags = {
    isAppRedesigned:
        localStorage.getItem(LOCAL_STORAGE_LAST_DESIGN_KEY) === 'new',
};
//ФИЧИ НЕ МЕНЯЮТСЯ В ХОДЕ СЕССИ, ИХ НЕОБЯЗАТЕЛЬНО ДЕЛАТЬ РЕАКТИВНЫМИ!
let featuresFlags: FeaturesFlags = {
    ...defaultFeatures,
};

export function setFeatureFlags(newFeatureFlags?: FeaturesFlags) {
    if (newFeatureFlags) {
        featuresFlags = newFeatureFlags;
    }
}

export function getFeatureFlag(flag: keyof FeaturesFlags) {
    return featuresFlags[flag];
}

export function getAllFeatureFlag() {
    return featuresFlags;
}
