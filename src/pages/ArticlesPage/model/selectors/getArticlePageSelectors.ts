import {StateScheme} from "app/providers/StoreProvider";
import {ArticleView} from "entities/Article";

export const getArticlePageIsLoading = (state: StateScheme) => state.articlesPage?.isLoading || false
export const getArticlePageView = (state: StateScheme) => state.articlesPage?.view || ArticleView.SMALL
export const getArticlePageError = (state: StateScheme) => state.articlesPage?.error
