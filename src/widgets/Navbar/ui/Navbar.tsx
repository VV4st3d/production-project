import React from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import cls from './Navbar.module.scss'
import {AppLink, AppLinkTheme} from "shared/ui/AppLink/AppLink";
import {ThemeSwitcher} from "shared/ui/ThemeSwitcher";

interface NavbarProps {
    className?: string,

}

export const Navbar = ({className}: NavbarProps) => {
    // const arrayTheme:AppLinkTheme[] =
    //     [AppLinkTheme.RED, AppLinkTheme.PRIMARY, AppLinkTheme.SECONDARY]
    // const [appTheme, setAppTheme] = useState<AppLinkTheme>(AppLinkTheme.RED)
    // function getRandomInt(max: number) {
    //     return Math.floor(Math.random() * max);
    // }
    // function switcher(){
    //     let randomTheme = arrayTheme[getRandomInt(3)]
    //     while (randomTheme === appTheme){
    //         console.log('repeat')
    //         randomTheme = arrayTheme[getRandomInt(3)]
    //     }
    //     setAppTheme(randomTheme)
    // }
    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
            <div className={cls.links}>/
                {/*<button onClick={switcher}>*/}
                {/*    switch link theme*/}
                {/*</button>*/}
            </div>
        </div>
    );
};


