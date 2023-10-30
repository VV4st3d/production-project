import {classNames, Mods} from "shared/lib/classNames/classNames";
import cls from './Text.module.scss'
import {useTranslation} from "react-i18next";
import {memo} from "react";

export enum TextAlign {
    RIGHT='right',
    LEFT='left',
    CENTER='center',
}
export enum TextSize {
    M='size_m',
    L='size_l',
}

export enum TextTheme{
    PRIMARY = 'primary',
    ERROR = 'error'
}

interface TextProps {
    className?: string,
    title?: string;
    text?: string;
    theme?: TextTheme;
    align?: TextAlign;
    size?: TextSize
}

export const Text = memo((props: TextProps) => {
    const {t} = useTranslation()

    const {
        title,
        text,
        className,
        theme= TextTheme.PRIMARY,
        align = TextAlign.LEFT,
        size = TextSize.M
    } = props

    const mods: Mods = {
        [cls[theme]]:true,
        [cls[align]]:true,
        [cls[size]]:true
    }

    return (
        <div className={classNames(cls.Text, mods, [className])}>
            <div>
                {title && <p className={cls.title}>
                    {title}
                </p>}
                {text && <p className={cls.text}>
                    {text}
                </p>}
            </div>
        </div>
    );
});
