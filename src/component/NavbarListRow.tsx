import { ReactSVG } from "react-svg"
import icList from "@/assets/ic_list.svg"
import icOptions from "@/assets/ic_options.svg"

interface Props {
    listName: string
}

const NavbarListRow = ({ listName }: Props) => {
    const openListOptions = () => {}

    return (
        <span className="navbar__list-row">
            <ReactSVG
                src={icList}
                content="Shopping list"
                beforeInjection={svg => svg.classList.add("navbar__icon-leading")}
            />
            <span className="home__text">{listName}</span>
            <ReactSVG
                src={icOptions}
                className="navbar__icon-container--options"
                content="List options"
                beforeInjection={svg => {
                    svg.classList.add("navbar__icon-clickable")
                    svg.classList.add("navbar__icon--options")
                }}
                onClick={openListOptions}
            />
        </span>
    )
}

export default NavbarListRow