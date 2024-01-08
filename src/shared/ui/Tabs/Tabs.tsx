import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './Tabs.module.scss'
import {memo, ReactNode, useCallback} from 'react'
import {Card, CardTheme} from "@/shared/ui/Card/Card";


export interface TabItem {
    value: string,
    content: ReactNode
}
interface TabsProps {
    className?: string,
    tabs: TabItem[],
    value: string,
    onTabClick: (tab:TabItem) => void
}

export const Tabs = memo((props: TabsProps) => {
    const {className, onTabClick, tabs, value} = props

    const clickHandle = useCallback((tab: TabItem)=>{
        return ()=>{
            onTabClick(tab)
        }
    }, [])

    return (
        <div className={classNames(cls.Tabs, {}, [className])}>
            {tabs.map(tab=>(
                <Card
                    theme={tab.value === value ? CardTheme.NORMAL : CardTheme.OUTLINED}
                    className={cls.tab}
                    key={tab.value}
                    onClick={clickHandle(tab)}
                >
                    {tab.content}
                </Card>
            ))}
        </div>
    );
});
