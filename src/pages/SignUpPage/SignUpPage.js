import React, { useEffect, useState } from "react";
import SignUp from "../../components/Auth/SignUp/SignUp";
import { useLocation } from "react-router-dom";

function SignUpPage() {
    /**------------------------------------
     * 동적 타이틀 변경
     ------------------------------------*/
    const location = useLocation();

    useEffect(() => {
        // 회원가입 페이지의 타이틀 설정
        document.title = "회원가입";
    }, [location]);
    /**---------------------------------- */
    return (
        <div>
            <SignUp></SignUp>
        </div>
    );
}

export default SignUpPage;
