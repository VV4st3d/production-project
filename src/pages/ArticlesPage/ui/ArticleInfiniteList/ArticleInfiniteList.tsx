import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { getArticles } from '@/pages/ArticlesPage/model/slices/articlesPageSlice';
import {
    getArticlePageError,
    getArticlePageIsLoading,
    getArticlePageView,
} from '@/pages/ArticlesPage/model/selectors/getArticlePageSelectors';
import { ArticleList } from '@/entities/Article';
import { Text, TextTheme } from '@/shared/ui/deprecated/Text';

interface ArticleInfiniteListProps {
    className?: string;
}

export const ArticleInfiniteList = memo((props: ArticleInfiniteListProps) => {
    const { t } = useTranslation();
    const { className } = props;
    const articles = useSelector(getArticles.selectAll);
    const isLoading = useSelector(getArticlePageIsLoading);
    const view = useSelector(getArticlePageView);
    const error = useSelector(getArticlePageError);

    if (error) {
        return (
            <Text
                theme={TextTheme.ERROR}
                text={t('Произошла ошибка при загрузке статей')}
            />
        );
    }
    return (
        <ArticleList
            className={className}
            isLoading={isLoading}
            view={view}
            articles={articles}
        />
    );
});
