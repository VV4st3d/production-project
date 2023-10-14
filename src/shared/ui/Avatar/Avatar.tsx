import {classNames} from "shared/lib/classNames/classNames";
import cls from './Avatar.module.scss'
import {CSSProperties, useMemo} from "react";

interface AvatarProps {
    className?: string,
    src?: string
    size?: number
    alt?: string
}

export const Avatar = ({className, src, size, alt = 'avatar'}:AvatarProps) => {
    const styles = useMemo<CSSProperties>(() => {
        return{
            width: size || 100,
            height: size||100
        }
    }, [size]);
    return (
        <img
            alt={alt}
            src={src}
            style={styles}
            className={classNames(cls.Avatar, {}, [className])}
        />
    );
};
