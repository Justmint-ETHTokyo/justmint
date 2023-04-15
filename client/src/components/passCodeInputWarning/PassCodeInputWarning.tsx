import { useSelector } from 'react-redux';
import warningImg from '../../asset/image/warning.png';
import './PassCodeInputWarning.scss';

type passCodeInputProp = {
    warningText?: string;
    passCode: string;
    setPassCode: Function;
    validPassCode: boolean;
}

function PassCodeInputWarning({ warningText="비밀구문", passCode, setPassCode, validPassCode } : passCodeInputProp) {
    const userName = useSelector((state:any) => state.userData.name);

    return (
        <div className="passcode-input-warning">
        <div className="passcode-warning-wrapper">
            <img className="passcode-warning-image" src={warningImg}/>
            <h2 className="eng">Warning!</h2>
            <div className="warning-title re">{ warningText }은 그 누구에게도 공개해서는 안돼요.</div>
            <h6 className="warning-description gr-4">
                누군가 이 { warningText }을 알게되면<br/>
                { userName } 님의 지갑에 보관된 자산을 훔쳐갈 수 있어요.<br/>
                만약 이 정보를 요구하는 경우는 피싱 사기일 수 있습니다.
            </h6>
        </div>
        <div className="passcode-input-wrapper">
            <input 
                className="passcode-input"
                type="password"
                value={passCode}
                onChange={(e)=>{ setPassCode(e.target.value) }}
                placeholder="패스코드를 입력해주세요."
            />
            {
                !validPassCode && 
                <div className="passcode-error">패스코드가 일치하지 않습니다.</div>
            }            
        </div>
        </div>
    )
}
export default PassCodeInputWarning;