import { ACTION_TYPES } from "./userDataTypes";

export const setAuth = (auth : boolean) => {
    return {type: ACTION_TYPES.SET_AUTH, data: auth};
}

export const setId = (myId : number) => {
    return {type: ACTION_TYPES.SET_ID, data: myId};
}

export const setName = (name : string) => {
    return {type: ACTION_TYPES.SET_NAME, data: name};
}

export const setIntroduction = (introduction : string) => {
    return {type: ACTION_TYPES.SET_INTRODUCTION, data: introduction};
}

export const setEmail = (email : string) => {
    return {type: ACTION_TYPES.SET_EMAIL, data: email};
}

export const setProfileImage = (profileImage : string) => {
    return {type: ACTION_TYPES.SET_PROFILE_IMAGE, data: profileImage};
}

export const setPhoneNumber = (phoneNumber : string) => {
    return {type: ACTION_TYPES.SET_PHONE_NUMBER, data: phoneNumber};
}

export const setAdmin = (admin : boolean) => {
    return {type: ACTION_TYPES.SET_ADMIN, data: admin};
}

export const setSecret = (secret : string) => {
    return {type: ACTION_TYPES.SET_SECRET, data: secret};
}