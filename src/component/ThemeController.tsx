import icBulb from "@/assets/ic_bulb.svg"
import icDark from "@/assets/ic_dark.svg"
import { useStore } from "@/hook/useStore"
import { ReactSVG } from "react-svg"
import "./ThemeControllerStyles.css"
import { KEY_THEME } from "@/local/keys"
import { Theme, themeAsClass } from "@/theme/theme"

const ThemeController = () => {
    const [theme, setTheme] = useStore(KEY_THEME, Theme.LIGHT)

    const switchTheme = () => {
        const newTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT 
        setTheme(newTheme)
        document.body.classList.value = themeAsClass(newTheme)
    }

    return (
        <ReactSVG
            src={theme === Theme.LIGHT ? icBulb : icDark}
            content="Switch between light and dark modes"
            beforeInjection={(svg) => {
                svg.classList.add("theme__ic-mode")
            }}
            onClick={switchTheme}
        />
    )
}

export default ThemeController