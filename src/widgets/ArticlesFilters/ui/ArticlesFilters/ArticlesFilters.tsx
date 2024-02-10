import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticlesFilters.module.scss';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Card } from '@/shared/ui/redesigned/Card';
import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { ArticleSortField, ArticleType } from '@/entities/Article';
import { sortOrder } from '@/shared/types/sort';
import { Input } from '@/shared/ui/redesigned/Input';
import { Icon } from '@/shared/ui/redesigned/Icon';
import SearchIcon from '@/shared/assets/icons/searchIcon.svg';

interface ArticlesFiltersProps {
    className?: string;
    sort: ArticleSortField;
    order: sortOrder;
    type: ArticleType;
    search: string;
    onChangeOrder: (newOrder: sortOrder) => void;
    onChangeSearch: (value: string) => void;
    onChangeSort: (newOrder: ArticleSortField) => void;
    onChangeType: (type: ArticleType) => void;
}

export const ArticlesFilters = memo((props: ArticlesFiltersProps) => {
    const { t } = useTranslation();
    const {
        className,
        type,
        search,
        onChangeType,
        onChangeSort,
        onChangeOrder,
        onChangeSearch,
        order,
        sort,
    } = props;

    return (
        <Card
            padding={'24'}
            className={classNames(cls.ArticlesFilters, {}, [className])}
        >
            <VStack gap={'32'}>
                <Input
                    size={'s'}
                    addonLeft={<Icon Svg={SearchIcon} />}
                    value={search}
                    onChange={onChangeSearch}
                    placeholder={t('Поиск')}
                />
                <ArticleTypeTabs
                    className={cls.tabs}
                    value={type}
                    onChangeType={onChangeType}
                />
                <ArticleSortSelector
                    sort={sort}
                    order={order}
                    onChangeOrder={onChangeOrder}
                    onChangeSort={onChangeSort}
                />
            </VStack>
        </Card>
    );
});
