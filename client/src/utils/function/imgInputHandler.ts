export const readImage = (input:any, setImgUrl:any) => {
    const reader = new FileReader();
    reader.onload = (e:any) => {
        setImgUrl(e.target.result);
    }
    reader.readAsDataURL(input.files[0]);
}

export const makeFormData = (e:any, keyName:string) => {
    const formData = new FormData();
    const uploadFile = e.target.files[0];
    formData.append(keyName, uploadFile);
    return formData;
}

export const fileToUrlAndFormData = (e:any, setImgUrl:any, setFormData:any, keyName: string) => {
    readImage(e.target, setImgUrl);
    setFormData(makeFormData(e, keyName));
}

export const removeImage = (setImgUrl:any, setFormData:any) => {
    setImgUrl(false);
    setFormData(false);
}