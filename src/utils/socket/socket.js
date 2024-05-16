import { io } from "socket.io-client";

const API = "/socket"; // 나는 이미 프록시로 localhost:3300 잡고있어서 앞은 생략됨.

export const socket = io(API, {
    autoConnect: false,
});
