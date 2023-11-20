import {StateScheme} from "app/providers/StoreProvider";
import {ArticleSortField, ArticleType, ArticleView} from "entities/Article";

export const getArticlePageIsLoading = (state: StateScheme) => state.articlesPage?.isLoading || false
export const getArticlePageView = (state: StateScheme) => state.articlesPage?.view || ArticleView.SMALL
export const getArticlePageError = (state: StateScheme) => state.articlesPage?.error
export const getArticlePageNum = (state: StateScheme) => state.articlesPage?.page || 1
export const getArticlePageLimit = (state: StateScheme) => state.articlesPage?.limit || 9
export const getArticlePageHasMore = (state: StateScheme) => state.articlesPage?.hasMore
export const getArticlePageInited = (state: StateScheme) => state.articlesPage?._inited
export const getArticlePageOrder = (state: StateScheme) => state.articlesPage?.order ?? 'asc'
export const getArticlePageSort = (state: StateScheme) => state.articlesPage?.sort ?? ArticleSortField.CREATED
export const getArticlePageSearch = (state: StateScheme) => state.articlesPage?.search ?? ''
export const getArticlePageType = (state: StateScheme) => state.articlesPage?.type ?? ArticleType.ALL
