import {classNames} from "shared/lib/classNames/classNames";
import cls from './ProfilePage.module.scss'
import {useTranslation} from "react-i18next";
import {DynamicModuleLoader, ReducerList} from "shared/lib/components/DinamicModuleLoader/DynamicModuleLoader";
import {fetchProfileData, ProfileCard, profileReducer} from "entities/Profile";
import {useEffect} from "react";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";


const reducers:ReducerList={
    profile: profileReducer
}
interface ProfilePageProps {
    className?: string,

}

 const ProfilePage = ({className}:ProfilePageProps) => {
const {t} = useTranslation()
     const dispatch = useAppDispatch()

     useEffect(() => {
         dispatch(fetchProfileData())
     }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterAmount>
            <div className={classNames(cls.ProfilePage, {}, [className])}>
                <ProfileCard/>
            </div>
        </DynamicModuleLoader>
    );
};

export default ProfilePage
