import { useNavigate } from "react-router-dom";

type adminAllProp = {
    nftInfo:any;
    nftAdminPhotoList: any;
}

type adminElemProp = {
    application:any;
    goToAdminPhotoDetail:Function;
}

function AdminElem({ application, goToAdminPhotoDetail }:adminElemProp) {

    return (
        <div className="nft-application-wrapper">
            <img className="profile-image" src={application.profileImage}/>
            <h3 className="user-name">{ application.name }</h3>

            <button
                className="goto-admin-detail"
                onClick={()=>{goToAdminPhotoDetail(application.id)}}
            >
                상세보기
            </button>
        </div>
    )
}

function AdminAll ({ nftInfo, nftAdminPhotoList }:adminAllProp) {
    const navigation = useNavigate();

    const goToAdminPhotoDetail = (applicationId:number) => {
        navigation(`/nft/${nftInfo.id}/setting/admin?id=${applicationId}`);
    }

    return (
        <div className="nftadmin-all">
            <h2 className="content-title">인증방식</h2>
            <h3 className="content-subtitle">인증 사진 설명 :</h3>
            <h5 className="nftadmin-description">
                { nftInfo?.options }
            </h5>

            <h2 className="content-title">들어온 인증 요청</h2>
            <div className="nft-application-container">
                {
                    nftAdminPhotoList.length
                    ? nftAdminPhotoList.map((application:any, idx:number) => (
                        <AdminElem 
                            application={application}
                            goToAdminPhotoDetail={goToAdminPhotoDetail}
                        />
                    ))
                    : <h3 className="nft-application-empty">
                        아직 들어온 요청이 없습니다.
                    </h3>
                }
            </div>

        </div>
    )
}
export default AdminAll;