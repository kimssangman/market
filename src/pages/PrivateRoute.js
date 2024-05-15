// PrivateRoute.js
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

// 토큰이 없으면 튕겨낸다.
// 권한이 없으면 못 보는 곳에 사용
const PrivateRoute = ({ authenticated, component: Component }) => {
    const location = useLocation();

    return authenticated ? (
        Component
    ) : (
        <Navigate to="/signIn" state={{ from: location }} />
    );
};

export default PrivateRoute;
