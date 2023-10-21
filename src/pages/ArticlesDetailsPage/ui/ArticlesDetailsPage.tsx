import {classNames} from "shared/lib/classNames/classNames";
import cls from './ArticlesDetailsPage.module.scss'
import {useTranslation} from "react-i18next";
import {memo} from "react";

interface ArticlesDetailsPageProps {
    className?: string,

}

const ArticlesDetailsPage = ({className}: ArticlesDetailsPageProps) => {
    const {t} = useTranslation('article')

    return (
        <div className={classNames(cls.ArticlesDetailsPage, {}, [className])}>
            ARTICLES DETAILS PAGE
        </div>
    );
};

export default memo(ArticlesDetailsPage)
