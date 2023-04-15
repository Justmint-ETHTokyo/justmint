import { useEffect, useState } from 'react';
import PassCodeInputBox from './PassCodeInputBox';
import './PassCodeInput.scss';

type passCodeType = {
    title?: string;
    description?: string;
    passCode: string;
    confirmText: string;
    confirmAction: Function;
}

function PassCodeConfirm({ title="패스코드 확인", description="한번 더 입력해주세요.", passCode, confirmText, confirmAction }:passCodeType) {
    const [userPassCode, setUserPassCode] = useState('');
    const [passCodeCheck, setPassCodeCheck] = useState(false);

    useEffect(()=>{
        setPassCodeCheck(userPassCode === passCode);
    }, [userPassCode, passCode])

    return (
        <form 
            className="passcode-input flex-column-31"
            onSubmit={(e)=>{e.preventDefault(); confirmAction();}}
        >
            <div 
                className="flex-column-22"
                style={{width: '-webkit-fill-available'}}
            >
                <h3>{ title }</h3>
                <h5 style={{lineHeight: "160%"}}>{ description }</h5>

                <PassCodeInputBox
                    passCode={userPassCode}
                    setPassCode={setUserPassCode}
                />
                <div className="passcode-check-wrapper flex-column-left-14">
                    {
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
                    }
                </div>
            </div>
            
            {
                !!(confirmText && confirmAction) &&
                <button
                    className="button button--sticky"
                    id="purple"
                    type="submit"
                    disabled={!passCodeCheck}
                >
                    { confirmText }
                </button>
            }

        </form>
    )
}
export default PassCodeConfirm;