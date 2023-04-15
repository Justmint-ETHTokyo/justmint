import { useNavigate } from 'react-router-dom';
import { copyText } from '../../utils/function/linkShare';
import { ellipsisMiddle } from '../../utils/function/ellipsisMiddle';

import { ReactComponent as CopyIcon } from '../../asset/svg/copy-text.svg';
import { ReactComponent as MoreIcon } from '../../asset/svg/three-dots.svg';
import { ReactComponent as SearchIcon } from '../../asset/svg/search.svg';

type walletElemProp = {
    title: string;
    chainType: string;
    address: string;
}

function WalletElem({ title, chainType, address } : walletElemProp) {
    const navigation = useNavigate();

    return (
        <div className="wallet-elem-wrapper">
            <h4 className="eng">{ title }</h4>
            <div 
                className="wallet-address-box"
                onClick={()=>{ copyText(address) }}
            >
                <h6 className="wallet-address">{ ellipsisMiddle(address) }</h6>
                <CopyIcon className="copy-icon"/>
            </div>
            <button 
                className="wallet-more-button"
                onTouchStart={(e)=>e.currentTarget.focus()}
            >
                <MoreIcon className="more-icon" /> 
                <div 
                    className="wallet-more-menu-elem"
                    onClick={()=>navigation(`/wallet/privatekey/${chainType}`)}
                    onTouchEnd={()=>navigation(`/wallet/privatekey/${chainType}`)}
                >
                    <SearchIcon />
                    <h6 className="wallet-more-menu-text">프라이빗 키 확인하기</h6>
                </div>
            </button>

        </div>
    )
}
export default WalletElem;