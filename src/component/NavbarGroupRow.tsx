import { ReactSVG } from "react-svg"
import icGroup from "@/assets/ic_group.svg"
import icAdd from "@/assets/ic_add.svg"
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
            <p className="home__text">{groupName}</p>
            <ReactSVG
                src={icOptions}
                content="Group options"
                beforeInjection={svg => svg.classList.add("navbar__icon-clickable navbar__icon--options-large")}
                onClick={openGroupOptions}
            />
            <ReactSVG
                src={icAdd}
                content="Add shopping list to group"
                beforeInjection={svg => svg.classList.add("navbar__icon-clickable navbar__icon--plus-large")}
                onClick={onAddList}
            />
        </span>
    )
}

export default NavbarGroupRow