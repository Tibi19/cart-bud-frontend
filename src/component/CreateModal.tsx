import { useState } from "react"
import Modal from "./Modal"
import "./ModalStyles.css"

interface Props {
    isOpen: boolean,
    elementTitle: string,
    onConfirm: (elementName: string) => void,
    onClose: () => void
}

const CreateModal = ({ isOpen, elementTitle, onConfirm, onClose }: Props) => {
    const [elementName, setElementName] = useState("")

    return (
        <Modal
            isOpen={isOpen}
            title={`Create ${elementTitle}`}
            onConfirm={() => onConfirm(elementName)}
            onClose={onClose}
        >
            <span className="create__content-row">
                <p className="create__content__label">Name:</p>
                <input
                    type="text"
                    placeholder="Name"
                    value={elementName}
                    onChange={(e) => {
                        e.preventDefault()
                        setElementName(e.target.value)
                    }}
                    className="create__content__input"
                />
            </span>
        </Modal>
    )
}

export default CreateModal