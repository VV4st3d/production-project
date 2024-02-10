import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './ProfileCardDeprecated.module.scss';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { CurrencySelect } from '@/entities/Currency';
import { CountrySelect } from '@/entities/Country';
import { ProfileCardProps } from '../ProfileCard/ProfileCard';
import { Loader } from '@/shared/ui/deprecated/Loader';
import {
    Text as TextDeprecated,
    TextAlign,
    TextTheme,
} from '@/shared/ui/deprecated/Text';

export const ProfileCardDeprecatedLoader = () => {
    return (
        <HStack
            justify={'center'}
            max
            className={classNames(cls.ProfileCard, { [cls.loading]: true })}
        >
            <Loader />
        </HStack>
    );
};
export const ProfileCardDeprecatedError = () => {
    const { t } = useTranslation();
    return (
        <HStack
            justify={'center'}
            max
            className={classNames(cls.ProfileCard, {}, [cls.error])}
        >
            <TextDeprecated
                theme={TextTheme.ERROR}
                title={t('Произошла ошибка при загрузке профиля')}
                text={t('Попробуйте обновить страницу')}
                align={TextAlign.CENTER}
            />
        </HStack>
    );
};

export const ProfileCardDeprecated = memo((props: ProfileCardProps) => {
    const { t } = useTranslation();
    const {
        className,
        data,
        onChangeFirstname,
        onChangeLastname,
        onChangeCity,
        onChangeAge,
        onChangeUsername,
        onChangeAvatar,
        onChangeCountry,
        onChangeCurrency,
        readonly,
    } = props;

    const mods: Mods = {
        [cls.editing]: !readonly,
    };

    return (
        <VStack
            gap={'8'}
            max
            className={classNames(cls.ProfileCard, mods, [className])}
        >
            {data?.avatar && (
                <HStack
                    justify={'center'}
                    max
                    className={cls.avatarWrapper}
                >
                    <AvatarDeprecated src={data?.avatar} />
                </HStack>
            )}
            <InputDeprecated
                value={data?.first}
                onChange={onChangeFirstname}
                placeholder={t('Ваше имя')}
                className={cls.input}
                readonly={readonly}
                data-testid={'ProfileCard.firstname'}
            />
            <InputDeprecated
                value={data?.lastname}
                onChange={onChangeLastname}
                placeholder={t('Ваша фамилия')}
                className={cls.input}
                readonly={readonly}
                data-testid={'ProfileCard.lastname'}
            />
            <InputDeprecated
                value={data?.age}
                onChange={onChangeAge}
                placeholder={t('Ваш возраст')}
                className={cls.input}
                readonly={readonly}
            />
            <InputDeprecated
                value={data?.city}
                onChange={onChangeCity}
                placeholder={t('Город')}
                className={cls.input}
                readonly={readonly}
            />
            <InputDeprecated
                value={data?.username}
                onChange={onChangeUsername}
                placeholder={t('Введите имя пользователя')}
                className={cls.input}
                readonly={readonly}
            />
            <InputDeprecated
                value={data?.avatar}
                onChange={onChangeAvatar}
                placeholder={t('Введите ссылку на аватар')}
                className={cls.input}
                readonly={readonly}
            />
            <CurrencySelect
                className={cls.input}
                value={data?.currency}
                onChange={onChangeCurrency}
                readonly={readonly}
            />
            <CountrySelect
                className={cls.input}
                value={data?.country}
                onChange={onChangeCountry}
                readonly={readonly}
            />
        </VStack>
    );
});
