import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './ForbiddenPage.module.scss'
import {useTranslation} from "react-i18next";
import {memo} from 'react'

interface ForbiddenPageProps {
    className?: string,

}

const ForbiddenPage = memo((props: ForbiddenPageProps) => {
    const {t} = useTranslation()
    const {className} = props

    return (
        <div data-testid={"ForbiddenPage"} className={classNames(cls.ForbiddenPage, {}, [className])}>
            {t('У вас нет доступа к этой странице')}
        </div>
    );
});

export default ForbiddenPage
