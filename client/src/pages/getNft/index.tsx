import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useNft } from "../../hook/useNft";
import NFTApi from "../../apis/NftApi";
import EmailAuthentication from "./emailAuthentication";
import PhotoAuthentication from "./photoAuthentication";
import './index.scss';
import MiniHeader from "../../components/miniHeader/MiniHeader";


function GetNft() {
    const navigation = useNavigate();
    const nftApi = new NFTApi();
    const { nftId } = useParams();
    const { nftInfo, userOwnThisNft } = useNft({ nftId: Number(nftId) });

    const renderingAuthPage = () => {
        switch (nftInfo?.authType) {
            case 1:
                return <EmailAuthentication nftInfo={nftInfo}/>
            case 2:
                return <PhotoAuthentication nftInfo={nftInfo}/>
        }
    }

    useEffect(()=>{
        if (userOwnThisNft) {
            navigation(`/nft/${nftId}/get/success`);
        }
    }, [userOwnThisNft])

    return (
        <div className="get-badge">
            <MiniHeader 
                title={nftInfo?.nftName}
            />
            { renderingAuthPage() }
        </div>
    )
}
export default GetNft;