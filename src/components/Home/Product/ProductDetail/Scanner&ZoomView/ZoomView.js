// zoomView.js

/**--------------------------------------------------------------
 * 이미지, 위치 값, position left를 인자로 전달받아 뷰어 표시
 --------------------------------------------------------------*/
const viewStyle = ({ img, position, left }) => ({
    zIndex: 1,
    position: "absolute",
    top: 180,
    left, // 이 부분은 전달된 left 값을 사용합니다.
    width: 500,
    height: 500,
    backgroundImage: `url(${img})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: `${position.left}px ${position.top}px`, // position 객체에서 left, top 값을 사용합니다.
    backgroundSize: "200% 200%",
});

function ZoomView({ img, position, left }) {
    // position.left와 position.top 이 null 값일 때 나타나는 현상 방지
    if (position.left !== null && position.top !== null) {
        return <div style={viewStyle({ img, position, left })} />; // 전달된 매개변수를 객체로 묶어서 viewStyle 함수에 전달합니다.
    }
}

export default ZoomView;
