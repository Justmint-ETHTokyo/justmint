import EthereumLogo from "../../asset/image/chain/Ethereum.png";
import KlaytnLogo from "../../asset/image/chain/Klaytn.png";
import PolygonLogo from "../../asset/image/chain/Polygon.png";
import { ReactComponent as EthereumIcon } from "../../asset/svg/chain/ethereum.svg";
import { ReactComponent as KlaytnIcon } from "../../asset/svg/chain/klaytn.svg";
import { ReactComponent as PolygonIcon } from "../../asset/svg/chain/polygon.svg";

const chainList = [
    { name: "Ethereum", logo: EthereumLogo, icon: <EthereumIcon/>, explorerUrl: 'https://sepolia.etherscan.io/tx' },
    { name: "Klaytn", logo: KlaytnLogo, icon: <KlaytnIcon/>, explorerUrl: 'https://baobab.scope.klaytn.com/tx' },
    { name: "Polygon", logo: PolygonLogo, icon: <PolygonIcon/>, explorerUrl: 'https://polygonscan.com/tx' },
]
export default chainList;