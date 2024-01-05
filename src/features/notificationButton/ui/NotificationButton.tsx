import {classNames} from "shared/lib/classNames/classNames";
import cls from './NotificationButton.module.scss'
import React, {memo} from 'react'
import {Button, ButtonTheme} from "shared/ui/Button/Button";
import {Icon} from "shared/ui/Icon/Icon";
import NotificationsIcon from "shared/assets/icons/notifications.svg";
import {NotificationList} from "entities/Notification";
import {Popover} from "shared/ui/Popups";

interface NotificationButtonProps {
    className?: string,

}

export const NotificationButton = memo((props: NotificationButtonProps) => {
    const {className} = props

    return (
        <Popover
            className={classNames(cls.NotificationButton, {}, [className])}
            direction={"bottom left"}
            trigger={(
                <Button theme={ButtonTheme.CLEAR}>
                    <Icon Svg={NotificationsIcon} inverted/>
                </Button>
            )}>
            <NotificationList className={cls.notifications}/>
        </Popover>
    );
});
