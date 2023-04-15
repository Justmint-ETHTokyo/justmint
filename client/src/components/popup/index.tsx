import Modal from '../modal/Modal';
import './index.scss';

export type popupProps = {
    closeModal: () => void;
    title: string;
    approveText?: string;
    denyText?: string;
    approve: Function;
    deny?: Function | null;
}

const defaultApproveText = "예";
const defaultDenyText = "아니오";

export const Popup = ({ closeModal, title, approveText=defaultApproveText, denyText=defaultDenyText, approve, deny=null } : popupProps) => {

    return (
        <Modal closeModal={closeModal}>
            <div className="modal-wrapper popup">
                <div className="popup-title">{title}</div>
                <div className="popup-button-wrapper">
                    {
                        deny &&
                        <button className="button popup-button" type="button" id="black" onClick={()=>deny()}>
                            { denyText }
                        </button>
                    }
                    <button className="button popup-button" type="button" id="purple" onClick={()=>approve()}>
                        { approveText }
                    </button>
                </div>
            </div>
        </Modal>
    )
}