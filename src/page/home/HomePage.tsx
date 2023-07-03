import { Outlet } from "react-router-dom"
import NavBar from "./NavBar"
import "./styles/HomeStyles.css"

const HomePage = () => {
    return (
        <div className="home">
            <NavBar />
            <Outlet />
        </div>
    )
}

export default HomePage