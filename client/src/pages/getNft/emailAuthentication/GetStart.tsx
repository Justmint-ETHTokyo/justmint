// import { Badge } from "../../../@types/badgeType";

type GetBadgeProps = {
    nftInfo: any,
    goToNextPage: any,
}

function GetStart({ nftInfo, goToNextPage }: GetBadgeProps) {

    return (
        <div className="get-badge-content">
            <div className="get-badge-content">
                <div className="get-badge-title">
                    <b>{nftInfo?.badge_name}</b> 인증 NFT를<br/>
                    발급 받으시겠습니까?
                </div>
                <img className="badge-image" src={nftInfo?.img_url}/>
                <div className="get-badge-num-text">
                    현재까지 <b>{nftInfo?.owner_count}</b>명이<br/>
                    발급 받았어요
                </div>
            </div>
            <button className="button" id="purple" onClick={()=>{goToNextPage()}}>
                NFT 받으러 가기
            </button>
        </div>
    )
}
export default GetStart;