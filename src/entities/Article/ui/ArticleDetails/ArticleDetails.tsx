import {classNames} from "shared/lib/classNames/classNames";
import cls from './ArticleDetails.module.scss'
import {useTranslation} from "react-i18next";
import {DynamicModuleLoader, ReducerList} from "shared/lib/components/DinamicModuleLoader/DynamicModuleLoader";
import {articleDetailsReducer} from "../../model/slice/articleDetailsSlice";
import {memo, useCallback, useEffect} from "react";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {fetchArticleById} from "../../model/services/fetchArticleById/fetchArticleById";
import {useSelector} from "react-redux";
import {
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsIsLoading
} from "../../model/selectors/articleDetails";
import {Text, TextAlign, TextSize} from "shared/ui/Text/Text";
import {Skeleton} from "shared/ui/Skeleton/Skeleton";
import {Avatar} from "shared/ui/Avatar/Avatar";
import EyeIcon from 'shared/assets/icons/eye.svg';
import CalendarIcon from 'shared/assets/icons/calendar.svg'
import {Icon} from "shared/ui/Icon/Icon";
import {ArticleBlock, ArticleBlockType} from "../../model/types/Article";
import {ArticleCodeBlockComponent} from "entities/Article/ui/ArticleCodeBlockComponent/ArticleCodeBlockComponent";
import {ArticleTextBlockComponent} from "entities/Article/ui/ArticleTextBlockComponent/ArticleTextBlockComponent";
import {ArticleImageBlockComponent} from "entities/Article/ui/ArticleImageBlockComponent/ArticleImageBlockComponent";

interface ArticleDetailsProps {
    className?: string,
    id: string
}

const reducers: ReducerList ={
    articleDetails: articleDetailsReducer
}

export const ArticleDetails = memo(({className, id}: ArticleDetailsProps) => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch()
    const isLoading = useSelector(getArticleDetailsIsLoading)
    const article = useSelector(getArticleDetailsData)
    const error = useSelector(getArticleDetailsError)

    const renderBlock = useCallback((block: ArticleBlock)=>{
        switch (block.type) {
            case ArticleBlockType.TEXT:
                return <ArticleTextBlockComponent key={block.id} className={cls.block} block={block}/>
            case ArticleBlockType.IMAGE:
                return <ArticleImageBlockComponent key={block.id} block={block} className={cls.block}/>
            case ArticleBlockType.CODE:
                return <ArticleCodeBlockComponent key={block.id} block={block} className={cls.block}/>
            default:
                return null
        }
    }, [])

    useEffect(() => {
        dispatch(fetchArticleById(id))
    }, [dispatch, id]);

    let content;

    if(isLoading){
        content =(
            <>
                <Skeleton className={cls.avatar} width={200} height={200} border={'50%'}/>
                <Skeleton className={cls.title} width={300} height={32}/>
                <Skeleton className={cls.skeleton} width={600} height={24}/>
                <Skeleton className={cls.skeleton} width={'100%'} height={200}/>
                <Skeleton className={cls.skeleton} width={'100%'} height={200}/>
            </>
        )
    }else if(error){
        content = (
            <Text align={TextAlign.CENTER} title={t('Произошла ошибка при загрузке статьи')}/>
        )
    }else{
        content =(
            <>
                <div className={cls.avatarWrapper}>
                    <Avatar size={200} src={article?.img} className={cls.avatar}/>
                </div>
                <Text size={TextSize.L} className={cls.title} title={article?.title} text={article?.subtitle}/>
                <div className={cls.articleInfo}>
                    <Icon className={cls.icon} Svg={EyeIcon}/>
                    <Text text={String(article?.views)}/>
                </div>
                <div className={cls.articleInfo}>
                    <Icon className={cls.icon} Svg={CalendarIcon}/>
                    <Text text={article?.createdAt}/>
                </div>
                {article?.blocks.map(renderBlock)}
            </>
        )
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterAmount>
            <div className={classNames(cls.ArticleDetails, {}, [className])}>
                {content}
            </div>
        </DynamicModuleLoader>
    );
});
