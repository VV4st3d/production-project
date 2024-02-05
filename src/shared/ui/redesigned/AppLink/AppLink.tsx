import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AppLink.module.scss';
import { Link, LinkProps, NavLink } from 'react-router-dom';
import { FC, memo, ReactNode } from 'react';

export type AppLinkVariant = 'primary' | 'red';
interface AppLinkProps extends LinkProps {
    className?: string;
    variant?: AppLinkVariant;
    children?: ReactNode;
    activeClassname?: string;
}
export const AppLink: FC<AppLinkProps> = memo((props) => {
    const {
        to,
        children,
        className,
        variant = 'primary',
        activeClassname = '',
        ...otherProps
    } = props;
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                classNames(cls.AppLink, { [activeClassname]: isActive }, [
                    className,
                    cls[variant],
                ])
            }
            {...otherProps}
        >
            {children}
        </NavLink>
    );
});
