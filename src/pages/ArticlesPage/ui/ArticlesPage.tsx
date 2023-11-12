import {classNames} from "shared/lib/classNames/classNames";
import cls from './ArticlesPage.module.scss'
import {useTranslation} from "react-i18next";
import {memo, useCallback, useEffect} from "react";
import {ArticleList, ArticleView, ArticleViewSelector} from "entities/Article";
import {DynamicModuleLoader, ReducerList} from "shared/lib/components/DinamicModuleLoader/DynamicModuleLoader";
import {articlePageSliceActions, articlePageSliceReducer, getArticles} from "../model/slices/articlesPageSlice";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {fetchArticlesList} from "../model/services/fetchArticlesList/fetchArticlesList";
import {useSelector} from "react-redux";
import {
    getArticlePageInited,
    getArticlePageIsLoading,
    getArticlePageView
} from "../model/selectors/getArticlePageSelectors";
import {Page} from "shared/ui/Page/Page";
import {fetchNextArticlePage} from "../model/services/fetchNextArticlePage/fetchNextArticlePage";
import {initArticlesPage} from "../model/services/initArticlesPage/initArticlesPage";

interface ArticlesPageProps {
    className?: string,
}

const reducers: ReducerList = {
    articlesPage: articlePageSliceReducer
}

const ArticlesPage = ({className}: ArticlesPageProps) => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch()
    const articles = useSelector(getArticles.selectAll)
    const isLoading = useSelector(getArticlePageIsLoading)
    const view = useSelector(getArticlePageView)
    const inited = useSelector(getArticlePageInited)

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextArticlePage())
    }, [dispatch])

    const onChangeView = useCallback((view: ArticleView) => {
        dispatch(articlePageSliceActions.setView(view))
    }, [])

    useEffect(() => {
        if(!inited){
            dispatch(initArticlesPage())
            dispatch(fetchArticlesList({page: 1}))
        }
    }, [inited, dispatch]);


    return (
        <DynamicModuleLoader reducers={reducers} removeAfterAmount={false}>
            <Page onScrollEnd={onLoadNextPart} className={classNames(cls.ArticlesPage, {}, [className])}>
                <ArticleViewSelector view={view} onViewClick={onChangeView}/>
                <ArticleList
                    isLoading={isLoading}
                    view={view}
                    articles={articles}/>
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesPage)
