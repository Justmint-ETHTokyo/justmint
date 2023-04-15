import './RewardInfoForm.scss';

type rewradInfoFormProp = {
    name: string;
    setName: Function;
    description: string;
    setDescription: Function;
    buttonText: string;
    submitAction: Function
}

function RewardInfoForm ({ name, setName, description, setDescription, buttonText, submitAction }:rewradInfoFormProp) {
    const nameMaxLength = 35;
    const descriptionMaxLength = 200;

    return (
        <form 
            className="reward-info-form"
            autoComplete="off"
            onSubmit={(e)=>{e.preventDefault(); submitAction()}}
        >
            <div className="reward-info-content-wrapper">
            <div className="input-box-wrapper">
                <label className="input-label" htmlFor="reward-name">혜택 이름</label>
                <input
                    className="input-textbox"
                    type="text"
                    id="reward-name"
                    value={name}
                    placeholder="혜택 이름을 입력해주세요."
                    maxLength={nameMaxLength}
                    onChange={(e)=>{setName(e.target.value)}}
                />
                <div className="input-content-length">
                    <span 
                        id={name.length ? (name.length >= nameMaxLength ? "max" : "active") : "" }
                    >
                        { name.length }
                    </span>/{ nameMaxLength }
                </div>
            </div>

            <div className="input-box-wrapper">
                <label className="input-label" htmlFor="reward-description">혜택 설명</label>
                <div className="input-textarea">
                    <textarea
                        rows={4}
                        id="reward-description"
                        value={description}
                        placeholder="혜택 상세보기에 들어갈 설명을 입력해주세요."
                        maxLength={descriptionMaxLength}
                        onChange={(e)=>{setDescription(e.target.value)}}
                    />
                </div>
                <div className="input-content-length">
                    <span 
                        id={description.length ? (description.length >= descriptionMaxLength ? "max" : "active") : "" }
                    >
                        { description.length }
                    </span>/{ descriptionMaxLength }
                </div>
            </div>
            </div>

            <button 
                type="submit"
                className="button button--sticky"
                id="purple"
                disabled={!(name.length && description.length)}
            >
                { buttonText }
            </button>
        </form>
    )
}
export default RewardInfoForm;