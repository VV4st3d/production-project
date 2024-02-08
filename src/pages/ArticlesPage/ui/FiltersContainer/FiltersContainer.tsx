import { memo } from 'react';
import { ArticlesFilters } from '@/widgets/ArticlesFilters';
import { useArticleFilters } from '../../lib/hooks/useArticleFilters';

interface FiltersContainerProps {
    className?: string;
}

export const FiltersContainer = memo((props: FiltersContainerProps) => {
    const { className } = props;

    const {
        onChangeSort,
        onChangeType,
        sort,
        type,
        onChangeSearch,
        search,
        onChangeOrder,
        order,
    } = useArticleFilters();

    return (
        <ArticlesFilters
            onChangeType={onChangeType}
            onChangeSort={onChangeSort}
            sort={sort}
            type={type}
            onChangeSearch={onChangeSearch}
            search={search}
            onChangeOrder={onChangeOrder}
            order={order}
            className={className}
        />
    );
});
