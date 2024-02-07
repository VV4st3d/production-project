import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import React, { memo, useCallback } from 'react';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Dropdown as DropdownDeprecated } from '@/shared/ui/deprecated/Popups';
import {
    getUserAuthData,
    isUserAdmin,
    isUserManager,
    userActions,
} from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { getRouteAdmin, getRouteProfile } from '@/shared/const/router';
import { ToggleFeatures } from '@/shared/lib/features';
import { Dropdown } from '@/shared/ui/redesigned/Popups';
import { Avatar } from '@/shared/ui/redesigned/Avatar';

interface AvatarDropdownProps {
    className?: string;
}

export const AvatarDropdown = memo((props: AvatarDropdownProps) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { className } = props;
    const isAdmin = useSelector(isUserAdmin);
    const authData = useSelector(getUserAuthData);
    const isManager = useSelector(isUserManager);

    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    const isAdminPanelAvailable = isAdmin || isManager;

    if (!authData) {
        return null;
    }

    const items = [
        ...(isAdminPanelAvailable
            ? [{ content: t('Админ панель'), href: getRouteAdmin() }]
            : []),
        { content: t('Профиль'), href: getRouteProfile(authData.id) },
        { content: t('Выйти'), onClick: onLogout },
    ];

    return (
        <ToggleFeatures
            feature={'isAppRedesigned'}
            on={
                <Dropdown
                    className={classNames('', {}, [className])}
                    direction={'bottom left'}
                    items={items}
                    trigger={
                        <Avatar
                            size={40}
                            src={authData.avatar}
                        />
                    }
                    //also can use !authData. - if 100% sure that it's exist
                />
            }
            off={
                <DropdownDeprecated
                    className={classNames('', {}, [className])}
                    direction={'bottom left'}
                    items={items}
                    trigger={
                        <AvatarDeprecated
                            fallbackInverted
                            size={30}
                            src={authData.avatar}
                        />
                    }
                    //also can use !authData. - if 100% sure that it's exist
                />
            }
        />
    );
});
