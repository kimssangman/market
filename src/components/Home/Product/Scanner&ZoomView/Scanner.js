// scanner.js

const scannerStyle = (position) => ({
    position: "absolute",
    top: position.top,
    left: position.left,
    width: 250,
    height: 250,
    border: "1px solid #000",
    backgroundColor: "rgba(255,255,255,0.7)",
    cursor: "pointer",
});

function Scanner({ position }) {
    // position.left와 position.top 이 null 값일 때 나타나는 현상 방지
    if (position.left !== null && position.top !== null) {
        return <span style={scannerStyle(position)} />;
    }
}

export default Scanner;
