import {classNames} from "@/shared/lib/classNames/classNames";
import {useTranslation} from "react-i18next";
import React, {memo, useCallback} from 'react'
import {RoutePath} from "@/shared/config/routerConfig/routerConfig";
import {Avatar} from "@/shared/ui/Avatar/Avatar";
import {Dropdown} from "@/shared/ui/Popups";
import {getUserAuthData, isUserAdmin, isUserManager, userActions} from "@/entities/User";
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {useSelector} from "react-redux";

interface AvatarDropdownProps {
    className?: string,

}

export const AvatarDropdown = memo((props: AvatarDropdownProps) => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch()
    const {className} = props
    const isAdmin = useSelector(isUserAdmin)
    const authData = useSelector(getUserAuthData)
    const isManager = useSelector(isUserManager)

    const onLogout = useCallback(() => {
        dispatch(userActions.logout())
    }, [dispatch])

    const isAdminPanelAvailable = isAdmin || isManager

    if(!authData){
        return null
    }

    return (
        <Dropdown
            className={classNames('', {}, [className])}
            direction={"bottom left"}
            items={[
                ...(isAdminPanelAvailable ? [{content: t('Админ панель'), href: RoutePath.admin_panel}]
                    : []),
                {content: t('Профиль'), href: RoutePath.profile + authData.id},
                {content: t('Выйти'), onClick: onLogout},
            ]}
            trigger={<Avatar size={30} src={authData.avatar}/>} //also can use !authData. - if 100% sure that it's exist
        />
    );
});
