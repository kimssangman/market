/**------------------------------------------
 * 이벤트 버스 사용방법
 * 
 * nodejs에서 지원하는 기능이기 때문에 따로 설치할 필요 없음
 * 
 * 1) 이벤트 버스 EventEmitter 생성자 파일 생성
 * 2) emit 
 * eventBus.emit("메시지 이름이 같아야 함", "");
 * 
 * 3) on
 * useEffect(() => {
        const handleMyEvent = (message) => {
            // 보내준 값(메시지) 출력하기
            console.log(`Received: ${message}`);
        };
        // 이벤트 수신하기
        eventBus.on("addCart", handleMyEvent);

        return () => {
            // 컴포넌트가 사라질 때에는 이벤트 수신 종료
            eventBus.off("addCart", handleMyEvent);
        };
    }, []);

 * 꼭 이벤트를 끊어줘야 한다.
 ------------------------------------------*/

// 이벤트 버스 생성 컴포넌트
import { EventEmitter } from "events";

const eventBus = new EventEmitter();

export default eventBus;
