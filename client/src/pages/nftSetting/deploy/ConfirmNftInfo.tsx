import { NftInfo } from "NftType";
import { useNavigate } from "react-router-dom";
import chainList from "../../../utils/data/chainList";
import MiniHeader from "../../../components/miniHeader/MiniHeader";
import DeployRewardElem from "../../../components/reward/DeployRewardElem";

type confirmNftInfoProp = {
    nftInfo: NftInfo;
    deployNft: Function;
    rewardList: any;
}

function ConfirmNftInfo ({ nftInfo, deployNft, rewardList }:confirmNftInfoProp) {
    const navigation = useNavigate();

    return (
        <div className="confirm-nft-info">
            <MiniHeader 
                title="NFT 발행 정보 확인하기"
            />
            {
                nftInfo &&
                <div className="nft-info-container flex-column-20">
                <div className="nft-info-title">
                    <h3 className="title">NFT 기본 정보</h3>
                    <h6 className="re">발행 이후 수정이 불가합니다.</h6>
                </div>
                <div className="nft-info-wrapper flex-row-15">
                    <img className="nft-image" src={nftInfo.image}/>
                    <div className="nft-info-text-wrapper flex-column-left-10">
                        <h2 className="eng">{ nftInfo.nftName }</h2>
                        <h5 className="nft-info-chain flex-row-6">
                            {
                                chainList.find((el:any)=>el.name===nftInfo.chainType)?.icon
                            }
                            { nftInfo.chainType }
                        </h5>
                    </div>
                </div>
                <div className="nft-info-description">
                    { nftInfo.description }
                </div>

                <div className="nft-info-title">
                    <h3 className="title">NFT 혜택 정보</h3>
                    <h6 className="gn">발행 이후 수정이 가능합니다.</h6>
                </div>
                <div className="reward-container">
                    {
                        rewardList?.length
                        ? rewardList.map((reward:any, idx:number) => (
                            <DeployRewardElem 
                                key={idx}
                                nftId={nftInfo.id}
                                rewardId={reward.id}
                            />
                        ))
                        : <div className="reward-empty">
                            <h3 className="reward-empty-text gr-4">
                                설정한 혜택이 없습니다.
                            </h3>
                        </div>
                    }
                </div>
                <div className="button-wrapper flex-row-10">
                    <button className="button" id="black"
                        onClick={()=>{navigation(-1)}}
                    >
                        이전
                    </button>
                    <button 
                        className="button" 
                        id="purple"
                        onClick={()=>deployNft()}
                    >
                        발행
                    </button>
                </div>
                </div>
            }
        </div>
    )
}
export default ConfirmNftInfo;