import { useSelector } from 'react-redux';
import {
    getArticlePageOrder,
    getArticlePageSearch,
    getArticlePageSort,
    getArticlePageType,
    getArticlePageView,
} from '../../model/selectors/getArticlePageSelectors';
import { useCallback } from 'react';
import { ArticleSortField, ArticleType, ArticleView } from '@/entities/Article';
import { articlePageSliceActions } from '../../model/slices/articlesPageSlice';
import { sortOrder } from '@/shared/types/sort';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';

export const useArticleFilters = () => {
    const view = useSelector(getArticlePageView);
    const sort = useSelector(getArticlePageSort);
    const order = useSelector(getArticlePageOrder);
    const search = useSelector(getArticlePageSearch);
    const type = useSelector(getArticlePageType);
    const dispatch = useAppDispatch();

    const fetchData = useCallback(() => {
        dispatch(fetchArticlesList({ replace: true }));
    }, []);

    const debouncedFetchData = useDebounce(fetchData, 500);

    const onChangeView = useCallback((view: ArticleView) => {
        dispatch(articlePageSliceActions.setView(view));
    }, []);

    const onChangeOrder = useCallback((newOrder: sortOrder) => {
        dispatch(articlePageSliceActions.setOrder(newOrder));
        dispatch(articlePageSliceActions.setPage(1));
        fetchData();
    }, []);

    const onChangeSort = useCallback((newSort: ArticleSortField) => {
        dispatch(articlePageSliceActions.setPage(1));
        dispatch(articlePageSliceActions.setSort(newSort));
        fetchData();
    }, []);

    const onChangeSearch = useCallback((search: string) => {
        dispatch(articlePageSliceActions.setPage(1));
        dispatch(articlePageSliceActions.setSearch(search));
        debouncedFetchData();
    }, []);

    const onChangeType = useCallback((value: ArticleType) => {
        dispatch(articlePageSliceActions.setPage(1));
        dispatch(articlePageSliceActions.setType(value));
        fetchData();
    }, []);

    return {
        view,
        sort,
        order,
        search,
        type,
        onChangeView,
        onChangeOrder,
        onChangeSort,
        onChangeSearch,
        onChangeType,
    };
};
