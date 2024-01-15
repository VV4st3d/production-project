import {classNames} from "@/shared/lib/classNames/classNames";
import React, {memo, useCallback, useState} from 'react'
import {Button, ButtonTheme} from "@/shared/ui/Button";
import {Icon} from "@/shared/ui/Icon";
import NotificationsIcon from "@/shared/assets/icons/notifications.svg";
import {NotificationList} from "@/entities/Notification";
import cls from './NotificationButton.module.scss';
import {Popover} from "@/shared/ui/Popups";
import {Drawer} from "@/shared/ui/Drawer";
import {BrowserView, MobileView} from "react-device-detect";

interface NotificationButtonProps {
    className?: string,

}

export const NotificationButton = memo((props: NotificationButtonProps) => {
    const {className} = props

    const [isOpen, setIsOpen] = useState(false)

    const onOpenDrawer = useCallback(() => {
        setIsOpen(true)
    }, [])

    const onCloseDrawer = useCallback(() => {
        setIsOpen(false)
    }, [])

    const trigger = (
        <Button onClick={onOpenDrawer} theme={ButtonTheme.CLEAR}>
            <Icon Svg={NotificationsIcon} inverted/>
        </Button>
    )

    return (
        <div>
            <BrowserView>
                <Popover
                    className={classNames(cls.NotificationButton, {}, [className])}
                    direction={"bottom left"}
                    trigger={trigger}>
                    <NotificationList className={cls.notifications}/>
                </Popover>
            </BrowserView>
            <MobileView>
                {trigger}
                <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
                    <NotificationList/>
                </Drawer>
            </MobileView>
        </div>
    );
});
