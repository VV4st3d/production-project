import cls from './Popover.module.scss'
import {ReactNode} from 'react'
import {Popover as HPopover} from '@headlessui/react'           // H - headless
import {DropDownDirection} from "@/shared/types/ui";
import {mapDirectionClass} from "../../styles/consts";
import popupCls from '../../styles/popup.module.scss'
import {classNames} from "@/shared/lib/classNames/classNames";

interface PopoverProps {
    className?: string,
    direction?: DropDownDirection;
    trigger: ReactNode,
    children: ReactNode
}

export function Popover(props: PopoverProps) {
    const {
        className,
        trigger,
        direction = 'bottom right',
        children
    } = props
    const menuClasses = [mapDirectionClass[direction]]
    return (
        <HPopover className={classNames(cls.Popover, {}, [className, popupCls.popup])}>
            <HPopover.Button as={'div'} className={popupCls.trigger}>
                {trigger}
            </HPopover.Button>
            <HPopover.Panel
                className={classNames(cls.panel, {}, menuClasses)}
            >
                {children}
            </HPopover.Panel>
        </HPopover>
    )
}
