import { copyText } from '../../utils/function/linkShare';
import { ReactComponent as CopyIcon } from '../../asset/svg/copy-text.svg';
import './CopyBox.scss';

type copyBoxProps = {
    text: string;
    copyAlertText: string;
}

function CopyBox({ text, copyAlertText }:copyBoxProps) {

    return (
        <div className="copy-box-wrapper">
            { text }
            <button 
                className="copy-button"
                onClick={()=>{copyText(text, copyAlertText)}}
                onTouchEnd={()=>{copyText(text, copyAlertText)}}
            >
                <CopyIcon />
            </button>
        </div>
    )
}
export default CopyBox;