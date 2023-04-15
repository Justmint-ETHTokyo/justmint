import { useEffect, useState } from "react";
import NFTApi from "../apis/NftApi";

type useNftRewardProp = {
    rewardId: number,
    nftId: number,
}

export const useNftReward = ({ rewardId, nftId }:useNftRewardProp) => {
    const nftApi = new NFTApi();
    const [rewardInfo, setRewardInfo] = useState({rewardName:'', description: ''});
    
    const editReward = async (rewardName:string, description:string) => {
        const res = await nftApi.editNftReward(nftId, rewardId, rewardName, description);
        setRewardInfo(res);
    }

    const deleteReward = async () => {
        const res = await nftApi.deleteNftReward(nftId, rewardId);
        return res;
    }

    useEffect(()=>{
        const getNftRewardDetail = async () => {
            const res = await nftApi.getNftRewardDetail(rewardId);
            setRewardInfo(res);
        }

        if (rewardId) {
            getNftRewardDetail();
        }
    }, [rewardId]);


    return { rewardInfo, editReward, deleteReward };
}