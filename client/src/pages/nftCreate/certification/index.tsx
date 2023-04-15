import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Popup } from "../../../components/popup";
import ChooseAuthMode from "./ChooseAuthMode";
import EmailSettings from "./EmailSettings";
import PhotoSettings from "./PhotoSettings";


type setBadgeCertificationProps = {
    makeNFTBadge: Function;
    option: string;
    setOption: Function;
    setAuthMode: Function
}

function SetBadgeCertification({ makeNFTBadge, option, setOption, setAuthMode }:setBadgeCertificationProps) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [pageMode, setPageMode] = useState<string>("");
    const [page, setPage] = useState<number|undefined>();
    const [authType, setAuthType] = useState<number|undefined>();
    const [showPopup, setShowPopup] = useState(false);
    const [popupTitle, setPopupTitle] = useState("");

    useEffect(()=>{
        let _pageMode = searchParams.get('pageMode');
        let _page = searchParams.get('page');
        let _authType = searchParams.get('authType');

        if (_pageMode) {
            setPageMode(_pageMode);
            setPage(Number(_page));
            setAuthType(Number(_authType));
        }


        // if (_pageMode === 'SET_BADGE_CERTIFICATION') {
        //     if (_page && !isNaN(Number(_page)) && Number(_page) <= titleInfoList.length) {
        //         setPage(Number(_page));
        //         authType && setAuthType(Number(_authType));
        //     } else {
        //         setSearchParams({ pageMode: "SET_BADGE_CERTIFICATION", page: "1" });
        //     }
        // }

    }, [searchParams])

    const setToPhoto = () => {
        setAuthMode(2);
        setSearchParams({ pageMode: pageMode, page: '1', authType: '2' });
    }
    const setToEmail = () => {
        setAuthMode(1);
        setSearchParams({ pageMode:pageMode, authType: '1', page: '1' });
    }

    const handlePopup = (title: string) => {
        setPopupTitle(title);
        setShowPopup(true);
    }

    const authTypeRenderer = () => {
        switch (authType){
            case 1:
                return <EmailSettings 
                    option={option} 
                    setOption={setOption}
                    handlePopup={handlePopup}
                />
            case 2:
                return <PhotoSettings 
                    option={option} 
                    setOption={setOption}
                    handlePopup={handlePopup}
                />
        }
    }

    return (
        <>
            { 
                showPopup && 
                <Popup 
                    closeModal={()=>setShowPopup(false)}
                    title={popupTitle}
                    approve={()=>makeNFTBadge()}
                    deny={()=>setShowPopup(false)}
                /> 
            }
            {
                !(authType)
                ? <ChooseAuthMode
                    setToPhoto={setToPhoto}
                    setToEmail={setToEmail}
                />
                : <>{ authTypeRenderer() }</>
            }
        </>
    )
}
export default SetBadgeCertification;