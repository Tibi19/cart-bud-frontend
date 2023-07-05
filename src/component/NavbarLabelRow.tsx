import { ReactSVG } from 'react-svg'
import icPlus from "@/assets/ic_plus.svg"

interface Props {
    title: string,
    onAdd: () => void,
    addContent: string
}

const NavbarLabelRow = ({ title, onAdd, addContent }: Props) => {
    return (
        <span className="navbar__label-row">
            <p className="home__label">{title}</p>
            <ReactSVG
                src={icPlus}
                content={addContent}
                beforeInjection={svg => svg.classList.add("navbar__icon-clickable navbar__icon--plus-small")}
                onClick={onAdd}
            />
        </span>
    )
}

export default NavbarLabelRow