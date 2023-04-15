import { useState } from "react";
import usePhoneAuthentication from "../../../hook/usePhoneAuthentication";
import Modal from "../../../components/modal/Modal";
import { timeToString } from "../../../utils/function/time";
import { ReactComponent as CheckIcon } from "../../../asset/svg/check-circle.svg";
import { ReactComponent as CloseIcon } from "../../../asset/svg/close-circle.svg";
import UserApi from "../../../apis/UserApi";
import { setShowAlertInfo } from "../../../utils/function/showAlert";

type phoneEditModalProps = {
    closeModal: () => void;
}

function PhoneEditModal({ closeModal }:phoneEditModalProps) {
    const userApi = new UserApi();
    const { phoneNumber, getPhoneNumber, sendVerificationNumber, isVerificationNumberSent, checkVerifyNumber, authentic, validationTime } = usePhoneAuthentication();
    const [userVerifyNumber, setUserVerifyNumber] = useState('');

    const sendSms = async () => {
        await sendVerificationNumber();
        setTimeout(()=>{
            document.getElementById('verifycode-input')?.focus();
        }, 100);
    }

    const changePhoneNumber = async () => {
        try {
            await userApi.editUserPhoneNumber(phoneNumber.split('-').join(''));
            closeModal();
            setShowAlertInfo('휴대폰 번호가 수정되었습니다.', true);
        } catch(err) {
            setShowAlertInfo('휴대폰 번호 수정에 실패했습니다.', false);
        }

    }

    return (
        <Modal
            closeModal={closeModal}
        >
            <div className="modal-wrapper profile-edit-modal">
                <div className="modal-header">
                    <div className="modal-title">
                        휴대폰 정보를 수정하기 위해<br/>
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
                            type="text"
                            placeholder="변경할 휴대폰 번호 입력"
                            value={phoneNumber}
                            maxLength={13}
                            autoFocus={true}
                            onChange={(e)=>{getPhoneNumber(e.target as HTMLInputElement)}}
                        />
                        <button
                            disabled={!(phoneNumber.length)}
                            onClick={()=>{sendSms()}}
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
                        onClick={()=>{changePhoneNumber()}}
                    >
                        변경
                    </button>
                </div>
            </div>
        </Modal>
    )
}
export default PhoneEditModal;