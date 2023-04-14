import { useEffect, useState } from 'react';
import { ReactComponent as EyeIcon } from '../../asset/svg/eye.svg';
import { ReactComponent as EyeOffIcon } from '../../asset/svg/eye-off.svg';
import './PassCode.scss';

type passCodeType = {
    passCode: string;
    setPassCode: Function;
    isValid: boolean;
    confirmMode: boolean;
    goToConfirmPassCode: Function;
    signup: Function;
}

function PassCode({ passCode, setPassCode, isValid, confirmMode=false, goToConfirmPassCode, signup }:passCodeType) {
    const [showPassCode, setShowPassCode] = useState(false);
    const [userPassCode, setUserPassCode] = useState('');
    const [passCodeCheck, setPassCodeCheck] = useState(false);
    const showPassCodeInfo = [
        { show: true, type: "text", icon: <EyeIcon/> },
        { show: false, type: "password", icon: <EyeOffIcon/> }
    ]

    useEffect(()=>{
        setPassCodeCheck(userPassCode === passCode);
    }, [userPassCode, passCode])

    const passCodeCheckList = [
        { check: ()=>{ return passCode.length >= 8 }, text: "8자 이상 20자 미만" },
        { check: ()=>{ return /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/.test(passCode) }, text: "1개 이상의 특수문자" },
        { check: ()=>{ return /[0-9]/.test(passCode) }, text: "1개 이상의 숫자" },
        { check: ()=>{ return /[a-z]/.test(passCode) && /[A-Z]/.test(passCode) }, text: "영문 대소문자 조합" },
    ]

    const changeShowMode = () => {
        setShowPassCode(!showPassCode);
        let passwordInput = document.getElementById('password-input') as HTMLInputElement;
        if (passwordInput) {
            passwordInput.focus();
            setTimeout(function () {
                passwordInput.value = "";
                passwordInput.value = confirmMode ? userPassCode : passCode;
            }, 1);
        }
    }

    return (
        <div className="user-signup-passcode flex-column-31">
            <div 
                className="flex-column-22"
                style={{width: '-webkit-fill-available'}}
            >
                <h3>
                    {
                        confirmMode
                        ? "패스코드 확인"
                        : "패스코드 설정"
                    }
                </h3>
                <h5 style={{lineHeight: "160%"}}>
                    {
                        confirmMode
                        ? "한번 더 입력해주세요."
                        : <>
                            추후 Justmint Wallet 안에 들어있는 자산을 거래하거나<br/>
                            이동하기 위해서는 패스코드를 입력해야 합니다.
                        </>
                    }

                </h5>

                <form 
                    className="password-input-wrapper"
                    autoComplete="off"
                >
                    <input
                        className="password-input"
                        id="password-input"
                        type={showPassCodeInfo.find((el:any)=>el.show===showPassCode)?.type}
                        value={confirmMode ? userPassCode : passCode}
                        onChange={(e)=>confirmMode ? setUserPassCode(e.target.value) : setPassCode(e.target.value)}
                        autoFocus={true}
                        maxLength={20}
                    />
                    {
                        !showPassCode
                        ? <EyeOffIcon className="password-input-icon" onClick={()=>{changeShowMode()}}/>
                        : <EyeIcon className="password-input-icon" onClick={()=>{changeShowMode()}}/>
                    }
                </form>
                <div className="passcode-check-wrapper flex-column-left-14">
                    {
                        confirmMode
                        ?   (
                            !!(userPassCode.length) &&
                            <div
                                className="passcode-check-elem"
                                id={!!(passCodeCheck) ? "checked" : "wrong"}
                            >
                                <div className="passcode-check-marker"/>
                                <h6>
                                    { 
                                        passCodeCheck
                                        ? "일치합니다"
                                        : "불일치합니다" 
                                    }
                                </h6>
                            </div>
                        )
                        : passCodeCheckList.map((check, idx) => (
                            <div
                                className="passcode-check-elem"
                                id={!!(check.check()) ? "checked" : "unchecked"}
                                key={idx}
                            >
                                <div className="passcode-check-marker"/>
                                <h6>
                                    { check.text }
                                </h6>
                            </div>
                        ))
                    }
                </div>
            </div>
            
            {
                confirmMode
                ? <button
                    className="button button--sticky"
                    id="purple"
                    disabled={!passCodeCheck}
                    onClick={()=>{signup()}}
                >
                    시작하기
                </button>
                : <button
                    className="button button--sticky"
                    id="purple"
                    disabled={!isValid}
                    onClick={()=>{goToConfirmPassCode()}}
                >
                    다음
                </button>
            }

        </div>
    )
}
export default PassCode;