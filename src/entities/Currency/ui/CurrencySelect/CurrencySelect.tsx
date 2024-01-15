import {useTranslation} from "react-i18next";
import {Currency} from "../../model/types/currency";
import {memo, useCallback} from "react";
import {ListBox} from "@/shared/ui/Popups";

interface CurrencySelectProps {
    className?: string,
    value?: Currency,
    onChange?: (value: Currency) => void,
    readonly?: boolean
}

const options = [
    {value: Currency.EUR, content: Currency.EUR},
    {value: Currency.RUB, content: Currency.RUB},
    {value: Currency.USD, content: Currency.USD},
]

export const CurrencySelect = memo((
    {className, value, onChange, readonly}: CurrencySelectProps) => {
    const {t} = useTranslation()
    const onChangeHandler = useCallback((value: string) => {
        onChange?.(value as Currency)
    }, [onChange]);

    return(
        <ListBox
            className={className}
            value={value}
            defaultValue={t('Укажите валюту')}
            label={t('Укажите валюту')}
            items={options} onChange={onChangeHandler}
            readonly={readonly}
            direction={"top right"}
        />
    )
});
