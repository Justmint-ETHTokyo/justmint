import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CheckEmail from "./CheckEmail";

type emailAuthenticationProp = {
    nftInfo: any;
}

function EmailAuthentication({ nftInfo }:emailAuthenticationProp) {

    return (
        <CheckEmail nftEmail={nftInfo?.options} nftId={nftInfo?.id} />
    )
}
export default EmailAuthentication;