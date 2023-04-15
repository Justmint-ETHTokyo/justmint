import { useState, useEffect } from "react";
import { chainType } from "ChainType";
import NFTApi from '../apis/NftApi';
import { useSelector } from "react-redux";

type useCreateIntegratedNftProp = {
    chain: chainType | null;
}

export const useCreateIntegratedNft = ({ chain }:useCreateIntegratedNftProp) => {
    const nftApi = new NFTApi();
    const integratedNftList = useSelector((state:any)=>state.nft.integratedNftList);
    const [availableNftList, setAvailableNftList] = useState<any[]>([])
    const [checkedNftList, setCheckedNftList] = useState<number[]>([])
    const [userHasNftChinList, setUserHasNftChinList] = useState<string[]>();

    const addCheckedNft = (nftId: number) => {
        setCheckedNftList([...checkedNftList, nftId]);
    }

    const removeCheckedNft = (nftId: number) => {
        setCheckedNftList(checkedNftList.filter((id) => id !== nftId));
    }

    useEffect(()=>{
        let temp = [];
        for (let el of integratedNftList) {
            temp.push(el.chainType);
        }
        setUserHasNftChinList(temp);
    }, [integratedNftList])

    useEffect(()=>{
        if (chain) {
            const getAvailableNftList = async () => {
                // chain 별 통합할 수 있는 NFT 가져오는 코드
                const res = await nftApi.getIntegratedAvailableNftList(chain);
                setAvailableNftList(res);   
            }
    
            getAvailableNftList();
        }

    }, [chain])

    return { availableNftList, userHasNftChinList, checkedNftList, setCheckedNftList, addCheckedNft, removeCheckedNft };
}