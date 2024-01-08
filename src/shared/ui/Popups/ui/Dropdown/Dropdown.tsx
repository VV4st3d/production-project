import {Menu} from '@headlessui/react'
import cls from './Dropdown.module.scss'
import {classNames} from "@/shared/lib/classNames/classNames";
import {Fragment, ReactNode} from "react";
import {DropDownDirection} from "@/shared/types/ui";
import {AppLink} from "@/shared/ui/AppLink/AppLink";
import {mapDirectionClass} from "../../styles/consts";
import popupCls from '../../styles/popup.module.scss'

export interface DropDownItem {
    disabled?: boolean;
    content?: ReactNode;
    onClick?: () => void;
    href?: string
}

interface DropdownProps {
    className?: string;
    items: DropDownItem[];
    direction?: DropDownDirection;
    trigger: ReactNode
}

export function Dropdown(props: DropdownProps) {
    const {
        className,
        trigger,
        items,
        direction = 'bottom right'
    } = props
    const menuClasses = [mapDirectionClass[direction]]
    return (
        <Menu as={'div'} className={classNames(cls.Dropdown, {}, [className, popupCls.popup])}>
            <Menu.Button className={popupCls.trigger}>
                {trigger}
            </Menu.Button>
            <Menu.Items className={classNames(cls.menu, {}, menuClasses)}>
                {items.map(item => {
                    const content = ({active}:{active:boolean}) => (
                        <button
                            disabled={item.disabled}
                            type={'button'}
                            onClick={item.onClick}
                            className={classNames(cls.item, {[popupCls.active]: active}, [])}
                        >
                            {item.content}
                        </button>
                    )
                    if(item.href){
                        return (
                            <Menu.Item disabled={item.disabled} to={item.href} as={AppLink}>
                            {content}
                        </Menu.Item>
                        )
                    }
                    return (
                        <Menu.Item disabled={item.disabled} as={Fragment}>
                            {content}
                        </Menu.Item>
                    )
                })}
            </Menu.Items>
        </Menu>
    )
}
