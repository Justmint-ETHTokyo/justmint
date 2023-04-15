import MiniHeader from "../../../components/miniHeader/MiniHeader";
import DeployRewardElem from "../../../components/reward/DeployRewardElem";

type confirmNftInfoProp = {
    deployNft: Function;
    rewardList: any;
}

function ConfirmRewardInfo ({ deployNft, rewardList }:confirmNftInfoProp) {

    return (
        <div className="confirm-nft-info">
            <MiniHeader 
                title="NFT 혜택 정보 확인하기"
            />
            <div 
                className="flex-column-20 show-content-smoothly"
            >
            <div className="nft-info-title">
                <h3 className="title">NFT 혜택 정보</h3>
                <h6 className="gn">발행 이후 수정이 가능합니다.</h6>
            </div>
            <div className="reward-container flex-column-20">
                {
                    rewardList?.length
                    ? rewardList.map((reward:any, idx:number) => (
                        <DeployRewardElem 
                            key={idx}
                            nftId={reward.nftId}
                            rewardId={reward.id}
                            overflowHidden={false}
                        />
                    ))
                    : <div className="reward-empty">
                        <h3 className="reward-empty-text gr-4">
                            설정한 혜택이 없습니다.
                        </h3>
                    </div>
                }
            </div>
            </div>
            <button 
                className="button button--sticky" 
                id="purple"
                onClick={()=>deployNft()}
            >
                혜택 정보 업데이트 하기
            </button>
        </div>
    )
}
export default ConfirmRewardInfo;