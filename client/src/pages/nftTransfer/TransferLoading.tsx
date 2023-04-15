import { Icon } from '@iconify/react';

type transferLoadingProp = {
    nftName:string;
}

function TransferLoading({ nftName }:transferLoadingProp) {
    return (
        <div className="trasfer-status-container">
            <Icon 
                icon="line-md:loading-alt-loop" 
                width="60"
                color="#ed5f8a"
            />
            <div className="transfer-status-wrapper">
                <h2 className="eng">{ nftName }</h2>
                <h3>NFT를<br/>전송하는 중이에요</h3>
            </div>

            <h5>지금 지갑으로 전송해도<br/>Justmint 마이페이지에서 계속 확인할 수 있어요.</h5>
            <h6 className="transfer-warning">네트워크 환경에 따라 시간이 소요될 수 있습니다.</h6>
        </div>
    )
}
export default TransferLoading;