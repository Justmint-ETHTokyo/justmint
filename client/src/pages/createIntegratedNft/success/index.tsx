import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { decrypt } from "../../../utils/function/crypto";
import { toLocaleTime } from "../../../utils/function/time";
import { useBackground } from "../../../hook/useBackground";
import Glitter from "../../../components/glitter/Glitter";
import ethereumCard from "../../../asset/image/integratedNft/card/ethereum.png";
import polygonCard from "../../../asset/image/integratedNft/card/polygon.png";
import klaytnCard from "../../../asset/image/integratedNft/card/klaytn.png";
import solanaCard from "../../../asset/image/integratedNft/card/solana.png";
import ethereumCardPreview from "../../../asset/image/integratedNft/preview/card/ethereum.png";
import polygonCardPreview from "../../../asset/image/integratedNft/preview/card/polygon.png";
import klaytnCardPreview from "../../../asset/image/integratedNft/preview/card/klaytn.png";
import solanaCardPreview from "../../../asset/image/integratedNft/preview/card/solana.png";
import './index.scss';
import BlurryLoadingImage from "../../../components/blurryLoadingImage/BlurryLoadingImage";

function Success() {
    const navigation = useNavigate();
    const { integratedNftInfo } = useParams();
    const [nftInfo, setNftInfo] = useState<any>();
    const [nftCard, setNftCard] = useState<any>();
    useBackground({backgroundStyle: 'GRADIENT'});

    const chainCardList = [
        { id: 'Ethereum', image: ethereumCard, preview: ethereumCardPreview },
        { id: 'Polygon', image: polygonCard, preview: polygonCardPreview },
        { id: 'Klaytn', image: klaytnCard, preview: klaytnCardPreview },
        { id: 'Solana', image: solanaCard, preview: solanaCardPreview },
    ]

    useEffect(()=>{
        nftInfo && setNftCard(chainCardList.find((el:any)=>el.id===nftInfo.chainType))
    }, [nftInfo])

    useEffect(()=>{
        setNftInfo(decrypt(integratedNftInfo));
    }, [integratedNftInfo])

    return (
        <div
            className="integrated-nft-create-success"
        >
            <Glitter />
            {
                nftInfo &&
                <div>
                    {
                        nftCard &&
                        <BlurryLoadingImage 
                            preview={nftCard.preview}
                            image={nftCard.image}
                            alt="integrated nft"
                            imageStyleClass="integrated-card-image"
                        />
                    }

                    {/* <img className="integrated-card-image" src={nftCard?.image}/> */}
                    <div className="congratulations">Congratulations!</div>
                    <div
                        className="integrated-nft-text"
                    >
                        통합 NFT를<br/>
                        <b>{ nftInfo.chainType }</b> 체인에서<br/>
                        생성했어요
                    </div>
                    <h2 className="eng integrated-nft-info-title">Info</h2>
                    <div className="integrated-nft-info-wrapper">
                        <div className="integrated-nft-info">
                            <div>Status</div>
                            <div className="integrated-nft-info-content">Success</div>
                        </div>
                        <div className="integrated-nft-info">
                            <div>Date</div>
                            <div className="integrated-nft-info-content">{ toLocaleTime(nftInfo.createdAt) }</div>
                        </div>
                    </div>
                </div>
            }
            <div
                className="button"
                id="purple"
                onClick={()=>{navigation('/mypage')}}
            >
                마이페이지로 가기
            </div>
        </div>
    )
}
export default Success;