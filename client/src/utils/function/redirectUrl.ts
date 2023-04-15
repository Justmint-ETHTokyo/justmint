export const setRedirectUrl = (url: string) => {
    localStorage.setItem("redirectUrl", url);
}

export const getRedirectUrl = () => {
    return localStorage.getItem("redirectUrl");
}

export const clearRedirectUrl = () => {
    localStorage.removeItem("redirectUrl");
}