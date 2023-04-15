import { useNavigate } from 'react-router-dom';
import './IncludedNft.scss';

type includedNftProps = {
    nftInfo: any;
    disabled?: boolean;
}

function IncludedNft({ nftInfo, disabled=false }:includedNftProps) {
    const navigation = useNavigate();

    return (
        <div 
            className="included-nft-wrapper flex-row-14"
            id={disabled ? "disabled" : ""}
            onClick={()=>{!disabled && navigation(`/nft/${nftInfo.nftId}/detail`)}}
        >
            <img src={ nftInfo.nftImage }/>
            <h4 className="eng">{ nftInfo.nftName }</h4>
        </div>
    )
}
export default IncludedNft;