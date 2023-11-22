import {combineReducers} from "@reduxjs/toolkit";
import {ArticleDetailsPageScheme} from "../types/index";
import {
    articleDetailsPageRecommendationsReducer
} from "../slices/articleDetailsPageRecommendationsSlice";
import {articleDetailsCommentsReducer} from "../slices/articleDetailsCommentSlice";

export const articleDetailsPageReducer = combineReducers<ArticleDetailsPageScheme>({
    recommendations: articleDetailsPageRecommendationsReducer,
    comments: articleDetailsCommentsReducer
})
