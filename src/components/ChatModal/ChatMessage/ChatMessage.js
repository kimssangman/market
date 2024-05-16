import React, { useState, useEffect } from "react";
import "./ChatMessage.scss";
import { BsArrowLeft } from "react-icons/bs";
import { io } from "socket.io-client";
import { socket } from "../../../utils/socket/socket";
import { decodedToken } from "../../../api/auth/jwt_api";
import useFetch from "../../../hooks/useFetch";

const token = decodedToken();

function ChatMessage({ onClose, onBack, roomId }) {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    const { data, loading, error, fetchData } = useFetch(
        "/api/v1/chat/getMessage",
        token ? token._id : null // 토큰이 없을 경우에는 null을 전달
    );

    useEffect(() => {
        console.log(roomId);
    }, [roomId]);

    useEffect(() => {
        const data = {
            _id: token._id,
            roomId: roomId,
        };

        // 소켓 연결
        socket.connect();

        // 룸 설정
        socket.emit("join:room", data);

        // 소켓 연결 해제
        return () => {
            socket.disconnect();
        };
    });

    // 메시지 전송
    const handleSendMessage = () => {
        // 관리자일 경우
        if (token.isAdmin) {
            let data = {
                _id: token._id,
                isAdmin: true,
                content: message,
            };

            socket.emit("message:send", data);
        }
        // 관리자가 아닐 경우
        else {
            let data = {
                _id: token._id,
                isAdmin: false,
                content: message,
            };

            socket.emit("message:send", data);
        }
    };

    useEffect(() => {
        socket.on("message:receive", (data) => {
            // 현재 메시지 목록에 새로운 메시지 추가
            setMessages((prevMessages) => [
                ...prevMessages,
                { content: data, sender: token.id },
            ]);
        });

        return () => {
            socket.off("message:receive");
        };
    }, [token.id]);

    return (
        <div className="chat-window">
            <div className="chat-header">
                <div className="back-button" onClick={onBack}>
                    <BsArrowLeft />
                </div>
                고객센터
                <button className="close-button" onClick={onClose}>
                    X
                </button>
            </div>
            <div className="chat-body">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`chat-message ${
                            msg.sender === "me" ? "sent" : "received"
                        }`}
                    >
                        {msg.content}
                    </div>
                ))}
            </div>
            <div className="chat-footer">
                <input
                    type="text"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <button onClick={handleSendMessage}>전송</button>
            </div>
        </div>
    );
}

export default ChatMessage;
