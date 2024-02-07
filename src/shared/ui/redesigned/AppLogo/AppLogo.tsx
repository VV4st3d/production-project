import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AppLogo.module.scss';
import { memo } from 'react';
import AppSvg from '@/shared/assets/icons/siteLogo.svg';
import { HStack } from '@/shared/ui/redesigned/Stack';

interface AppLogoProps {
    className?: string;
    size?: number;
}
export const AppLogo = memo(({ className, size }: AppLogoProps) => {
    return (
        <HStack
            max
            justify={'center'}
            className={classNames(cls.appLogoWrapper, {}, [className])}
        >
            <div className={cls.gradientBig}></div>
            <div className={cls.gradientSmall}></div>
            <AppSvg
                width={size}
                height={size}
                color={'black'}
                className={cls.appLogo}
            />
        </HStack>
    );
});
