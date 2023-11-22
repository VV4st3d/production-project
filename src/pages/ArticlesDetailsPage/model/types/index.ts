import {ArticleDetailsRecommendationsScheme} from "./ArticleDetailsRecommendationsScheme";
import {ArticleDetailsCommentsScheme} from'./ArticleDetailsCommentsScheme'

export interface ArticleDetailsPageScheme {
    comments: ArticleDetailsCommentsScheme,
    recommendations: ArticleDetailsRecommendationsScheme
}
