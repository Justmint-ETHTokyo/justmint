import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MiniHeader from "../../../components/miniHeader/MiniHeader";
import { Popup } from "../../../components/popup";
import { useNftAdminReward } from "../../../hook/useNftAdminReward";
import { setShowAlertInfo } from "../../../utils/function/showAlert";
import RewardInfoForm from "./RewardInfoForm";

function RewardEdit() {
    const navigation = useNavigate();
    const { nftId, rewardId } = useParams();
    const { rewardInfo, editReward } = useNftAdminReward({ nftId: Number(nftId), rewardId: Number(rewardId) });

    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const editNftReward = async () => {
        try {
            await editReward(name, description);
            setShowConfirmModal(false);
            navigation(-1);
            setShowAlertInfo("혜택이 수정되었습니다.", true);
        } catch(err) {
            setShowAlertInfo("혜택이 수정에 실패했습니다.", false);
        }
    }

    useEffect(()=>{
        setName(rewardInfo?.rewardName || '');
        setDescription(rewardInfo?.description || '');
    }, [rewardInfo])

    return(
        <>
            {
                showConfirmModal &&
                <Popup
                    title="혜택을 수정하시겠습니까?"
                    approve={()=>{editNftReward()}}
                    deny={()=>{setShowConfirmModal(false)}}
                    closeModal={()=>{setShowConfirmModal(false)}}
                />
            }
            <div>
                <MiniHeader
                    title="혜택 수정"
                />
                <RewardInfoForm
                    name={name}
                    description={description}
                    setName={setName}
                    setDescription={setDescription}
                    buttonText="수정하기"
                    submitAction={()=>{setShowConfirmModal(true)}}
                />
            </div>
        </>
    )
}
export default RewardEdit;