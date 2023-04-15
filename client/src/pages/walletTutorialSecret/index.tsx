import { useNavigate } from "react-router-dom";
import { setShowAlertInfo } from "../../utils/function/showAlert";
import UserApi from "../../apis/UserApi";
import MiniHeader from "../../components/miniHeader/MiniHeader";
import ConfirmMnemonic from "../../components/confirmMnemonic";


function WalletTutorialSecret() {
    const navigation = useNavigate();
    const userApi = new UserApi();

    const completeQuest = async () => {
        try {
            await userApi.completeQuest();
            navigation('/mypage', { state: { completeQuest: true } });
        } catch(err) {
            setShowAlertInfo('퀘스트 달성에 실패했습니다. 다시 시도해주세요.', false);
        }
    }

    return (
        <div className="wallet-tutorial-secret">
            <MiniHeader 
                title="Quest.2 비밀구문 저장하기"
            />
            <ConfirmMnemonic 
                completeButtonText="Quest 완료하기"
                setCompleteAction={completeQuest}
            />
        </div>
    )
}
export default WalletTutorialSecret;