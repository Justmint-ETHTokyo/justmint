import { copyText } from '../../utils/function/linkShare';
import { ReactComponent as CopyIcon } from '../../asset/svg/copy-text.svg';
import paperImg from '../../asset/image/paper.png';
import CopyBox from '../copyBox/CopyBox';

type saveMnemonicProps = {
    mnemonic: string;
    completeButtonText?: string;
    setCompleteAction?: Function;
}

function SaveMnemonic ({ mnemonic, completeButtonText, setCompleteAction }:saveMnemonicProps) {

    return (
        <div className="save-mnemonic-page">
            <div className="flex-column-24">
                <CopyBox 
                    text={mnemonic}
                    copyAlertText="니모닉 코드가 복사되었습니다."
                />
                <div
                    className="mnemonic-copy-description"
                >
                    패스코드 분실 및 지갑 복구를 대비해서<br/>
                    비밀구문을 복사하거나 화면을 캡쳐 후<br/>
                    안전한 곳에 저장해주세요.
                </div>
            </div>
            <div className="mnemonic-copy-tip-wrapper flex-column-24">
                <div className="mnemonic-copy-tip flex-row-4">
                    <h4>Tip!</h4>
                    <img src={paperImg}/>
                </div>
                <h5 className="mnemonic-copy-tip-text">
                    휴대폰이나 노트북 등의 기기에 저장해두는 방법도 있으나<br/>
                    기기 분실 및 서버 해킹을 고려해봤을 때<br/>
                    오프라인에 보관하는 것을 가장 권장드려요!
                </h5>
                <h5 className="mnemonic-copy-tip-text">
                    · 수기로 옮겨 적은 후 오프라인상에 보관하기<br/>
                    · 복사해서 메모장에 저장하기<br/>
                    · 캡쳐해서 폴더에 저장하기<br/>
                </h5>
            </div>

            {
                !!(completeButtonText && setCompleteAction) &&
                <button
                    className="button button--sticky"
                    id="purple"
                    onClick={()=>setCompleteAction()}
                >
                    { completeButtonText }
                </button>
            }

        </div>
    )
}
export default SaveMnemonic;