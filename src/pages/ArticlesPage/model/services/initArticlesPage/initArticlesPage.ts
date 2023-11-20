import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "app/providers/StoreProvider";
import {getArticlePageInited} from "../../selectors/getArticlePageSelectors";
import {articlePageSliceActions} from "../../slices/articlesPageSlice";
import {fetchArticlesList} from "../fetchArticlesList/fetchArticlesList";
import {ArticleSortField, ArticleType} from "entities/Article";
import {sortOrder} from "shared/types";

export const initArticlesPage = createAsyncThunk<
    void,
    URLSearchParams,
    ThunkConfig<string>
>(
    'articlesPage/fetchNextArticlePage',
    async (searchParams, thunkAPI) => {
        const {getState, dispatch} = thunkAPI
        const inited = getArticlePageInited(getState())

        if (!inited){
            const orderFromUrl = searchParams.get('order') as sortOrder
            const sortFromUrl = searchParams.get('sort') as ArticleSortField
            const searchFromUrl = searchParams.get('search')
            const typeFromUrl = searchParams.get('type') as ArticleType

            if(orderFromUrl){
                dispatch(articlePageSliceActions.setOrder(orderFromUrl))
            }
            if(sortFromUrl){
                dispatch(articlePageSliceActions.setSort(sortFromUrl))
            }
            if(searchFromUrl){
                dispatch(articlePageSliceActions.setSearch(searchFromUrl))
            }
            if(typeFromUrl){
                dispatch(articlePageSliceActions.setType(typeFromUrl))
            }
            dispatch(articlePageSliceActions.initState())
            dispatch(fetchArticlesList({}))
        }

    }
)

