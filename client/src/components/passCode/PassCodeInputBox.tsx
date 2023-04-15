import { useState } from "react";
import { ReactComponent as EyeIcon } from '../../asset/svg/eye.svg';
import { ReactComponent as EyeOffIcon } from '../../asset/svg/eye-off.svg';
import './PassCodeInputBox.scss';

type PassCodeInputProp = {
    passCode: string;
    setPassCode: Function;
}

function PassCodeInputBox ({ passCode, setPassCode }:PassCodeInputProp) {
    const [showPassCode, setShowPassCode] = useState(false);
    const showPassCodeInfo = [
        { show: true, type: "text", icon: <EyeIcon/> },
        { show: false, type: "password", icon: <EyeOffIcon/> }
    ]

    const changeShowMode = () => {
        setShowPassCode(!showPassCode);
        let passwordInput = document.getElementById('password-input') as HTMLInputElement;
        if (passwordInput) {
            passwordInput.focus();
            setTimeout(function () {
                passwordInput.value = "";
                passwordInput.value = passCode;
            }, 1);
        }
    }

    return (
        <div className="passcode-input-box">
            <input
                className="password-input"
                id="password-input"
                type={showPassCodeInfo.find((el:any)=>el.show===showPassCode)?.type}
                value={passCode}
                onChange={(e)=>setPassCode(e.target.value)}
                autoFocus={true}
                maxLength={20}
            />
            {
                !showPassCode
                ? <EyeOffIcon className="password-input-icon" onClick={()=>{changeShowMode()}}/>
                : <EyeIcon className="password-input-icon" onClick={()=>{changeShowMode()}}/>
            }
        </div>
    )
}
export default PassCodeInputBox;