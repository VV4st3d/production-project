import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './LangSwitcher.module.scss';
import { useTranslation } from 'react-i18next';
import React, { memo } from 'react';
import {
    Button as ButtonDeprecated,
    ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { Button } from '@/shared/ui/redesigned/Button';
import { ToggleFeatures } from '@/shared/lib/features';

interface LangSwitcherProps {
    className?: string;
    short?: boolean;
}

export const LangSwitcher = memo(({ className, short }: LangSwitcherProps) => {
    const { t, i18n } = useTranslation();
    const toggle = async () => {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
    };

    return (
        <ToggleFeatures
            feature={'isAppRedesigned'}
            on={
                <Button
                    className={classNames(cls.LangSwitcher, {}, [className])}
                    onClick={toggle}
                    variant={'clear'}
                >
                    {t(short ? 'Язык коротко' : 'Язык')}
                </Button>
            }
            off={
                <ButtonDeprecated
                    className={classNames(cls.LangSwitcher, {}, [className])}
                    theme={ButtonTheme.CLEAR}
                    onClick={toggle}
                >
                    {t(short ? 'Язык коротко' : 'Язык')}
                </ButtonDeprecated>
            }
        />
    );
});
