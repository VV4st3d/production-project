import {Comment} from "features/Comment";
import {EntityState} from "@reduxjs/toolkit";

export interface ArticleDetailsCommentsScheme extends EntityState<Comment>{
    isLoading?: boolean;
    error?: string;
}
