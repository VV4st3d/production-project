import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './ArticleViewSelector.module.scss'
import {memo} from 'react'
import ListIcon from "@/shared/assets/icons/list.svg"
import TiledIcon from "@/shared/assets/icons/tiled.svg"
import {Button, ButtonTheme} from "@/shared/ui/Button";
import {Icon} from "@/shared/ui/Icon";
import {ArticleView} from "../../model/consts/consts";

interface ArticleViewSelectorProps {
    className?: string,
    view: ArticleView,
    onViewClick?: (view: ArticleView) => void
}

const viewTypes = [
    {
        view: ArticleView.SMALL,
        icon: TiledIcon
    },
    {
        view: ArticleView.BIG,
        icon: ListIcon
    }
]

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
    const {className, onViewClick, view} = props

    const onClick = (newView: ArticleView) => () => {
        onViewClick?.(newView)
    }

    return (
        <div className={classNames(cls.ArticleViewSelector, {}, [className])}>
            {viewTypes.map(viewType => (
                <Button
                    key={viewType.view}
                    theme={ButtonTheme.CLEAR}
                    onClick={onClick(viewType.view)}
                >
                    <Icon
                        className={classNames('', {[cls.notSelected]: viewType.view !== view}, [])}
                        Svg={viewType.icon}
                    />
                </Button>
            ))}
        </div>
    );
});
