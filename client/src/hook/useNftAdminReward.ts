import { useState, useEffect } from "react";
import AdminApi from "../apis/AdminApi";
import NFTApi from "../apis/NftApi";

type useNftAdminRewardProp = {
    rewardId: number,
    nftId: number,
}

export const useNftAdminReward = ({ rewardId, nftId }:useNftAdminRewardProp) => {
    const adminApi = new AdminApi();
    const nftApi = new NFTApi();
    const [rewardInfo, setRewardInfo] = useState<any>();
    
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
            const res = await adminApi.getNftAdminRewardDetail(rewardId);
            setRewardInfo(res);
        }

        if (rewardId) {
            getNftRewardDetail();
        }
    }, [rewardId]);


    return { rewardInfo, editReward, deleteReward };
}