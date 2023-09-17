import React from 'react';
import {useTranslation} from "react-i18next";
import {classNames} from "shared/lib/classNames/classNames";

const MainPage = () => {
    const {t} = useTranslation()
    return (
        <div className={classNames('', {}, [])}>
            {t('Главная страница')}
        </div>
    );
};

export default MainPage;
