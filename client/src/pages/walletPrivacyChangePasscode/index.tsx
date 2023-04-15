import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { usePassCode } from "../../hook/usePassCodeInput";
import { decryptMnemonic, encryptMnemonic } from "../../utils/function/crypto";
import { setShowAlertInfo } from "../../utils/function/showAlert";
import UserApi from "../../apis/UserApi";
import MiniHeader from "../../components/miniHeader/MiniHeader";
import PassCodeConfirm from "../../components/passCode/PassCodeConfirm";
import PassCodeInput from "../../components/passCode/PassCodeInput";
import EnterOldPassCode from "./EnterOldPassCode";
import './index.scss';

function WalletPrivacyChangePassCode() {
    const navigation = useNavigate();
    const userApi = new UserApi();
    const secret = useSelector((state:any)=>state.userData.secret);
    const [pageMode, setPageMode] = useState('ENTER_OLD_PASSCODE');
    const [mnemonic, setMnemonic] = useState('');

    const { passCode, setPassCode, isValid } = usePassCode();

    const confirmOldPassCode = (passCode:string) => {
        try {
            const _mnemonic = decryptMnemonic(secret, passCode);
            setMnemonic(_mnemonic);
            return true;
        } catch(err) {
            return false;
        }
    }

    const changePassCode = async () => {
        const newSecret = encryptMnemonic(mnemonic, passCode);
        await userApi.editSecret(newSecret);
        setShowAlertInfo('패스코드가 변경되었습니다.', true);
        navigation("/wallet");
    }

    const pageRenderer = () => {
        switch(pageMode) {
            case 'ENTER_OLD_PASSCODE':
                return <EnterOldPassCode 
                    confirmOldPassCode={confirmOldPassCode}
                    confirmAction={()=>setPageMode('ENTER_NEW_PASSCODE')}
                />
            case 'ENTER_NEW_PASSCODE':
                return <PassCodeInput 
                    title="패스코드 변경"
                    description={"추후 Justmint Wallet 안에 들어있는 자산을 거래하거나\n이동하기 위해서는 패스코드를 입력해야 합니다."}
                    passCode={passCode}
                    setPassCode={setPassCode}
                    isValid={isValid}
                    buttonText="다음"
                    buttonAction={()=>setPageMode('CONFIRM_NEW_PASSCODE')}
                />
            case 'CONFIRM_NEW_PASSCODE':
                return <PassCodeConfirm 
                    passCode={passCode}
                    confirmText="변경하기"
                    confirmAction={changePassCode}
                />
            default:
        }
    }

    return (
        <div className="wallet-privacy-change-passcode">
            <MiniHeader 
                title="패스코드 변경하기"
            />
            { pageRenderer() }
        </div>
    )
}
export default WalletPrivacyChangePassCode;