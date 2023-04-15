
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Wallet } from "ethers";
import { useNft } from "../../hook/useNft";
import { arrayify } from "ethers/lib/utils";
import { setShowAlertInfo } from "../../utils/function/showAlert";
import { chainType } from "ChainType";
import chainList from "../../utils/data/chainList";
import NFTApi from "../../apis/NftApi";
import MiniHeader from "../../components/miniHeader/MiniHeader";
import TransferInput from "./TrasferInput";
import TransferLoading from "./TransferLoading";
import TransferComplete from "./TransferComplete";
import EnterPassCode from "./EnterPassCode";
import './index.scss';

type transferStatusType = 'INPUT'|'PASSCODE'|'LOADING'|'COMPLETE';

function NftTransfer() {
    const nftApi = new NFTApi();
    const { nftId } = useParams();
    const { nftInfo } = useNft({ nftId: Number(nftId) });
    const [transferStatus, setTransferStatus] = useState<transferStatusType>('INPUT');
    const [txId, setTxId] = useState('');
    const [toAddress, setToAddress] = useState('');

    useEffect(()=>{
        window.scrollTo(0,0);
    }, [transferStatus])

    /**
     * @description transferStatus에 따라 다른 컴포넌트를 렌더링합니다.
     * @returns JSX.Element
     */
    const renderTransferComponent = () => {
        switch(transferStatus) {
            case 'INPUT':
                return <TransferInput
                    nftImage={nftInfo?.image}
                    nftName={nftInfo?.nftName}
                    nftChainType={nftInfo?.chainType as chainType}
                    transferNft={transferNft}
                    setToAddress={setToAddress}
                />;
            case 'PASSCODE':
                return <EnterPassCode 
                    nftChainType={nftInfo?.chainType as chainType}
                    makeSignature={makeSignature}
                />
            case 'LOADING':
                return <TransferLoading
                    nftName={nftInfo?.nftName}
                />
            case 'COMPLETE':
                return <TransferComplete 
                    nftName={nftInfo?.nftName}
                    transactionExplorerUrl={chainList.find(el=>el.name===nftInfo?.chainType)?.explorerUrl}
                    transactionId={txId}
                /> 
        }
    }

    const makeSignature = async (privateKey:string) => {
        try {
            setTransferStatus('LOADING');
            const userOpData = await nftApi.getTransferOpInfo(Number(nftId), toAddress);
            let userOp = userOpData.transferOp;
            const message = arrayify(userOpData.message);
            const signer = new Wallet(privateKey);
            userOp.signature = await signer.signMessage(message);
            console.log(userOp);
            
            const res = await nftApi.sendTransferOp(Number(nftId), userOp);
            setTxId(res.transactionHash);
            setTransferStatus('COMPLETE');
        } catch(err) {
            console.log(err);
            setShowAlertInfo('서명에 실패했습니다.\n다시 시도해주세요.', false);
            setTransferStatus('INPUT');
        }
    }

    const transferNft = async (address:string) => {
        setTransferStatus('PASSCODE');
    }

    return (
        <div className="nft-transfer">
            <MiniHeader
                title="Transfer"
            />
            { renderTransferComponent() }
        </div>
    )
}
export default NftTransfer;