import { useState, useEffect } from "react";
import NFTApi from "../apis/NftApi";
import { setShowAlertInfo } from "../utils/function/showAlert";

type useIntegratedNftProp = {
    integratedNftId: number;
}

export const useIntegratedNft = ({ integratedNftId }:useIntegratedNftProp) => {
    const nftApi = new NFTApi();
    const [integratedNftInfo, setIntegratedNftInfo] = useState<any>(null);

    useEffect(()=>{
        const getIntegratedNftInfo = async () => {
            try {
                const res = await nftApi.getIntegratedNftDetail(integratedNftId);
                setIntegratedNftInfo(res);
            } catch(err) {
                setShowAlertInfo("통합 NFT 정보를 불러오는 데 실패했습니다.", false);
            }
        }

        getIntegratedNftInfo();
    }, [integratedNftId])

    return { integratedNftInfo };
}