import { ACTION_TYPES } from "./walletTypes";

export const setEthereumWallet = (address : string) => {
    return {type: ACTION_TYPES.SET_ETHEREUM_WALLET, data: address};
}

export const setPolygonWallet = (address : string) => {
    return {type: ACTION_TYPES.SET_POLYGON_WALLET, data: address};
}

export const setKlaytnWallet = (address : string) => {
    return {type: ACTION_TYPES.SET_KLAYTN_WALLET, data: address};
}

export const setSolanaWallet = (address : string) => {
    return {type: ACTION_TYPES.SET_SOLANA_WALLET, data: address};
}

export const setAptosWallet = (address : string) => {
    return {type: ACTION_TYPES.SET_APTOS_WALLET, data: address};
}