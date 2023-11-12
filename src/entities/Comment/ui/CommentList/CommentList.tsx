import {classNames} from "shared/lib/classNames/classNames";
import cls from './CommentList.module.scss'
import {useTranslation} from "react-i18next";
import React, {memo} from 'react'
import {Comment} from "entities/Comment";
import {CommentCard} from "../CommentCard/CommentCard";
import {Text} from "shared/ui/Text/Text";


interface CommentListProps {
    className?: string,
    comments?: Comment[];
    isLoading?: boolean
}

export const CommentList = memo((props: CommentListProps) => {
    const {className, comments, isLoading} = props
    const true1 = true
    const {t} = useTranslation()
    if (isLoading){
        return(
            <div className={classNames(cls.CommentList, {}, [className])}>
                <CommentCard className={cls.comment} isLoading={true}/>
                <CommentCard className={cls.comment} isLoading={true}/>
                <CommentCard className={cls.comment} isLoading={true}/>
            </div>
        )
    }
    return (
        <div className={classNames(cls.CommentList, {}, [className])}>
            {comments?.length ?
                comments.map(comment =>
                    <CommentCard key={comment.id} className={cls.comment} comment={comment}/>) :
                <Text text={t('Комментарии отсутствуют')}/>}
        </div>
    );
});
