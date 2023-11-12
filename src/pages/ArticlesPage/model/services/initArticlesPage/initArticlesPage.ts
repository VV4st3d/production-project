import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "app/providers/StoreProvider";
import {getArticlePageInited} from "../../selectors/getArticlePageSelectors";
import {articlePageSliceActions} from "../../slices/articlesPageSlice";
import {fetchArticlesList} from "../fetchArticlesList/fetchArticlesList";

export const initArticlesPage = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>(
    'articlesPage/fetchNextArticlePage',
    async (_, thunkAPI) => {
        const {getState, dispatch} = thunkAPI
        const inited = getArticlePageInited(getState())

        if (!inited){
            dispatch(articlePageSliceActions.initState())
            dispatch(fetchArticlesList({page: 1}))
        }

    }
)

