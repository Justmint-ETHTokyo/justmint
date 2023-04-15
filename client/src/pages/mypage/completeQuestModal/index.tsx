import Modal from "../../../components/modal/Modal";
import fireworkImg from '../../../asset/image/firework.png';
import { ReactComponent as CloseIcon } from '../../../asset/svg/close-circle.svg';
import './index.scss';

type completeQuestModalProp = {
    closeModal: Function;
}

function CompleteQuestModal({ closeModal }:completeQuestModalProp) {

    return (
        <Modal
            closeModal={closeModal}
        >
            <div className="modal-wrapper complete-quest-modal">
                <CloseIcon 
                    className="close-modal"
                    onClick={()=>{closeModal()}}
                />
                <img src={fireworkImg}/>
                <h2 className="eng">
                    Congratulations on<br/>
                    completing the Quest!
                </h2>
                <h4 className="modal-text">
                    지금까지 확인하고 저장한 비밀구문을 다시 보고싶을 때는 마이페이지 오른쪽 하단에 위치한 지갑 아이콘을 눌러주세요!
                </h4>
                <button
                    className="button"
                    id="green"
                    onClick={()=>closeModal()}
                >
                    확인
                </button>
            </div>
        </Modal>
    )
}
export default CompleteQuestModal;