import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AppLink.module.scss';
import { Link, LinkProps } from 'react-router-dom';
import { FC, memo } from 'react';

export enum AppLinkTheme {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    RED = 'red',
}
interface AppLinkProps extends LinkProps {
    className?: string;
    theme?: AppLinkTheme;
}
/**
 * устарел, используем новые компоненты из папки redesigned
 * @deprecated
 * */
export const AppLink: FC<AppLinkProps> = memo((props) => {
    const {
        to,
        children,
        className,
        theme = AppLinkTheme.PRIMARY,
        ...otherProps
    } = props;
    return (
        <Link
            to={to}
            className={classNames(cls.AppLink, {}, [className, cls[theme]])}
            {...otherProps}
        >
            {children}
        </Link>
    );
});
