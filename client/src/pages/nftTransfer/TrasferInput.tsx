import { chainType } from "ChainType";
import { useEffect, useState } from "react";
import { useCheckAddressValidation } from "../../hook/useCheckAddressValidation";
import ChainTextIcon from "../../components/chain/ChainTextIcon";

type trasferInputType = {
    nftImage:string;
    nftName:string;
    nftChainType:chainType;
    transferNft:Function;
    setToAddress:Function;
}
type chainTextType = {
    chainId: string; 
    walletName: string; 
    walletNameEng: string; 
    placeHolder: string
}

function TransferInput({ nftImage, nftName, nftChainType, transferNft, setToAddress }:trasferInputType) {
    const { address, setAddress, isValid, isYoursWallet } = useCheckAddressValidation(nftChainType as chainType)
    const [currChainText, setCurrChainText] = useState<chainTextType>({ chainId: '', walletName: '', walletNameEng: '', placeHolder: '' });
    const chainTextList = [
        { chainId: 'Ethereum', walletName: '메타마스크', walletNameEng: 'Metamask', placeHolder: 'Ex. 0xB5D... (ENS 주소는 지원되지 않습니다)' },
        { chainId: 'Polygon', walletName: '메타마스크', walletNameEng: 'Metamask', placeHolder: 'Ex. 0xB5D... (ENS 주소는 지원되지 않습니다)' },
        { chainId: 'Klaytn', walletName: '메타마스크 또는 카이카스', walletNameEng: 'Metamask 또는 Kaikas', placeHolder: 'Ex. 0xB5D... (ENS 주소는 지원되지 않습니다)' },
        { chainId: 'Solana', walletName: '팬텀', walletNameEng: 'Phantom', placeHolder: 'Ex. 9noqY...' },
        { chainId: 'Aptos', walletName: '페트라 또는 마션', walletNameEng: 'Petra 또는 Martion', placeHolder: 'Ex. 0xbd4...' },
    ]

    useEffect(()=>{
        setToAddress(address);
    }, [address])

    useEffect(()=>{
        setCurrChainText(chainTextList.find(el=>el.chainId===nftChainType) as chainTextType);
    }, [nftChainType])

    return (
        <form onSubmit={(e)=>{e.preventDefault(); transferNft(address)}}>
            <div className="title-wrapper">
                <h2 className="title">어디로 이 NFT를 옮겨갈까요?</h2>
                <h5 className="subtitle">
                    <span className="white">{ currChainText?.walletName } 지갑을 가지고 있을 경우</span><br/> 
                    NFT를 지갑으로 옮겨갈 수 있어요.
                </h5>
            </div>
        
            <img 
                className="nft-image"
                src={nftImage}
            />
            <div className="nft-chain-info">
                <ChainTextIcon chainType={nftChainType}/>
            </div>
            <div className="input-box-wrapper">
                <label className="input-label">{ currChainText?.walletNameEng } 지갑 주소</label>
                <input 
                    className="input-textbox"
                    value={address}
                    placeholder={currChainText?.placeHolder}
                    onChange={(e)=>{setAddress(e.currentTarget.value)}}
                />
                {
                    !!(address.length) &&
                    (
                        isYoursWallet
                        ? <div className="input-status" id="warning">
                            Justmint 지갑으로 옮겨가는 기능은 현재 지원되지 않습니다.
                        </div>
                        : !isValid && 
                        <div className="input-status" id="warning">
                            유효하지 않은 주소입니다.
                        </div>
                    )
                }
            </div>

            <div className="transfer-preview">
                <b>{ nftName }</b> NFT가<br/>
                {
                    address.length
                    ? <span className="transfer-wallet-address">
                        { address }
                    </span>
                    : '...'
                }
                <br/>주소로 전송됩니다.
            </div>
            <div className="transfer-warning">
                잘못된 주소로 전달 되었을 때 복구가 불가능합니다.<br/>
                주소를 다시 한 번 확인해주세요.
            </div>
            
            <button
                className="button button--sticky"
                id="purple"
                disabled={!isValid}
            >
                전송하기
            </button>
        </form>
    )
}
export default TransferInput;