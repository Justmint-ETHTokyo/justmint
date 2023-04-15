import { setShowAlertInfo } from "./showAlert";

export const copyToClipboard = (link:string, text?:string) => {
  // alert(navigator);
  if (!!(navigator?.share)) {
    // 공유 API 사용 가능할 때
    navigator.share({
      title: 'Justmint',
      text: `${text} ${link}`,
    //   url: link
    }).then(() => {
        // share 성공
    })
    .catch(() =>
      setShowAlertInfo('링크 복사에 실패했습니다.', false)
    );
  } else {
    copyText(link, '링크가 복사되었습니다.');
  }
}

export const copyText = (text:string, alertText='복사 되었습니다.') => {
  if (!!(navigator?.clipboard)) {
    // 공유 API 사용 불가능할 때
    navigator.clipboard.writeText(text);
  } else {
    var clipBoardElem = document.createElement("input");
    document.body.appendChild(clipBoardElem);
    clipBoardElem.value = "text";
    clipBoardElem.select();
    var successfulCopy = document.execCommand('copy');
    document.body.removeChild(clipBoardElem);
  }
  setShowAlertInfo(alertText, true);
}