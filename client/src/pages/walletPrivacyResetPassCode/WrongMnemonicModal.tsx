import Modal from "../../components/modal/Modal"
import cryingCatImg from '../../asset/image/crying-cat.png';
import { ReactComponent as CloseIcon } from '../../asset/svg/close-circle.svg';
import './WrongMnemonicModal.scss'

type wrongMnemonicModalProp = {
    closeModal: Function;
}

function WrongMnemonicModal({ closeModal }:wrongMnemonicModalProp) {
    return (
        <Modal
            closeModal={closeModal}
        >
            <div className="modal-wrapper wrong-mnemonic-modal">
                <CloseIcon 
                    className="modal-close"
                    onClick={()=>closeModal()}
                />
                <div className="modal-body">
                    <img className="wrong-mnemonic-modal-img" src={cryingCatImg}/>
                    <h2 className="eng gn">Sorry!</h2>
                    <h5 className="modal-content">
                        입력하신 비밀구문과 매칭되는 지갑 주소를<br/>
                        발견하지 못했어요.<br/>
                        12개의 단어 중 한 개의 단어만 틀려도<br/>
                        다음 단계로 넘어가지 못하니<br/>
                        다시 한번 확인해서 입력해 주세요.
                    </h5>
                </div>
                <button
                    className="button"
                    id="green"
                    onClick={()=>{window.location.reload()}}
                >
                    다시 입력
                </button>
            </div>
        </Modal>
    )
}
export default WrongMnemonicModal;