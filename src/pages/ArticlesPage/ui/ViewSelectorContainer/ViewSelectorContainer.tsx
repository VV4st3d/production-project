import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ViewSelectorContainer.module.scss';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { getArticlePageView } from '@/pages/ArticlesPage/model/selectors/getArticlePageSelectors';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ArticleView } from '@/entities/Article';
import { articlePageSliceActions } from '@/pages/ArticlesPage/model/slices/articlesPageSlice';
import { ArticleViewSelector } from '@/features/ArticleViewSelector';

interface ViewSelectorContainerProps {
    className?: string;
}

export const ViewSelectorContainer = memo(
    (props: ViewSelectorContainerProps) => {
        const { t } = useTranslation();
        const { className } = props;

        const view = useSelector(getArticlePageView);
        const dispatch = useAppDispatch();

        const onChangeView = useCallback((view: ArticleView) => {
            dispatch(articlePageSliceActions.setView(view));
        }, []);

        return (
            <ArticleViewSelector
                view={view}
                className={className}
                onViewClick={onChangeView}
            />
        );
    },
);
