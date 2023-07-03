import { useParams } from "react-router-dom"
import "./styles/HomeStyles.css"
import "./styles/HomeContentStyles.css"

const HomeContent = () => {
    const { parent, id } = useParams()

    return (
        <>
            <p>Parent is {parent}</p>
            <p>Id is {id}</p>
        </>
    )
}

export default HomeContent