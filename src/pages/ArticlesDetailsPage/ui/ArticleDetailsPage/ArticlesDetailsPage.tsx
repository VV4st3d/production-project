import {classNames} from "shared/lib/classNames/classNames";
import cls from './ArticlesDetailsPage.module.scss'
import {useTranslation} from "react-i18next";
import {memo, useCallback, useEffect} from "react";
import {ArticleDetails} from "entities/Article";
import {useNavigate, useParams} from "react-router-dom";
import {Text} from "shared/ui/Text/Text";
import {CommentList} from "entities/Comment";
import {DynamicModuleLoader, ReducerList} from "shared/lib/components/DinamicModuleLoader/DynamicModuleLoader";
import {articleDetailsCommentsReducer, getArticleComments} from "../../model/slices/articleDetailsCommentsSlice";
import {useSelector} from "react-redux";
import {getArticleCommentsIsLoading} from "../../model/selectors/comments";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {
    fetchCommentsByArticleId
} from "../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId";
import {AddCommentForm} from "features/addNewComment";
import {addCommentForArticle} from "../../model/services/addCommentForArticle/addCommentForArticle";
import {Button, ButtonTheme} from "shared/ui/Button/Button";
import {RoutePath} from "shared/config/routerConfig/routerConfig";

interface ArticlesDetailsPageProps {
    className?: string,

}
const reducers: ReducerList = {
    articleDetailsComments: articleDetailsCommentsReducer
}

const ArticlesDetailsPage = ({className}: ArticlesDetailsPageProps) => {
    const {t} = useTranslation('article')
    const {id} = useParams<{ id: string }>()
    const comments = useSelector(getArticleComments.selectAll)
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const onBackToList = useCallback(()=>{
        navigate(RoutePath.articles)
    },[navigate])

    const onSendComment = useCallback((text: string)=>{
        dispatch(addCommentForArticle(text))
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchCommentsByArticleId(id))
    }, []);

    if (!id) {
        return (
            <div className={classNames(cls.ArticlesDetailsPage, {}, [className])}>
                {t('Статья не найдена')}
            </div>
        )
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterAmount>
            <div className={classNames(cls.ArticlesDetailsPage, {}, [className])}>
                <Button theme={ButtonTheme.OUTLINE} onClick={onBackToList}>
                    {t('Назад к списку')}
                </Button>
                <ArticleDetails id={id}/>
                <Text className={cls.commentTitle} title={t('Комментарии')}/>
                <AddCommentForm onSendComment={onSendComment}/>
                <CommentList isLoading={commentsIsLoading} comments={comments}/>
            </div>
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesDetailsPage)
