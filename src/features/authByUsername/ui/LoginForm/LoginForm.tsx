import {classNames} from "shared/lib/classNames/classNames";
import cls from './LoginForm.module.scss'
import {useTranslation} from "react-i18next";
import {Button, ButtonTheme} from "shared/ui/Button/Button";
import {Input} from "shared/ui/Input/Input";
import {useSelector} from "react-redux";
import {memo, useCallback} from "react";
import {LoginActions} from "../../model/slice/LoginSlice";
import {getLoginState} from "../../model/selectors/getLoginState/getLoginState";
import {loginByUsername} from "../../model/services/loginByUsername/loginByUsername";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {Text, TextTheme} from "shared/ui/Text/Text";

interface LoginFormProps {
    className?: string,

}

export const LoginForm = memo(({className}: LoginFormProps) => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch()
    const {username, password, error, isLoading} = useSelector(getLoginState)

    const onChangeUsername = useCallback((value:string) =>{
        dispatch(LoginActions.setUsername(value))
    },[dispatch])

    const onChangePassword = useCallback((value:string) =>{
        dispatch(LoginActions.setPassword(value))
    },[dispatch])

    const onLoginClick = useCallback(() =>{
        dispatch(loginByUsername({username, password}))
    },[dispatch, username, password])

    return (
        <div className={classNames(cls.LoginForm, {}, [className])}>
            <Text title={t('Форма авторизации')}/>
            {error && <Text text={t('Вы ввели неверный логин или пароль')} theme={TextTheme.ERROR}></Text>}
            <Input
                autofocus
                placeholder={t('Введите username')}
                type="text"
                className={cls.input}
                onChange={onChangeUsername}
                value={username}
            />
            <Input
                placeholder={t('Введите пароль')}
                type="text"
                className={cls.input}
                onChange={onChangePassword}
                value={password}
            />
            <Button
                theme={ButtonTheme.OUTLINE}
                className={cls.loginBtn}
                onClick={onLoginClick}
                disabled={isLoading}
            >
                {t('Войти')}
            </Button>
        </div>
    );
});
