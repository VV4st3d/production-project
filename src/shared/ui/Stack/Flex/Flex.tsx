import {classNames, Mods} from "shared/lib/classNames/classNames";
import cls from './Flex.module.scss'
import React, {DetailedHTMLProps, HTMLAttributes, memo, ReactNode} from 'react'

export type FlexJustify = 'center' | 'start' | 'end' | 'between'
export type FlexAlign = 'center' | 'start' | 'end'
export type FlexDirection = 'row' | 'column'
export type FlexGap = '4' | '8' | '16' | '32'



const justifyClasses: Record<FlexJustify, string> = {
    start: cls.justifyStart,
    end: cls.justifyEnd,
    center: cls.justifyCenter,
    between: cls.justifyBetween
}
const alignClasses: Record<FlexAlign, string> = {
    start: cls.alignStart,
    end: cls.alignEnd,
    center: cls.alignCenter,
}
const directionClasses: Record<FlexDirection, string> = {
    row: cls.directionRow,
    column: cls.directionColumn
}
const gapClasses: Record<FlexGap, string> = {
    4: cls.gap4,
    8: cls.gap8,
    16: cls.gap16,
    32: cls.gap32
}

type divProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export interface FlexProps extends divProps{
    className?: string,
    children: ReactNode,
    justify?: FlexJustify;
    align?: FlexAlign;
    direction: FlexDirection;
    gap?: FlexGap,
    max?: boolean
}

export const Flex = memo((props: FlexProps) => {
    const {
        className,
        children,
        justify = 'start',
        direction = 'row',
        align = 'center',
        gap,
        max
    } = props

    const classes = [
        className, justifyClasses[justify], alignClasses[align], directionClasses[direction], gap && gapClasses[gap]
    ]
    const mods:Mods = {
        [cls.max]: max
    }

    return (
        <div className={classNames(cls.Flex, mods, classes)}>
            {children}
        </div>
    );
});
