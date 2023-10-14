import {classNames, Mods} from "shared/lib/classNames/classNames";
import cls from './Text.module.scss'
import {useTranslation} from "react-i18next";
import {memo} from "react";

export enum TextAlign {
    RIGHT='right',
    LEFT='left',
    CENTER='center',
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
    align?: TextAlign
}

export const Text = memo((props: TextProps) => {
    const {t} = useTranslation()

    const {
        title,
        text,
        className,
        theme= TextTheme.PRIMARY,
        align = TextAlign.LEFT
    } = props

    const mods: Mods = {
        [cls[theme]]:true,
        [cls[align]]:true,
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
