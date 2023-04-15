import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NFTApi from '../../../apis/NftApi';
import { useNft } from '../../../hook/useNft';
import { useNftAdmin } from '../../../hook/useNftAdmin';
import { setShowAlertInfo } from '../../../utils/function/showAlert';
import InfoLoading from '../../../components/loading/InfoLoading';
import ConfirmNftInfo from './ConfirmNftInfo';
import DeoploySuccess from './DeploySuccess';
import './index.scss';

function NftDeploy () {
    const nftApi = new NFTApi();
    const navigation = useNavigate();
    const { nftId } = useParams();
    const { nftInfo } = useNft({ nftId: Number(nftId) });
    const { rewardList } = useNftAdmin({ nftId: Number(nftId) });
    const [pageMode, setPageMode] = useState('CONFIRM');
    const [deployInfo, setDeployInfo] = useState<any>();

    const deployNft = async () => {
        try {
            setPageMode('LOADING');
            const res = await nftApi.deployNft(Number(nftId));
            setDeployInfo(res);
            setPageMode('SUCCESS');
        } catch(err) {
            setPageMode('CONFIRM');
            setShowAlertInfo('NFT 배포에 실패했습니다.\n 다시 시도해주세요.', false);
        }
    }

    const pageRenderer = () => {
        switch(pageMode) {
            case 'CONFIRM':
                return <ConfirmNftInfo 
                    nftInfo={nftInfo}
                    deployNft={deployNft}
                    rewardList={rewardList}
                />
            case 'LOADING':
                return <InfoLoading 
                    loadingText={<><b>{ nftInfo.nftName }</b> NFT를<br/> <b>{ nftInfo.chainType }</b> 체인에서<br/> 발행하는 중이에요</>}
                />
            case 'SUCCESS':
                return <DeoploySuccess 
                    nftInfo={nftInfo}
                    deployInfo={deployInfo}
                />
            default:
        }
    }

    useEffect(()=>{
        // pageMode가 바뀔 때마다 스크롤 초기화
        window.scrollTo(0, 0);
    }, [pageMode])

    useEffect(()=>{
        if (nftInfo?.isDeployed) {
            // 이미 발행 된 NFT라면, 이전 페이지로 가도록 함
            navigation(-1);
        }
    }, [nftInfo])

    return (
        <div className="nft-setting-deploy">
            { pageRenderer() }
        </div>
    )
}
export default NftDeploy;