import { ACTION_TYPES } from "./nftTypes";
import clonedeep from 'lodash/cloneDeep';

const initialState = {
  ownNftIdList: [],
  createNftIdList: [],
  transferNftIdList: [],
  integratedNftList: [],
}

export const nftReducer = (state = initialState, action : any) => {
    let resultState:any = clonedeep(state);
  
    switch (action.type) {
      case ACTION_TYPES.SET_OWN_NFT_LIST:
        resultState.ownNftIdList = action.data;
        break;
      case ACTION_TYPES.SET_CREATE_NFT_LIST:
        resultState.createNftIdList = action.data;
        break;
      case ACTION_TYPES.SET_TRANSFER_NFT_LIST:
        resultState.transferNftIdList = action.data;
        break;
      case ACTION_TYPES.SET_INTEGRATED_NFT_LIST:
        resultState.integratedNftList = action.data;
        break;
      case ACTION_TYPES.ADD_OWN_NFT:
        resultState.ownNftIdList = [...resultState.ownNftIdList, action.data];
        break;
      case ACTION_TYPES.ADD_CREATE_NFT:
        resultState.createNftIdList = [...resultState.createNftIdList, action.data];
        break;
      case ACTION_TYPES.ADD_TRANSFER_NFT:
        resultState.createNftIdList = [...resultState.transferNftIdList, action.data];
        break;
      case ACTION_TYPES.ADD_INTEGRATED_NFT:
        resultState.integratedNftList = [...resultState.integratedNftList, action.data];
        break;
      default:
    }
  
    return resultState;
  };