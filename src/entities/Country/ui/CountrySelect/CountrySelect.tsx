import {useTranslation} from "react-i18next";
import {Select} from "shared/ui/select/Select";
import {Country} from "../../model/types/country";
import {memo, useCallback} from "react";

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
        <Select
            label={t('Укажите вашу страну')}
            options={options}
            value={value}
            onChange={onChangeHandler}
            readonly={readonly}
        />
    );
});
