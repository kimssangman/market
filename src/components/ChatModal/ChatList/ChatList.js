// ChatList.js
import React from "react";
import "./ChatList.scss";

function ChatList({ onClose, onChatClick }) {
    // onChatClick 함수를 추가하여 클릭한 채팅방의 ID를 상위 컴포넌트로 전달
    const handleChatClick = (roomId) => {
        // 클릭한 채팅방의 ID를 상위 컴포넌트로 전달
        onChatClick(roomId);
    };

    return (
        <div className="chat-list">
            <div className="chat-header">Chat List</div>
            <div className="chat-body">
                {/* 각 채팅 목록을 클릭하면 handleChatClick 함수를 호출하고 해당 채팅 방의 ID를 전달 */}
                <div
                    className="chat-item"
                    onClick={() => handleChatClick("room1")}
                >
                    Chat 1
                </div>
                <div
                    className="chat-item"
                    onClick={() => handleChatClick("room2")}
                >
                    Chat 2
                </div>
                <div
                    className="chat-item"
                    onClick={() => handleChatClick("room3")}
                >
                    Chat 3
                </div>
                {/* 필요에 따라 채팅 목록을 동적으로 생성하거나 API를 통해 가져올 수 있음 */}
            </div>
            <button className="close-button" onClick={onClose}>
                Close
            </button>{" "}
            {/* ChatList를 닫는 버튼 */}
        </div>
    );
}

export default ChatList;
