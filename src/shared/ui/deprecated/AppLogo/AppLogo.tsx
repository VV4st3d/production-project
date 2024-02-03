import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AppLogo.module.scss';
import { memo } from 'react';
import AppSvg from '@/shared/assets/icons/siteLogo.svg';
import { HStack } from '@/shared/ui/deprecated/Stack';

interface AppLogoProps {
    className?: string;
}
/**
 * устарел, используем новые компоненты из папки redesigned
 * @deprecated
 * */
export const AppLogo = memo(({ className }: AppLogoProps) => {
    return (
        <HStack
            max
            justify={'center'}
            className={classNames(cls.appLogoWrapper, {}, [className])}
        >
            <div className={cls.gradientBig}></div>
            <div className={cls.gradientSmall}></div>
            <AppSvg className={cls.appLogo} />
        </HStack>
    );
});
