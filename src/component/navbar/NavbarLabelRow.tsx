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
            <span className="home__label">{title}</span>
            <ReactSVG
                src={icPlus}
                content={addContent}
                beforeInjection={svg => {
                    svg.classList.add("navbar__icon-clickable")
                    svg.classList.add("navbar__icon--plus-small")
                }}
                onClick={onAdd}
            />
        </span>
    )
}

export default NavbarLabelRow