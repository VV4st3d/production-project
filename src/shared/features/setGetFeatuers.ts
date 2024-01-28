import { FeaturesFlags } from '@/shared/types/featuresFlags';

//ФИЧИ НЕ МЕНЯЮТСЯ В ХОДЕ СЕССИ, ИХ НЕОБЯЗАТЕЛЬНО ДЕЛАТЬ РЕАКТИВНЫМИ!
let featuresFlags: FeaturesFlags;

export function setFeatureFlags(newFeatureFlags?: FeaturesFlags) {
    if (newFeatureFlags) {
        featuresFlags = newFeatureFlags;
    }
}

export function getFeatureFlag(flag: keyof FeaturesFlags) {
    return featuresFlags[flag];
}
