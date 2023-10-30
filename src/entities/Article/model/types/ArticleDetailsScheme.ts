import {Article} from "./Article";

export interface ArticleDetailsScheme {
    isLoading: boolean;
    error?: string;
    data?: Article
}
