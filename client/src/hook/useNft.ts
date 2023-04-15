import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowAlertInfo } from "../utils/function/showAlert";
import NFTApi from "../apis/NftApi";
import { NftInfo } from "NftType";

type useNftProp = {
    nftId: number
}

export const useNft = ({ nftId }:useNftProp) => {
    const nftApi = new NFTApi();
    const userOwnNftIdList = useSelector((state:any)=>state.nft.ownNftIdList);
    const userCreateNftIdList = useSelector((state:any)=>state.nft.createNftIdList);
    const userTranferNftIdList = useSelector((state:any)=>state.nft.transferNftIdList); 
    const [nftInfo, setNftInfo] = useState<NftInfo>({ id: 0, nftName: '', image: '', numberOfOwners: 0, description: '', numberOfRewards: 0, rewards: [] });
    const [nftOwnerList, setNftOwnerList] = useState([]);
    const [userOwnThisNft, setUserOwnThisNft] = useState(false);
    const [userCreateThisNft, setUserCreateThisNft] = useState(false);
    const [userTransferThisNft, setUserTransferThisNft] = useState(false);
    const [userPhotoPending, setUserPhotoPending] = useState(false);

    useEffect(()=> {
        // 유저가 해당 nft를 가지고 있는 지에 대한 정보 업데이트
        setUserOwnThisNft(userOwnNftIdList.includes(nftId));
    }, [nftId, userOwnNftIdList])

    useEffect(()=> {
        // 유저가 해당 nft를 만들었는 지에 대한 정보 업데이트
        setUserCreateThisNft(userCreateNftIdList.includes(nftId));
    }, [nftId, userCreateNftIdList])

    useEffect(()=>{
        // 유저가 해당 nft를 transfer 했는 지에 대한 정보 업데이트
        setUserTransferThisNft(userTranferNftIdList.includes(nftId));
    }, [nftId, userTranferNftIdList])

    useEffect(()=>{
        const userPhotoVerificationPending = async () => {
            const res = await nftApi.nftPhotoVerificationPending(nftId);
            setUserPhotoPending(res);
        }
        userPhotoVerificationPending();
    }, [])

    useEffect(()=>{
        const getNftInfo = async () => {
            try {
                const res = await nftApi.getNftDetail(nftId);
                setNftInfo(res.data);

                const ownerRes = await nftApi.getNftOwnerList(nftId);
                setNftOwnerList(ownerRes.data);
            } catch(err) {
                setShowAlertInfo('NFT 정보를 불러오는데 실패했습니다.', false);
                console.log(err);
            }
        }
        getNftInfo();
    }, [nftId])

    return {nftInfo, nftOwnerList, userOwnThisNft, userCreateThisNft, userTransferThisNft, userPhotoPending};
}