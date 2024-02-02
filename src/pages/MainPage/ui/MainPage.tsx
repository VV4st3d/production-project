import React from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';

const MainPage = () => {
    const { t } = useTranslation();
    return (
        <Page
            data-testid={'MainPage'}
            className={classNames('', {}, [])}
        >
            {t('Главная страница')}
        </Page>
    );
};

export default MainPage;
