import MenuList from "../../components/menuList/MenuList";
import MiniHeader from "../../components/miniHeader/MiniHeader";

function WalletPrivacy() {
    const menuList = [
        { name: '비밀구문 확인', link: '/wallet/privacy/mnemonic' },
        { name: '패스코드 변경', link: '/wallet/privacy/passcode' },
    ]

    return (
        <div style={{minHeight:"70vh"}}>
            <MiniHeader 
                title="보안 및 프라이버시"
            />
            <div className="show-content-smoothly">
                <MenuList 
                    menuList={menuList}
                />
            </div>
        </div>
    )
}
export default WalletPrivacy;