import { useEffect, useState } from 'react';
import LoginButton from '../../components/loginButton/LoginButton';
import background01 from '../../asset/image/landing/background01.png';
import background02 from '../../asset/image/landing/background02.png';
import background03 from '../../asset/image/landing/background03.png';
import background04 from '../../asset/image/landing/background04.png';
import smallBackground01 from '../../asset/image/landing/preview/background01.png';
import smallBackground02 from '../../asset/image/landing/preview/background02.png';
import smallBackground03 from '../../asset/image/landing/preview/background03.png';
import smallBackground04 from '../../asset/image/landing/preview/background04.png';
import block01 from '../../asset/image/landing/block01.png';
import block02 from '../../asset/image/landing/block02.png';
import block03 from '../../asset/image/landing/block03.png';
import block04 from '../../asset/image/landing/block04.png';
import BlurryLoadingBackground from '../../components/blurryLoadingImage/BlurryLoadingBackground';
import { useBackground } from '../../hook/useBackground';
import logo from '../../asset/svg/icon.svg';
import './index.scss';

function Landing() {
    const blockImgList = [block01, block02, block03, block04];
    const pageInfoList = [
        { background: background01, smallBackground: smallBackground01, img: undefined, title: 'Take out the NFT\n benefits most easily', description: 'Justmint will collect the benefits', lang: 'eng' },
        { background: background02, smallBackground: smallBackground02, img: undefined, title: 'Enjoy NFT benefits\n without blockchain wallet', description: 'You can transfer NFTs\nto your blockchain wallet\nwhenever you want', lang: 'eng' },
        { background: background03, smallBackground: smallBackground03, img: undefined, title: 'Anyone can easily deploy', description: 'If you enter the NFT name and image,\ndeployment is complete!', lang: 'eng' },
        { background: background04, smallBackground: smallBackground04, img: logo, title: 'It\'s Sincerely\nYours', description: 'Easily record the information\nyou want to record in NFT', lang: 'eng' },
    ]
    const [currPage, setCurrPage] = useState(0);
    useBackground({ backgroundStyle : 'LANDING' });
    
    const touchStartHandler = (e:any) => {
        const touch = e.touches[0];
        const startX = touch.clientX;
        const startY = touch.clientY;
        const landingPage = document.getElementById('landing-page');

        landingPage?.addEventListener('touchend', (e:any)=>{
            const touch = e.changedTouches[0];
            const endX = touch.clientX;
            const endY = touch.clientY;
            const diffX = endX - startX;
            const diffY = endY - startY;
            if(Math.abs(diffX) > Math.abs(diffY)) {
                if(diffX > 0) {
                    if(currPage === 0) {
                        setCurrPage(0);
                    } else {
                        setCurrPage(currPage-1);
                    }
                } else {
                    if(currPage === pageInfoList.length-1) {
                        setCurrPage(pageInfoList.length-1);
                    } else {
                        setCurrPage(currPage+1);
                    }
                }
            }
        })
    }

    const mouseDownHandler = (e:any) => {
        const startX = e.clientX;
        const startY = e.clientY;
        const landingPage = document.getElementById('landing-page');

        landingPage?.addEventListener('mouseup', (e:any)=>{
            const endX = e.clientX;
            const endY = e.clientY;
            const diffX = endX - startX;
            const diffY = endY - startY;
            if(Math.abs(diffX) > Math.abs(diffY)) {
                if(diffX > 0) {
                    if(currPage === 0) {
                        setCurrPage(0);
                    } else {
                        setCurrPage(currPage-1);
                    }
                } else {
                    if(currPage === pageInfoList.length-1) {
                        setCurrPage(pageInfoList.length-1);
                    } else {
                        setCurrPage(currPage+1);
                    }
                }
            }
        })
    }

    const keyDownHandler = (e:any) => {
        if(e.key === 'ArrowRight') {
            if(currPage === pageInfoList.length - 1) {
                setCurrPage(0);
            } else {
                setCurrPage(currPage+1);
            }
        } else if(e.key === 'ArrowLeft') {
            if(currPage === 0) {
                setCurrPage(pageInfoList.length - 1);
            } else {
                setCurrPage(currPage-1);
            }
        }
    }

    useEffect(()=>{
        // page change event
        document.addEventListener('keydown', keyDownHandler)
        return () => document.removeEventListener('keydown', keyDownHandler);
    }, [currPage])

    useEffect(()=>{
        let navbar = document.getElementById('navbar');
        navbar?.classList.add('navbar--transparent');

        let appContent = document.getElementById('app-content');
        appContent?.classList.add('app-content--none');

        return () => {
            navbar?.classList.remove('navbar--transparent');
            appContent?.classList.remove('app-content--none');
        }
    }, [])
    

    return (
        <div 
            className="landing" 
            id="landing-page"
            onTouchStart={(e:any)=>{touchStartHandler(e)}}
            onMouseDown={(e:any)=>{mouseDownHandler(e)}}
        >
            <div className="page-wrapper">
                {
                    pageInfoList.map((page, idx)=>(
                        <div className="page" id={currPage===idx ? 'curr-page' : ''} key={idx}/>
                    ))
                }
            </div>
            <BlurryLoadingBackground 
                preview={pageInfoList[currPage].smallBackground}
                image={pageInfoList[currPage].background}
                backgroundStyleClass="landing-page-wrapper"
                backgroundStyleId={`landing-page--${currPage+1}`}
            >
            <>
                {
                    pageInfoList[currPage].img && <img src={pageInfoList[currPage].img} className="landing-page-img"/>
                }
                <h1 className={`${pageInfoList[currPage].lang} landing-maintitle`}>{ pageInfoList[currPage].title }</h1>
                <h4 className={pageInfoList[currPage].lang}>{ pageInfoList[currPage].description }</h4>
                <div className="block-wrapper">
                    {
                        blockImgList.map((block, idx)=>(
                            <img src={block} loading="lazy" className="block" id={`block0${idx+1}`} key={idx}/>
                        ))
                    }
                </div>
                </>
            </BlurryLoadingBackground>
            <LoginButton />
        </div>
    )
}
export default Landing;