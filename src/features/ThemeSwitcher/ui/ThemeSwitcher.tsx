import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ThemeSwitcher.module.scss';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import ThemeIcon from '@/shared/assets/icons/theme-light.svg';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { memo, useCallback } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { saveJsonSettings } from '@/entities/User';
import { Icon } from '@/shared/ui/Icon';

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
    const { theme, toggleTheme } = useTheme();
    const dispatch = useAppDispatch();

    const onToggleHandler = useCallback(() => {
        toggleTheme((newTheme) => {
            dispatch(saveJsonSettings({ theme: newTheme }));
        });
    }, [toggleTheme]);

    return (
        <Button
            theme={ButtonTheme.CLEAR}
            className={classNames(cls.ThemeSwitcher, {}, [className])}
            onClick={onToggleHandler}
        >
            <Icon
                Svg={ThemeIcon}
                width={40}
                height={40}
                inverted
            />
        </Button>
    );
});
