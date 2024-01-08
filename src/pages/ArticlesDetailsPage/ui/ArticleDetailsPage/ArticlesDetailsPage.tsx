import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './ArticlesDetailsPage.module.scss'
import {useTranslation} from "react-i18next";
import {memo} from "react";
import {ArticleDetails} from "@/entities/Article";
import {useParams} from "react-router-dom";
import {DynamicModuleLoader, ReducerList} from "@/shared/lib/components/DinamicModuleLoader/DynamicModuleLoader";
import {Page} from "@/widgets/Page/Page";
import {articleDetailsPageReducer} from "../../model/slices/index";
import {ArticleDetailsPageHeader} from "../ArticleDetailsPageHeader/ArticleDetailsPageHeader";
import {VStack} from "@/shared/ui/Stack";
import {ArticleRecommendationsList} from "@/features/articleRecommendationsList";
import {ArticleDetailsComments} from "@/pages/ArticlesDetailsPage/ui/ArticleDetailsComments/ArticleDetailsComments";

interface ArticlesDetailsPageProps {
    className?: string,

}
const reducers: ReducerList = {
    articleDetailsPage: articleDetailsPageReducer
}

const ArticlesDetailsPage = ({className}: ArticlesDetailsPageProps) => {
    const {t} = useTranslation('article')
    const {id} = useParams<{ id: string }>()

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterAmount>
            <Page className={classNames(cls.ArticlesDetailsPage, {}, [className])}>
                <VStack gap={'16'} max>
                    <ArticleDetailsPageHeader/>
                    <ArticleDetails id={id}/>
                    <ArticleRecommendationsList/>
                    <ArticleDetailsComments id={id}/>
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesDetailsPage)
