import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticlePageFilters.module.scss';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { ArticleSortField, ArticleType, ArticleView } from '@/entities/Article';
import { articlePageSliceActions } from '../../model/slices/articlesPageSlice';
import { useSelector } from 'react-redux';
import {
    getArticlePageOrder,
    getArticlePageSearch,
    getArticlePageSort,
    getArticlePageType,
    getArticlePageView,
} from '../../model/selectors/getArticlePageSelectors';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Card } from '@/shared/ui/Card';
import { Input } from '@/shared/ui/Input';
import { sortOrder } from '@/shared/types/sort';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';
import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticleViewSelector } from '@/features/ArticleViewSelector';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';

interface ArticlePageFiltersProps {
    className?: string;
}

export const ArticlePageFilters = memo((props: ArticlePageFiltersProps) => {
    const { t } = useTranslation();
    const view = useSelector(getArticlePageView);
    const { className } = props;
    const dispatch = useAppDispatch();
    const sort = useSelector(getArticlePageSort);
    const order = useSelector(getArticlePageOrder);
    const search = useSelector(getArticlePageSearch);
    const type = useSelector(getArticlePageType);

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

    return (
        <div className={classNames(cls.ArticlePageFilters, {}, [className])}>
            <div className={cls.sortWrapper}>
                <ArticleSortSelector
                    sort={sort}
                    order={order}
                    onChangeOrder={onChangeOrder}
                    onChangeSort={onChangeSort}
                />
                <ArticleViewSelector
                    view={view}
                    onViewClick={onChangeView}
                />
            </div>
            <Card className={cls.search}>
                <Input
                    value={search}
                    onChange={onChangeSearch}
                    placeholder={t('Поиск')}
                />
            </Card>
            <ArticleTypeTabs
                className={cls.tabs}
                value={type}
                onChangeType={onChangeType}
            />
        </div>
    );
});
