import { useState } from 'react';
import { ReactComponent as AlertIcon } from '../../asset/svg/alert-circle.svg';

type mnemonicInputProp = {
    checkMnemonic: Function;
}

function MnemonicInput({ checkMnemonic }:mnemonicInputProp) {
    const [wordList, setWordList] = useState<string[]>(new Array(12).fill(""));

    const mnemonicWordInputHandler = (e:any, idx:number) => {
        let wordInput = e.target.value;
        let wordInputList = wordInput.split(' ');

        const newWordList = [...wordList];

        for (let i = 0; i < wordInputList.length; i++) {
            if (idx + i < 12) {
                newWordList[idx + i] = wordInputList[i];
            }
        }
        setWordList(newWordList);
        
        document.getElementById(`mnemonic-word-input-${idx + wordInputList.length}`)?.focus();
    }

    return (
        <div className="mnemonic-input-page">
            <h4 className="page-title">패스코드를 분실하셨나요?</h4>
            <h5 className="page-description">
                Justmint Wallet은 사용자의 패스코드를 보관하지 않습니다.<br/>
                회원가입 단계에서 부여받은 12개 단어의 비밀구문을<br/>
                입력하여 패스코드를 재설정할 수 있습니다.
            </h5>
            <h4>비밀구문</h4>
            <div className="mnemonic-warning-box">
                <AlertIcon className="mnemonic-warning-icon"/>
                <div>
                    12개의 단어를 오타없이 바르게 입력해주세요.<br/>
                    비밀구문이 일치하지 않으면<br/>
                    패스코드를 재설정할 수 없습니다.
                </div>
            </div>

            <div className="mnemonic-word-container">
                {
                    wordList.map((word, idx)=>(
                        <div className="word-wrapper">
                            <h6 className="word-idx">{ idx + 1 }.</h6>
                            <input 
                                id={`mnemonic-word-input-${idx+1}`}
                                type="text"
                                value={word}
                                onChange={(e)=>{mnemonicWordInputHandler(e, idx)}}
                            />
                        </div>

                    ))
                }
            </div>

            <div className="yours-channel-text">
                도움이 필요할 경우 <a href="http://pf.kakao.com/_xgxkExbxj" target="_blank">Justmint 채널</a>로 문의해주세요.
            </div>
            <button
                className="button"
                id="purple"
                disabled={wordList.some((word)=>word === "")}
                onClick={()=>{checkMnemonic(wordList)}}
            >
                다음
            </button>
        </div>
    )
}
export default MnemonicInput;