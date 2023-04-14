import CryptoJS from 'crypto-js';

const defaultSecretKey = process.env.REACT_APP_SECRET_KEY as string;

//암호화 - URI로 변환
export const encryptToURI = (data:any) => {
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), defaultSecretKey).toString();
    return encodeURIComponent(encrypted);
}

// secretKey를 받아서 암호화
export const encrypt = (data:any, secretKey=defaultSecretKey) => {
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
    return encrypted;
}

//복호화
export const decrypt = (encrypted:any, secretKey=defaultSecretKey) => {
    var decrypted = CryptoJS.AES.decrypt(encrypted, secretKey);
    decrypted = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));

    return decrypted;
}

// 니모닉 암호화
export const encryptMnemonic = (mnemonic:string, password:string) => {
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify({ mnemonic: mnemonic }), `${password}-${defaultSecretKey}`).toString();
    return encrypted;
}

// 니모닉 복호화
export const decryptMnemonic = (encrypted:any, password:string) => {
    var decrypted = CryptoJS.AES.decrypt(encrypted, `${password}-${defaultSecretKey}`);
    let mnemonic = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8)).mnemonic;

    return mnemonic;
}
