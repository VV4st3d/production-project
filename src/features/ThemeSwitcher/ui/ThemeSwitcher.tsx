import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './ThemeSwitcher.module.scss'
import {Themes as Theme} from "@/shared/const/theme";
import {useTheme} from "@/shared/lib/hooks/useTheme/useTheme";
import LightIcon from '@/shared/assets/icons/theme-light.svg'
import DarkIcon from '@/shared/assets/icons/theme-dark.svg'
import {Button, ButtonTheme} from "@/shared/ui/Button";
import {memo} from "react";

interface ThemeSwitcherProps {
    className?: string,

}

export const ThemeSwitcher = memo(({className}:ThemeSwitcherProps) => {
    const {theme, toggleTheme} = useTheme()
    return (
        <Button theme={ButtonTheme.CLEAR} className={classNames(cls.ThemeSwitcher, {}, [className])} onClick={toggleTheme}>
            {theme === Theme.DARK ? <DarkIcon /> : <LightIcon/>}
        </Button>
    );
});