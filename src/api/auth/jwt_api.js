// 한글 깨짐 문제 발생하여 이렇게 코드 짰음

export function DecodingInfo(jwtToken) {
    if (!jwtToken) {
        return null; // 토큰이 없을 때 null 반환
    }

    try {
        let payload = jwtToken.split(".")[1];
        let decodingInfo = decodeURIComponent(escape(atob(payload)));
        let decodingInfoJson = JSON.parse(decodingInfo);
        return decodingInfoJson;
    } catch (error) {
        console.error("토큰 디코딩 오류:", error);
        return null; // 디코딩에 실패할 때 null 반환
    }
}

export function getToken() {
    return localStorage.getItem("token");
}
