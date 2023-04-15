import { useState } from "react";
import { timeToString } from "../../../utils/function/time";
import { setShowAlertInfo } from "../../../utils/function/showAlert";
import useEmailAuthentication from "../../../hook/useEmailAuthentication";
import Modal from "../../../components/modal/Modal";
import UserApi from "../../../apis/UserApi";
import { ReactComponent as CheckIcon } from "../../../asset/svg/check-circle.svg";
import { ReactComponent as CloseIcon } from "../../../asset/svg/close-circle.svg";

type emailEditModalProps = {
    closeModal: () => void;
}

function EmailEditModal({ closeModal }:emailEditModalProps) {
    const userApi = new UserApi();
    const { email, setEmail, sendVerificationNumber, isVerificationNumberSent, checkVerifyNumber, authentic, validationTime } = useEmailAuthentication();
    const [userVerifyNumber, setUserVerifyNumber] = useState('');

    const sendEmail = async () => {
        await sendVerificationNumber();
        setTimeout(()=>{
            document.getElementById('verifycode-input')?.focus();
        }, 100);
    }

    const changeEmail = async () => {
        try {
            await userApi.editUserEmail(email);
            closeModal();
            setShowAlertInfo('이메일이 수정되었습니다.', true);
        } catch(err) {
            setShowAlertInfo('이메일 수정에 실패했습니다.', false);
        }
    }

    return (
        <Modal
            closeModal={closeModal}
        >
            <div className="modal-wrapper profile-edit-modal">
                <div className="modal-header">
                    <div className="modal-title">
                        이메일 정보를 수정하기 위해<br/>
                        인증 절차가 필요합니다.
                    </div>
                    <CloseIcon 
                        className="modal-close"
                        onClick={closeModal}
                    />
                </div>
                <div  className="modal-content">
                    <div className="input-textbox">
                        <input
                            type="email"
                            placeholder="변경할 이메일 입력"
                            value={email}
                            autoFocus={true}
                            onChange={(e)=>{setEmail(e.currentTarget.value)}}
                        />
                        <button
                            disabled={!(email.length)}
                            onClick={()=>{sendEmail()}}
                        >
                            {
                                !(isVerificationNumberSent)
                                ? "인증"
                                : "재전송"
                            }
                        </button>
                    </div>
                    <div className="input-textbox">
                        <input
                            id="verifycode-input"
                            type="text"
                            onChange={(e)=>{setUserVerifyNumber(e.currentTarget.value); checkVerifyNumber(e.currentTarget.value)}}
                            placeholder="인증번호 입력"
                            disabled={!(isVerificationNumberSent)}
                        />
                        {
                            isVerificationNumberSent &&
                            (
                                !!(authentic)
                                ? <CheckIcon className="check-icon"/>
                                : <div className="valid-time">
                                    { timeToString(validationTime) }
                                </div>
                            )
                        }
                        {
                            !!(userVerifyNumber.length) && isVerificationNumberSent && !(authentic) &&
                            <div
                                className="invalid-message"
                            >
                                올바르지 않은 인증번호입니다.
                            </div>
                        }
                    </div>
                </div>
                <div className="modal-footer">
                    <button
                        className="cancle"
                        onClick={()=>{closeModal()}}
                    >
                        취소
                    </button>
                    <button
                        disabled={!(authentic)}
                        className="approve"
                        onClick={()=>{changeEmail()}}
                    >
                        변경
                    </button>
                </div>
            </div>
        </Modal>
    )
}
export default EmailEditModal;