// IsTokenRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

// 토큰이 있으면 튕겨낸다.
// 로그인, 회원가입에 사용
const IsTokenRoute = ({ authenticated, component: Component }) => {
    return authenticated ? <Navigate to="/" /> : Component;
};

export default IsTokenRoute;
