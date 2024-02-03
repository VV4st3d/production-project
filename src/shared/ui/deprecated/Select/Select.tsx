import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Select.module.scss';
import { ChangeEvent, useMemo } from 'react';

export interface SelectOption<T extends string> {
    value: T;
    content: string;
}
interface SelectProps<T extends string> {
    className?: string;
    label?: string;
    options?: SelectOption<T>[];
    value?: T;
    onChange?: (value: T) => void;
    readonly?: boolean;
}
/**
 * устарел, используем новые компоненты из папки redesigned
 * @deprecated
 * */
export const Select = <T extends string>(props: SelectProps<T>) => {
    const { className, label, options, value, readonly, onChange } = props;
    const optionList = useMemo(() => {
        return options?.map((opt) => (
            <option
                className={cls.option}
                key={opt.value}
                value={opt.value}
            >
                {opt.content}
            </option>
        ));
    }, [options]);
    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        if (onChange) {
            onChange(e.target.value as T);
        }
    };
    return (
        <div className={classNames(cls.Wrapper, {}, [className])}>
            {label && <span className={cls.label}>{label + '>'}</span>}
            <select
                disabled={readonly}
                className={cls.select}
                value={value}
                onChange={onChangeHandler}
            >
                {optionList}
            </select>
        </div>
    );
};
