import {classNames} from "shared/lib/classNames/classNames";
import cls from './Sidebar.module.scss'
import React, {memo, useMemo, useState} from "react";
import {ThemeSwitcher} from "shared/ui/ThemeSwitcher";
import {LangSwitcher} from "shared/ui/LangSwitcher/LangSwitcher";
import {useTranslation} from "react-i18next";
import {Button, ButtonSize, ButtonTheme} from "shared/ui/Button/Button";
import {SidebarItemList} from "../../model/items";
import {SidebarItem} from '../SidebarItem/SidebarItem';

interface SidebarProps {
    className?: string,
}

export const Sidebar = memo(({className}: SidebarProps) => {
    const [collapsed, setCollapsed] = useState(false)
    // в setState можно передавать калбек, который принимает предыдущее значение (prev=>!prev)
    const onToggle = () => {
        setCollapsed(prev => !prev)
    }
    const {t} = useTranslation()
    const itemsList = useMemo(() =>
        SidebarItemList.map((item) =>
            <SidebarItem item={item} collapsed={collapsed} key={item.path}/>
        ), [collapsed])

    return (
        // если cls.collapsed = true то навешиваем collapsed, иначе удаляем
        <div data-testid={'sidebar'}
             className={classNames(cls.Sidebar, {[cls.collapsed]: collapsed}, [className])}>
            <Button className={cls.collapsedBtn}
                    data-testid={'sidebar-toggle'}
                    onClick={onToggle}
                    theme={ButtonTheme.BACKGROUND_INVERTED}
                    square
                    size={ButtonSize.L}
            >
                {collapsed ? '>' : '<'}
            </Button>
            <div className={cls.items}>
                {
                    itemsList
                }
            </div>
            <div className={cls.switchers}>
                <ThemeSwitcher/>
                <LangSwitcher short={collapsed} className={cls.lang}/>
            </div>
        </div>
    );
});
