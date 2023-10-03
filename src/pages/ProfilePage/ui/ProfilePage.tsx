import {classNames} from "shared/lib/classNames/classNames";
import cls from './ProfilePage.module.scss'
import {useTranslation} from "react-i18next";
import {DynamicModuleLoader, ReducerList} from "shared/lib/components/DinamicModuleLoader/DynamicModuleLoader";
import {profileReducer} from "entities/Profile";


const reducers:ReducerList={
    profile: profileReducer
}
interface ProfilePageProps {
    className?: string,

}

 const ProfilePage = ({className}:ProfilePageProps) => {
const {t} = useTranslation()

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterAmount>
            <div className={classNames(cls.ProfilePage, {}, [className])}>
                {t('Profile Page')}
            </div>
        </DynamicModuleLoader>
    );
};

export default ProfilePage
