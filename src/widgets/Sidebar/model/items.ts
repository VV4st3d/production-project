import React from "react";
import {RoutePath} from "shared/config/routerConfig/routerConfig";
import MainIcon from 'shared/assets/icons/main.svg'
import AboutIcon from 'shared/assets/icons/about.svg'
import ProfileIcon from 'shared/assets/icons/Profile.svg'

export interface SidebarItemsType{
    path: string,
    text: string,
    Icon: React.VFC<React.SVGProps<SVGSVGElement>>
}


export const SidebarItemList : SidebarItemsType[] = [
    {
        path: RoutePath.main,
        Icon: MainIcon,
        text: 'Главная страница'
    },
    {
        path: RoutePath.about,
        Icon: AboutIcon,
        text: 'О сайте'
    },
    {
        path: RoutePath.profile,
        Icon: ProfileIcon,
        text: 'Профиль'
    }
]
