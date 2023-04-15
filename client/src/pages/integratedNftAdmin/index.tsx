import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NFTApi from "../../apis/NftApi";
import InfoLoading from "../../components/loading/InfoLoading";
import { useIntegratedNft } from "../../hook/useIntegratedNft";
import AdminMenu from "./AdminMenu";
import UpdateSuccess from "./UpdateSuccess";
import './index.scss';

function IntegratedNftAdmin() {
    const { nftId } = useParams();
    const nftApi = new NFTApi();
    const { integratedNftInfo } = useIntegratedNft({ integratedNftId: Number(nftId) });
    const [pageMode, setPageMode] = useState('MENU');

    const updateIntegratedNft = async (checkedNftList: number[]) => {
        setPageMode('LOADING');
        const res = await nftApi.updateIntegratedNft(Number(nftId), checkedNftList);
        setTimeout(() => {
            setPageMode('UPDATE_SUCCESS');
        }, 3000);
    }

    const pageRenderer = () => {
        switch (pageMode) {
            case 'MENU':
                return <AdminMenu 
                    integratedNftInfo={integratedNftInfo}
                    updateIntegratedNft={updateIntegratedNft}
                />
            case 'LOADING':
                return <InfoLoading loadingText={<h3>통합 NFT를<br/>업데이트 하는 중이에요</h3>} />
            case 'UPDATE_SUCCESS':
                return <UpdateSuccess nftId={Number(nftId)}/>
            default:
        }
    }

    useEffect(()=>{
        window.scrollTo(0, 0);
    }, [pageMode])

    return (
        <div className="integratednft-admin"
            style={{width: '-webkit-fill-available'}}
        >
            { pageRenderer() }
        </div>
    )
}
export default IntegratedNftAdmin;