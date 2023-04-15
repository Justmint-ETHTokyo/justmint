import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import NFTApi from "../../apis/NftApi";
import Loading from "../../components/loading";
import './index.scss';

function NftEmailVerify() {
    const navigation = useNavigate();
    const nftApi = new NFTApi();
    const myId = useSelector((state:any)=>state.userData.myId);
    const [searchParams, setSearchParams] = useSearchParams();
    const [nftId, setNftId] = useState(0);
    const [nftUserId, setNftUserId] = useState(0);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(true);

    const verifyBadgeByEmail = async () => {
        const code = searchParams.get('code');
        setLoading(true);
        try {
            const res = await nftApi.verifyNftByEmail(code);
            setLoading(false);
            setNftId(res.data.nftId);
            setNftUserId(res.data.userId);
            setSuccess(true);
        } catch(err) {
            // 2) nft 받는 데 실패 시 -> 만료된 링크라고 띄움
            setLoading(false);
            setSuccess(false);
        }
    }

    useEffect(()=>{
        // 만약 로그인 상태라면 -> success page로 redirect
        if (myId && nftId && (myId === nftUserId)) 
            navigation(`/nft/${nftId}/get/success`);
    }, [nftUserId, myId, nftId])

    useEffect(()=> {
        verifyBadgeByEmail();
    }, [])

    return (
        <>
        {
            loading
            ? <Loading />
            : <div className="nft-email-verify-wrapper">
                {
                    success
                    ? <>
                        <h1 className="title">NFT를 받는 데 성공했습니다.</h1>
                        <h4 className="description">기존 링크로 돌아가 새로고침해주세요</h4>
                    </>
                    : <>
                        <h1 className="title">만료된 링크입니다.</h1>
                        <h4 className="description">다시 시도해주세요</h4>
                    </>
                }
            </div>
        }
        </>
    )
}
export default NftEmailVerify;