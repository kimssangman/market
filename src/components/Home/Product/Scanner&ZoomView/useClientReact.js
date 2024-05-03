// useClientReact.js

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
