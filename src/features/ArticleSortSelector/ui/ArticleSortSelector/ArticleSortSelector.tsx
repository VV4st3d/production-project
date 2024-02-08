import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleSortSelector.module.scss';
import { useTranslation } from 'react-i18next';
import { memo, useMemo } from 'react';
import { Select, SelectOption } from '@/shared/ui/deprecated/Select';
import { sortOrder } from '@/shared/types/sort';
import { ArticleSortField } from '@/entities/Article';
import { ToggleFeatures } from '@/shared/lib/features';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

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

    return (
        <ToggleFeatures
            feature={'isAppRedesigned'}
            on={
                <div
                    className={classNames(
                        cls.ArticleSortSelectorRedesigned,
                        {},
                        [className],
                    )}
                >
                    <VStack gap={'8'}>
                        <Text text={t('Сортировать по:')} />
                        <ListBox
                            value={sort}
                            onChange={onChangeSort}
                            items={sortFieldOptions}
                        />
                        <ListBox
                            value={order}
                            onChange={onChangeOrder}
                            items={orderOptions}
                        />
                    </VStack>
                </div>
            }
            off={
                <div
                    className={classNames(cls.ArticleSortSelector, {}, [
                        className,
                    ])}
                >
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
            }
        />
    );
});
