import {classNames} from "shared/lib/classNames/classNames";
import cls from './ProfilePage.module.scss'
import {useTranslation} from "react-i18next";
import {DynamicModuleLoader, ReducerList} from "shared/lib/components/DinamicModuleLoader/DynamicModuleLoader";
import {
    fetchProfileData,
    getProfileError,
    getProfileForm,
    getProfileIsLoading,
    getProfileReadonly,
    profileActions,
    ProfileCard,
    profileReducer
} from "entities/Profile";
import {useCallback, useEffect} from "react";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {useSelector} from "react-redux";
import {ProfilePageHeader} from "./ProfilePageHeader/ProfilePageHeader";
import {Currency} from "entities/Currency";
import {Country} from "entities/Country";


const reducers: ReducerList = {
    profile: profileReducer
}

interface ProfilePageProps {
    className?: string,

}

const ProfilePage = ({className}: ProfilePageProps) => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch()

    const formData = useSelector(getProfileForm)
    const error = useSelector(getProfileError)
    const readonly = useSelector(getProfileReadonly)
    const isLoading = useSelector(getProfileIsLoading)

    useEffect(() => {
        dispatch(fetchProfileData())
    }, [dispatch]);

    const onChangeFirstname = useCallback((value?: string)=>{
        dispatch(profileActions.updateProfile({first: value || ''}))
    }, [dispatch])
    const onChangeLastname = useCallback((value?: string)=>{
        dispatch(profileActions.updateProfile({lastname: value || ''}))
    }, [dispatch])
    const onChangeCity = useCallback((value?: string)=>{
        dispatch(profileActions.updateProfile({city: value || ''}))
    }, [dispatch])
    const onChangeAge = useCallback((value?: string)=>{
        dispatch(profileActions.updateProfile({age: Number(value || 0)}))
    }, [dispatch])
    const onChangeAvatar = useCallback((value?: string)=>{
        dispatch(profileActions.updateProfile({avatar: value || ''}))
    }, [dispatch])
    const onChangeUsername = useCallback((value?: string)=>{
        dispatch(profileActions.updateProfile({username: value || ''}))
    }, [dispatch])
    const onChangeCurrency = useCallback((currency: Currency)=>{
        dispatch(profileActions.updateProfile({currency}))
    }, [dispatch])
    const onChangeCountry = useCallback((country: Country)=>{
        dispatch(profileActions.updateProfile({country}))
    }, [dispatch])


    return (
        <DynamicModuleLoader reducers={reducers} removeAfterAmount>
            <div className={classNames(cls.ProfilePage, {}, [className])}>
                <ProfilePageHeader/>
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
            </div>
        </DynamicModuleLoader>
    );
};

export default ProfilePage
