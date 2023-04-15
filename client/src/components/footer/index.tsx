import { ReactComponent as Logo } from '../../asset/svg/logo.svg';
import kakaoImg from '../../asset/image/kakao_link.png';
import emailImg from '../../asset/image/email_link.png';
import './index.scss';

function Footer() {
    const contactLinkList = [
        { img: kakaoImg, link: 'http://pf.kakao.com/_xgxkExbxj' },
        { img: emailImg, link: 'mailto:contact@blockwavelabs.io' },
    ]

    const policyLinkList = [
        { name: '서비스 이용약관', link: 'https://www.notion.so/propwave/Yours-14cdd37b08e6496184d0d463f1af6746' },
        { name: '개인정보 처리방침', link: 'https://www.notion.so/propwave/Yours-a10e4ec9568c4e19b178306158370623' },
    ]

    return (
        <div className="page-footer">
            <Logo className="logo"/>
            <div className="page-footer-description">
                Justmint는 NFT (Non-Fungible Token) 발행 및 고객 관리를<br/>
                도와주는 서비스입니다. 혜택이 쌓이는 NFT를 발행하고<br/>
                고객들에게 쉬운 블록체인 온보딩 경험을 선사해보세요.
            </div>
            <a
                className="service-guide-link"
                target="_blank"
                href="https://propwave.notion.site/Yours-3d6a4452edc946999ad5a8daebcf4cf3"
            >
                서비스 이용 안내
            </a>
            <div className="contact-link-wrapper">
                {
                    contactLinkList.map((item, index) => (
                        <a key={index} href={item.link} target="_blank" rel="noreferrer">
                            <img src={item.img} />
                        </a>
                    ))
                }
            </div>
            <div>ⓒ 2022-2023. Justmint all rights reserved.</div>
            <div className="policy-link-wrapper">
                {
                    policyLinkList.map((item, index) => (
                        <a key={index} href={item.link} target="_blank">{ item.name }</a>
                    ))
                }
            </div>
        </div>
    )
}
export default Footer;