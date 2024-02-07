import { classNames } from '@/shared/lib/classNames/classNames';
import React, { memo, useCallback, useState } from 'react';
import {
    Button as ButtonDeprecated,
    ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import NotificationsIconDeprecated from '@/shared/assets/icons/notifications.svg';
import NotificationsIcon from '@/shared/assets/icons/notification.svg';
import { NotificationList } from '@/entities/Notification';
import cls from './NotificationButton.module.scss';
import { Popover as PopoverDeprecated } from '@/shared/ui/deprecated/Popups';
import { Drawer } from '@/shared/ui/deprecated/Drawer';
import { BrowserView, MobileView } from 'react-device-detect';
import { ToggleFeatures } from '@/shared/lib/features';
import { Button } from '@/shared/ui/redesigned/Button';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Popover } from '@/shared/ui/redesigned/Popups';

interface NotificationButtonProps {
    className?: string;
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
    const { className } = props;

    const [isOpen, setIsOpen] = useState(false);

    const onOpenDrawer = useCallback(() => {
        setIsOpen(true);
    }, []);

    const onCloseDrawer = useCallback(() => {
        setIsOpen(false);
    }, []);

    const trigger = (
        <ToggleFeatures
            feature={'isAppRedesigned'}
            on={
                <Icon
                    width={16}
                    height={17}
                    clickable
                    onClick={onOpenDrawer}
                    Svg={NotificationsIcon}
                />
            }
            off={
                <ButtonDeprecated
                    onClick={onOpenDrawer}
                    theme={ButtonTheme.CLEAR}
                >
                    <IconDeprecated
                        Svg={NotificationsIconDeprecated}
                        inverted
                    />
                </ButtonDeprecated>
            }
        />
    );

    return (
        <div>
            <BrowserView>
                <ToggleFeatures
                    feature={'isAppRedesigned'}
                    on={
                        <Popover
                            className={classNames(cls.NotificationButton, {}, [
                                className,
                            ])}
                            direction={'bottom left'}
                            trigger={trigger}
                        >
                            <NotificationList className={cls.notifications} />
                        </Popover>
                    }
                    off={
                        <PopoverDeprecated
                            className={classNames(cls.NotificationButton, {}, [
                                className,
                            ])}
                            direction={'bottom left'}
                            trigger={trigger}
                        >
                            <NotificationList className={cls.notifications} />
                        </PopoverDeprecated>
                    }
                />
            </BrowserView>
            <MobileView>
                {trigger}
                <Drawer
                    isOpen={isOpen}
                    onClose={onCloseDrawer}
                >
                    <NotificationList />
                </Drawer>
            </MobileView>
        </div>
    );
});
