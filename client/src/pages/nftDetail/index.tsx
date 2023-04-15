import { useLayoutEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useNft } from "../../hook/useNft";
import { copyToClipboard } from "../../utils/function/linkShare";
import { setMetaTags } from "../../utils/function/setMetatags";
import { setShowAlertInfo } from "../../utils/function/showAlert";
import { ellipsisMiddle } from "../../utils/function/ellipsisMiddle";

import StatusModal from "../../components/statusModal/StatusModal";
import MiniHeader from "../../components/miniHeader/MiniHeader";
import ProfileListModal from "../../components/profileListModal";
import RewardElem from "../../components/reward";

import mailImg from '../../asset/image/mail.png';
import cameraImg from '../../asset/image/camera.png';
import { ReactComponent as UserIcon } from "../../asset/svg/user.svg";
import { ReactComponent as CopyIcon } from "../../asset/svg/copy.svg";
import { ReactComponent as SettingIcon } from "../../asset/svg/setting.svg";
import { ReactComponent as SendIcon } from "../../asset/svg/send.svg";
import './index.scss';

function NftDetail() {
    const navigation = useNavigate();
    const { nftId } = useParams();
    const { nftInfo, nftOwnerList, userOwnThisNft, userCreateThisNft, userTransferThisNft, userPhotoPending } = useNft({ nftId: Number(nftId) });
    const [showOwnerModal, setShowOwnerModal] = useState<boolean>(false);
    const [showNftGetModal, setShowNftGetModal] = useState<boolean>(false);
    const [nftAuthInfo, setNftAuthInfo] = useState<any>();
    
    const nftAuthInfoList = [
        { authType: 1, modalImage: mailImg, modalText: <>해당 NFT는 <b>이메일 인증</b>을 통해<br/>받아갈 수 있는 NFT입니다.<br/>다음 페이지에서 소속 기관을<br/> 인증할 수 있는<br/>이메일 주소를 입력해보세요!</>, buttonText: '인증하기', buttonAction: ()=>{ navigation(`/nft/${nftId}/get`) } },
        { authType: 2, modalImage: cameraImg, modalText: <>해당 NFT는 <b>사진 인증</b>을 통해<br/>받아갈 수 있는 NFT입니다.<br/>다음 페이지에서 요청받은 미션에 맞는<br/>사진을 찍어 제출해보세요!</>, buttonText: '인증하기', buttonAction: ()=>{ navigation(`/nft/${nftId}/get`) } }
    ]
 
    const transferHandler = () => {
        if (userTransferThisNft) {
            // transfer 한 NFT인 경우
            setShowAlertInfo('이미 transfer한 NFT입니다.', false);
        } else {
            // transfer 하지 않은 NFT인 경우
            navigation(`/nft/${nftId}/transfer`);
        }
    }

    const getNftModalHandler = () => {
        setNftAuthInfo(nftAuthInfoList.find((el:any)=>el.authType===nftInfo.authType));
        setShowNftGetModal(true);
    }

    useLayoutEffect(()=>{
        setMetaTags({ 
            title: 'Justmint NFT', 
            description: 'Justmint의 NFT를 확인하세요!', 
        });
    }, [])


    return (
        <>
        {
            showOwnerModal && 
            <ProfileListModal 
                closeModal={()=>{setShowOwnerModal(false)}}
                modalTitle="Owner"
                profileList={nftOwnerList}
            />
        }
        {
            showNftGetModal &&
            <StatusModal
                modalImage={nftAuthInfo.modalImage}
                modalText={nftAuthInfo.modalText}
                buttonText={nftAuthInfo.buttonText}
                buttonAction={nftAuthInfo.buttonAction}
                closeModal={()=>setShowNftGetModal(false)}
            />
        }
        <div className="nft-detail-page">
            <MiniHeader 
                title={ nftInfo?.nftName }
            >
                <div
                    className="header-icon-wrapper"
                >
                {
                    /* 유저가 받은 NFT인 경우 -> transfer 페이지로 갈 수 있도록 */
                    !!(userOwnThisNft) &&
                    <SendIcon 
                        className="nft-detail-transfer"
                        onClick={()=>{transferHandler()}}
                    />
                }
                {
                    /* 자신이 만든 사진 인증 NFT인 경우에 -> admin 페이지로 갈 수 있도록 */
                    !!(userCreateThisNft) &&
                    <SettingIcon 
                        className="nft-detail-admin"
                        onClick={()=>{navigation(`/nft/${nftId}/setting`)}}
                    />
                }
                </div>
            </MiniHeader>
            <div className="nft-detail-content-wrapper">
                <img className="nft-image" src={nftInfo?.image}/>
                <div className="nft-detail-button-wrapper">
                    <button
                        className="nft-owner"
                        onClick={()=>{setShowOwnerModal(true)}}
                    >
                        <UserIcon/>
                        <span>
                            <b>{ nftInfo?.numberOfOwners }</b> owners
                        </span>
                    </button>
                    <button
                        className="nft-share"
                        // onTouchStart={(e)=>e.currentTarget.focus()}
                        onClick={()=>{copyToClipboard(window.location.href, nftInfo?.nftName)}}
                        onTouchStart={()=>{copyToClipboard(window.location.href, nftInfo?.nftName)}}
                    >
                        <CopyIcon />
                        <span>share</span>
                        {/* <div className="nft-linkcopy-wrapper">
                            <div 
                                className="nft-linkcopy"
                                onClick={()=>{copyToClipboard(window.location.href, nftInfo?.nftName)}}
                                onTouchStart={()=>{copyToClipboard(window.location.href, nftInfo?.nftName)}}
                            >
                                copy link
                            </div>
                        </div> */}
                    </button>
                </div>
                <div className="nft-detail-description">
                    { nftInfo?.description }
                </div>

                {
                        nftInfo?.isDeployed &&
                <div className="nft-reward-wrapper">
                    <div className="nft-reward-title-wrapper">
                        <div className="nft-reward-title">
                            Info
                        </div>
                    </div>
                        <div className="nft-info-wrapper flex-column-20">
                            <div className="nft-info-row">
                                <div className="title">Contract Address</div>
                                <div className="content"> { ellipsisMiddle(nftInfo.nftAddress as string) }</div>
                            </div>
                            {
                                (nftInfo?.chainType !== 'Solana' && nftInfo?.chainType !== 'Aptos') &&
                                <div className="nft-info-row">
                                    <div className="title">Token Standard</div>
                                    <div className="content">ERC 721</div>
                                </div>
                            }
                            <div className="nft-info-row">
                                <div className="title">Date</div>
                                <div className="content">{ new Date(nftInfo?.createdAt as string).toLocaleString() }</div>
                            </div>
                            <div className="nft-info-row">
                                <div className="title">Chain</div>
                                <div className="content">{ nftInfo?.chainType }</div>
                            </div>
                        </div>
                </div>
                }

                <div className="nft-reward-wrapper">
                    <div className="nft-reward-title-wrapper">
                        <div className="nft-reward-title">
                            Benefit
                        </div>
                        <span className="nft-reward-length">{ nftInfo?.numberOfRewards }</span>
                    </div>
                    <div className="nft-reward-container">
                        {
                            nftInfo?.rewards.length
                            ? nftInfo?.rewards.map((reward:any, idx:number)=>(
                                <RewardElem 
                                    nftId={nftInfo.id} 
                                    nftName={nftInfo.nftName}
                                    reward={reward}
                                    key={idx}
                                />
                            ))
                            : <div className="nft-reward-empty">아직 보유한 혜택이 없습니다.</div>
                        }
                    </div>
                </div>
            </div>

            {
                !!(userCreateThisNft && !nftInfo?.isDeployed)
                ? <button
                    className="button get-nft-button"
                    id="purple"
                    onClick={()=>{navigation(`/nft/${nftId}/setting/reward`)}}
                >
                    혜택 설정하고 NFT 발행하기
                </button>
                : (
                    nftInfo?.isDeployed &&
                    <button
                        className="button get-nft-button"
                        id="purple"
                        onClick={()=>getNftModalHandler()}
                        disabled={userOwnThisNft || userPhotoPending}
                    >
                        {
                            userOwnThisNft
                            ? "이미 받은 NFT입니다"
                            : ( 
                                userPhotoPending
                                ? "승인 대기중입니다"
                                : "NFT 받으러 가기"
                            )
                        }
                    </button>
                )
            }
        </div>
        </>
    )
}
export default NftDetail;