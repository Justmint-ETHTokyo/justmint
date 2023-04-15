import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NFTApi from "../../../apis/NftApi";
import MiniHeader from "../../../components/miniHeader/MiniHeader";
import { Popup } from "../../../components/popup";
import { setShowAlertInfo } from "../../../utils/function/showAlert";
import RewardInfoForm from "./RewardInfoForm";

function AddReward() {
    const navigation = useNavigate();
    const nftApi = new NFTApi();
    const { nftId } = useParams();
    const [rewardName, setRewardName] = useState('');
    const [rewardDescription, setRewardDescription] = useState('');
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const addReward = async () => {
        try {
            await nftApi.createNftReward(Number(nftId), rewardName, rewardDescription);
            navigation(-1);
            setShowAlertInfo("혜택이 생성되었습니다.", true);
        } catch (err) {
            setShowAlertInfo("혜택 생성에 실패했습니다.", true);
        }
    }

    return (
        <>
        {
            showConfirmModal &&
            <Popup
                title={"해당 혜택을 등록하시겠습니까?"}
                closeModal={()=>{setShowConfirmModal(false)}}
                approve={()=>{addReward()}}
                deny={()=>{setShowConfirmModal(false)}}
            />
        }
        <MiniHeader 
            title={"혜택 추가"}
        />
        <RewardInfoForm
            name={rewardName}
            setName={setRewardName}
            description={rewardDescription}
            setDescription={setRewardDescription}
            submitAction={()=>{setShowConfirmModal(true)}}
            buttonText={"혜택 추가하기"}
        />
        </>
    )
}
export default AddReward;