import { useEffect } from 'react';
import { useBackground } from '../../hook/useBackground';
import BlurryLoadingImage from '../../components/blurryLoadingImage/BlurryLoadingImage';
import integratedNftPreviewImage from '../../asset/image/integratedNft/preview/integrated-nft.png';
import integratedNftImage from '../../asset/image/integratedNft/integrated-nft.png';
import './Intro.scss';

type IntroProps = {
    goToInputPage: () => void;
}

function Intro({ goToInputPage }:IntroProps) {
    useBackground({ backgroundStyle: 'SPACE' });

    useEffect(()=>{
        const appContent = document.getElementById('app-content');
        if (appContent) {
            appContent.style.overflowX = 'hidden';
        }

        return (()=>{
            if (appContent) {
                appContent.style.overflowX = 'visible';
            }
        })
    }, [])

    return (
        <div className="create-integratednft-intro">
            <div className="title-wrapper">
                <div className="title">INTEGRATED NFT</div>
                <div className="description">
                    단 하나의 NFT로 내가 가지고 있는 NFT들에 대한<br/>
                    소유권을 인증하고 혜택을 사용해보세요.
                </div>
            </div>

            <div className="nft-wrapper">
                <div className="nft-blank move-right"/>
                <div className="nft-blank move-left"/>
                <BlurryLoadingImage 
                    preview={integratedNftPreviewImage}
                    image={integratedNftImage}
                    alt="integrated nft"
                    imageStyleClass="nft-integrated"
                    bgColor = 'transparent'
                />
            </div>

            <div className="intro-description">
                <b className="green">최초 1회</b><br/>
                <b>Justmint가 발행 수수료를 전액 지원해요!</b><br/>
                이후에는 업데이트 할 수 있어요.
            </div>
            
            <button
                className="goto-create-button"
                onClick={()=>goToInputPage()}
            >
                Create Integrated NFT
            </button>
        </div>
    )
}
export default Intro;