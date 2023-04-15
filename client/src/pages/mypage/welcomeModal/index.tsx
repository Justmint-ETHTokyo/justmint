import Modal from "../../../components/modal/Modal";
import { ReactComponent as Wallet } from '../../../asset/svg/wallet-colorful.svg';

import Confetti from "react-confetti";
import { ReactComponent as CloseIcon } from '../../../asset/svg/close-circle.svg';
import { useRef } from "react";
import './index.scss';
import { useNavigate } from "react-router-dom";

type newUserModalType = {
    closeModal: Function;
}

function WelcomeModal({ closeModal }:newUserModalType) {
    const modalRef = useRef<any>();
    const navigation = useNavigate();

    return (
        <Modal 
            closeModal={closeModal} 
            align={"BOTTOM"}
        >
            <div 
                className="welcome-modal modal-wrapper"
                ref={modalRef}
            >
                <Confetti 
                    width={modalRef.current?.clientWidth}
                    height={modalRef.current?.clientHeight}
                    numberOfPieces={30}
                    className="modal-confetti"
                />
                <div className="modal-header">
                    <CloseIcon 
                        className="modal-close"
                        onClick={()=>closeModal()}
                    />
                </div>
                <div className="welcome-title">
                    회원가입과 동시에 사용자만을 위한<br/>
                    지갑이 생성되었어요!
                </div>

                <div className="welcome-wallet-wrapper">
                    <Wallet className="wallet-icon"/>
                    <div className="wallet-icon-new">New!</div>
                </div>

                <div className="welcome-text">
                    본격적인 NFT 경험에 앞서<br/>
                    지갑과 관련된 <span className="gn">중요한 안내사항</span>이 있어요.<br/>
                    바로 확인하러 가볼까요?
                </div>

                <button
                    className="button"
                    id="white"
                    onClick={()=>{navigation('/wallet/tutorial')}}
                >
                    Justmint Wallet 입문하기
                </button>
            </div>
        </Modal>
    )
}
export default WelcomeModal;