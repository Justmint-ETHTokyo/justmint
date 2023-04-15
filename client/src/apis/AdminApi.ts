import { get, put } from "./AxiosCreate";

class AdminApi {
    getNftAdminPhotoList = async (nftId:number) => {
        const res = await get(`admin/${nftId}`);
        return res.data;
    }
    
    approveNftAdminPhoto = async (applicationId:number, approve:boolean, reason="") => {
        const res = await put(`admin`, {
            tableId: applicationId,
            type: approve,
            reason: reason
        });
        return res.data;
    }

    getNftAdminRewardList = async (nftId:number) => {
        const res = await get(`admin/${nftId}/reward`);
        return res.data.data;
    }

    getNftAdminRewardDetail = async (rewardId:number) => {
        const res = await get(`admin/${rewardId}/reward/detail`);
        return res.data.data;
    }
}
export default AdminApi;