import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "app/providers/StoreProvider";
import {
    getArticlePageHasMore,
    getArticlePageIsLoading,
    getArticlePageNum
} from "../../selectors/getArticlePageSelectors";
import {articlePageSliceActions} from "../../slices/articlesPageSlice";
import {fetchArticlesList} from "../fetchArticlesList/fetchArticlesList";

export const fetchNextArticlePage = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>(
    'articlesPage/fetchNextArticlePage',
    async (_, thunkAPI) => {
        const {getState, dispatch} = thunkAPI
        const hasMore = getArticlePageHasMore(getState())
        const page = getArticlePageNum(getState())
        const isLoading = getArticlePageIsLoading(getState())

        if (hasMore && !isLoading){
            dispatch(articlePageSliceActions.setPage(page + 1))
            dispatch(fetchArticlesList({}))
        }

    }
)

