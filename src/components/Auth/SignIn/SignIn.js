import React, { useEffect, useState } from "react";
import "./SignIn.scss";

function SignIn() {
    return (
        <div className="login_container">
            <div className="login_wrap">
                {/* 제목 */}
                <div className="title">로그인</div>

                {/* 아직 회원이 아니신가요? */}
                <div className="login_util">
                    <div className="login_until_title">
                        아직 회원이 아니신가요?
                    </div>
                    <div className="login_until_dec">
                        지금 회원가입 하시면 <br /> 30% 할인쿠폰과 <br />
                        적립금 3천원이 자동 지급됩니다.
                    </div>
                    <div className="login_until_btn">회원가입</div>
                </div>

                {/* 간편 로그인 */}
                <div className="login_sns">
                    <div className="login_sns_title">간편로그인/간편가입</div>
                    <div className="login_sns_dec">
                        <div className="login_sns_btn">
                            <img src="/images/naver_icon.svg" alt="" />
                            네이버
                        </div>
                        <div className="login_sns_btn">
                            <img src="/images/kakao_icon.svg" alt="" />
                            카카오
                        </div>
                    </div>
                </div>

                {/* 아이디 로그인 */}
                <div></div>
            </div>
        </div>
    );
}

export default SignIn;
