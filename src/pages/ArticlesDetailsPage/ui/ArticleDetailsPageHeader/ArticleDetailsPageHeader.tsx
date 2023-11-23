import {classNames} from "shared/lib/classNames/classNames";
import cls from './ArticleDetailsPageHeader.module.scss'
import {useTranslation} from "react-i18next";
import {memo, useCallback} from 'react'
import {Button, ButtonTheme} from "shared/ui/Button/Button";
import {useNavigate} from "react-router-dom";
import {RoutePath} from "shared/config/routerConfig/routerConfig";
import {useSelector} from "react-redux";
import {getUserAuthData} from "entities/User";
import {getArticleDetailsData} from "entities/Article";
import {getCanEditSelector} from "pages/ArticlesDetailsPage/model/selectors/article";

interface ArticleDetailsPageHeaderProps {
    className?: string,

}

export const ArticleDetailsPageHeader = memo((props: ArticleDetailsPageHeaderProps) => {
    const {t} = useTranslation()
    const {className} = props
    const navigate = useNavigate()
    const userData = useSelector(getUserAuthData)
    const article = useSelector(getArticleDetailsData)
    const canEdit = useSelector(getCanEditSelector)

    const onBackToList = useCallback(()=>{
        navigate(RoutePath.articles)
    },[navigate])

    const onEditArticle = useCallback(()=>{
        navigate(`${RoutePath.article_details}${article?.id}/edit`)
    },[navigate, article?.id])

    return (
        <div className={classNames(cls.ArticleDetailsPageHeader, {}, [className])}>
            <Button theme={ButtonTheme.OUTLINE} onClick={onBackToList}>
                {t('Назад к списку')}
            </Button>
            {canEdit && <Button className={cls.editBtn} theme={ButtonTheme.OUTLINE} onClick={onEditArticle}>
                {t('Редактировать')}
            </Button>}
        </div>
    );
});
