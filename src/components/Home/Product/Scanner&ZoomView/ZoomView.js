// zoomView.js

const viewStyle = ({ img, position, left }) => ({
    zIndex: 1,
    position: "absolute",
    top: 180,
    left: 700, // 이 부분은 전달된 left 값을 사용합니다.
    width: 500,
    height: 500,
    backgroundImage: `url(${img})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: `${position.left}px ${position.top}px`, // position 객체에서 left, top 값을 사용합니다.
    backgroundSize: "200% 200%",
});

function ZoomView({ img, position, left }) {
    return <div style={viewStyle({ img, position, left })} />; // 전달된 매개변수를 객체로 묶어서 viewStyle 함수에 전달합니다.
}

export default ZoomView;
