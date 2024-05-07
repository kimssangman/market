// jwt.api.js

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

// 토큰 만료 감지
export function isExpired(token) {
    if (!token) {
        return false; // 토큰이 없을 때 null 반환
    }

    const expiration = new Date(token * 1000); // 토큰의 만료 시간을 초 단위로 변환하여 가져옵니다.
    const now = new Date();

    // 만료 시간과 현재 시간을 비교하여 만료 여부를 확인합니다.
    return expiration <= now;
}
