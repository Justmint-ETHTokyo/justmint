import { ReactComponent as NotificationIcon } from "../../asset/svg/triangle-right.svg";

type checkBadgeInfoProps = {
    badgeInfo: any,
    chainInfo: any,
    prev: () => void,
    next: () => void,
}

function CheckBadgeInfo ({ badgeInfo, chainInfo, prev, next }: checkBadgeInfoProps) {

    return (
        <div className="check-badge-info">
            <div className="title-wrapper">
                <h2 className="title">아래 정보가 맞나요?</h2>
                <h4 className="subtitle">
                    NFT의 이름과 이미지는 <span className="red-text">변경이 불가능해요.</span><br/>
                    한번 더 확인해주세요.
                </h4>
            </div>
            <div className="nft-create-info-form">
                <div className="input-box-wrapper">
                    <div className="input-label">NFT 이름</div>
                    <div className="input-text" id="check">{ badgeInfo.name }</div>
                </div>
                <div className="input-box-wrapper">
                    <div className="input-label">NFT 이미지</div>                   
                    <img className="input-image" src={badgeInfo.image}/>
                </div>
                <div className="input-box-wrapper">
                    <div className="input-label">NFT 설명</div>
                    <div className="input-text" id="check">{ badgeInfo.description }</div>
                </div>
                <div className="input-box-wrapper">
                    <div className="input-label">블록체인</div>
                    <h3 className="chain-info">
                        <img src={chainInfo.logo}/>
                        <h3>{ chainInfo.name }</h3>
                    </h3>
                    <div className="check-notice" id="check">
                        <NotificationIcon />
                        <div className="check-notice-text">
                            NFT는 홀더가 본인의 블록체인 지갑으로 옮겨가기를 요청 했을 때 
                            실제로 발행됩니다. NFT 생성 이후 정보 수정 및 발행 관련 문의사항은 <a href="mailto:contact@blockwavelabs.io">contact@blockwavelabs.io</a> 또는 
                            <a href="http://pf.kakao.com/_xgxkExbxj" target="_blank">Justmint 카카오톡 채널</a>을 통해 남겨주시기 바랍니다.
                        </div>
                    </div>
                </div>
            </div>
            <div className="button-wrapper">
                <button className="button" type="button" id="black" onClick={prev}>이전</button>
                <button className="button" type="button" id="purple" onClick={next}>다음</button>
            </div>
        </div>
    )
}
export default CheckBadgeInfo;