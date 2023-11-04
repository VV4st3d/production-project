import {createSelector} from "@reduxjs/toolkit";
import {getUserAuthData} from "entities/User";
import {RoutePath} from "shared/config/routerConfig/routerConfig";
import MainIcon from "shared/assets/icons/main.svg";
import AboutIcon from "shared/assets/icons/about.svg";
import ProfileIcon from "shared/assets/icons/Profile.svg";
import ArticleIcon from "shared/assets/icons/Article.svg";

import {SidebarItemsType} from "../types/Sidebar";

export const getSidebarItems = createSelector(getUserAuthData,
    (userData) => {
        const sidebarItemList: SidebarItemsType[] = [
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
        ]
        if (userData) {
            sidebarItemList.push(
                {
                    path: RoutePath.profile + userData.id,
                    Icon: ProfileIcon,
                    text: 'Профиль',
                    authOnly: true
                },
                {
                    path: RoutePath.articles,
                    Icon: ArticleIcon,
                    text: 'Статьи',
                    authOnly: true
                }
            )
        }
        return sidebarItemList
    })
