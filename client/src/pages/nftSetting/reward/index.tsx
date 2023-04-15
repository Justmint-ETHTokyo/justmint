import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useNft } from "../../../hook/useNft";
import { useNftAdmin } from "../../../hook/useNftAdmin";
import MiniHeader from "../../../components/miniHeader/MiniHeader";
import MessageBox from "../../../components/messageBox/MessageBox";
import { ReactComponent as PlusIcon } from "../../../asset/svg/plus.svg";
import './index.scss';

function NftRewardSetting() {
    const navigation = useNavigate();
    const { nftId } = useParams();
    const { nftInfo } = useNft({ nftId: Number(nftId) });
    const { rewardList } = useNftAdmin({ nftId: Number(nftId) });
    const [showMessage, setShowMessage] = useState(true);

    return (
        <div className="nft-setting-reward">
            <MiniHeader 
                title={"혜택 관리"}
            />
            <h2 className="title">
                혜택 <span className="reward-length">{ rewardList?.length }</span>
            </h2>
            <div className="nft-setting-reward-wrapper show-content-smoothly">
                {
                    !!(rewardList?.length)
                    ? <>
                    {
                        rewardList.map((reward:any, idx:number) => (
                            <div 
                                className="nft-reward-elem" 
                                key={idx}
                                onClick={()=>{navigation(`${reward.id}`)}}
                            >
                                <h3 className="nft-reward-name">{ reward.rewardName }</h3>
                            </div>
                        ))
                    }
                    <div className="reward-add-button-wrapper">
                        <button
                            className="reward-add-button"
                            onClick={()=>{navigation('add')}}
                        >
                            <PlusIcon />
                            <h5>혜택 추가하기</h5>
                        </button>
                    </div>
                    </>
                    : <div className="reward-empty">
                        <h3 className="reward-empty-text">
                            이 NFT는 혜택이 없습니다!<br/>
                            혜택을 설정하러 가볼까요?
                        </h3>
                        <button
                            className="reward-add-button"
                            onClick={()=>{navigation('add')}}
                        >
                            <PlusIcon />
                            <h5>혜택 추가하기</h5>
                        </button>
                    </div>
                }
            </div>
            {
                !(nftInfo?.isDeployed)
                // nft가 배포된 적이 없는 경우
                ? <div className="deploy-button-wrapper">
                    {
                        showMessage &&
                        <div className="deploy-button-message">
                            <MessageBox 
                                message="해당 페이지에서 NFT 홀더들에게 제공할 혜택을 설정할 수 있습니다. 지금 설정하지 않아도 NFT 민팅 후에 혜택을 추가할 수 있으며 삭제 및 수정이 가능합니다. 단, 그에 따른 트랜잭션 수수료 및 고객과의 신뢰에 대한 책임은 NFT 생성자가 부담하게 됩니다."
                                closeMessage={()=>setShowMessage(false)}
                            />
                        </div>
                    }
                    <button
                        className="button"
                        id="purple"
                        onClick={()=>{navigation(`/nft/${nftId}/setting/deploy`)}}
                    >
                        다음
                    </button>
                </div>
                // nft가 배포된 적이 있는 경우 - reward 수정
                : <div className="deploy-button-wrapper">
                    {
                        showMessage &&
                        <div className="deploy-button-message">
                            <MessageBox 
                                message="해당 페이지에서 NFT 홀더들에게 제공할 혜택을 설정할 수 있습니다. 지금 설정하지 않아도 NFT 민팅 후에 혜택을 추가할 수 있으며 삭제 및 수정이 가능합니다. 단, 그에 따른 트랜잭션 수수료 및 고객과의 신뢰에 대한 책임은 NFT 생성자가 부담하게 됩니다."
                                closeMessage={()=>setShowMessage(false)}
                            />
                        </div>
                    }
                    <button
                        className="button"
                        id="purple"
                        onClick={()=>{navigation(`/nft/${nftId}/setting/deploy/reward`)}}
                        disabled={!(nftInfo?.isEdited)}
                    >
                        수정된 정보 NFT에 적용하기
                    </button>
                </div>
            }

        </div>
    )
}
export default NftRewardSetting;