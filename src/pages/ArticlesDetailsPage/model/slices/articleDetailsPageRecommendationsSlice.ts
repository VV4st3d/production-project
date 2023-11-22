import {createEntityAdapter, createSlice,} from '@reduxjs/toolkit'
import {StateScheme} from "app/providers/StoreProvider";
import {ArticleDetailsRecommendationsScheme} from "../types/ArticleDetailsRecommendationsScheme";
import {Article} from "entities/Article";
import {
    fetchArticleRecommendations
} from "pages/ArticlesDetailsPage/model/services/fetchArticleRecommendations/fetchArticleRecommendations";


const recommendationsAdapter = createEntityAdapter<Article>({
    selectId: (article) => article.id
})

export const getArticleRecommendations = recommendationsAdapter.getSelectors<StateScheme>((state) => state.articleDetailsPage?.recommendations || recommendationsAdapter.getInitialState()
)

const articleDetailsPageRecommendationsSlice = createSlice({
    name: 'articleDetailsPageRecommendationsSlice',
    initialState: recommendationsAdapter.getInitialState<ArticleDetailsRecommendationsScheme>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {}
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticleRecommendations.pending, (state) => {
                state.error = undefined;
                state.isLoading = true
            })
            .addCase(fetchArticleRecommendations.fulfilled, (state, action) => {
                state.isLoading = false
                recommendationsAdapter.setAll(state, action.payload)
            })
            .addCase(fetchArticleRecommendations.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    }
})


export const {reducer: articleDetailsPageRecommendationsReducer} = articleDetailsPageRecommendationsSlice
export const {actions: articleDetailsPageRecommendationsActions} = articleDetailsPageRecommendationsSlice
