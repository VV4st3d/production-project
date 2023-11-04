import {createEntityAdapter, createSlice, PayloadAction,} from '@reduxjs/toolkit'
import {Comment} from "entities/Comment";
import {StateScheme} from "app/providers/StoreProvider";
import {ArticleDetailsCommentsScheme} from "pages/ArticlesDetailsPage";
import {fetchArticleById} from "entities/Article/model/services/fetchArticleById/fetchArticleById";
import {
    fetchCommentsByArticleId
} from "pages/ArticlesDetailsPage/model/services/fetchCommentsByArticleId/fetchCommentsByArticleId";


const commentsAdapter = createEntityAdapter<Comment>({
    selectId: (comment) => comment.id
})

export const getArticleComments = commentsAdapter.getSelectors<StateScheme>((state) => state.articleDetailsComments || commentsAdapter.getInitialState()
)

const articleDetailsCommentSlice = createSlice({
    name: 'articleDetailsCommentSlice',
    initialState: commentsAdapter.getInitialState<ArticleDetailsCommentsScheme>({
        isLoading: false,
        error: undefined,
        ids: ['1', '2'],
        entities: {
            1:{
                id: '1',
                text: 'comment1',
                user: {id: '1', username: 'user1'}
            },
            2:{
                id: '2',
                text: 'comment2',
                user: {id: '2', username: 'user2'}
            }
        }
    }),
    reducers: {

    },
    extraReducers:(builder) => {
        builder
            .addCase(fetchCommentsByArticleId.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true
            })
            .addCase(fetchCommentsByArticleId.fulfilled, (state, action: PayloadAction<Comment[]>) => {
                state.isLoading = false
                commentsAdapter.setAll(state, action.payload)
            })
            .addCase(fetchCommentsByArticleId.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    }
})


export const {reducer: articleDetailsCommentsReducer} = articleDetailsCommentSlice
export const {actions: articleDetailsCommentsActions} = articleDetailsCommentSlice
