import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useIntegratedNft } from "../../hook/useIntegratedNft";
import { useBackground } from "../../hook/useBackground";
import { useSelector } from "react-redux";
import { toLocaleTime } from "../../utils/function/time";
import chainList from '../../utils/data/chainList';

import MiniHeader from "../../components/miniHeader/MiniHeader";
import ShareButton from "../../components/share/ShareButton";
import IncludedNft from "../../components/integratedNft/IncludedNft";
import RewardElem from "../../components/reward";
import BlurryLoadingImage from "../../components/blurryLoadingImage/BlurryLoadingImage";

import ethereumCard from '../../asset/image/integratedNft/card-blank/ethereum.png';
import polygonCard from '../../asset/image/integratedNft/card-blank/polygon.png';
import klaytnCard from '../../asset/image/integratedNft/card-blank/klaytn.png';
import solanaCard from '../../asset/image/integratedNft/card-blank/solana.png';
import ethereumCardPreview from '../../asset/image/integratedNft/preview/card-blank/ethereum.png';
import polygonCardPreview from '../../asset/image/integratedNft/preview/card-blank/polygon.png';
import klaytnCardPreview from '../../asset/image/integratedNft/preview/card-blank/klaytn.png';
import solanaCardPreview from '../../asset/image/integratedNft/preview/card-blank/solana.png';
import { ReactComponent as SettingIcon } from '../../asset/svg/setting.svg';
import './index.scss';

function IntegratedNftDetail() {
    const navigation = useNavigate();
    const integratedNftList = useSelector((state:any)=>state.nft.integratedNftList);
    const { nftId } = useParams();
    const { integratedNftInfo } = useIntegratedNft({ integratedNftId: Number(nftId) });
    useBackground({backgroundStyle: 'SPACE'});

    const [isMyNft, setIsMyNft] = useState(false);
    const [currCard, setCurrCard] = useState<any>();

    const chainCardList = [
        { chain: 'Ethereum', image: ethereumCard, preview: ethereumCardPreview },
        { chain: 'Polygon', image: polygonCard, preview: polygonCardPreview },
        { chain: 'Klaytn', image: klaytnCard, preview: klaytnCardPreview },
        { chain: 'Solana', image: solanaCard, preview: solanaCardPreview },
    ]

    useEffect(()=>{
        integratedNftInfo && 
        setCurrCard(chainCardList.find((el:any)=>el.chain===integratedNftInfo.chainType))
    }, [integratedNftInfo])

    useEffect(()=>{
        integratedNftList && 
        setIsMyNft(integratedNftList.find((el:any)=>el.integratedNftId===Number(nftId)) ? true : false)
    }, [integratedNftList, nftId])

    return (
        <div className="integratednft-detail">
            {
                integratedNftInfo &&
                <>
                <MiniHeader 
                    title={`Yours #${integratedNftInfo.id.toString().padStart(4,'0')}`}
                >
                    <>
                    {
                        isMyNft && <SettingIcon 
                            className="setting-icon"
                            onClick={()=>{navigation("admin")}}
                        />
                    }
                    </>
                </MiniHeader>
                <div 
                    className="show-content-smoothly flex-column-23"
                    style={{width: '-webkit-fill-available'}}
                >
                    {
                        currCard &&
                        <div
                            className="integratednft-card-wrapper"
                        >
                            <BlurryLoadingImage 
                                preview={currCard.preview}
                                image={currCard.image}
                                alt="integratednft-card"
                                imageStyleClass="integratednft-card-img"
                            />
                            <div className="integratednft-card-text">
                                <div>Owned by yoursnftme</div>
                                <h3 className="eng">YOURS #{integratedNftInfo.id.toString().padStart(4,'0')}</h3>
                                <div>Date</div>
                                <div>{ toLocaleTime(integratedNftInfo.createdAt) }</div>
                            </div>
                        </div>
                    }

                    <div className="flex-row-10">
                        <div className="chain-info flex-row-6">
                            { chainList.find((el:any)=>el.name===integratedNftInfo.chainType)?.icon }
                            <h5 className="eng">{ integratedNftInfo.chainType }</h5>
                        </div>
                        <ShareButton />
                    </div>

                    <div 
                        className="creator-info flex-column-left-4"
                        style={{width: "-webkit-fill-available"}}
                    >
                        <div className="flex-row-5">
                            <h6 className="gr-4">Created by</h6>
                            <h6>{ integratedNftInfo.userName }</h6>
                        </div>
                        <div className="flex-row-5">
                            <h6 className="gr-4">Owned by</h6>
                            <h6>{ integratedNftInfo.userName }</h6>
                        </div>
                    </div>

                    <div className="integrated-nft-content-container">
                        <div className="title-wrapper">
                            <h2 className="title eng">Info</h2>
                        </div>
                        <div className="content-wrapper flex-column-15">
                            <div className="nft-info flex-row-5">
                                <h5>Date</h5>
                                <h5 className="nft-info-text">{ toLocaleTime(integratedNftInfo.createdAt) }</h5>
                            </div>
                            <div className="nft-info flex-row-5">
                                <h5>Chain</h5>
                                <h5 className="nft-info-text">{ integratedNftInfo.chainType }</h5>
                            </div>
                        </div>
                    </div>

                    <div className="integrated-nft-content-container">
                        <div className="title-wrapper flex-row-10">
                            <h2 className="title eng">Included NFT</h2>
                            <h5 className="content-length">{ integratedNftInfo?.nftArray.length }</h5>
                        </div>
                        <div className="content-wrapper flex-column-10">
                            {
                                integratedNftInfo?.nftArray.map((nft:any, index:number)=>(
                                    <IncludedNft 
                                        nftInfo={nft}
                                    />
                                ))
                            }
                        </div>
                    </div>

                    <div className="integrated-nft-content-container">
                        <div className="title-wrapper flex-row-10">
                            <h2 className="title eng">Benefit</h2>
                            <h5 className="content-length">{ integratedNftInfo?.rewardArray.length }</h5>
                        </div>
                        <div className="content-wrapper flex-column-10">
                            {
                                integratedNftInfo?.rewardArray.length
                                ? integratedNftInfo?.rewardArray.map((reward:any, index:number)=>(
                                    <RewardElem 
                                        nftName={reward.nftName}
                                        nftId={reward.nftId}
                                        reward={reward}
                                    />
                                ))
                                : <div className="content-empty">보유한 혜택이 없습니다.</div>
                            }
                        </div>
                    </div>
                </div>
                </>
            }
        </div>
    )
}
export default IntegratedNftDetail;