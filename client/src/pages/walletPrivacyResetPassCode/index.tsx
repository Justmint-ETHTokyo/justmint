import { useState } from "react";
import { useSelector } from "react-redux";
import { generateWalletsFromMnemonic } from "../../utils/function/wallet";
import { setShowAlertInfo } from "../../utils/function/showAlert";
import { usePassCode } from "../../hook/usePassCodeInput";
import { encryptMnemonic } from "../../utils/function/crypto";
import { useNavigate } from "react-router-dom";
import UserApi from "../../apis/UserApi";
import MiniHeader from "../../components/miniHeader/MiniHeader";
import MnemonicInput from "./MnemonicInput";
import WrongMnemonicModal from "./WrongMnemonicModal";
import PassCodeInput from "../../components/passCode/PassCodeInput";
import PassCodeConfirm from "../../components/passCode/PassCodeConfirm";
import './index.scss';

function WalletPrivacyResetPassCode() {
    const navigation = useNavigate();
    const userApi = new UserApi();
    const wallets = useSelector((state:any)=>state.wallet)
    const [mnemonic, setMnemonic] = useState("");
    const [pageMode, setPageMode] = useState("ENTER_MNEMONIC");
    const [showWrongMnemonicModal, setShowWrongMnemonicModal] = useState(false);
    const { passCode, setPassCode, isValid } = usePassCode();

    const resetPassCode = async () => {
        try {
            const newSecret = encryptMnemonic(mnemonic, passCode);
            await userApi.editSecret(newSecret);
            setShowAlertInfo("패스코드 재설정이 완료되었습니다.", true);
            navigation('/wallet');
        } catch (err) {
            setShowAlertInfo("패스코드 재설정에 실패했습니다.", false);
        }
    }

    const checkMnemonicHandler = async (wordList:string[]) => {
        try {
            let tempMnemonic = "";
            for (let i = 0; i < wordList.length; i++) {
                tempMnemonic += wordList[i];
                if (i !== wordList.length - 1)
                    tempMnemonic += " ";
            }
            setMnemonic(tempMnemonic);
    
            const chainList = Object.keys(wallets);
            const walletsFromMnemonic:any = generateWalletsFromMnemonic(tempMnemonic);
    
            for (let chain of chainList) {
                if (wallets[chain] !== walletsFromMnemonic[chain]?.address) {
                    setShowWrongMnemonicModal(true);
                    return;
                }
            }
            setShowAlertInfo("패스코드 재설정을 이어서 진행해주세요.", true);
            goToSetNewPassCodePage();
        } catch(err) {
            setShowWrongMnemonicModal(true);
        }
    }

    const goToSetNewPassCodePage = () => { setPageMode('SET_NEW_PASSCODE') }
    const goToPassCodeConfirmPage = () => { setPageMode('PASSCODE_CONFIRM') }

    const pageRenderer = () => {
        switch(pageMode) {
            case 'ENTER_MNEMONIC':
                return <MnemonicInput 
                    checkMnemonic={checkMnemonicHandler}
                />
            case 'SET_NEW_PASSCODE':
                return <PassCodeInput 
                    title="패스코드 재설정"
                    description={"추후 Justmint Wallet 안에 들어있는 자산을 거래하거나\n이동하기 위해서는 패스코드를 입력해야 합니다."}
                    passCode={passCode}
                    setPassCode={setPassCode}
                    isValid={isValid}
                    buttonText="다음"
                    buttonAction={()=>goToPassCodeConfirmPage()}
                />
            case 'PASSCODE_CONFIRM':
                return <PassCodeConfirm 
                    passCode={passCode}
                    confirmText="재설정하기"
                    confirmAction={resetPassCode}
                />
            default:
        }
    }

    return (
        <div className="wallet-privacy-reset-passcode">
            <MiniHeader 
                title="패스코드 재설정하기"
            />
            {
                showWrongMnemonicModal &&
                <WrongMnemonicModal 
                    closeModal={()=>{setShowWrongMnemonicModal(false)}}
                />
            }

            { pageRenderer() }
        </div>
    )
}
export default WalletPrivacyResetPassCode;