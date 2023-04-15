import { useEffect, useState } from "react";
import AdminApi from "../../apis/AdminApi";

type useNftPhotoAdminProp = {
    nftId: number
}

export const useNftPhotoAdmin = ({ nftId }:useNftPhotoAdminProp) => {
    const adminApi = new AdminApi();
    const [nftAdminPhotoList, setNftAdminPhotoList] = useState([]);

    const approveApplication = async (applicationId:number) => {
        await adminApi.approveNftAdminPhoto(applicationId, true);
        setNftAdminPhotoList(nftAdminPhotoList.filter((el:any)=>el.id!==applicationId));
    }

    const discardApplication = async (applicationId:number, reason:string) => {
        await adminApi.approveNftAdminPhoto(applicationId, false, reason);
        setNftAdminPhotoList(nftAdminPhotoList.filter((el:any)=>el.id!==applicationId));
    }

    useEffect(()=>{
        const getAdminPhotoList = async () => {
            const res = await adminApi.getNftAdminPhotoList(nftId);
            setNftAdminPhotoList(res.data);
        }

        if (nftId) getAdminPhotoList();
    }, [nftId])

    return {nftAdminPhotoList, approveApplication, discardApplication};
}