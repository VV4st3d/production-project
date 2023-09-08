import {classNames} from "shared/lib/classNames/classNames";
import cls from './Sidebar.module.scss'
import React, {useState} from "react";
import {ThemeSwitcher} from "shared/ui/ThemeSwitcher";
import {LangSwitcher} from "shared/ui/LangSwitcher/LangSwitcher";
interface SidebarProps {
    className?: string,
}

export const Sidebar = ({className}:SidebarProps) => {
    const [collapsed, setCollapsed] = useState(false)
    // в setState можно передавать калбек, который принимает предыдущее значение (prev=>!prev)
    const onToggle = ()=>{
        setCollapsed(prev => !prev)
    }
    return (
        // если cls.collapsed = true то навешиваем collapsed, иначе удаляем
        <div data-testid={'sidebar'}
            className={classNames(cls.Sidebar, {[cls.collapsed]: collapsed}, [className])}>
            <button data-testid={'sidebar-toggle'} onClick={onToggle}>toggle</button>
            <div className={cls.switchers}>
                <ThemeSwitcher/>
                <LangSwitcher className={cls.lang}/>
            </div>
        </div>
    );
};
