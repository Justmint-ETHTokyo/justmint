import Modal from "../modal/Modal";
import { ReactComponent as CloseCircle } from '../../asset/svg/close-circle.svg';
import './index.scss';

type userType = {
    id:number,
    name:string,
    profileImage:string
}

type profileType = {
    user: userType   
}

type profileListModalProp = {
    closeModal:()=>void,
    profileList:profileType[],
    modalTitle:string
}

function ProfileListModal({ closeModal, profileList, modalTitle }:profileListModalProp) {

    return (
        <Modal closeModal={()=>closeModal()}>
            <div className="modal-wrapper profile-modal">
                <div className="modal-header">
                    <div className="modal-title">{ modalTitle }</div>
                    <CloseCircle className="modal-close" onClick={()=>closeModal()}/>
                </div>
                <div className="modal-content">
                    <div className="profile-container">
                        {
                            profileList.map((profile, idx)=>(
                                <div className="profile-elem" key={idx}>
                                    <img className="profile-elem-image" src={profile.user.profileImage}/>
                                    <div className="profile-elem-name">{ profile.user.name }</div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </Modal>
    )
}
export default ProfileListModal;