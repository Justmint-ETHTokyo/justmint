import { useState } from "react";
import NFTApi from "../../../apis/NftApi";
import gmail from "../../../asset/image/gmail.png";
import Loading from "../../../components/loading";

type checkEmailProps = {
    nftEmail: string;
    nftId: number;
}

function CheckEmail({ nftEmail, nftId } : checkEmailProps) {
    const nftApi = new NFTApi();
    const [email, setEmail] = useState("");
    const [emailSent, setEmailSent] = useState(false);
    const [emailSentSuccess, setEmailSentSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const sendEmail = async (e:any) => {
        e.preventDefault();
        setLoading(true);
        try {
            // 이메일 인증 보내기
            await nftApi.sendVerifyEmail(nftId, `${email}@${nftEmail}`);
            setEmailSent(true);
            setEmailSentSuccess(true);
            setLoading(false);
        } catch(err) {
            setLoading(false);
            setEmailSentSuccess(false);
        }


    }

    return (
        <form className="get-badge-content" onSubmit={(e)=>{sendEmail(e)}}>
            {
                loading && <Loading />
            }
            <div className="check-email-content-wrapper">
                <div className="title-wrapper">
                    <h4 className="title--gray">
                        소속 인증을 위해 이메일을 보내드릴게요
                    </h4>
                    <h3 className="title">
                        @{nftEmail}로 끝나는 이메일 주소를<br/>
                        입력해주세요.
                    </h3>
                </div>
                <div className="email-input">
                    <input
                        className="user-email"
                        type="text"
                        value={email}
                        onChange={(e)=>{setEmail(e.currentTarget.value)}}
                        placeholder={`ex) yours`}
                        required={true}
                    />
                    <span className="nft-email">
                        { `@${nftEmail}` }
                    </span>
                </div>

                {
                    !!emailSent &&
                    (
                        emailSentSuccess
                        ? <>
                            <div className="input-status" id="success">전송이 완료되었어요. 메일함을 확인해주세요.</div>
                            <a className="mail-button" href={`https://mail.google.com`} target="_blank">
                                <img src={gmail}/>
                            </a>
                        </>
                        : <>
                            <div className="input-status" id="warning">이메일 전송에 실패했어요. 다시 시도해주세요.</div>
                        </>
                    )
                }

            </div>
            <button
                className="button button--sticky"
                id="purple"
                type="submit"
                disabled={!(email.length)}
            >
                이메일 보내기
            </button>
        </form>
    )
}
export default CheckEmail;