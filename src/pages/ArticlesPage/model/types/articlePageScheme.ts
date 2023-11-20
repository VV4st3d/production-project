import {EntityState} from "@reduxjs/toolkit";
import {Article, ArticleType, ArticleView} from "entities/Article";
import {sortOrder} from "shared/types";
import {ArticleSortField, } from "entities/Article/model/types/Article";

export interface articlePageScheme extends EntityState<Article>{
    isLoading?: boolean;
    error?: string;

    //pagination
    page: number;
    limit: number;
    hasMore: boolean;
    //filters
    view: ArticleView;
    order: sortOrder;
    sort: ArticleSortField;
    search: string,
    type: ArticleType

    _inited: boolean
}
