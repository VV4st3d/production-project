import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './ProfileCard.module.scss';
import { useTranslation } from 'react-i18next';
import { Text, TextAlign, TextTheme } from '@/shared/ui/deprecated/Text';
import { Input } from '@/shared/ui/deprecated/Input';
import { Profile } from '../../model/types/profile';
import { Loader } from '@/shared/ui/deprecated/Loader';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { Currency } from '@/entities/Currency/model/types/currency';
import { CurrencySelect } from '@/entities/Currency';
import { Country, CountrySelect } from '@/entities/Country';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';

interface ProfileCardProps {
    className?: string;
    data?: Profile;
    error?: string;
    isLoading?: boolean;
    onChangeLastname?: (value?: string) => void;
    onChangeFirstname?: (value?: string) => void;
    readonly?: boolean;
    onChangeCity?: (value?: string) => void;
    onChangeAge?: (value?: string) => void;
    onChangeUsername?: (value?: string) => void;
    onChangeAvatar?: (value?: string) => void;
    onChangeCurrency?: (currency: Currency) => void;
    onChangeCountry?: (value: Country) => void;
}

export const ProfileCard = (props: ProfileCardProps) => {
    const { t } = useTranslation('profile');
    const {
        className,
        data,
        error,
        isLoading,
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

    if (isLoading) {
        return (
            <HStack
                justify={'center'}
                max
                className={classNames(
                    cls.ProfileCard,
                    { [cls.loading]: true },
                    [className],
                )}
            >
                <Loader />
            </HStack>
        );
    }
    if (error) {
        return (
            <HStack
                justify={'center'}
                max
                className={classNames(cls.ProfileCard, {}, [
                    className,
                    cls.error,
                ])}
            >
                <Text
                    theme={TextTheme.ERROR}
                    title={t('Произошла ошибка при загрузке профиля')}
                    text={t('Попробуйте обновить страницу')}
                    align={TextAlign.CENTER}
                />
            </HStack>
        );
    }

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
                    <Avatar src={data?.avatar} />
                </HStack>
            )}
            <Input
                value={data?.first}
                onChange={onChangeFirstname}
                placeholder={t('Ваше имя')}
                className={cls.input}
                readonly={readonly}
                data-testid={'ProfileCard.firstname'}
            />
            <Input
                value={data?.lastname}
                onChange={onChangeLastname}
                placeholder={t('Ваша фамилия')}
                className={cls.input}
                readonly={readonly}
                data-testid={'ProfileCard.lastname'}
            />
            <Input
                value={data?.age}
                onChange={onChangeAge}
                placeholder={t('Ваш возраст')}
                className={cls.input}
                readonly={readonly}
            />
            <Input
                value={data?.city}
                onChange={onChangeCity}
                placeholder={t('Город')}
                className={cls.input}
                readonly={readonly}
            />
            <Input
                value={data?.username}
                onChange={onChangeUsername}
                placeholder={t('Введите имя пользователя')}
                className={cls.input}
                readonly={readonly}
            />
            <Input
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
};
