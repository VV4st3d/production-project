import {Fragment, ReactNode} from 'react'
import {Listbox as HListBox} from '@headlessui/react'
import cls from './ListBox.module.scss'
import {classNames} from "shared/lib/classNames/classNames";
import {Button} from "shared/ui/Button/Button";
import {HStack} from "../../../Stack";
import {DropDownDirection} from "shared/types/ui";
import {mapDirectionClass} from "../../styles/consts";
import popupCls from '../../styles/popup.module.scss'

export interface ListBoxItem {
    value: string,
    content: ReactNode,
    disabled?: boolean;
}

interface ListBoxProps {
    items?: ListBoxItem[];
    className?: string;
    value?: string;
    defaultValue?: string;
    onChange: (value: string) => void;
    readonly?: boolean;
    direction?: DropDownDirection;
    label?: string
}

export function ListBox(props: ListBoxProps) {
    const {items, className, onChange, value, defaultValue, readonly, direction = 'bottom right', label} = props

    const optionClasses = [mapDirectionClass[direction]]

    return (
        <HStack gap={'4'}>
            {label && <span>
                    {label + '>'}
                </span>}
            <HListBox
                disabled={readonly}
                as={'div'}
                className={classNames(cls.ListBox, {}, [className, popupCls.popup])}
                value={value}
                onChange={onChange}
            >
                <HListBox.Button disabled-area={readonly} className={cls.trigger}>
                    <Button disabled={readonly}>
                        {value ?? defaultValue}
                    </Button>
                </HListBox.Button>
                <HListBox.Options className={classNames(cls.options, {}, optionClasses)}>
                    {items?.map((item) => (
                        <HListBox.Option
                            key={item.value}
                            value={item.value}
                            as={Fragment}
                            disabled={item.disabled}
                        >
                            {({active, selected}) => (
                                <li className={classNames(
                                    cls.item,
                                    {
                                        [popupCls.active]: active,
                                        [popupCls.disabled]: item.disabled
                                    },
                                    []
                                )}>
                                    {selected && '!!!'}
                                    {item.content}
                                </li>
                            )}
                        </HListBox.Option>
                    ))}
                </HListBox.Options>
            </HListBox>
        </HStack>
    )
}
