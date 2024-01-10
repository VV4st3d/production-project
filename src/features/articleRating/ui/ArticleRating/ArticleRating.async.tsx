import {lazy, Suspense} from "react";
import {ArticleRatingProps} from "../ArticleRating/ArticleRating";
import {Skeleton} from "@/shared/ui/Skeleton/Skeleton";

const ArticleRatingAsync = lazy(
    ()=>import('./ArticleRating')
)

export const articleRatingAsync = (props: ArticleRatingProps) =>{
    const {} = props
    return (
        <Suspense fallback={<Skeleton width={'100%'} height={130} />}>
            <ArticleRatingAsync {...props}/>
        </Suspense>
    )
}
