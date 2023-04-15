type emailSettingsType = {
    option: string;
    setOption: Function;
    handlePopup: Function
}

function EmailSettings({option, setOption, handlePopup}:emailSettingsType) {

    return (
        <>
        <div className="title-wrapper">
            <h2 className="title">사용자들이 인증할<br/>소속 기관 이메일을 알려주세요. (4/4)</h2>
            <h4 className="subtitle">비즈니스 이메일을 입력해주세요.</h4>
        </div>
        <div className="nft-create-info-form">
            <div className="input-box-wrapper">
                <div className="input-certification-email-wrapper">
                    <span className="at">@</span>
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="ex) blockwavelabs.io"
                        value={option}
                        onChange={(e)=>{setOption(e.target.value)}}
                    />
                </div>
            </div>
            <div className="button-wrapper" style={{marginTop: 'auto'}}>
                <button
                    className="button"
                    id="purple"
                    onClick={()=>handlePopup("해당 정보로 NFT를 생성하시겠습니까?")}
                    disabled={!option.length}
                >
                    설정 마치고 NFT 생성하기
                </button>
            </div>
        </div>
        </>
    )
}
export default EmailSettings;