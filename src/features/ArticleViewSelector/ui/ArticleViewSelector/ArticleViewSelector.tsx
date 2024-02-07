import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleViewSelector.module.scss';
import { memo } from 'react';
import ListIconDeprecated from '@/shared/assets/icons/list.svg';
import TiledIconDeprecated from '@/shared/assets/icons/tiled.svg';
import TiledIcon from '@/shared/assets/icons/TiledIcon.svg';
import ListIcon from '@/shared/assets/icons/ListIcon.svg';
import {
    Button as ButtonDeprecated,
    ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import { ArticleView } from '@/entities/Article';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import { Icon } from "@/shared/ui/redesigned/Icon";
import { Card } from "@/shared/ui/deprecated/Card";

interface ArticleViewSelectorProps {
    className?: string;
    view: ArticleView;
    onViewClick?: (view: ArticleView) => void;
}

const viewTypes = [
    {
        view: ArticleView.SMALL,
        icon: toggleFeatures({
            name: 'isAppRedesigned',
            on: () => TiledIcon,
            off: () => TiledIconDeprecated,
        }),
    },
    {
        view: ArticleView.BIG,
        icon: toggleFeatures({
            name: 'isAppRedesigned',
            on: () => ListIcon,
            off: () => ListIconDeprecated,
        }),
    },
];

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
    const { className, onViewClick, view } = props;

    const onClick = (newView: ArticleView) => () => {
        onViewClick?.(newView);
    };

    return (
        <ToggleFeatures
            feature={'isAppRedesigned'}
            on={
                <Card
                    className={classNames(cls.ArticleViewSelectorRedesigned, {}, [
                        className,
                    ])}
                >
                    {viewTypes.map((viewType) => (
                        <Icon
                            clickable
                            onClick={onClick(viewType.view)}
                            className={classNames(
                                '',
                                {
                                    [cls.notSelected]: viewType.view !== view,
                                },
                                [],
                            )}
                            Svg={viewType.icon}
                        />
                    ))}
                </Card>
            }
            off={
                <div
                    className={classNames(cls.ArticleViewSelector, {}, [
                        className,
                    ])}
                >
                    {viewTypes.map((viewType) => (
                        <ButtonDeprecated
                            key={viewType.view}
                            theme={ButtonTheme.CLEAR}
                            onClick={onClick(viewType.view)}
                        >
                            <IconDeprecated
                                width={24}
                                height={24}
                                className={classNames(
                                    '',
                                    {
                                        [cls.notSelected]:
                                            viewType.view !== view,
                                    },
                                    [],
                                )}
                                Svg={viewType.icon}
                            />
                        </ButtonDeprecated>
                    ))}
                </div>
            }
        />
    );
});
