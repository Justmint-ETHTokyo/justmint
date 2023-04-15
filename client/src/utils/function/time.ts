export const timeToString = (sec: number) => {
    const min = Math.floor(sec / 60);
    const second = sec % 60;
    return `${min < 10 ? '0' + min : min}:${second < 10 ? '0' + second : second}`;
}

export const toLocaleTime = (utcDateTime: string) => {
    return new Date(utcDateTime).toLocaleString();
}