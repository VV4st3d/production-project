import React, {FC, ReactNode, useMemo, useState} from 'react';
import {ThemeContext} from "../../../../shared/lib/context/ThemeContext";
import {Themes} from "@/shared/const/theme";
import {LOCAL_STORAGE_THEME_KEY} from "@/shared/const/localstorage";


const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Themes || Themes.LIGHT

interface ThemeProviderProps {
    initialTheme?:Themes;
    children?: ReactNode
}

const ThemeProvider = (props:ThemeProviderProps) => {
    const {initialTheme, children} = props
    const [theme, setTheme] = useState<Themes>(initialTheme || defaultTheme)

    const defaultProps = useMemo(()=>({
        theme,
        setTheme: setTheme
    }), [theme])

    return (
        <ThemeContext.Provider value={defaultProps}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
