import CopyBox from "../../components/copyBox/CopyBox";

type CheckPrivateKeyProps = {
    privateKey: string;
}

function CheckPrivateKey({ privateKey }:CheckPrivateKeyProps) {

    return (
        <div className="check-privatekey-page">
            <CopyBox 
                text={privateKey}
                copyAlertText="프라이빗키가 복사되었습니다."
            />
            <div className="privatekey-warning-title">
                프라이빗키는 그 누구에게도 공개해서는 안돼요.
            </div>
            <h6 className="privatekey-warning-text">
                누군가 이 프라이빗키를 알게되면<br/>
                유저분의 지갑에 보관된 자산을 훔쳐갈 수 있어요.<br/>
                만약 이 정보를 요구하는 경우는 피싱 사기일 수 있습니다.
            </h6>
        </div>
    )
}
export default CheckPrivateKey;