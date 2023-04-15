export const ellipsisMiddle = (str:string) => {
    const res = str.slice(0, 5) + "..." + str.slice(-5);
    return res;
}