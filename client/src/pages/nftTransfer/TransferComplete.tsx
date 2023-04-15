import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';


type transferLoadingProp = {
    nftName:string;
    transactionExplorerUrl: string | undefined;
    transactionId:string;
}

function TransferComplete({ nftName, transactionExplorerUrl, transactionId }:transferLoadingProp) {
    const navigation = useNavigate();
    return (
        <div className="trasfer-status-container">
            <Icon icon="line-md:chevron-down-circle" color="#ed5f8a" width="60" />
            <div className="transfer-status-wrapper">
                <h2 className="eng">{ nftName }</h2>
                <h3>NFT를<br/>전송했어요</h3>
            </div>

            <div className="trasfer-transaction-wrapper"
                onClick={()=>{window.open(`${transactionExplorerUrl}/${transactionId}`)}}
            >
                <h4 className="transfer-transaction-title eng">Transaction</h4>
                <div className="transfer-transaction-id">
                    { transactionId }
                </div>
                <h6 className="transfer0transaction-text">(view on block explorer)</h6>
            </div>

            <div className="transfer-confirm-wrapper">
                <button
                    className="button button--sticky"
                    id="purple"
                    onClick={()=>{navigation(-1)}}
                >
                    확인
                </button>
                <h5 className="transfer-confirm-text">수수료는 Justmint가 냈어요!</h5>
            </div>
        </div>
    )
}
export default TransferComplete;