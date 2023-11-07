import {createEntityAdapter, createSlice, PayloadAction,} from '@reduxjs/toolkit'
import {StateScheme} from "app/providers/StoreProvider";
import {Article, ArticleView} from "entities/Article";
import {articlePageScheme} from "pages/ArticlesPage";
import {fetchArticlesList} from "../services/fetchArticlesList/fetchArticlesList";
import {ARTICLES_VIEW_LOCALSTORAGE_KEY} from "shared/const/localstorage";


const articlesAdapter = createEntityAdapter<Article>({
    selectId: (article) => article.id
})

export const getArticles = articlesAdapter.getSelectors<StateScheme>(
    (state) => state.articlesPage || articlesAdapter.getInitialState()
)

const articlePageSlice = createSlice({
    name: 'articlePageSlice',
    initialState: articlesAdapter.getInitialState<articlePageScheme>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {
        },
        view: ArticleView.SMALL
    }),
    reducers: {
        setView: (state, action: PayloadAction<ArticleView>)=>{
            state.view = action.payload
            localStorage.setItem(ARTICLES_VIEW_LOCALSTORAGE_KEY, action.payload)
        },
        initState: state => {
            state.view = localStorage.getItem(ARTICLES_VIEW_LOCALSTORAGE_KEY) as ArticleView
        }
    },
    extraReducers:(builder) => {
        builder
            .addCase(fetchArticlesList.pending, (state) => {
                state.error = undefined;
                state.isLoading = true
            })
            .addCase(fetchArticlesList.fulfilled, (state, action: PayloadAction<Article[]>) => {
                state.isLoading = false
                articlesAdapter.setAll(state, action.payload)
            })
            .addCase(fetchArticlesList.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    }
})


export const {reducer: articlePageSliceReducer} = articlePageSlice
export const {actions: articlePageSliceActions} = articlePageSlice
