import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Tabs.module.scss';
import { memo, ReactNode, useCallback } from 'react';
import { Card } from '../Card';
import { Flex, FlexDirection } from '../Stack/Flex/Flex';

export interface TabItem {
    value: string;
    content: ReactNode;
}
interface TabsProps {
    className?: string;
    tabs: TabItem[];
    value: string;
    onTabClick: (tab: TabItem) => void;
    direction?: FlexDirection;
}
export const Tabs = memo((props: TabsProps) => {
    const { className, onTabClick, tabs, value, direction = 'row' } = props;

    const clickHandle = useCallback((tab: TabItem) => {
        return () => {
            onTabClick(tab);
        };
    }, []);

    return (
        <Flex
            direction={direction}
            gap={'8'}
            className={classNames(cls.Tabs, {}, [className])}
            align={'start'}
        >
            {tabs.map((tab) => {
                const isSelected = tab.value === value;
                return (
                    <Card
                        variant={isSelected ? 'light' : 'normal'}
                        className={classNames(
                            cls.tab,
                            { [cls.selected]: isSelected },
                            [],
                        )}
                        key={tab.value}
                        onClick={clickHandle(tab)}
                        border={'round'}
                    >
                        {tab.content}
                    </Card>
                );
            })}
        </Flex>
    );
});
