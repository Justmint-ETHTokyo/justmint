import * as ethers from "ethers";
import * as bip39 from "bip39";
import * as bs58 from "bs58";

export const generateRandomMnemonic = () => {
    return bip39.generateMnemonic();
}

export const generateSeed = (mnemonic) => {
    return bip39.mnemonicToSeedSync(mnemonic);
}

export const generateWalletsFromMnemonic = (mnemonic) => {
    const ethereumWallet = generateEthereumWallet(mnemonic);
    const solanaWallet = generateSolanaWallet(mnemonic);
    const aptosWallet = generateAptosWallet(mnemonic);

    return {
        Ethereum: ethereumWallet,
        Polygon: ethereumWallet,
        Klaytn: ethereumWallet,
        Solana: solanaWallet,
        Aptos: aptosWallet,
    }
}

export const generateEthereumWallet = (mnemonic) => {
    const walletMnemonic = ethers.Wallet.fromMnemonic(mnemonic);
    let address = walletMnemonic.address;
    let privateKey = walletMnemonic.privateKey;
    let publicKey = walletMnemonic.publicKey;

    return { address, privateKey, publicKey };
}

export const generateSolanaWallet = (mnemonic) => {
    const seed = generateSeed(mnemonic);
    const keypair = window.solanaWeb3.Keypair.fromSeed(seed.slice(0, 32));

    let address = keypair.publicKey.toString();
    let privateKey = bs58.encode(keypair.secretKey);
    let publicKey = keypair.publicKey.toBase58();

    return { address, privateKey, publicKey };
}

export const generateAptosWallet = (mnemonic) => {
    const seed = generateSeed(mnemonic);

    const account = new window.aptosSDK.AptosAccount(seed.slice(0, 32));
    const address = account.toPrivateKeyObject().address;
    const privateKey = account.toPrivateKeyObject().privateKeyHex;
    const publicKey = account.toPrivateKeyObject().publicKeyHex;

    return { address, privateKey, publicKey };
}