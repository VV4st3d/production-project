import {Menu} from '@headlessui/react'
import cls from './Dropdown.module.scss'
import {classNames} from "shared/lib/classNames/classNames";
import {Fragment, ReactNode} from "react";
import {DropDownDirection} from "shared/types/ui";
import {AppLink} from "shared/ui/AppLink/AppLink";

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

const mapDirectionClass: Record<DropDownDirection, string> = {
    "top left": cls.optionsTopLeft,
    "top right": cls.optionsTopRight,
    "bottom left": cls.optionsBottomLeft,
    "bottom right": cls.optionsBottomRight,
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
        <Menu as={'div'} className={classNames(cls.Dropdown, {}, [className])}>
            <Menu.Button className={cls.btn}>
                {trigger}
            </Menu.Button>
            <Menu.Items className={classNames(cls.menu, {}, menuClasses)}>
                {items.map(item => {
                    const content = ({active}:{active:boolean}) => (
                        <button
                            disabled={item.disabled}
                            type={'button'}
                            onClick={item.onClick}
                            className={classNames(cls.item, {[cls.active]: active}, [])}
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
