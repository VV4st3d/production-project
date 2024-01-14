import {createContext} from "react";
import {Themes} from "../../const/theme";

export interface ThemeContextProps {
    theme? : Themes,
    setTheme?: (theme: Themes)=>void
}

export const ThemeContext = createContext<ThemeContextProps>({})

