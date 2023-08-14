import { useState } from "react"
import Modal from "./Modal"
import "./ModalStyles.css"
import { Group } from "@/model/models"

interface Props {
    isOpen: boolean,
    groups: Group[],
    onConfirm: (onGroupId: string, toUsername: string) => void,
    onClose: () => void
}

const InviteModal = ({ isOpen, groups, onConfirm, onClose }: Props) => {
    if (groups.length <= 0) return

    const [username, setUsername] = useState("")
    const [selectedGroupId, setSelectedGroupId] = useState(groups[0].id)

    return (
        <Modal
            isOpen={isOpen}
            title={"Invite to Group"}
            onConfirm={() => {
                onConfirm(selectedGroupId, username)
                onClose()
            }}
            onClose={onClose}
        >
            <span className="modal__input-row">
                <p className="modal__input__label">Group:</p>
                <select
                    className="modal__input__box modal__dropdown"
                    value={selectedGroupId}
                    onChange={e => {
                        e.preventDefault()
                        setSelectedGroupId(e.target.value)
                    }}
                >
                    {
                        groups.map(group => (
                            <option
                                key={group.id}
                                value={group.id}
                            >
                                {group.name}
                            </option>
                        ))
                    }
                </select>
            </span>
            <span className="modal__input-row">
                <p className="modal__input__label">User:</p>
                <input
                    autoFocus
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => {
                        e.preventDefault()
                        setUsername(e.target.value)
                    }}
                    className="modal__input__box"
                />
            </span>
        </Modal>
    )
}

export default InviteModal