import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useNftAdminReward } from "../../../hook/useNftAdminReward";
import { setShowAlertInfo } from "../../../utils/function/showAlert";
import { Popup } from "../../../components/popup";
import MiniHeader from "../../../components/miniHeader/MiniHeader";
import './RewardDetail.scss';

function RewardDetail () {
    const navigation = useNavigate();
    const { nftId, rewardId } = useParams();
    const { rewardInfo, deleteReward } = useNftAdminReward({ nftId: Number(nftId), rewardId: Number(rewardId) });
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const deleteNftReward = async () => {
        try {
            await deleteReward();
            setShowAlertInfo("혜택이 삭제되었습니다.", true);
            navigation(-1);
        } catch(err) {
            setShowAlertInfo("혜택 삭제에 실패했습니다.", false);
        }
    }

    return (
        <>
        {
            showConfirmModal &&
            <Popup
                title={"혜택을 삭제하시겠습니까?"}
                approve={()=>{deleteNftReward(); setShowConfirmModal(false);}}
                deny={()=>{setShowConfirmModal(false)}}
                closeModal={()=>{setShowConfirmModal(false)}}
            />
        }
        <div className="reward-detail-page">
            <MiniHeader
                title="혜택 관리"
            />
            <div className="show-content-smoothly">
                <div className="content-wrapper">
                    <h2 className="title">{ rewardInfo?.rewardName }</h2>
                    <div className="description">{ rewardInfo?.description }</div>
                </div>

                <div className="button-wrapper">
                    <button
                        className="button"
                        id="black"
                        onClick={()=>{setShowConfirmModal(true)}}
                    >
                        삭제
                    </button>
                    <button
                        className="button"
                        id="purple"
                        onClick={()=>{navigation('edit')}}
                    >
                        수정
                    </button>
                </div>
            </div>
        </div>
        </>
    )
}
export default RewardDetail;