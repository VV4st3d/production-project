import {useEffect, useState} from "react";
import {Button} from "@/shared/ui/Button/Button";
import {useTranslation} from "react-i18next";


//компонент для тестирования ErrorBoundary
export const BugButton = () => {
    const [error, setError] = useState<Boolean>(false)
    const onThrow = () => setError(true)
    const {t} = useTranslation()
    useEffect(()=>{
        if (error)
            throw new Error()
    },[error])
    return (
        <Button onClick={onThrow}>
            {t('throw Error')}
        </Button>
    );
};
