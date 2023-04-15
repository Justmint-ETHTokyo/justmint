import { useState, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { Transition } from "react-transition-group";
import { useLocation, useNavigate } from "react-router-dom";
import useMypageMenu from "./useMypageMenu";
import NftElem from "../../components/nft/NftElem";
import RewardElem from "../../components/reward";
import IntegratedNftContainer from "./integratedNft";
import WelcomeModal from "./welcomeModal";
import CompleteQuestModal from "./completeQuestModal";
import YoursWalletButton from "./YoursWalletButton";
import { ReactComponent as SearchIcon } from "../../asset/svg/search.svg";
import './index.scss';

function Mypage() {
    const { state } = useLocation();
    const navigation = useNavigate();
    const name = useSelector((state: any) => state.userData.name);
    const [pastMenu, setPastMenu] = useState('');
    const { menuDataList, currMenu, setCurrMenu, searchWord, setSearchWord, currMenuData, emptyWord } = useMypageMenu();

    const [showWelcomeModal, setShowWelcomeModal] = useState(false);
    const [showCompleteQuestModal, setShowCompleteQuestModal] = useState(false);

    useLayoutEffect(()=>{
        setPastMenu(currMenu)

        const selectedMenuX = document.getElementById('selected-menu')?.getBoundingClientRect().x;
        const menuShowBar = document.getElementById('show-selected-menu');
        const initialX = document?.getElementsByClassName('mypage-menu')[0]?.getBoundingClientRect().x;
        if (menuShowBar && selectedMenuX && initialX) 
            menuShowBar.style.left = `${selectedMenuX - initialX}px`;
        
    }, [currMenu])

    useLayoutEffect(()=>{
        // new user 감지
        if (localStorage.getItem("newUser")) {
            setShowWelcomeModal(true);
            localStorage.removeItem("newUser");
        }

        if (state?.completeQuest) {
            setShowCompleteQuestModal(true);
        }
        
    }, [state])

    return (
        <div className="mypage">
            {
                showWelcomeModal && 
                <WelcomeModal 
                    closeModal={()=>{setShowWelcomeModal(false)}}
                />
            }
            {
                showCompleteQuestModal && 
                <CompleteQuestModal
                    closeModal={()=>{setShowCompleteQuestModal(false)}}
                />
            }
            <div className="my-profile-wrapper">
                <span className="my-profile-yours">Sincerely Justmint</span>
                <div className="my-profile-name">{ name }</div>
                <button 
                    className="my-profile-edit"
                    onClick={()=>{navigation('/profile/edit')}}
                >
                    edit
                </button>
                <IntegratedNftContainer />
            </div>

            <div className="mypage-menu-wrapper">
                <div className="mypage-menu-header">
                {
                    menuDataList?.map((menuData, idx) => (
                        <div 
                            className="mypage-menu" 
                            key={idx}
                            id={currMenu === menuData.type ? 'selected-menu' : ''}
                            onClick={()=>setCurrMenu(menuData.type)}
                        >
                            { menuData.title }
                            <span className="mypage-menu-content-length">{ menuData.contentLength }</span>
                        </div>
                    ))
                }
                <div className="show-selected-menu" id="show-selected-menu"/>
                </div>

                <div className="mypage-menu-content-searchbar">
                    <SearchIcon />
                    <input
                        type="text"
                        value={searchWord}
                        placeholder="Search by name"
                        onChange={(e)=>{setSearchWord(e.target.value)}}
                    />
                </div>

                <Transition
                    in={pastMenu === currMenu}
                    timeout={300}
                >
                    {
                        (state)=>(
                        <div 
                            className={`mypage-menu-nft-container ${state}`}
                        >
                        {
                            currMenuData?.length
                            ? currMenuData.map((content:any, idx:number)=>(
                                currMenu !== 'reward'
                                ? <NftElem 
                                    nftInfo={content}
                                />
                                : <RewardElem
                                    nftId={content.nftId} 
                                    nftName={content.nftName}
                                    reward={content}
                                /> 
                            ))
                            : <div className="no-content">
                                <div className="empty-text">
                                { 
                                    searchWord.length
                                    ? <><h2 className="eng">`{ searchWord }`</h2>로<br/>검색한 결과가 없습니다.</>
                                    : emptyWord
                                }
                                </div>
                            </div>
                        }
                        </div>
                        )
                    }
                </Transition>
            </div>
            <YoursWalletButton />
        </div>
    )
}
export default Mypage;