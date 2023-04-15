import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Success from "../../../components/success/Success";

type applicationSuccessProp = {
    nftInfo:any;
}

function ApplicationSuccess({ nftInfo }:applicationSuccessProp) {
    const navigation = useNavigate();

    useEffect(()=>{
        window.scrollTo(0, 0);
    }, [])

    return (
        <div className="success-page">
            <div className="success-page-content-wrapper">
                <h2 className="success-page-first-title">
                    <b>{ nftInfo.nftName }</b><br/>
                    신청이 완료되었습니다.
                </h2>
                <img className="success-page-image" src={nftInfo.image}/>
                <div className="success-page-text">조금만 기다려주세요!</div>
                <div className="success-page-title">
                    관리자 승인 후,<br/>
                    마이페이지에서 확인 가능합니다.
                </div>
            </div>

            <button 
                className="button button--sticky"
                id="purple"
                onClick={()=>{navigation('/mypage')}}
            >
                마이페이지 가기
            </button>
        </div>
    )
}
export default ApplicationSuccess;