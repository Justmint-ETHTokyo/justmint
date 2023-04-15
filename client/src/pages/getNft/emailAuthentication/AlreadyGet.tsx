import { useNavigate } from "react-router-dom";

type AlreadyGetProps = {
    nftInfo: any,
}

function AlreadyGet({ nftInfo }: AlreadyGetProps) {
    const navigation = useNavigate();
    
    return (
        <div className="get-badge-content">
            <div className="get-badge-content">
                <div className="get-badge-title">
                    <b>{nftInfo?.badge_name}</b> 배지는<br/>
                    이미 받은 배지입니다.
                </div>
                <img className="badge-image" src={nftInfo?.img_url}/>
                <div className="get-badge-num-text">
                    다른 배지를 받으러 가보세요!
                </div>
            </div>
            <button className="button" id="purple" onClick={()=>{navigation('/get-badge')}}>
                다른 NFT 배지 받으러 가기
            </button>
        </div>
    )
}
export default AlreadyGet;