import {classNames} from "shared/lib/classNames/classNames";
import cls from './ArticlesDetailsPage.module.scss'
import {useTranslation} from "react-i18next";
import {memo, useCallback, useEffect} from "react";
import {ArticleDetails, ArticleList} from "entities/Article";
import {useParams} from "react-router-dom";
import {Text, TextSize} from "shared/ui/Text/Text";
import {CommentList} from "entities/Comment";
import {DynamicModuleLoader, ReducerList} from "shared/lib/components/DinamicModuleLoader/DynamicModuleLoader";
import {getArticleComments} from "../../model/slices/articleDetailsCommentSlice";
import {useSelector} from "react-redux";
import {getArticleCommentsIsLoading} from "../../model/selectors/comments";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {fetchCommentsByArticleId} from "../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId";
import {AddCommentForm} from "features/addNewComment";
import {addCommentForArticle} from "../../model/services/addCommentForArticle/addCommentForArticle";
import {Page} from "widgets/Page/Page";
import {getArticleRecommendations} from "../../model/slices/articleDetailsPageRecommendationsSlice";
import {getArticleRecommendationsIsLoading} from "../../model/selectors/recommendations";
import {
    fetchArticleRecommendations
} from "../../model/services/fetchArticleRecommendations/fetchArticleRecommendations";
import {articleDetailsPageReducer} from "../../model/slices/index";
import {ArticleDetailsPageHeader} from "../ArticleDetailsPageHeader/ArticleDetailsPageHeader";

interface ArticlesDetailsPageProps {
    className?: string,

}
const reducers: ReducerList = {
    articleDetailsPage: articleDetailsPageReducer
}

const ArticlesDetailsPage = ({className}: ArticlesDetailsPageProps) => {
    const {t} = useTranslation('article')
    const {id} = useParams<{ id: string }>()
    const comments = useSelector(getArticleComments.selectAll)
    const recommendations = useSelector(getArticleRecommendations.selectAll)
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading)
    const recommendationsIsLoading = useSelector(getArticleRecommendationsIsLoading)
    const dispatch = useAppDispatch()


    const onSendComment = useCallback((text: string)=>{
        dispatch(addCommentForArticle(text))
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchCommentsByArticleId(id))
        dispatch(fetchArticleRecommendations())
    }, []);

    if (!id) {
        return (
            <Page className={classNames(cls.ArticlesDetailsPage, {}, [className])}>
                {t('Статья не найдена')}
            </Page>
        )
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterAmount>
            <Page className={classNames(cls.ArticlesDetailsPage, {}, [className])}>
                <ArticleDetailsPageHeader/>
                <ArticleDetails id={id}/>
                <Text size={TextSize.L} className={cls.commentTitle} title={t('Рекомендуем')}/>
                <ArticleList
                    className={cls.recommendations}
                    articles={recommendations}
                    isLoading={recommendationsIsLoading}
                    target={"_blank"}
                />
                <Text size={TextSize.L} className={cls.commentTitle} title={t('Комментарии')}/>
                <AddCommentForm onSendComment={onSendComment}/>
                <CommentList isLoading={commentsIsLoading} comments={comments}/>
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesDetailsPage)
