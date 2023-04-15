import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux";
import { NftInfo } from "NftType";
import { copyToClipboard } from '../../utils/function/linkShare';
import { ReactComponent as MoreView } from "../../asset/svg/three-dots.svg";
import { ReactComponent as SendIcon } from "../../asset/svg/send.svg";
import { ReactComponent as CopyIcon } from "../../asset/svg/copy.svg";
import './NftElem.scss';
import { useEffect, useRef, useState } from "react";
import NftElemLoading from "./NftElemLoading";

type nftElemProps = {
    nftInfo:NftInfo
}

function NftElem ({ nftInfo }:nftElemProps) {
    const [loading, setLoading] = useState(true);
    const ownNftIdList = useSelector((state:any)=>state.nft.ownNftIdList);
    const navigation = useNavigate();

    useEffect(()=>{
        setTimeout(()=>{
            setLoading(false);
        }, 1500)
    }, [])

    return (
        <>
        {
            loading
        ? <NftElemLoading />
        : <div 
            className="nft-elem-wrapper"
        >
            <div onClick={()=>{navigation(`/nft/${nftInfo.id}/detail`)}}>
                <img className="nft-image" src={nftInfo.image}/>
                <div className="nft-elem-body">
                    <h4 className="nft-name eng">{ nftInfo.nftName }</h4>
                    <div className="nft-reward-length">포함된 혜택 수 : { nftInfo.rewards }</div>
                </div>
            </div>
            <div className="nft-elem-footer">
                <button 
                    className="nft-more-view"
                    onTouchStart={(e)=>{e.currentTarget.focus()}}
                >
                    <MoreView className="more-view-icon"/>
                    <div className="nft-more-view-wrapper">
                        {
                            !!(ownNftIdList.includes(nftInfo.id)) &&
                            <div className="nft-more-view-elem" 
                                onClick={()=>{navigation(`/nft/${nftInfo.id}/transfer`)}}
                                onTouchStart={()=>{navigation(`/nft/${nftInfo.id}/transfer`)}}
                            >
                                <SendIcon /> Transfer
                            </div>
                        }

                        <div className="nft-more-view-elem" 
                            onClick={()=>{copyToClipboard(`${window.location.origin}/nft/${nftInfo.id}`, nftInfo.nftName)}}
                            onTouchStart={()=>{copyToClipboard(`${window.location.origin}/nft/${nftInfo.id}`, nftInfo.nftName)}}
                        >
                            <CopyIcon /> Copy link
                        </div>
                    </div>
                </button>
            </div>
        </div>
        }
        </>
    )
}
export default NftElem;