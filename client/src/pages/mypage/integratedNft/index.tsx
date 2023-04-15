import { useNavigate } from 'react-router-dom';
import { ReactComponent as EthereumIcon } from '../../../asset/svg/chain/ethereum.svg';
import { ReactComponent as PolygonIcon } from '../../../asset/svg/chain/polygon.svg';
import { ReactComponent as KlaytnIcon } from '../../../asset/svg/chain/klaytn.svg';
import { ReactComponent as SolanaIcon } from '../../../asset/svg/chain/solana.svg';
import { ReactComponent as AptosIcon } from '../../../asset/svg/chain/aptos.svg';
import { ReactComponent as PlusIcon } from '../../../asset/svg/plus-circle.svg';
import './index.scss';
import { useSelector } from 'react-redux';

function IntegratedNftContainer() {
    const navigation = useNavigate();
    const integratedNftList = useSelector((state:any)=>state.nft.integratedNftList);
    const chainIconColorList = [
        { chain: 'Ethereum', color: 'linear-gradient(227.26deg, #0D041A 25.99%, #2F1060 231.45%)', icon: <EthereumIcon /> },
        { chain: 'Polygon', color: 'linear-gradient(227.26deg, #7D61EE 25.99%, #3A2FC1 231.45%)', icon: <PolygonIcon /> },
        { chain: 'Klaytn', color: 'linear-gradient(227.26deg, #C62E34 25.99%, #863466 231.45%)', icon: <KlaytnIcon /> },
        { chain: 'Solana', color: 'linear-gradient(227.26deg, #6185EE 25.99%, #584FC7 231.45%)', icon: <SolanaIcon /> },
        { chain: 'Aptos', color: 'linear-gradient(214.98deg, #9CE4DF 20.58%, #0B3B7B 111.42%)', icon: <AptosIcon /> },
    ]

    return (
        <div className="integrated-nft-container">
            {
                integratedNftList.length
                ? <>
                <div className="integrated-nft-button-wrapper">
                    <button
                        className="integrated-nft-button"
                        style={{background: 'linear-gradient(227.26deg, rgba(97, 133, 238, 0.4) 25.99%, rgba(88, 79, 199, 0.4) 231.45%)'}}
                        onClick={()=>{navigation('/integrated-nft/create')}}
                    >
                        <PlusIcon />
                    </button>
                </div>
                {
                    integratedNftList.map((nft:any, idx:number)=>(
                        <div className="integrated-nft-button-wrapper">
                        <button
                            className="integrated-nft-button"
                            id={nft.chainType}
                            key={idx}
                            style={{background: chainIconColorList.find((el:any)=>el.chain===nft.chainType)?.color}}
                            onClick={()=>{navigation(`/integrated-nft/${nft.integratedNftId}`)}}
                        >
                            <span className="integrated-nft-name">YOURS #{nft.integratedNftId.toString().padStart(4, '0')}</span>
                            { chainIconColorList.find((el:any)=>el.chain===nft.chainType)?.icon }
                        </button>
                        </div>
                    ))
                }
                </>
                : <button
                    className="integrated-nft-button create-nft"
                    onClick={()=>{navigation('/integrated-nft/create')}}
                >
                    Create<br/>Integrated<br/>NFT
                </button>
            }
        </div>
    )
}
export default IntegratedNftContainer;