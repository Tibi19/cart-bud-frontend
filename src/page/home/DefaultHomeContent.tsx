import ThemeController from "@/component/theme/ThemeController"
import "./styles/DefaultHomeStyles.css"

const DefaultHomeContent = () => {
    return (
        <>
            <ThemeController />
            <h1 className="default-home__title">CartBud</h1>
        </>
    )
}

export default DefaultHomeContent