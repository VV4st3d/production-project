import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "app/providers/StoreProvider";
import {Comment} from "entities/Comment";
import {getUserAuthData} from "entities/User";
import {getArticleDetailsData} from "entities/Article";
import {
    fetchCommentsByArticleId
} from "../../services/fetchCommentsByArticleId/fetchCommentsByArticleId";

export const addCommentForArticle = createAsyncThunk<
    Comment,
    string,
    ThunkConfig<string>
>(
    'articleDetails/addCommentForArticle',
    async (text, thunkAPI) => {
        const {dispatch, rejectWithValue, extra, getState} = thunkAPI

        const userData = getUserAuthData(getState())
        const article = getArticleDetailsData(getState())
        console.log(text, userData, article)
        if(!userData || !text || !article){
            return rejectWithValue('no data')
        }

        try {
            console.log('222222222')

            const response = await extra.api.post<Comment>('/comments', {
                articleId: article?.id,
                userId: userData.id,
                text
            })
            if (!response.data){
                throw new Error()
            }

            dispatch(fetchCommentsByArticleId(article.id))

            return response.data
        } catch (e) {
            return rejectWithValue('error')
        }
    }
)

