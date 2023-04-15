import { ACTION_TYPES } from "./walletTypes";
import clonedeep from 'lodash/cloneDeep';

const initialState = {
  Ethereum: '',
  Polygon: '',
  Klaytn: '',
  Solana: '',
  Aptos: '',
}

export const walletReducer = (state = initialState, action : any) => {
    let resultState:any = clonedeep(state);
  
    switch (action.type) {
      case ACTION_TYPES.SET_ETHEREUM_WALLET:
        resultState.Ethereum = action.data;
        break;
      case ACTION_TYPES.SET_POLYGON_WALLET:
        resultState.Polygon = action.data;
        break;
      case ACTION_TYPES.SET_KLAYTN_WALLET:
        resultState.Klaytn = action.data;
        break;
      case ACTION_TYPES.SET_SOLANA_WALLET:
        resultState.Solana = action.data;
        break;
      case ACTION_TYPES.SET_APTOS_WALLET:
        resultState.Aptos = action.data;
        break;
      default:
    }
  
    return resultState;
  };