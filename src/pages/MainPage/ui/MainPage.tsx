import React, {useState} from 'react';
import {useTranslation} from "react-i18next";
import cls from './MainPage.module.scss'
import {classNames} from "@/shared/lib/classNames/classNames";
import {Button} from "@/shared/ui/Button";
import {Page} from "@/widgets/Page";

const MainPage = () => {
    const {t} = useTranslation()
    const [size, setSize] = useState(false)
    return (
        <Page data-testid={"MainPage"} className={classNames('', {}, [])}>
            {t('Главная страница')}
            <div className={classNames('', {[cls.change]:size}, [])}>
                <div className={classNames(cls.backside, {}, [])}>

                </div>
            </div>
            <Button onClick={()=>setSize(prev=>!prev)}>changeSize</Button>
        </Page>
    );
};

export default MainPage;
