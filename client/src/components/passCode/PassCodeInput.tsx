import PassCodeInputBox from './PassCodeInputBox';

type passCodeType = {
    title: string;
    description: string;
    passCode: string;
    setPassCode: Function;
    isValid: boolean;
    buttonText: string;
    buttonAction: Function;
}

function PassCodeInput({ title, description, passCode, setPassCode, isValid, buttonText, buttonAction }:passCodeType) {
    const passCodeCheckList = [
        { check: ()=>{ return passCode.length >= 8 }, text: "8자 이상 20자 미만" },
        { check: ()=>{ return /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/.test(passCode) }, text: "1개 이상의 특수문자" },
        { check: ()=>{ return /[0-9]/.test(passCode) }, text: "1개 이상의 숫자" },
        { check: ()=>{ return /[a-z]/.test(passCode) && /[A-Z]/.test(passCode) }, text: "영문 대소문자 조합" },
    ]

    return (
        <form 
            className="passcode-input flex-column-31"
            onSubmit={(e)=>{e.preventDefault(); buttonAction();}}
        >
            <div 
                className="flex-column-22"
                style={{width: '-webkit-fill-available'}}
            >
                <h3>{ title }</h3>
                <h5
                    className="passcode-input-description"
                    style={{lineHeight: "160%"}}
                >
                    { description }
                </h5>

                <PassCodeInputBox 
                    passCode={passCode}
                    setPassCode={setPassCode}
                />
                <div className="passcode-check-wrapper flex-column-left-14">
                    {
                        passCodeCheckList.map((check, idx) => (
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
                !!(buttonText && buttonAction) &&
                <button
                    className="button button--sticky"
                    id="purple"
                    disabled={!isValid}
                    type="submit"
                >
                    다음
                </button>
            }

        </form>
    )
}
export default PassCodeInput;