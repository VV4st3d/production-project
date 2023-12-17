import {Fragment, ReactNode} from 'react'
import {Listbox as HListBox} from '@headlessui/react'
import cls from './ListBox.module.scss'
import {classNames} from "shared/lib/classNames/classNames";
import {Button} from "shared/ui/Button/Button";
import {HStack} from "../Stack";


export interface ListBoxItem {
    value: string,
    content: ReactNode,
    disabled?: boolean;
}

type DropDownDirection = 'top' | 'bottom'

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

const mapDirectionClass: Record<DropDownDirection, string> = {
    bottom: cls.optionsBottom,
    top: cls.optionsTop,
}


export function ListBox(props: ListBoxProps) {
    const {items, className, onChange, value, defaultValue, readonly, direction = 'bottom', label} = props

    const optionClasses = [mapDirectionClass[direction]]

    return (
        <HStack gap={'4'}>
            {label && <span>
                    {label + '>'}
                </span>}
            <HListBox
                disabled={readonly}
                as={'div'}
                className={classNames(cls.ListBox, {}, [className])}
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
                                        [cls.active]: active,
                                        [cls.disabled]: item.disabled
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
