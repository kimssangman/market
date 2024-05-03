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
    return <span style={scannerStyle(position)} />;
}

export default Scanner;
