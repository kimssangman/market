// useClientReact.js

/**-----------------------------------------
 * 리액트에서 dom 요소에 직접 접근하려면 참조값이 필요하기 때문에
 * img element를 직접 참조하는 훅
 * <img src="/images/image.jpg" alt="">
 * 
 * 이미지 요소의 좌표값을 뱉어낸다.
 -----------------------------------------*/
import { useRef } from "react";

export default function useClientRect() {
    const rectRef = useRef(null); // 초기값을 null로 설정

    const setRectRef = (element) => {
        if (element) {
            rectRef.current = element.getBoundingClientRect();
        }
    };

    return [rectRef.current, setRectRef];
}
