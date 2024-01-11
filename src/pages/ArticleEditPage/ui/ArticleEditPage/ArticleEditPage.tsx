import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './ArticleEditPage.module.scss'
import {useTranslation} from "react-i18next";
import {memo} from 'react'
import {Page} from "@/widgets/Page";
import {useParams} from "react-router-dom";

interface ArticleEditPageProps {
    className?: string,

}

const ArticleEditPage = memo((props: ArticleEditPageProps) => {
    const {t} = useTranslation()
    const {className} = props
    const {id} = useParams<{id: string}>()
    const isEdit = Boolean(id)

    return (
        <Page className={classNames(cls.ArticleEditPage, {}, [className])}>
            {isEdit ? 'Редактирование статьи с id = '+id : 'Создание новой статьи'}
        </Page>
    );
});

export default ArticleEditPage
