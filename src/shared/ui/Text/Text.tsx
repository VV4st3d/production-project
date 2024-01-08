import {classNames, Mods} from "@/shared/lib/classNames/classNames";
import cls from './Text.module.scss'
import {memo} from "react";

export enum TextAlign {
    RIGHT = 'right',
    LEFT = 'left',
    CENTER = 'center',
}

export enum TextSize {
    M = 'size_m',
    L = 'size_l',
    S = 'size_s',
}

export enum TextTheme {
    PRIMARY = 'primary',
    ERROR = 'error',
    INVERTED = 'inverted',
}

interface TextProps {
    className?: string,
    title?: string;
    text?: string;
    theme?: TextTheme;
    align?: TextAlign;
    size?: TextSize,

    'data-testid'?: string
}

type HeaderTagType = 'h1' | 'h2' | 'h3'

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
    [TextSize.S]: 'h3',
    [TextSize.M]: 'h2',
    [TextSize.L]: 'h1'
}

export const Text = memo((props: TextProps) => {

    const {
        title,
        text,
        className,
        theme = TextTheme.PRIMARY,
        align = TextAlign.LEFT,
        size = TextSize.M,
        'data-testid': dataTestId = 'Text'
    } = props

    const HeaderTag = mapSizeToHeaderTag[size]

    const mods: Mods = {
        [cls[theme]]: true,
        [cls[align]]: true,
        [cls[size]]: true
    }

    return (
        <div className={classNames(cls.Text, mods, [className])}>
            <div>
                {title &&
                    <HeaderTag className={cls.title} data-testid={`${dataTestId}.Header`}>
                        {title}
                    </HeaderTag>}
                {text &&
                    <p data-testid={`${dataTestId}.Paragraph`} className={cls.text}>
                        {text}
                    </p>}
            </div>
        </div>
    );
});
