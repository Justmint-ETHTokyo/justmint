import { useState } from "react";
import NFTApi from "../../../apis/NftApi";
import ApplicationSuccess from "./ApplicationSuccess";
import PhotoUpload from "./PhotoUpload";

type photoAuthenticationProp = {
    nftInfo: any;
}

function PhotoAuthentication({ nftInfo }: photoAuthenticationProp) {
    const nftApi = new NFTApi();
    const [uploadSuccess, setUploadSuccess] = useState(false);

    const submitUserAuthenticationPhoto = async (e:any, imgFormData:HTMLFormElement) => {
        e.preventDefault();
        imgFormData.append('nftId', nftInfo.id);
        await nftApi.sendUserVerifyPhoto(imgFormData);
        setUploadSuccess(true);
    }

    return (
        <>
            {
                uploadSuccess
                ? <ApplicationSuccess 
                    nftInfo={nftInfo}
                />
                : <PhotoUpload 
                    photoText={nftInfo.options}
                    submitUserAuthenticationPhoto={submitUserAuthenticationPhoto}
                />
            }
        </>
    )
}
export default PhotoAuthentication;