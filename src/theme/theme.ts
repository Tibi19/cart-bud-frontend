import { KEY_THEME } from "@/local/keys"

export enum Theme {
    LIGHT,
    DARK
}

export const themeAsClass = (theme: Theme) => 
    theme === Theme.LIGHT ? "theme__mode--light" : "theme__mode--dark"

export const getTheme = (): Theme => {
    const themeJson = localStorage.getItem(KEY_THEME)
    
    if (themeJson != null) {
        return JSON.parse(themeJson)
    }

    return Theme.LIGHT
}