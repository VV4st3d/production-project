import {classNames} from "shared/lib/classNames/classNames";
import cls from './CommentList.module.scss'
import {useTranslation} from "react-i18next";
import React, {memo} from 'react'
import {Comment} from "features/Comment";
import {CommentCard} from "../CommentCard/CommentCard";
import {Text} from "shared/ui/Text/Text";


interface CommentListProps {
    className?: string,
    comments?: Comment[];
    isLoading?: boolean
}

export const CommentList = memo((props: CommentListProps) => {
    const {className, comments, isLoading} = props
    const {t} = useTranslation()
    return (
        <div className={classNames(cls.CommentList, {}, [className])}>
            {comments?.length ?
                comments.map(comment => <CommentCard className={cls.comment} comment={comment}/>) :
                <Text text={t('Комментарии отсутствуют')}/>}
        </div>
    );
});
