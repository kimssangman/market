// PrivateRoute.js
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

// 토큰이 없으면 튕겨낸다.
// 권한이 없으면 못 보는 곳에 사용

/**--------------------------------------------------------------------------------------------
 * 이전 페이지 리디렉트를 시키기 위해 state를 이용해서 현재 path를 넘겨준다.
 * 
 * 아마도 이전에 안 됐던 이유가 <Link to={/path}/> 를 사용해서 useNavigate 값을 사용하지 못 한 듯 하다.
 * 
 * 그래서 onClick={() => {navigate("/cart");}} 이렇게 대체하니 location.state?.location.pathname 값을 뽑을 수 있었다.
 --------------------------------------------------------------------------------------------*/
const PrivateRoute = ({ authenticated, component: Component }) => {
    // 리디렉트를 위한 react-router-dom 함수
    const location = useLocation();

    return authenticated ? (
        Component
    ) : (
        <Navigate to={`/signIn`} replace state={{ location }} />
    );
};

export default PrivateRoute;
