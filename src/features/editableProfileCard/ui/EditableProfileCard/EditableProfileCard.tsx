import {classNames} from '@/shared/lib/classNames/classNames';
import {memo, useCallback, useEffect} from 'react';
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {useSelector} from "react-redux";
import {Currency} from "@/entities/Currency";
import {Country} from "@/entities/Country";
import {Text, TextTheme} from "@/shared/ui/Text/Text";
import {getProfileForm} from "../../model/selectors/getProfileForm/getProfileForm";
import {getProfileError} from "../../model/selectors/getProfileError/getProfileError";
import {getProfileReadonly} from "../../model/selectors/getProfileReadonly/getProfileReadonly";
import {getProfileIsLoading} from "../../model/selectors/getProfileIsLoading/getProfileIsLoading";
import {getProfileValidateErrors} from "../../model/selectors/getProfileValidateErrors/getProfileValidateErrors";
import {fetchProfileData} from "../../model/services/fetchProfileData/fetchProfileData";
import {profileActions, profileReducer} from "../../model/slice/profileSlice";
import {ProfileCard} from "@/entities/Profile";
import {DynamicModuleLoader, ReducerList} from "@/shared/lib/components/DinamicModuleLoader/DynamicModuleLoader";
import {useTranslation} from "react-i18next";
import {
    EditableProfileCardHeader
} from "@/features/editableProfileCard/ui/EditableProfileCardHeader/EditableProfileCardHeader";
import {VStack} from "@/shared/ui/Stack";
import {ValidateProfileError} from "../../model/consts/consts";

interface EditableProfileCardProps {
    className?: string;
    id?: string
}

const reducers: ReducerList = {
    profile: profileReducer
}

export const EditableProfileCard = memo((props: EditableProfileCardProps) => {
    const { className, id } = props;
    const {t} = useTranslation()
    const dispatch = useAppDispatch()

    const formData = useSelector(getProfileForm)
    const error = useSelector(getProfileError)
    const readonly = useSelector(getProfileReadonly)
    const isLoading = useSelector(getProfileIsLoading)
    const validateErrors = useSelector(getProfileValidateErrors)

    const validateErrorTranslations = {
        [ValidateProfileError.SERVER_ERROR]: t('Серверная ошибка при сохранении'),
        [ValidateProfileError.INCORRECT_COUNTRY]: t('Некорректный регион'),
        [ValidateProfileError.NO_DATA]: t('Данные не указаны'),
        [ValidateProfileError.INCORRECT_USER_DATA]: t('Имя и фамилия обязательны'),
        [ValidateProfileError.INCORRECT_AGE]: t('Некорректный возвраст'),
    }

    useEffect(() => {
        if (__PROJECT__ !== 'jest') {
            if(id){
                dispatch(fetchProfileData(id))
            }
        }
    }, [dispatch]);

    const onChangeFirstname = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({first: value || ''}))
    }, [dispatch])
    const onChangeLastname = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({lastname: value || ''}))
    }, [dispatch])
    const onChangeCity = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({city: value || ''}))
    }, [dispatch])
    const onChangeAge = useCallback((value?: any) => {
        if (/\D/g.test(value)) {
            return
        }
        dispatch(profileActions.updateProfile({age: Number(value || 0)}))
    }, [dispatch])
    const onChangeAvatar = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({avatar: value || ''}))
    }, [dispatch])
    const onChangeUsername = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({username: value || ''}))
    }, [dispatch])
    const onChangeCurrency = useCallback((currency: Currency) => {
        dispatch(profileActions.updateProfile({currency}))
    }, [dispatch])
    const onChangeCountry = useCallback((country: Country) => {
        dispatch(profileActions.updateProfile({country}))
    }, [dispatch])

    return (
        <DynamicModuleLoader reducers={reducers}>
            <VStack max gap={'8'} className={classNames('', {}, [className])}>
                <EditableProfileCardHeader/>
                {validateErrors?.length && validateErrors.map(err =>
                    <Text
                        theme={TextTheme.ERROR}
                        text={validateErrorTranslations[err]}
                        key={err}
                        data-testid={'EditableProfileCard.Error'}
                    />
                )}
                <ProfileCard
                    readonly={readonly}
                    data={formData}
                    isLoading={isLoading}
                    error={error}
                    onChangeFirstname={onChangeFirstname}
                    onChangeLastname={onChangeLastname}
                    onChangeAge={onChangeAge}
                    onChangeCity={onChangeCity}
                    onChangeUsername={onChangeUsername}
                    onChangeAvatar={onChangeAvatar}
                    onChangeCurrency={onChangeCurrency}
                    onChangeCountry={onChangeCountry}
                />
            </VStack>
        </DynamicModuleLoader>
    );
});
