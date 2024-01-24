import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleSortSelector.module.scss';
import { useTranslation } from 'react-i18next';
import { memo, useMemo } from 'react';
import { Select, SelectOption } from '@/shared/ui/Select';
import { sortOrder } from '@/shared/types/sort';
import { ArticleSortField } from '@/entities/Article';

interface ArticleSortSelectorProps {
    className?: string;
    sort: ArticleSortField;
    order: sortOrder;
    onChangeOrder: (newOrder: sortOrder) => void;
    onChangeSort: (newOrder: ArticleSortField) => void;
}

export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
    const { t } = useTranslation();
    const { className, sort, onChangeSort, onChangeOrder, order } = props;

    const orderOptions = useMemo<SelectOption<sortOrder>[]>(
        () => [
            { value: 'asc', content: t('возрастанию') },
            { value: 'desc', content: t('убыванию') },
        ],
        [t],
    );

    const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(
        () => [
            { value: ArticleSortField.CREATED, content: t('дате создания') },
            { value: ArticleSortField.TITLE, content: t('названию') },
            {
                value: ArticleSortField.VIEWS,
                content: t('количеству просмотров'),
            },
        ],
        [t],
    );

    // const changeSortHandler = useCallback((newSort: string)=>{
    //     onChangeSort(newSort as ArticleSortField)
    // }, [onChangeSort])
    // const ChangeOrderHandler = useCallback((newOrder: string)=>{
    //     onChangeOrder(newOrder as sortOrder)
    // }, [onChangeOrder])

    return (
        <div className={classNames(cls.ArticleSortSelector, {}, [className])}>
            <Select
                value={sort}
                onChange={onChangeSort}
                options={sortFieldOptions}
                label={t('Сортировать по')}
            />
            <Select
                value={order}
                onChange={onChangeOrder}
                options={orderOptions}
                label={t('по')}
                className={cls.order}
            />
        </div>
    );
});
