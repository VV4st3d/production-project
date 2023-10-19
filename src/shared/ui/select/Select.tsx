import {classNames, Mods} from "shared/lib/classNames/classNames";
import cls from './Select.module.scss'
import {ChangeEvent, memo, useMemo} from "react";


export interface SelectOption {
    value: string;
    content: string;
}
interface SelectProps {
    className?: string,
    label?: string,
    options? : SelectOption[]
    value?: string;
    onChange?: (value: string)=>void;
    readonly?: boolean
}

export const Select = memo((props : SelectProps) => {
    const {
        className,
        label,
        options,
        value,
        readonly,
        onChange
    } = props
    const optionList = useMemo(() => {
        return options?.map(opt =>
            <option className={cls.option} key={opt.value} value={opt.value}>
                {opt.content}
            </option>)
    }, [options]);
    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>)=>{
        if(onChange){
            onChange(e.target.value)
        }
    }
    const mods: Mods = {

    }
    return (
        <div className={classNames(cls.Wrapper, {}, [className])}>
            {label && (<span className={cls.label}>
                {label+'>'}
            </span>)}
            <select disabled={readonly} className={cls.select} value={value} onChange={onChangeHandler}>
                {optionList}
            </select>
        </div>
    );
});
