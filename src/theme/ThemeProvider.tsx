import React, {FC, useMemo, useState} from 'react';
import {LOCAL_STORAGE_THEME_KEY, ThemeContext, Themes} from "./ThemeContext";


const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Themes || Themes.LIGHT

const ThemeProvider:FC = ({children}) => {
    const [theme, setTheme] = useState<Themes>(defaultTheme)

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