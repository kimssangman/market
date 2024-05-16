// ChatBotIcon.js
import React, { useState } from "react";
import ChatMessage from "../ChatMessage/ChatMessage";
import "./ChatBotIcon.scss";
import { BsFillChatDotsFill } from "react-icons/bs";
import ChatList from "../ChatList/ChatList";
import { decodedToken } from "../../../api/auth/jwt_api";

const token = decodedToken();

function ChatBotIcon() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedRoomId, setSelectedRoomId] = useState(null); // 선택한 채팅방의 ID를 저장할 상태

    const handleChatBot = () => {
        setIsOpen(!isOpen);
    };

    const handleChatClick = (roomId) => {
        setSelectedRoomId(roomId);
        setIsOpen(true);
    };

    const handleChatList = () => {
        setSelectedRoomId(null);
        setIsOpen(true);
    };

    return (
        <div>
            {/* 관리자일 경우 관리자 전용 채팅방 목록 보여주기 */}
            {/* 관리자가 아닐 경우 채팅방 바로 보여주기 */}
            {isOpen && (
                <div>
                    {token.isAdmin ? (
                        <div>
                            {/* 여러 채팅방 목록을 클릭해서 채팅으로 진입하기 위함*/}
                            <ChatList
                                onClose={handleChatBot}
                                onChatClick={handleChatClick}
                            />
                            {selectedRoomId && (
                                <ChatMessage
                                    onClose={handleChatBot}
                                    onBack={handleChatList}
                                    roomId={selectedRoomId}
                                />
                            )}
                        </div>
                    ) : (
                        <ChatMessage
                            onClose={handleChatBot}
                            roomId={selectedRoomId}
                        />
                    )}
                </div>
            )}
            {!isOpen && (
                <div className="chatbot-icon" onClick={handleChatBot}>
                    <BsFillChatDotsFill />
                </div>
            )}
        </div>
    );
}

export default ChatBotIcon;
