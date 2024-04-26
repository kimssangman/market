import React, { useEffect, useState } from "react";
import SignIn from "../../components/Auth/SignIn/SignIn";
import { useLocation } from "react-router-dom";

function SignInPage() {
    /**------------------------------------
     * 동적 타이틀 변경
     ------------------------------------*/
    const location = useLocation();

    useEffect(() => {
        // 로그인 페이지의 타이틀 설정
        document.title = "로그인";
    }, [location]);
    /**---------------------------------- */
    return (
        <div>
            <SignIn></SignIn>
        </div>
    );
}

export default SignInPage;
