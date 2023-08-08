/*
MIT License

Copyright (c) 2020 CNRS

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import ReactModal from 'react-modal'
import "./ModalStyles.css"

interface Props {
    isOpen: boolean,
    title: string,
    onConfirm: () => void,
    onClose: () => void,
    children: React.ReactNode
}

const Modal = ({ isOpen, title, onConfirm, onClose, children }: Props) => {
    return (
        <ReactModal
            className="modal"
            isOpen={isOpen}
            onRequestClose={onClose}
        >
            <p className="modal__title">{title}</p>
            <hr className="modal__delimiter"/>
            {children}
            <span className="modal__buttons-row">
                <button 
                    className="modal__button modal__button--cancel"
                    onClick={onClose}
                >
                    Cancel
                </button>
                <button 
                    className="modal__button modal__button--confirm"
                    onClick={onConfirm}
                >
                    Confirm
                </button>
            </span>
        </ReactModal>
    )
}

export default Modal