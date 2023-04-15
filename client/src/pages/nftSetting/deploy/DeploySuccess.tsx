import { NftInfo } from "NftType";
import { useNavigate } from "react-router-dom";
import { toLocaleTime } from "../../../utils/function/time";
import chainList from '../../../utils/data/chainList';
import Success from "../../../components/success/Success";

type deoploySuccessProp = {
    nftInfo: NftInfo;
    deployInfo: any;
}

function DeoploySuccess({ nftInfo, deployInfo }:deoploySuccessProp) {
    const navigation = useNavigate();

    return (
        <Success
            image={nftInfo.image}
            title={<><b>{ nftInfo.nftName }</b> NFT를<br/> <b>{ nftInfo.chainType }</b> 체인에서<br/> 발행했어요</>}
            buttonText="발행된 NFT 보러가기"
            buttonAction={()=>{navigation(`/nft/${nftInfo.id}/detail`)}}
        >
            <div className="deploy-info-container flex-column-20">
                <h2 className="deploy-info-title eng">Info</h2>
                <div className="deploy-info-row">
                    <h6 className="title gr-4">TX</h6>
                    <h6 
                        className="content underline"
                        onClick={()=>{window.open(`${chainList.find(el=>el.name===nftInfo.chainType)?.explorerUrl}/${deployInfo.transactionHash}`)}}
                    >
                        View TX
                    </h6>
                </div>
                <div className="deploy-info-row">
                    <h6 className="title">Status</h6>
                    <h6 className="content">Success</h6>
                </div>
                <div className="deploy-info-row">
                    <h6 className="title">Date</h6>
                    <h6 className="content">{ toLocaleTime(deployInfo?.date as string) }</h6>
                </div>
            </div>
        </Success>
    )
}
export default DeoploySuccess;