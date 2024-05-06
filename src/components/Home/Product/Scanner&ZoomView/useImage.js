// useImage.js

import { useState } from "react";
import useClientRect from "../Scanner&ZoomView/useClientReact";

/**----------------------------------------------------------------------------------
 * 참조할 이미지 element, 마우스의 위치, 스캐너 위치값, 뷰어 위치값을 정하는 훅
 * 
 * 
 * 1) 이미지에 마우스 오버시, 확대할 영역의 스캐너 설정
 * 2) 스캐너가 이미지 안에서만 움직이게 설정
 * 3) 이미지 위에서 마우스를 움직일 때 마우스 커서는 항상 스캐너 가운데 위치하게 설정
 * 4) 마우스가 이미지를 벗어났을 때, 스캐너 / 뷰어 사라지게 설정
 ----------------------------------------------------------------------------------*/
function useImage() {
    const [imageRect, setImageRectRef] = useClientRect();
    const [isMouseOverImage, setIsMouseOverImage] = useState(false);
    const [scannerPosition, setScannerPosition] = useState({
        left: null,
        top: null,
    });
    const [viewPosition, setViewPosition] = useState({ left: null, top: null });

    // 스캐너 크기 설정
    const scannerWidth = 100;
    const scannerHeight = 100;

    // 1) 이미지에 마우스 오버시, 확대할 영역의 스캐너 설정
    const onMouseMove = (e) => {
        // 2) 스캐너가 이미지 안에서만 움직이게 설정
        if (!isMouseOverImage || !imageRect) {
            setScannerPosition({ left: null, top: null });
            setViewPosition({ left: null, top: null });
            return;
        }

        // 3) 이미지 위에서 마우스를 움직일 때 마우스 커서는 항상 스캐너 가운데 위치하게 설정
        const scannerPosLeft = e.clientX - scannerWidth / 2 - 80;
        const scannerPosTop = e.clientY - scannerHeight / 2 - 80;

        // 2) 스캐너가 이미지 안에서만 움직이게 설정
        const allowedPosLeft =
            scannerPosLeft >= imageRect.x &&
            scannerPosLeft <=
                imageRect.x + imageRect.width - scannerWidth - 150;
        const allowedPosTop =
            scannerPosTop >= imageRect.y &&
            scannerPosTop <=
                imageRect.y + imageRect.height - scannerHeight - 150;

        if (allowedPosLeft) {
            scannerPosition.left = Math.max(
                imageRect.x,
                Math.min(
                    imageRect.x + imageRect.width - scannerWidth,
                    scannerPosLeft
                )
            );
        }
        if (allowedPosTop) {
            scannerPosition.top = Math.max(
                imageRect.y,
                Math.min(
                    imageRect.y + imageRect.height - scannerHeight,
                    scannerPosTop
                )
            );
        }

        setScannerPosition({ ...scannerPosition });

        /**-----------------------------------------------------------------------------
         * 2를 곱하는 이유 : 확대 비율 적용
         * 음수 값을 취하는 이유 : 스캐너가 오른쪽으로 이동하면 뷰어는 왼쪽으로 이동해야 하고 스캐너가 아래쪽으로 이동하면 뷰어는 위쪽으로 이동해야 함.
         -----------------------------------------------------------------------------*/
        setViewPosition({
            left: -((scannerPosition.left - imageRect.x) * 2), // 스캐너의 가로 위치와 이미지의 가로 위치의 차이
            top: -((scannerPosition.top - imageRect.y) * 2), // 스캐너의 가로 위치와 이미지의 세로 위치의 차이
        });
    };

    // 4) 마우스가 이미지를 벗어났을 때, 스캐너 / 뷰어 사라지게 설정
    const onMouseLeave = () => {
        setIsMouseOverImage(false);
        setScannerPosition({ left: null, top: null });
        setViewPosition({ left: null, top: null });
    };

    return {
        onMouseMove, // 이미지 위에서 마우스를 움직일 때 호출되는 이벤트 핸들러
        onMouseLeave, // 이미지를 벗어날 때 호출되는 이벤트 핸들러
        imageRect, // 참조할 이미지 요소의 좌표 값
        setImageRectRef, // 참조할 이미지 요소의 좌표 값을 설정하는 함수
        isMouseOverImage, // 이미지 위에 마우스가 있는지 여부를 나타내는 상태
        setIsMouseOverImage, // 이미지 위에 마우스가 있는지 여부를 설정하는 함수
        scannerPosition, // 스캐너의 위치 정보
        viewPosition, // 뷰어의 위치 정보
    };
}

export default useImage;
