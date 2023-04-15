import ConfirmMnemonic from "../../components/confirmMnemonic";
import MiniHeader from "../../components/miniHeader/MiniHeader";

function WalletPrivacyCheckMnemonic() {

    return (
        <div>
            <MiniHeader 
                title="비밀구문 확인하기"
            />
            <ConfirmMnemonic />
        </div>
    )
}
export default WalletPrivacyCheckMnemonic;