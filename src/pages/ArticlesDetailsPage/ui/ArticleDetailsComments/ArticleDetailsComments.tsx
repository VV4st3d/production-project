import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, Suspense, useCallback, useEffect } from 'react';
import { Text as TextDeprecated, TextSize } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import cls from '../../ui/ArticleDetailsPage/ArticlesDetailsPage.module.scss';
import { AddCommentForm } from '@/features/addNewComment';
import { CommentList } from '@/entities/Comment';
import { useSelector } from 'react-redux';
import { getArticleComments } from '../../model/slices/articleDetailsCommentSlice';
import { getArticleCommentsIsLoading } from '../../model/selectors/comments';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useTranslation } from 'react-i18next';
import { fetchCommentsByArticleId } from '@/pages/ArticlesDetailsPage/model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Loader } from '@/shared/ui/deprecated/Loader';
import { ToggleFeatures } from '@/shared/lib/features';

interface ArticleDetailsCommentsProps {
    className?: string;
    id?: string;
}

export const ArticleDetailsComments = memo(
    (props: ArticleDetailsCommentsProps) => {
        const { t } = useTranslation();
        const { className, id } = props;
        const dispatch = useAppDispatch();
        const comments = useSelector(getArticleComments.selectAll);
        const commentsIsLoading = useSelector(getArticleCommentsIsLoading);

        const onSendComment = useCallback(
            (text: string) => {
                dispatch(addCommentForArticle(text));
            },
            [dispatch],
        );

        useEffect(() => {
            dispatch(fetchCommentsByArticleId(id));
        }, []);

        return (
            <VStack
                gap={'16'}
                max
                className={classNames('', {}, [className])}
            >
                <ToggleFeatures
                    feature={'isAppRedesigned'}
                    on={
                        <Text
                            size={'l'}
                            title={t('Комментарии')}
                        />
                    }
                    off={
                        <TextDeprecated
                            size={TextSize.L}
                            className={cls.commentTitle}
                            title={t('Комментарии')}
                        />
                    }
                />
                <Suspense fallback={<Loader />}>
                    <AddCommentForm onSendComment={onSendComment} />
                </Suspense>
                <CommentList
                    isLoading={commentsIsLoading}
                    comments={comments}
                />
            </VStack>
        );
    },
);
