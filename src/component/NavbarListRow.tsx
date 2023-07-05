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
            <p className="home__text">{listName}</p>
            <ReactSVG
                src={icOptions}
                content="List options"
                beforeInjection={svg => svg.classList.add("navbar__icon-clickable navbar__icon--options-small")}
                onClick={openListOptions}
            />
        </span>
    )
}

export default NavbarListRow