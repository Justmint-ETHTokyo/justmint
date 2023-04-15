import { useEffect, useState } from 'react';
import NFTApi from '../../apis/NftApi';

type nftGetType = 'create'|'own'|'reward';

type menuDataListType = {
    type: 'create'|'own'|'reward',
    title: string,
    data: any[],
    contentLength: number,
}

type menuInfoListType = {
    type: nftGetType,
    title: string,
    empty: string,
}

const useMypageMenu = () => {
    const nftApi = new NFTApi();
    const menuInfoList:menuInfoListType[] = [
        { type: 'own', title: '보유한 NFT', empty: '보유한 NFT가 없습니다.' },
        { type: 'reward', title: '보유한 혜택', empty: '보유한 혜택이 없습니다.' },
        { type: 'create', title: '생성한 NFT', empty: '생성한 NFT가 없습니다.' },
    ]
    const [currMenu, setCurrMenu] = useState<nftGetType>('own' as nftGetType);
    const [menuDataList, setMenuDataList] = useState<menuDataListType[]>();
    const [currMenuData, setCurrMenuData] = useState<any>();
    const [searchWord, setSearchWord] = useState<string>('');
    const [searchData, setSearchData] = useState<any[]>([]);
    const [emptyWord, setEmptyWord] = useState<string>('');

    useEffect(()=>{
        //  현재 보여주는 메뉴 데이터 설정
        if (searchWord) {
            setCurrMenuData(searchData);
        } else {
            setCurrMenuData(menuDataList?.find((menu)=>menu.type === currMenu)?.data);
            setEmptyWord(menuInfoList.find((menu)=>menu.type === currMenu)?.empty as string);
        }
    }, [searchWord, searchData, currMenu, menuDataList])

    useEffect(()=>{ // 메뉴 바뀔 때마다 검색어 초기화
        setSearchWord('');
    }, [currMenu])

    useEffect(()=>{
        const getMenuInfoList = async () => {
            let tempMenuInfo = [];
            for (let menu of menuInfoList) {
                const res = await nftApi.getMypageNftList(menu.type);
                
                let newMenuInfo = {
                    type: menu.type as nftGetType,
                    title: menu.title,
                    data: res,
                    contentLength: res.length
                }
                tempMenuInfo.push(newMenuInfo);
            }
            setMenuDataList(tempMenuInfo);
        }
        getMenuInfoList();
    }, [])

    useEffect(()=>{
        if (searchWord.length) {
            const getSearchResult = async () => {
                const res = await nftApi.getMypageNftSearch(currMenu as String, searchWord);
                setSearchData(res.data);
            }
            getSearchResult();
        }
    }, [searchWord])

    return { menuDataList, currMenu, setCurrMenu, searchWord, setSearchWord, currMenuData, emptyWord };
}
export default useMypageMenu;