import { ReactSVG } from "react-svg"
import icGroup from "@/assets/ic_group.svg"
import icPlus from "@/assets/ic_plus.svg"
import icOptions from "@/assets/ic_options.svg"

interface Props {
    groupName: string,
    onAddList: () => void
}

const NavbarGroupRow = ({ groupName, onAddList }: Props ) => {
    const openGroupOptions = () => {}

    return (
        <span className="navbar__group-row">
            <ReactSVG
                src={icGroup}
                content="Group"
                beforeInjection={svg => svg.classList.add("navbar__icon-leading")}
            />
            <span className="home__text">{groupName}</span>
            <ReactSVG
                src={icOptions}
                className="navbar__icon-container--options"
                content="Group options"
                beforeInjection={svg => {
                    svg.classList.add("navbar__icon-clickable")
                    svg.classList.add("navbar__icon--options")
                }}
                onClick={openGroupOptions}
            />
            <ReactSVG
                src={icPlus}
                content="Add shopping list to group"
                beforeInjection={svg => {
                    svg.classList.add("navbar__icon-clickable")
                    svg.classList.add("navbar__icon--plus-large")
                }}
                onClick={onAddList}
            />
        </span>
    )
}

export default NavbarGroupRow