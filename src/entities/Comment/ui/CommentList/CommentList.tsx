import {classNames} from "@/shared/lib/classNames/classNames";
import {useTranslation} from "react-i18next";
import React, {memo} from 'react'
import {Comment} from "@/entities/Comment";
import {CommentCard} from "../CommentCard/CommentCard";
import {Text} from "@/shared/ui/Text/Text";
import {VStack} from "@/shared/ui/Stack";


interface CommentListProps {
    className?: string,
    comments?: Comment[];
    isLoading?: boolean
}

export const CommentList = memo((props: CommentListProps) => {
    const {className, comments, isLoading} = props
    const {t} = useTranslation()
    if (isLoading){
        return(
            <VStack gap={'16'} max className={classNames('', {}, [className])}>
                <CommentCard isLoading={true}/>
                <CommentCard isLoading={true}/>
                <CommentCard isLoading={true}/>
            </VStack>
        )
    }
    return (
        <VStack gap={'16'} max className={classNames('', {}, [className])}>
            {comments?.length ?
                comments.map(comment =>
                    <CommentCard key={comment.id} isLoading={isLoading} comment={comment}/>) :
                <Text text={t('Комментарии отсутствуют')}/>}
        </VStack>
    );
});
