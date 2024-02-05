import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ThemeSwitcher.module.scss';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import ThemeIconDeprecated from '@/shared/assets/icons/theme-light.svg';
import ThemeIcon from '@/shared/assets/icons/themeIcon.svg';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { memo, useCallback } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { saveJsonSettings } from '@/entities/User';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import { ToggleFeatures } from '@/shared/lib/features';
import { Icon } from '@/shared/ui/redesigned/Icon';

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
    const { toggleTheme } = useTheme();
    const dispatch = useAppDispatch();

    const onToggleHandler = useCallback(() => {
        toggleTheme((newTheme) => {
            dispatch(saveJsonSettings({ theme: newTheme }));
        });
    }, [toggleTheme]);

    return (
        <ToggleFeatures
            feature={'isAppRedesigned'}
            on={
                <Icon
                    width={20}
                    height={20}
                    Svg={ThemeIcon}
                    clickable
                    onClick={onToggleHandler}
                />
            }
            off={
                <Button
                    theme={ButtonTheme.CLEAR}
                    className={classNames(cls.ThemeSwitcher, {}, [className])}
                    onClick={onToggleHandler}
                >
                    <IconDeprecated
                        Svg={ThemeIconDeprecated}
                        width={40}
                        height={40}
                        inverted
                    />
                </Button>
            }
        />
    );
});
