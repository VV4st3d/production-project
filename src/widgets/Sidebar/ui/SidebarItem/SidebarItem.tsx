import {classNames} from "shared/lib/classNames/classNames";
import cls from './SidebarItem.module.scss'
import {useTranslation} from "react-i18next";
import {AppLink, AppLinkTheme} from "shared/ui/AppLink/AppLink";
import React, {memo} from "react";
import {useSelector} from "react-redux";
import {getUserAuthData} from "entities/User";
import {SidebarItemsType} from "widgets/Sidebar/model/types/Sidebar";

interface SidebarItemProps {
    item:SidebarItemsType,
    collapsed?: boolean
}

export const SidebarItem = memo(({item, collapsed}: SidebarItemProps) => {
    const {text, Icon, path} = item
    const {t} = useTranslation()
    const isAuth = useSelector(getUserAuthData)
    if(item.authOnly && !isAuth){
        return null
    }
    return (
        <AppLink
            className={classNames(cls.item, {[cls.collapsed]: collapsed}, [])}
            theme={AppLinkTheme.SECONDARY}
            to={path}
        >
            <Icon className={cls.icon}/>
            <span className={cls.link}>
                        {t(text)}
            </span>
        </AppLink>
    );
})
