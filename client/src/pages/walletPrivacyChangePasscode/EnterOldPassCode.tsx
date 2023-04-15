import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type enterOldPassCode = {
    confirmOldPassCode: Function;
    confirmAction: Function;
}

function EnterOldPassCode({ confirmOldPassCode, confirmAction }:enterOldPassCode) {
    const navigation = useNavigate();
    const [passCode, setPassCode] = useState("");
    const [valid, setValid] = useState(true);

    const confirmPassCodeHandler = () => {
        const isValid = confirmOldPassCode(passCode);

        if (isValid) {
            confirmAction();
        } else {
            setValid(false);
        }
    }

    useEffect(()=>{
        setValid(true);
    }, [passCode])

    return (
        <form 
            className="enter-old-passcode"
            onSubmit={(e)=>{e.preventDefault(); confirmPassCodeHandler();}}
        >
            <div className="input-box-wrapper">
                <input
                    className="input-textbox"
                    type="password"
                    value={passCode}
                    placeholder="현재 패스코드를 입력해주세요."
                    onChange={(e)=>{ setPassCode(e.target.value)}}
                />
                {
                    !valid &&
                    <div className="input-status" id="warning">
                        올바르지 않은 비밀번호 입니다.
                    </div>
                }
            </div>

            <div className="button-wrapper">
                <button
                    type="button"
                    className="lose-passcode"
                    onClick={()=>navigation('/wallet/privacy/passcode/reset')}
                >
                    패스코드를 분실하셨나요?
                </button>
                <button
                    className="button"
                    id="purple"
                    type="submit"
                    disabled={!(passCode.length)}
                >
                    확인하기
                </button>
            </div>
        </form>
    )
}
export default EnterOldPassCode;