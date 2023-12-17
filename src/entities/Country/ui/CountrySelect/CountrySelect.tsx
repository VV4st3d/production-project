import {useTranslation} from "react-i18next";
import {Country} from "../../model/types/country";
import {memo, useCallback} from "react";
import {ListBox} from "shared/ui/ListBox/ListBox";

interface CountrySelectProps {
    className?: string,
    value?: Country,
    onChange?: (value: Country) => void,
    readonly?: boolean
}

const options = [
    {value: Country.Ukraine, content: Country.Ukraine},
    {value: Country.Armenia, content: Country.Armenia},
    {value: Country.Belarus, content: Country.Belarus},
    {value: Country.Russia, content: Country.Russia},
    {value: Country.Kazakhstan, content: Country.Kazakhstan},
]

export const CountrySelect = memo((
    {className, value, onChange, readonly}: CountrySelectProps) => {
    const {t} = useTranslation()
    const onChangeHandler = useCallback((value: string) => {
        onChange?.(value as Country)
    }, [onChange]);
    return (
        <ListBox
            onChange={onChangeHandler}
            value={value}
            defaultValue={t('Укажите вашу страну')}
            label={t('Укажите вашу страну')}
            items={options}
            readonly={readonly}
            direction={"top"}
        />
    )
});
