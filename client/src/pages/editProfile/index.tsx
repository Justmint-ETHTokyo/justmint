import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fileToUrlAndFormData, makeFormData } from "../../utils/function/imgInputHandler";
import { setShowAlertInfo } from "../../utils/function/showAlert";
import { useNavigate } from "react-router-dom";
import { setAuth } from "../../redux/userData/userDataAction";
import { autoHyphen } from "../../utils/function/stringToPhoneNumber";
import { Popup } from "../../components/popup";
import MiniHeader from "../../components/miniHeader/MiniHeader";
import PhoneEditModal from "./modal/PhoneEditModal";
import { ReactComponent as Camera } from "../../asset/svg/camera.svg";
import './modal/ProfileEditModal.scss';
import './index.scss';
import UserApi from "../../apis/UserApi";
import EmailEditModal from "./modal/EmailEditModal";

function EditProfile() {
    const userApi = new UserApi();
    const navigation = useNavigate();
    const dispatch = useDispatch();
    const userData = useSelector((state:any)=>state.userData);
    const [profileImgUrl, setProfileImgUrl] = useState(userData.profileImage);

    const [name, setName] = useState(userData.name);
    const [changeName, setChangeName] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState(userData.phoneNumber);
    const [email, setEmail] = useState(userData.email);

    const [showPhoneEditModal, setShowPhoneEditModal] = useState(false);
    const [showEmailEditModal, setShowEmailEditModal] = useState(false);
    const [showLogoutConfirmModal, setShowLogoutConfirmModal] = useState(false);

    useEffect(()=>{
        setProfileImgUrl(userData.profileImage);
        setName(userData.name);
        setPhoneNumber(userData.phoneNumber);
        setEmail(userData.email);
    }, [userData])

    const editName = async () => {
        // 이름 수정 api
        await userApi.editUserName(name);
        setShowAlertInfo('닉네임이 수정되었습니다.', true);
        setChangeName(false);
    }

    const editProfileImage = async (e:any) => {
        try {
            // 프로필 이미지 수정 api
            const profileImgFormData = makeFormData(e, 'image');
            await userApi.editUserProfileImage(profileImgFormData);
            setShowAlertInfo('프로필 이미지가 수정되었습니다.', true);
        } catch(err) {
            setShowAlertInfo('프로필 이미지 수정에 실패했습니다.', false);
        }
    } 

    const focusToNameInput = () => {
        setChangeName(true);
        setTimeout(()=>{
            document.getElementById('nickname-input')?.focus()
        }, 100);
    }

    const logout = () => {
        dispatch(setAuth(false));
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('accessToken');
        navigation('/landing');
        setShowAlertInfo('로그아웃 되었습니다.', true);
    }

    return (
        <>
        {
            showLogoutConfirmModal &&
            <Popup
                title="로그아웃 하시겠습니까?"
                closeModal={()=>{setShowLogoutConfirmModal(false)}}
                approve={()=>{logout()}}
                deny={()=>{setShowLogoutConfirmModal(false)}}
                approveText={"로그아웃"}
            />
        }
        {
            showPhoneEditModal &&
            <PhoneEditModal
                closeModal={()=>{setShowPhoneEditModal(false)}}
            />
        }
        {
            showEmailEditModal && 
            <EmailEditModal
                closeModal={()=>{setShowEmailEditModal(false)}}
            />
        }
        <div className="profile-edit-page show-content-smoothly">
            <MiniHeader 
                title={"Profile Edit"}
            />
            <div className="profile-edit-content-wrapper">
                <div className="input-box-wrapper profile-image-wrapper">
                    <input 
                        id="profile-image-input"
                        className="input-image"
                        type="file"
                        accept="image/*"
                        onChange={(e)=>{editProfileImage(e)}}
                    />
                    <label htmlFor="profile-image-input" className="input-image">
                        <div 
                            className="badge-image-input-button"
                            id={profileImgUrl ? "image-uploaded" : ""}
                        >
                            <Camera />
                        </div>
                        { profileImgUrl && <img src={profileImgUrl}/> }
                    </label> 
                </div>

                <div className="profile-input-wrapper">
                    <div className="profile-input-elem">
                        <div className="input-title">닉네임</div>
                        <input 
                            className="input"
                            id="nickname-input"
                            type="text"
                            placeholder="닉네임을 입력해주세요."
                            value={name}
                            disabled={!changeName}
                            onChange={(e)=>{setName(e.target.value)}}
                        />
                        {
                            changeName
                            ? <button
                                className="save-edit"
                                onClick={()=>{editName()}}
                                disabled={!changeName}
                            >
                                저장
                            </button>
                            : <button
                                onClick={()=>{focusToNameInput()}}
                            >
                                변경
                            </button>
                        }
                    </div>

                    <div className="profile-input-elem">
                        <div className="input-title">휴대폰</div>
                        <div
                            className="input"
                        >
                            { autoHyphen(phoneNumber) }
                        </div>
                        <button
                            onClick={()=>{setShowPhoneEditModal(true)}}
                        >
                            변경
                        </button>
                    </div>

                    <div className="profile-input-elem">
                        <div className="input-title">이메일</div>
                        <div className="input">{ email }</div>
                        <button
                            onClick={()=>{setShowEmailEditModal(true)}}
                        >
                            변경
                        </button>
                    </div>
                </div>

                <button
                    className="logout"
                    onClick={()=>{setShowLogoutConfirmModal(true)}}
                >
                    로그아웃
                </button>
            </div>
        </div>
        </>
    )
}
export default EditProfile;