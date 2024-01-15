import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './ArticleList.module.scss'
import {useTranslation} from "react-i18next";
import {HTMLAttributeAnchorTarget, memo} from 'react'
import {Article} from "../../model/types/Article";
import {ArticleListItem} from "../ArticleListItem/ArticleListItem";
import {ArticleListItemSkeleton} from "../ArticleListItem/ArticleListItemSkeleton";
import {Text, TextSize} from "@/shared/ui/Text";
import {List, ListRowProps, WindowScroller} from "react-virtualized";
import {PAGE_ID} from "@/widgets/Page/ui/Page";
import {ArticleView} from "../../model/consts/consts";

interface ArticleListProps {
    className?: string,
    articles: Article[],
    isLoading?: boolean,
    view?: ArticleView,
    target?: HTMLAttributeAnchorTarget,
    virtualized?: boolean
}

const getSkeletons = (view: ArticleView) => {
    return new Array(view === ArticleView.SMALL ? 9 : 3).fill(null).map((item, index) => (
        <ArticleListItemSkeleton className={cls.card} key={index} view={view}/>
    ))
}

export const ArticleList = memo((props: ArticleListProps) => {
    const {t} = useTranslation()
    const {
        className,
        articles,
        view = ArticleView.SMALL,
        isLoading,
        target,
        virtualized = true
    } = props

    const isBig = view === ArticleView.BIG

    const itemsPerRow = isBig ? 1 : 3

    const rowCount = isBig ? articles.length : Math.ceil(articles.length / itemsPerRow)

    if (!isLoading && !articles.length) {
        return (
            <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
                <Text size={TextSize.L} title={t('Статьи не найдены')}/>
            </div>
        )
    }
    const rowRender = ({index, isScrolling, key, style}: ListRowProps) => {
        const items = []
        const fromIndex = index * itemsPerRow
        const toIndex = Math.min(fromIndex + itemsPerRow, articles.length)

        for (let i = fromIndex; i < toIndex; i++) {
            items.push(
                <ArticleListItem
                    className={cls.card}
                    article={articles[i]}
                    view={view}
                    target={target}
                    key={'str' + i}
                />)
        }
        return (
            <div
                key={key}
                className={cls.row}
                style={style}
            >
                {items}
            </div>
        );
    }


    return (
        <WindowScroller
            onScroll={() => console.log('123')}
            scrollElement={document.getElementById(PAGE_ID) as Element}
        >
            {({height, width, registerChild, onChildScroll, isScrolling, scrollTop}) => (
                // @ts-ignore
                <div ref={registerChild} className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
                    {virtualized ? (
                        <List
                            height={height ?? 700}
                            rowCount={rowCount}
                            rowHeight={isBig ? 700 : 330}
                            rowRenderer={rowRender}
                            width={width ? width - 80 : 700}
                            autoHeight
                            onScroll={onChildScroll}
                            isScrolling={isScrolling}
                            scrollTop={scrollTop}
                        />
                    ) : (
                        articles.map(item => (
                            <ArticleListItem article={item} view={view}
                                             target={target}
                                             key={item.id}
                                             className={cls.card}/>
                        ))
                    )}
                    {isLoading && getSkeletons(view)}
                </div>
            )}
        </WindowScroller>

    );
});
