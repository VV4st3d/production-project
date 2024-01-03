import {classNames} from "shared/lib/classNames/classNames";
import {useTranslation} from "react-i18next";
import {memo, useCallback, useMemo} from 'react'
import {TabItem, Tabs} from "shared/ui/Tabs/Tabs";
import {ArticleType} from "../../model/consts/consts";

interface ArticleTypeTabsProps {
    className?: string,
    value: ArticleType,
    onChangeType: (type: ArticleType) => void
}

export const ArticleTypeTabs = memo((props: ArticleTypeTabsProps) => {
    const {t} = useTranslation()
    const {className, value, onChangeType} = props

    const typeTabs = useMemo<TabItem[]>(() => [
        {
            value: ArticleType.ALL,
            content: t('Все статьи')
        },
        {
            value: ArticleType.IT,
            content: t('Айти')
        },
        {
            value: ArticleType.SCIENCE,
            content: t('Наука')
        },
        {
            value: ArticleType.ECONOMICS,
            content: t('Экономика')
        }
    ], [])

    const onTabClick = useCallback((tab: TabItem) => {
        onChangeType(tab.value as ArticleType)
    },[])

    return (
        <Tabs onTabClick={onTabClick} value={value} tabs={typeTabs} className={classNames('', {}, [className])}/>
    );
});
