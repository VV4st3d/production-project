import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Icon.module.scss';
import React, { memo } from 'react';

type SvgProps = Omit<React.SVGProps<SVGSVGElement>, 'onClick'>;

interface IconBaseProps extends SvgProps {
    className?: string;
    Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
}

interface UnClickableIconProps extends IconBaseProps {
    clickable?: false;
}

interface ClickableIconProps extends IconBaseProps {
    clickable?: true;
    onClick: () => void;
}

type IconProps = UnClickableIconProps | ClickableIconProps;
export const Icon = memo((props: IconProps) => {
    const {
        className,
        clickable,
        width = 32,
        height = 32,
        Svg,
        ...otherProps
    } = props;

    const icon = (
        <Svg
            className={classNames(cls.Icon, {}, [className])}
            height={height}
            width={width}
            {...otherProps}
            onClick={undefined}
        />
    );

    if (clickable) {
        return (
            <button
                type={'button'}
                className={cls.button}
                onClick={props.onClick}
                style={{ height, width }}
            >
                {icon}
            </button>
        );
    }

    return icon;
});
