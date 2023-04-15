import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useNftPhotoAdmin } from "./useNftPhotoAdmin";
import { useNft } from "../../hook/useNft";
import { Popup, popupProps } from "../../components/popup";
import AdminAll from "./AdminAll";
import AdminDetail from "./AdminDetail";
import MiniHeader from "../../components/miniHeader/MiniHeader";
import './index.scss';
import Loading from "../../components/loading";

function NftAdmin () {
    const navigation = useNavigate();
    const { nftId } = useParams();
    const { nftInfo } = useNft({ nftId: Number(nftId) });
    const { nftAdminPhotoList, approveApplication, discardApplication } = useNftPhotoAdmin({ nftId: Number(nftId) });
    const [searchParams, setSearchParams] = useSearchParams();
    const [applicationId, setApplicationId] = useState(0);
    const [loading, setLoading] = useState(false);

    // popup 관련 변수
    const [showPopup, setShowPopup] = useState(false);
    const [popupProp, setPopupProp] = useState<popupProps>();

    useEffect(()=>{
        window.scrollTo(0, 0); // scroll 초기화
        const _temp = searchParams.get('id');
        setApplicationId(Number(_temp));
    }, [searchParams])

    const approveAction = async (applicationId:number) => {
        setLoading(true);
        await approveApplication(applicationId);
        setPopupProp({
            closeModal: () => { setShowPopup(false); },
            title: '승인 처리 되었습니다.',
            approve: () => { setShowPopup(false); },
            approveText: '확인'
        });
        navigation(-1);
        setShowPopup(true);
        setLoading(false);
    }

    const discardAction = async (applicationId:number, reason:string) => {
        await discardApplication(applicationId, reason);
        setPopupProp({
            closeModal: () => { setShowPopup(false); },
            title: '거절 처리 되었습니다.',
            approve: () => { setShowPopup(false); },
            approveText: '확인'
        });
        navigation(-1);
        setShowPopup(true);
    }


    return (
        <>
            {
                loading && <Loading />
            }
            {
                showPopup && popupProp &&
                <Popup 
                    closeModal={popupProp?.closeModal}
                    title={popupProp?.title}
                    approve={popupProp?.approve}
                    approveText={popupProp?.approveText}
                    deny={popupProp?.deny}
                />
            }
            <div className="nftadmin-page">
                <MiniHeader 
                    title={nftInfo?.nftName}
                />
                {
                    applicationId
                    ? <AdminDetail 
                        photoDescription={nftInfo?.options} 
                        detailInfo={nftAdminPhotoList.find((el:any)=>el.id===applicationId)}
                        approveAction={approveAction}
                        discardAction={discardAction}
                    />
                    : <AdminAll nftInfo={nftInfo} nftAdminPhotoList={nftAdminPhotoList}/>
                }
            </div>
        </>
    )
}
export default NftAdmin;