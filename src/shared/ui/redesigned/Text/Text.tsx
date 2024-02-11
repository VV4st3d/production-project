import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Text.module.scss';
import { memo } from 'react';

export type TextVariant = 'primary' | 'error' | 'accent';
export type TextAlign = 'right' | 'left' | 'center';
export type TextSize = 'm' | 'l' | 's';

export enum TextTheme {
    PRIMARY = 'primary',
    ERROR = 'error',
    INVERTED = 'inverted',
}

interface TextProps {
    className?: string;
    title?: string;
    text?: string;
    variant?: TextVariant;
    align?: TextAlign;
    size?: TextSize;
    bold?: boolean;

    'data-testid'?: string;
}

type HeaderTagType = 'h1' | 'h2' | 'h3';

const mapSizeToClass: Record<TextSize, string> = {
    s: 'size_s',
    m: 'size_m',
    l: 'size_l',
};

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
    s: 'h3',
    m: 'h2',
    l: 'h1',
};
export const Text = memo((props: TextProps) => {
    const {
        title,
        text,
        className,
        variant = 'primary',
        align = 'left',
        size = 'm',
        bold,
        'data-testid': dataTestId = 'Text',
    } = props;

    const HeaderTag = mapSizeToHeaderTag[size];
    const sizeClass = mapSizeToClass[size];

    const additionalClasses = [className, cls[variant], cls[align], sizeClass];

    return (
        <div
            className={classNames(
                cls.Text,
                { [cls.bold]: bold },
                additionalClasses,
            )}
        >
            <div>
                {title && (
                    <HeaderTag
                        className={cls.title}
                        data-testid={`${dataTestId}.Header`}
                    >
                        {title}
                    </HeaderTag>
                )}
                {text && (
                    <p
                        data-testid={`${dataTestId}.Paragraph`}
                        className={cls.text}
                    >
                        {text}
                    </p>
                )}
            </div>
        </div>
    );
});
