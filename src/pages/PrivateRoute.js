// PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

// 토큰이 없으면 튕겨낸다.
// 권한이 없으면 못 보는 곳에 사용
const PrivateRoute = ({ authenticated, component: Component }) => {
    return authenticated ? Component : <Navigate to="/signIn"></Navigate>;
};

export default PrivateRoute;
