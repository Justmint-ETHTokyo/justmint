import { useEffect, useState } from "react"
import AdminApi from "../apis/AdminApi"

type useNftAdminProp = {
    nftId: number
}

export const useNftAdmin = ({ nftId }:useNftAdminProp) => {
    const adminApi = new AdminApi();
    const [rewardList, setRewardList] = useState<any>();

    useEffect(()=>{
        const getNftRewardList = async () => {
            const res = await adminApi.getNftAdminRewardList(nftId);
            setRewardList(res);
        }

        getNftRewardList();
    }, [nftId])

    return { rewardList };
}