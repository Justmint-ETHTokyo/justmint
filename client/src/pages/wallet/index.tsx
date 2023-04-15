import { useSelector } from "react-redux";
import MenuList from "../../components/menuList/MenuList";
import MiniHeader from "../../components/miniHeader/MiniHeader";
import WalletElem from "./WalletElem";
import { ReactComponent as PlantIcon } from '../../asset/svg/plant.svg';
import { ReactComponent as LockIcon } from '../../asset/svg/lock.svg';
import './index.scss';

function YoursWallet() {
    const wallets = useSelector((state:any)=>state.wallet);
    const menuList = [
        { name: 'Justmint Wallet 입문하기', link: '/wallet/tutorial', icon: <PlantIcon/> },
        { name: '보안 및 프라이버시', link: '/wallet/privacy', icon: <LockIcon/> },
    ]
    const chainList = [
        { name: 'Ethereum /Polygon /Klaytn', chainType: 'Ethereum' },
        { name: 'Solana', chainType: 'Solana' },
        { name: 'Aptos', chainType: 'Aptos' },
    ]

    return (
        <div className="yours-wallet-page">
            <MiniHeader 
                title="Yours Wallet"
            />
            <h3 className="yours-wallet-title">나의 지갑 주소</h3>
            <div className="yours-wallet-container">
            {
                chainList.map((chainInfo:any, idx:number)=>(
                    <WalletElem 
                        title={chainInfo.name}
                        chainType={chainInfo.chainType}
                        address={wallets[chainInfo.chainType]}
                        key={idx}
                    />
                ))
            }
            </div>

            <MenuList 
                menuList={menuList}
            />
        </div>
    )
}
export default YoursWallet;