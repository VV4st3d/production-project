import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './Avatar.module.scss'
import {CSSProperties, useMemo} from "react";
import {AppImage} from "../AppImage/AppImage";
import UserIcon from "../../assets/icons/userAvatar.svg"
import {Icon} from "@/shared/ui/Icon";
import {Skeleton} from "@/shared/ui/Skeleton";

interface AvatarProps {
    className?: string,
    src?: string
    size?: number
    alt?: string
    fallbackInverted?: boolean
}

export const Avatar = ({className, src, size = 100, alt = 'avatar', fallbackInverted}:AvatarProps) => {
    const styles = useMemo<CSSProperties>(() => {
        return{
            width: size,
            height: size
        }
    }, [size]);

    const fallback = <Skeleton width={size} height={size} border={'50%'}/>
    const errorFallback = <Icon inverted={fallbackInverted} width={size} height={size} Svg={UserIcon}/>

    return (
        <AppImage
            fallback={fallback}
            errorFallback={errorFallback}
            alt={alt}
            src={src}
            style={styles}
            className={classNames(cls.Avatar, {}, [className])}
        />
    );
};
