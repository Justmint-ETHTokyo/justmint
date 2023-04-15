import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserApi from "../../apis/UserApi";
import { ReactComponent as WalletIcon } from "../../asset/svg/wallet.svg";

function YoursWalletButton () {
    const userApi = new UserApi();
    const navigation = useNavigate();
    const [completedQuest, setCompletedQuest] = useState(false);

    useEffect(()=>{
        const getUserCompletedQuest = async () => {
            const _completed = await userApi.getUserCompletedQuest();
            setCompletedQuest(_completed);
        }
        getUserCompletedQuest();
    }, [])

    return (
        <button
            className="yours-wallet-button"
            onClick={()=>{
                completedQuest ? navigation('/wallet') : navigation('/wallet/tutorial');
            }}
        >
            <WalletIcon />
            {
                !completedQuest && <div className="wallet-alert">1</div>
            }
        </button>
    )
}
export default YoursWalletButton;