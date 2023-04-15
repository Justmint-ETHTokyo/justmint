import { ReactNode } from "react";
import Modal from "../modal/Modal";
import { ReactComponent as CloseIcon } from '../../asset/svg/close-circle.svg';
import './StatusModal.scss';

type statusModalProp = {
    modalImage: string;
    modalText: ReactNode;
    buttonText: string;
    buttonColor?: ('green'|'purple'|'black');
    buttonAction: Function;
    closeModal: Function
}

function StatusModal ({ modalImage, modalText, buttonColor='green', buttonText, buttonAction, closeModal }:statusModalProp) {

    return (
        <Modal closeModal={closeModal}>
            <div className="modal-wrapper status-modal">
                <div className="modal-header">
                    <CloseIcon className="modal-close" onClick={()=>{closeModal()}}/>
                </div>
                <div className="modal-body">
                    <img className="status-image" src={modalImage}/>
                    <div className="status-text">
                        { modalText }
                    </div>

                    <button
                        className="button"
                        id={buttonColor}
                        onClick={()=>{buttonAction()}}
                    >
                        { buttonText }
                    </button>
                </div>
                <div className="modal-footer" />
            </div>
        </Modal>
    )
}
export default StatusModal;