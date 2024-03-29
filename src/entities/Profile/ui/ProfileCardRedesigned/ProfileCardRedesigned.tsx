import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Card } from '@/shared/ui/redesigned/Card';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Input } from '@/shared/ui/redesigned/Input';
import { CurrencySelect } from '@/entities/Currency';
import { CountrySelect } from '@/entities/Country';
import { ProfileCardProps } from '../ProfileCard/ProfileCard';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { Text } from '@/shared/ui/redesigned/Text';

export const ProfileCardRedesignedError = () => {
    const { t } = useTranslation();
    return (
        <HStack
            justify={'center'}
            max
        >
            <Text
                variant={'error'}
                title={t('Произошла ошибка при загрузке профиля')}
                text={t('Попробуйте обновить страницу')}
                align={'center'}
            />
        </HStack>
    );
};

export const ProfileCardRedesignedSkeleton = () => {
    return (
        <Card
            padding={'24'}
            maxWidth
        >
            <VStack gap={'32'}>
                <HStack
                    max
                    justify={'center'}
                >
                    <Skeleton
                        border={'100%'}
                        width={128}
                        height={128}
                    />
                </HStack>
                <HStack
                    gap={'32'}
                    max
                >
                    <VStack
                        gap={'16'}
                        max
                    >
                        <Skeleton
                            width={'100%'}
                            height={38}
                        />
                        <Skeleton
                            width={'100%'}
                            height={38}
                        />
                        <Skeleton
                            width={'100%'}
                            height={38}
                        />
                        <Skeleton
                            width={'100%'}
                            height={38}
                        />
                    </VStack>
                    <VStack
                        gap={'16'}
                        max
                    >
                        <Skeleton
                            width={'100%'}
                            height={38}
                        />
                        <Skeleton
                            width={'100%'}
                            height={38}
                        />
                        <Skeleton
                            width={'100%'}
                            height={38}
                        />
                        <Skeleton
                            width={'100%'}
                            height={38}
                        />
                    </VStack>
                </HStack>
            </VStack>
        </Card>
    );
};

export const ProfileCardRedesigned = memo((props: ProfileCardProps) => {
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

    return (
        <Card
            maxWidth
            border={'partial'}
            padding={'24'}
            className={className}
        >
            <VStack gap={'32'}>
                {data?.avatar && (
                    <HStack
                        justify={'center'}
                        max
                    >
                        <Avatar
                            src={data?.avatar}
                            size={128}
                        />
                    </HStack>
                )}
                <HStack
                    gap={'24'}
                    max
                >
                    <VStack
                        gap={'16'}
                        max
                    >
                        <Input
                            value={data?.first}
                            onChange={onChangeFirstname}
                            label={t('Имя')}
                            readonly={readonly}
                            data-testid={'ProfileCard.firstname'}
                        />
                        <Input
                            value={data?.lastname}
                            onChange={onChangeLastname}
                            label={t('Фамилия')}
                            readonly={readonly}
                            data-testid={'ProfileCard.lastname'}
                        />
                        <Input
                            value={data?.age}
                            onChange={onChangeAge}
                            label={t('Возраст')}
                            readonly={readonly}
                        />
                        <Input
                            value={data?.city}
                            onChange={onChangeCity}
                            label={t('Город')}
                            readonly={readonly}
                        />
                    </VStack>
                    <VStack
                        max
                        gap={'16'}
                    >
                        <Input
                            value={data?.username}
                            onChange={onChangeUsername}
                            label={t('Имя пользователя')}
                            readonly={readonly}
                        />
                        <Input
                            value={data?.avatar}
                            onChange={onChangeAvatar}
                            label={t('Ссылка на аватар')}
                            readonly={readonly}
                        />
                        <CurrencySelect
                            value={data?.currency}
                            onChange={onChangeCurrency}
                            readonly={readonly}
                        />
                        <CountrySelect
                            value={data?.country}
                            onChange={onChangeCountry}
                            readonly={readonly}
                        />
                    </VStack>
                </HStack>
            </VStack>
        </Card>
    );
});
