import { ReactSVG } from "react-svg"
import icGroup from "@/assets/ic_group.svg"
import icOptions from "@/assets/ic_options.svg"

interface Props {
    forGroupName: string,
    adminName: string
}

const NavbarInvitationRow = ({ forGroupName, adminName }: Props) => {
    const openInvitationOptions = () => {}

    return (
        <span className="navbar__invitations-row">
            <ReactSVG
                src={icGroup}
                content="For group"
                beforeInjection={svg => svg.classList.add("navbar__icon-leading")}
            />
            <span className="home__text">{forGroupName} ({adminName})</span>
            <ReactSVG
                src={icOptions}
                className="navbar__icon-container--options"
                content="Group options"
                beforeInjection={svg => {
                    svg.classList.add("navbar__icon-clickable")
                    svg.classList.add("navbar__icon--options-large")
                }}
                onClick={openInvitationOptions}
            />
        </span>
    )
}

export default NavbarInvitationRow