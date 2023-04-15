import { useState } from "react";
import InputLength from "../../components/inputLength/InputLength";
import Modal from "../../components/modal/Modal";
import './DiscardModal.scss';

type discardModalProp = {
    closeModal: Function;
    discardAction: Function;
}

function DiscardModal({ closeModal, discardAction }:discardModalProp) {
    const [reason, setReason] = useState("");
    const maxLength = 200;

    return (
        <Modal
            closeModal={closeModal}
        >
            <div className="modal-wrapper nftphoto-discard-modal">
                <h4 className="modal-title">
                    거절 사유를 작성해주세요.<br/>
                    작성해주신 사유는 카카오톡 알림톡을 통해<br/>
                    NFT 신청자에게 전달됩니다.
                </h4>
                <div className="modal-body">
                    <div
                        className="reject-reason-input-wrapper"
                    >
                        <textarea 
                            placeholder={`최대 ${maxLength}자까지 입력 가능합니다.`}
                            rows={4}
                            maxLength={maxLength}
                            value={reason}
                            onChange={(e)=>{setReason(e.target.value)}}
                        />
                    </div>
                    <InputLength 
                        currLength={reason.length}
                        maxLength={maxLength}
                    />

                </div>
                <div className="modal-footer">
                    <button 
                        className="button" 
                        id="black"
                        onClick={()=>{closeModal()}}
                    >
                        취소
                    </button>
                    <button
                        className="button" 
                        id="green"
                        onClick={()=>{discardAction(reason)}}
                    >
                        확인
                    </button>
                </div>
            </div>
        </Modal>
    )
}
export default DiscardModal;