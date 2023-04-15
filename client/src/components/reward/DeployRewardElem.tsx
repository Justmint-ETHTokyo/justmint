import { useNftAdminReward } from "../../hook/useNftAdminReward";
import './DeployRewardElem.scss'

type deoployRewardElemProp = {
    nftId: number;
    rewardId: number;
    overflowHidden?: boolean;
}

function DeployRewardElem({ nftId, rewardId, overflowHidden=true }:deoployRewardElemProp) {
    const { rewardInfo } = useNftAdminReward({ nftId: nftId, rewardId: rewardId });

    return (
        <div 
            className="deploy-nft-reward-elem flex-column-left-10"
            id={overflowHidden ? "overflow-hidden" : ""}
        >
            <h3 className="nft-reward-name eng">{ rewardInfo?.rewardName }</h3>
            <h6 className="nft-reward-description gr-4">{ rewardInfo?.description }</h6>
        </div>
    )
}
export default DeployRewardElem;