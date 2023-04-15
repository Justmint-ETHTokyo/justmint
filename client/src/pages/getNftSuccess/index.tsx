import { useNavigate, useParams } from "react-router-dom";
import Success from "../../components/success/Success";
import { useNft } from "../../hook/useNft";

function GetNftSuccess() {
    const navigation = useNavigate();
    const { nftId } = useParams();
    const { nftInfo } = useNft({ nftId: Number(nftId) });

    return (
        <Success
            image={nftInfo?.image}
            title={<>
                <b>{ nftInfo?.nftName }</b><br/>
                받기 완료!
            </>}
            buttonText={"마이페이지에서 확인하기"}
            buttonAction={()=>{navigation(`/mypage`)}}
        />
    )
}
export default GetNftSuccess;