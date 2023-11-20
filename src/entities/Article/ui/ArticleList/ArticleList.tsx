import {classNames} from "shared/lib/classNames/classNames";
import cls from './ArticleList.module.scss'
import {useTranslation} from "react-i18next";
import {memo} from 'react'
import {Article, ArticleView} from "../../model/types/Article";
import {ArticleListItem} from "../ArticleListItem/ArticleListItem";
import {ArticleListItemSkeleton} from "../ArticleListItem/ArticleListItemSkeleton";
import {Text, TextSize} from "shared/ui/Text/Text";

interface ArticleListProps {
    className?: string,
    articles: Article[],
    isLoading?: boolean,
    view?: ArticleView
}

const getSkeletons = (view: ArticleView)=>{
    return new Array(view === ArticleView.SMALL ? 9 : 3).fill(null).map((item, index) => (
        <ArticleListItemSkeleton className={cls.card} key={index} view={view}/>
    ))
}

export const ArticleList = memo((props: ArticleListProps) => {
    const {t} = useTranslation()
    const {
        className,
        articles,
        view = ArticleView.SMALL,
        isLoading,
    } = props

    const renderArticle = (article: Article) => {
        return (
            <ArticleListItem
                className={cls.card}
                article={article}
                view={view}
                key={article.id}
            />
        )
    }

    if(!isLoading && !articles.length){
        return(
            <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
                <Text size={TextSize.L} title={t('Статьи не найдены')}/>
            </div>
        )
    }

    return (
        <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
            {articles.length > 0 ?
                articles.map(renderArticle) :
                null}
            {isLoading && getSkeletons(view)}
        </div>
    );
});
