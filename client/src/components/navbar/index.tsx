import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Logo } from '../../asset/svg/logo.svg';
import { ReactComponent as PlusIcon } from '../../asset/svg/plus-circle.svg';
import userDefaultProfile from '../../asset/image/user-default-profile.png';
import './index.scss';

function Navbar() {
    const navigation = useNavigate();
    const auth = useSelector((state:any)=>state.userData.auth);
    const profileImage = useSelector((state:any)=>state.userData.profileImage);

    return (
        <div className="navbar" id="navbar">
            <Logo 
                className="navbar-logo"
                onClick={()=>navigation('/mypage')}
            />
            {
                auth && 
                <div className="navbar-right-wrapper">
                    <button 
                        className="navbar-create-badge"
                        onClick={()=>{navigation('/nft/create')}}
                    >
                        Create NFT <PlusIcon/>
                    </button>
                    <img 
                        className="navbar-profile-image" 
                        src={profileImage} 
                        onClick={()=>navigation('/mypage')}
                        onError={(e)=>{e.currentTarget.src=userDefaultProfile}}
                    />
                </div>
            }
        </div>
    )
}
export default Navbar;