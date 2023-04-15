import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { decryptMnemonic } from "../../utils/function/crypto";
import PassCodeInput from "./PassCodeInput";
import SaveMnemonic from "./SaveMnemonic";
import './index.scss';

type confirmMnemonicType = {
    completeButtonText?: string;
    setCompleteAction?: Function;
}

function ConfirmMnemonic({ completeButtonText, setCompleteAction }:confirmMnemonicType) {
    const secret = useSelector((state:any)=>state.userData.secret);
    const [pageMode, setPageMode] = useState('INPUT');
    const [passCode, setPassCode] = useState('');
    const [validPassCode, setValidPassCode] = useState(false);
    const [mnemonic, setMnemonic] = useState('');

    const decryptMnemonicCode = () => {
        try {
            const _mnemonic = decryptMnemonic(secret, passCode).toString();
            setMnemonic(_mnemonic);
            setPageMode('SAVE_MNEMONIC');
        } catch(err) {
            console.log(err);
            setValidPassCode(false);
        }
    }

    useEffect(()=>{
        // passcode 바뀔 때마다 valid 상태 바꾸기
        setValidPassCode(true);
    }, [passCode])

    useEffect(()=>{
        window.scrollTo(0, 0);
    }, [pageMode])

    const pageRenderer = () => {
        switch(pageMode) {
            case 'INPUT':
                return <PassCodeInput 
                    passCode={passCode}
                    setPassCode={setPassCode}
                    decryptMnemonic={decryptMnemonicCode}
                    validPassCode={validPassCode}
                />
            case 'SAVE_MNEMONIC':
                return <SaveMnemonic 
                    mnemonic={mnemonic}
                    completeButtonText={completeButtonText}
                    setCompleteAction={setCompleteAction}
                />
            default:
        }
    }

    return (
        <div className="confirm-mnemonic">
            { pageRenderer() }
        </div>
    )
}
export default ConfirmMnemonic;