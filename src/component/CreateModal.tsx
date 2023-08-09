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
            onConfirm={() => {
                onConfirm(elementName)
                onClose()
            }}
            onClose={onClose}
        >
            <span className="modal__input-row">
                <p className="modal__input__label">Name:</p>
                <input
                    type="text"
                    placeholder="Name"
                    value={elementName}
                    onChange={(e) => {
                        e.preventDefault()
                        setElementName(e.target.value)
                    }}
                    className="modal__input__box"
                />
            </span>
        </Modal>
    )
}

export default CreateModal