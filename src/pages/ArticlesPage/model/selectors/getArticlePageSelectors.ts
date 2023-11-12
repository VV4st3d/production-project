import {StateScheme} from "app/providers/StoreProvider";
import {ArticleView} from "entities/Article";

export const getArticlePageIsLoading = (state: StateScheme) => state.articlesPage?.isLoading || false
export const getArticlePageView = (state: StateScheme) => state.articlesPage?.view || ArticleView.SMALL
export const getArticlePageError = (state: StateScheme) => state.articlesPage?.error
export const getArticlePageNum = (state: StateScheme) => state.articlesPage?.page || 1
export const getArticlePageLimit = (state: StateScheme) => state.articlesPage?.limit || 9
export const getArticlePageHasMore = (state: StateScheme) => state.articlesPage?.hasMore
