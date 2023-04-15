type photoSettingsType = {
    option: string;
    setOption: Function;
    handlePopup: Function
}

function PhotoSettings({option, setOption, handlePopup}:photoSettingsType) {
    const photoMaxLength = 100;

    return (
        <>
        <div className="title-wrapper">
            <h2 className="title">NFT를 받기 위해 인증해야 하는<br/>사진에 대해 설명해주세요. (4/4)</h2>
            <h4 className="subtitle">
                사용자들이 설명을 읽고 그에 맞는 사진을 제출하면<br/>
                NFT 생성자가 직접 사진에 대한 검수 후 NFT를<br/>
                지급해요.
            </h4>
        </div>
        <div className="nft-create-info-form">
            <div className="input-box-wrapper">
                <label className="input-label">인증해야 하는 사진 설명</label>
                <div className="input-textarea">
                    <textarea
                        rows={4}
                        placeholder="ex) 손바닥 위에 서울대학교 학생증을 올리고 찍어주세요."
                        value={option}
                        maxLength={photoMaxLength}
                        onChange={(e)=>{setOption(e.currentTarget.value)}}
                    />
                </div>
                <div className="input-content-length">
                    <span id={option.length >= photoMaxLength ? "max" : (option.length ? "active" : "")}>
                        { option.length }
                    </span>
                    /{photoMaxLength}
                </div>
            </div>

            <div className="input-box-wrapper">
                <div className="input-label">사용자 노출 예시</div>
                <div className="photo-description-preview-wrapper">
                    <div className="photo-description">
                        {
                            !!(option.length)
                            ? option
                            : "인증해야 하는 사진 설명 문구 노출"
                        }
                    </div>
                    <div className="photo-description-warning">
                        *개인정보에 대한 유출은 책임지지 않으니<br/>
                        중요한 정보는 꼭 가려주세요.*
                    </div>
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
export default PhotoSettings;