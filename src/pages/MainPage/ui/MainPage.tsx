import React, {useState} from 'react';
import {useTranslation} from "react-i18next";
import {classNames} from "shared/lib/classNames/classNames";
import {Input} from "shared/ui/Input/Input";

const MainPage = () => {
    const {t} = useTranslation()
    const [value, setValue] = useState('')
    const onChange = (val: string)=>{
        setValue(val)
    }
    return (
        <div className={classNames('', {}, [])}>
            {t('Главная страница')}
            <Input placeholder={'Введите текст'} onChange={onChange} value={value}/>
        </div>
    );
};

export default MainPage;
