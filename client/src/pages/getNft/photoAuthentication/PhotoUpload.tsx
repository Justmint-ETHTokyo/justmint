import { useState } from "react";
import { fileToUrlAndFormData } from "../../../utils/function/imgInputHandler";
import { ReactComponent as PhotoIcon } from '../../../asset/svg/photo.svg';

type photoUploadProp = {
    photoText: string;
    submitUserAuthenticationPhoto: Function;
}

function PhotoUpload({ photoText, submitUserAuthenticationPhoto }:photoUploadProp) {
    const [userPhotoUrl, setUserPhotoUrl] = useState("");
    const [userPhotoFormData, setUserPhotoFormData] = useState(new FormData());

    return (
        <form 
            className="get-badge-content"
            onSubmit={(e)=>{submitUserAuthenticationPhoto(e, userPhotoFormData)}}
        >
            <div className="title-wrapper">
                <h3 className="title--gray">해당 사진을 찍어서 올려주세요!</h3>
                <h3 className="title-option">{ photoText }</h3>
            </div>
            <div className="warning-text">
                *개인정보에 대한 유출은 책임지지 않으니 중요한 정보는 꼭 가려주세요.*
            </div>
            <input 
                type="file"
                accept="image/*"
                id="nft-user-photo-input"
                onChange={(e)=>{fileToUrlAndFormData(e, setUserPhotoUrl, setUserPhotoFormData, 'image')}}
            />
            {
                userPhotoUrl
                ? <>
                    <img className="nft-user-photo" src={userPhotoUrl}/>
                    <div className="button-wrapper">
                        <label 
                            htmlFor="nft-user-photo-input"
                            className="button"
                            id="black"
                        >
                            사진 재업로드
                        </label>
                        <button
                            type="submit"
                            className="button"
                            id="purple"
                        >
                            제출하기
                        </button>
                    </div>
                </>
                : <label 
                    htmlFor="nft-user-photo-input"
                    className="before-upload"
                >
                    <PhotoIcon />
                    <div>Photo Upload</div>
                </label>
            }
        </form>
    )
}
export default PhotoUpload;