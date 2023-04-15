import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NFTApi from '../../../apis/NftApi';
import { useNft } from '../../../hook/useNft';
import { useNftAdmin } from '../../../hook/useNftAdmin';
import { setShowAlertInfo } from '../../../utils/function/showAlert';
import InfoLoading from '../../../components/loading/InfoLoading';
import ConfirmRewardInfo from './ConfirmRewardInfo';
import DeployRewardSuccess from './DeployRewardSuccess';

function NftDeployReward () {
    const nftApi = new NFTApi();
    const { nftId } = useParams();
    const { nftInfo } = useNft({ nftId: Number(nftId) });
    const { rewardList } = useNftAdmin({ nftId: Number(nftId) });
    const [pageMode, setPageMode] = useState('CONFIRM');
    const [deployInfo, setDeployInfo] = useState<any>();

    const deployNft = async () => {
        try {
            setPageMode('LOADING');
            const res = await nftApi.editDeployNft(Number(nftId));
            setDeployInfo(res);
            setPageMode('SUCCESS');
        } catch(err) {
            setPageMode('CONFIRM');
            setShowAlertInfo('NFT 혜택 업데이트에 실패했습니다.\n 다시 시도해주세요.', false);
        }
    }

    const pageRenderer = () => {
        switch(pageMode) {
            case 'CONFIRM':
                return <ConfirmRewardInfo 
                    deployNft={deployNft}
                    rewardList={rewardList}
                />
            case 'LOADING':
                return <InfoLoading 
                    loadingText={<><b>{ nftInfo.nftName }</b> NFT를<br/>업데이트 하는 중이에요</>}
                />
            case 'SUCCESS':
                return <DeployRewardSuccess 
                    nftInfo={nftInfo}
                    deployInfo={deployInfo}
                />
            default:
        }
    }

    useEffect(()=>{
        window.scrollTo(0, 0);
    }, [pageMode])

    return (
        <div className="nft-setting-deploy">
            { pageRenderer() }
        </div>
    )
}
export default NftDeployReward;