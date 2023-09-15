import React, {FC, useMemo, useState} from 'react';
import {LOCAL_STORAGE_THEME_KEY, ThemeContext, Themes} from "../lib/ThemeContext";


const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Themes || Themes.LIGHT

interface ThemeProviderProps {
    initialTheme?:Themes;
}

const ThemeProvider:FC<ThemeProviderProps> = (props) => {
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
