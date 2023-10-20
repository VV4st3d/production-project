import {LOCAL_STORAGE_THEME_KEY, ThemeContext, Themes} from "./ThemeContext";
import {useContext} from "react";

interface useThemeResult {
    toggleTheme:()=>void,
    theme: Themes
}

export function useTheme(): useThemeResult{
    const {theme, setTheme} = useContext(ThemeContext)
    const toggleTheme = () => {
        let newTheme:Themes;
        switch (theme) {
            case Themes.DARK:
                newTheme = Themes.LIGHT
                break;
            case Themes.LIGHT:
                newTheme = Themes.ORANGE
                break;
            case Themes.ORANGE:
                newTheme = Themes.DARK
                break;
            default:
                newTheme = Themes.LIGHT
        }
        setTheme?.(newTheme)
        document.body.className = newTheme
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme)
    }
    return {
        theme : theme || Themes.LIGHT,
        toggleTheme
    }
}
