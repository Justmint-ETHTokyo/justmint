import { useAsync } from "react-async";
import { Navigate, Outlet, useParams } from "react-router-dom";
import NFTApi from "../apis/NftApi";
import Loading from "../components/loading";
import { setShowAlertInfo } from "../utils/function/showAlert";

const nftApi = new NFTApi();

const ownerCheck = async ({ nftId }:any) => {
    const res = await nftApi.getUserCreateNftIdList();
    if (res.includes(Number(nftId))) {
        // owner라면,
        return true;
    } else {
        // owner가 아니라면,
        setShowAlertInfo('페이지 접근 권한이 없습니다.', false);
        return false;
    }
}

export default function NftOwnerOutlet() {
    const { nftId } = useParams();

    const { data, error, isPending } = useAsync({
        promiseFn: ownerCheck,
        nftId: Number(nftId)
    })

    if (isPending) {
        return <Loading />
    }
    
    if (error) {
        // 에러 난 경우
        return <Navigate to={'/error'}/>;
    }

    if (data) {
        return <Outlet />
    } else {
        return <Navigate to={'/error'}/>
    }
}