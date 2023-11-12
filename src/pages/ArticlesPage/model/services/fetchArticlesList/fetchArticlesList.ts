import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "app/providers/StoreProvider";
import {Comment} from "entities/Comment";
import {Article} from "entities/Article";
import {getArticlePageLimit} from "../../selectors/getArticlePageSelectors";

interface FetchArticlesListProps {
    page?: number
}

export const fetchArticlesList = createAsyncThunk<
    Article[],
    FetchArticlesListProps,
    ThunkConfig<string>
>(
    'articlesPage/fetchArticlesList',
    async (props, thunkAPI) => {
        const {rejectWithValue, extra, getState} = thunkAPI
        const {page = 1} = props
        const limit = getArticlePageLimit(getState())

        try {
            const response = await extra.api.get<Article[]>(`/articles`, {
                params:{
                    _expand: 'user',
                    _limit: limit,
                    _page: page
                }
            })
            if(!response.data){
                throw new Error()
            }
            return response.data
        } catch (e) {
            return rejectWithValue('error')
        }
    }
)

