import { useNavigate, useParams } from "react-router-dom";
import { useNft } from "../../hook/useNft";
import MiniHeader from "../../components/miniHeader/MiniHeader";
import './index.scss';

function NftSetting() {
    const navigation = useNavigate();
    const { nftId } = useParams();
    const { nftInfo } = useNft({ nftId: Number(nftId) });
    const settingInfoList = [
        { name: '혜택 관리', location: 'reward' },
        { name: '인증 관리', location: 'admin' },
    ]

    return (
        <div className="nft-setting">
            <MiniHeader 
                title={"Setting"}
            />
            <div className="nft-setting-content-wrapper show-content-smoothly">
                <img className="nft-image" src={nftInfo?.image}/>
                <h2 className="nft-name eng">{ nftInfo?.nftName }</h2>
                <div className="setting-button-wrapper">
                {
                    settingInfoList.map((settingInfo, idx) => (
                        <button
                            key={idx}
                            onClick={()=>{navigation(settingInfo.location)}}
                        >
                            <h3>{ settingInfo.name }</h3>
                        </button>
                    ))
                }
                </div>
            </div>
        </div>
    )
}
export default NftSetting;