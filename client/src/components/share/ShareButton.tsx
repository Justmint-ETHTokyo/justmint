import { useRef } from "react";
import { copyToClipboard } from "../../utils/function/linkShare";
import { ReactComponent as CopyIcon } from "../../asset/svg/copy.svg";
import './ShareButton.scss';

function ShareButton({ shareLink= window.location.href, shareText='', color='white' }) {
    const buttonRef = useRef<HTMLButtonElement>(null);

    const share = () => {
        copyToClipboard(shareLink, shareText);
        // buttonRef.current?.blur();
    }

    return (
        <button
            className="share-button"
            ref={buttonRef}
            onTouchStart={(e)=>e.currentTarget.focus()}
            style={{color: color}}
        >
            <CopyIcon style={{fill: color}}/>
            <h5 className="eng">share</h5>
            <div className="share-linkcopy-wrapper">
                <div 
                    className="share-linkcopy"
                    onClick={()=>share()}
                >
                    copy link
                </div>
            </div>
        </button>
    )
}
export default ShareButton;