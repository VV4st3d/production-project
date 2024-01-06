import React, {memo, useCallback, useState} from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import cls from './Navbar.module.scss'
import {useTranslation} from "react-i18next";
import {Button, ButtonTheme} from "shared/ui/Button/Button";
import {LoginModal} from "features/authByUsername";
import {useSelector} from "react-redux";
import {getUserAuthData} from "entities/User";
import {Text, TextTheme} from "shared/ui/Text/Text";
import {AppLink, AppLinkTheme} from "shared/ui/AppLink/AppLink";
import {RoutePath} from "shared/config/routerConfig/routerConfig";
import {HStack} from "shared/ui/Stack";
import {NotificationButton} from "features/notificationButton";
import {AvatarDropdown} from "features/avatarDropdown";
import {Drawer} from "shared/ui/Drawer/Drawer";
import {NotificationList} from "entities/Notification";

interface NavbarProps {
    className?: string,
}

export const Navbar = memo(({className}: NavbarProps) => {
        const {t} = useTranslation()
        const [isAuthModal, setIsAuthModal] = useState(false)
        const authData = useSelector(getUserAuthData)


        const onCloseModal = useCallback(() => {
            setIsAuthModal(false)
        }, [])

        const onShowModal = useCallback(() => {
            setIsAuthModal(true)
        }, [])

    const [isOpen, setIsOpen] = useState(false)

    const onOpenDrawer = useCallback(()=>{
        setIsOpen(true)
    }, [])

    const onCloseDrawer = useCallback(()=>{
        setIsOpen(false)
    }, [])


        if (authData) {
            return (
                <aside className={classNames(cls.Navbar, {}, [className])}>
                    <Text theme={TextTheme.INVERTED} className={cls.appName} title={t('Social Media App')}/>
                    <AppLink to={RoutePath.article_create} theme={AppLinkTheme.SECONDARY} className={cls.createLink}>
                        {t('Создать статью')}
                    </AppLink>
                    <HStack gap={'16'} className={cls.actions}>
                        <button onClick={onOpenDrawer}>123</button>
                        <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
                            <NotificationList/>
                        </Drawer>
                        <NotificationButton/>
                        <AvatarDropdown/>
                    </HStack>
                    <LoginModal onClose={onCloseModal} isOpen={isAuthModal}/>
                </aside>
            )
        }

        return (
            <aside className={classNames(cls.Navbar, {}, [className])}>
                <Button
                    theme={ButtonTheme.CLEAR_INVERTED}
                    className={cls.links}
                    onClick={onShowModal}
                >
                    {t('Войти')}
                </Button>
                {isAuthModal && <LoginModal onClose={onCloseModal} isOpen={isAuthModal}/>}
            </aside>
        );
    }
)

