import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { fileToUrlAndFormData } from "../../utils/function/imgInputHandler";
import Select from "../../components/select/Select";
import chainList from "../../utils/data/chainList";
import { ReactComponent as Camera } from "../../asset/svg/camera.svg";

type setBadgeInfoProps = {
    nftName: string,
    setNftName: (nftName: string) => void,
    nftImgUrl: string,
    setNftImgUrl: (nftImgUrl: string) => void,
    setNftImgFormData: (nftImgFormData: FormData) => void,
    nftDescription: string,
    setNftDescription: (nftDescription: string) => void,
    nftChain: string,
    setNftChain: (nftChain: string) => void,
    next: () => void,
}

function SetBadgeInfo({ nftName, setNftName, nftImgUrl, setNftImgUrl, setNftImgFormData, nftDescription, setNftDescription, nftChain, setNftChain, next }:setBadgeInfoProps) {
    const [searchParams, setSearchParams] = useSearchParams();
    const titleInfoList = [
        { page: 1, title: "NFT 이름을 알려주세요", description: "NFT의 이름으로 표기 될 예정이에요." },
        { page: 2, title: "NFT 이미지를 첨부해주세요", description: "지원되는 파일 형식: JPG, PNG/ 최대 크기: 50mb" },
        { page: 3, title: "NFT에 대해 설명해주세요", description: "NFT의 설명으로 표기 될 예정이에요." },
        { page: 4, title: "체인을 선택해주세요", description: "어떤 체인 위에 NFT를 생성할 지 선택해주세요." }
    ]
    const [page, setPage] = useState(1);
    const [isValidInput, setIsValidInput] = useState(false);
    const nftDescriptionMaxLen = 200;

    useEffect(()=>{
        let _pageMode = searchParams.get('pageMode');
        let _page = searchParams.get('page');

        if (_pageMode == "SET_BADGE_INFO") {
            if (_page && !isNaN(Number(_page)) && Number(_page) <= titleInfoList.length) {
                setPage(Number(_page));
            } else {
                setSearchParams({ pageMode: "SET_BADGE_INFO", page: "1" });
            }
        }
    }, [searchParams])

    const nextPageHandler = () => {
        if (page == titleInfoList.length) {
            next();
        } else {
            setSearchParams({ pageMode: "SET_BADGE_INFO", page: String(page+1) });
        }
    }

    useEffect(()=>{
        switch (page) {
            case 1:
                setIsValidInput(!!(nftName.length));
                break;
            case 2:
                setIsValidInput(!!nftImgUrl.length);
                break;
            case 3:
                setIsValidInput(!!nftDescription.length);
                break;
            case 4:
                setIsValidInput(!!nftChain);
                break;
            default:
        }
    }, [page, nftName, nftImgUrl, nftDescription, nftChain])

    return (
    <>
        <div className="title-wrapper">
            <h2 className="title">{titleInfoList[page-1].title} ({ page }/{titleInfoList.length + 1})</h2>
            <h4 className="subtitle">{ titleInfoList[page-1].description }</h4>
        </div>
        <div className="nft-create-info-form">
        {
            !!(page >= 4) &&
            <div className="chain-select-wrapper">
                <Select 
                    placeholder={"Select Source Chain"}
                    value={nftChain}
                    setValue={setNftChain}
                    optionList={chainList}
                    optionIconKey="logo"
                    optionNameKey="name"
                    optionValueKey="name"
                />
            </div>
        }
        {
            !!(page >= 3) &&
            <div className="input-box-wrapper">
                <label className="input-label" htmlFor="badge-description-input">NFT 설명</label>
                <div className="input-textarea">
                    <textarea 
                        id="badge-description-input"
                        value={nftDescription}
                        maxLength={nftDescriptionMaxLen}
                        rows={4}
                        placeholder="NFT 설명을 입력해 주세요."
                        onChange={(e)=>{setNftDescription(e.currentTarget.value)}}
                    />
                </div>
                <div className="input-content-length">
                    <span id={nftDescription.length >= nftDescriptionMaxLen ? "max" : (nftDescription.length ? "active" : "")}>
                        { nftDescription.length }
                    </span>
                    /{nftDescriptionMaxLen}
                </div>
            </div>
        }

        {
            !!(page >= 2) &&
            <div className="input-box-wrapper">
                { !!(page !== 2) && <div className="input-label">NFT 이미지</div> }
                <input 
                    id="badge-image-input"
                    className="input-image"
                    type="file"
                    accept="image/*"
                    disabled={page !== 2}
                    onChange={(e)=>{fileToUrlAndFormData(e, setNftImgUrl, setNftImgFormData, 'image')}}
                />
                <label htmlFor="badge-image-input" className="input-image">
                    <div 
                        className="badge-image-input-button"
                        id={nftImgUrl ? "image-uploaded" : ""}
                    >
                        <Camera />
                    </div>
                    { nftImgUrl && <img src={nftImgUrl}/> }
                </label> 
            </div>
        }

        <div className="input-box-wrapper">
            { !!(page!== 1) && <label className="input-label" htmlFor="badge-name-input">NFT 이름</label> }
            <input 
                id="badge-name-input"
                className="input-text"
                type="text"
                disabled={page !== 1}
                value={nftName}
                placeholder="NFT 이름을 입력해 주세요."
                onChange={(e)=>{setNftName(e.currentTarget.value)}}
            />
        </div>


        <div className="button-wrapper">
            {
                !!(page !== 1) &&
                <button
                    className="button"
                    id="black"
                    onClick={()=>{setSearchParams({ pageMode: "SET_BADGE_INFO", page: String(page-1) })}}
                >
                    이전
                </button>
            }
            {
                <button 
                    type="button"
                    className="button"
                    id="purple"
                    onClick={()=>{nextPageHandler()}}
                    disabled={!isValidInput}
                >
                    다음
                </button>
            }
        </div>
        </div>
    </>
    )
}
export default SetBadgeInfo;