import { ACTION_TYPES } from "./userDataTypes";

const initialState = {
    auth: true,
    myId: 0,
    name: 'yours',
    introduction: '안녕하세요 Justmint 입니다',
    email: '',
    profileImage: '',
    phoneNumber: '',
    admin: false,
    secret: '',
}

export const userDataReducer = (state = initialState, action : any) => {
    let resultState = { ...state };
  
    switch (action.type) {
        case ACTION_TYPES.SET_AUTH:
            resultState.auth = action.data;
            break;
        case ACTION_TYPES.SET_ID:
          resultState.myId = action.data;
          break;
        case ACTION_TYPES.SET_NAME:
          resultState.name = action.data;
          break;
        case ACTION_TYPES.SET_INTRODUCTION:
          resultState.introduction = action.data;
          break;
        case ACTION_TYPES.SET_EMAIL:
          resultState.email = action.data;
          break;
        case ACTION_TYPES.SET_PROFILE_IMAGE:
          resultState.profileImage = action.data;
          break;
        case ACTION_TYPES.SET_PHONE_NUMBER:
          resultState.phoneNumber = action.data;
          break;
        case ACTION_TYPES.SET_ADMIN:
          resultState.admin = action.data;
          break;
        case ACTION_TYPES.SET_SECRET:
          resultState.secret = action.data;
          break;
      default:
    }
  
    return resultState;
  };