import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './SidebarItem.module.scss';
import { useTranslation } from 'react-i18next';
import {
    AppLink as AppLinkDeprecated,
    AppLinkTheme,
} from '@/shared/ui/deprecated/AppLink';
import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { SidebarItemsType } from '@/widgets/Sidebar/model/types/Sidebar';
import { ToggleFeatures } from '@/shared/lib/features';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Icon } from '@/shared/ui/redesigned/Icon';

interface SidebarItemProps {
    item: SidebarItemsType;
    collapsed?: boolean;
}

export const SidebarItem = memo(({ item, collapsed }: SidebarItemProps) => {
    const { text, path, Icon: IconSVG } = item;
    const { t } = useTranslation();
    const isAuth = useSelector(getUserAuthData);
    if (item.authOnly && !isAuth) {
        return null;
    }
    return (
        <ToggleFeatures
            feature={'isAppRedesigned'}
            on={
                <AppLink
                    className={classNames(
                        cls.itemRedesigned,
                        { [cls.collapsedRedesigned]: collapsed },
                        [],
                    )}
                    activeClassname={cls.active}
                    to={path}
                >
                    <Icon
                        Svg={IconSVG}
                        width={16}
                        height={16}
                    />
                    <span className={cls.link}>{t(text)}</span>
                </AppLink>
            }
            off={
                <AppLinkDeprecated
                    className={classNames(
                        cls.item,
                        { [cls.collapsed]: collapsed },
                        [],
                    )}
                    theme={AppLinkTheme.SECONDARY}
                    to={path}
                >
                    <IconSVG className={cls.icon} />
                    <span className={cls.link}>{t(text)}</span>
                </AppLinkDeprecated>
            }
        />
    );
});
