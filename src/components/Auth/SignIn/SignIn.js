// SignIn.js

import React, { useEffect, useState } from "react";
import "./SignIn.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signIn } from "../../../api/auth/signIn_api";
import useSimpleSignIn from "../../../api/auth/simple_signIn_api";
import { userState } from "../../../store/atoms";
import { useRecoilState } from "recoil";

function SignIn() {
    const [user, setUser] = useRecoilState(userState);
    const navigate = useNavigate();
    const location = useLocation();

    // 간편 로그인 훅 분리
    useSimpleSignIn();

    const [form, setForm] = useState({
        id: "",
        password: "",
    });

    // 입력값이 변경될 때 실행되는 함수
    const handleChange = (e) => {
        const { name, value } = e.target;
        // 기존의 form 상태를 복사한 후 해당 필드만 업데이트
        setForm({
            ...form,
            [name]: value,
        });
    };

    // 로그인 버튼 클릭 시 실행되는 함수
    const handleSignIn = async (e) => {
        e.preventDefault();

        try {
            const response = await signIn(form);
            setUser(response.payload.name);

            /**---------------------------------------
             * 로그인 시 이전페이지로 이동하는 법
             * 
             * 1. 유저 권한이 필요없는 페이지에서 로그인 완료 시 다시 이전 페이지로 이동하는 법
             * 1-1) Header.js에서 useLocation()을 사용하여 현재 페이지를 저장한다.
             * 1-2) Header.js에서 로그인 버튼을 눌렀을 때 useNavigate()로 state를 전달한다.
             * 1-3) SignIn.js에서 로그인 버튼을 눌렀을 때 useLocation()의 state 값을 전달 받아 해당 페이지로 이동한다.
             * 
             * 2. 유저 권한이 필요한 페이지에서 로그인 완료 시 다시 이전 페이지로 이동하는 법
             * 2-1) PrivateRoute.js에서 useLocation()을 사용하여 현재 페이지를 바로 SignIn.js에 넘겨준다.
             * 2-2) SignIn.js에서 로그인 버튼을 눌렀을 때 useLocation()의 state 값을 전달 받아 해당 페이지로 이동한다.
             * 
             * isTokenRoute.js는 토큰이 존재할 때 갈 필요없는 페이지 ex) 로그인, 회원가입 페이지 처리할 때만 사용한다.
             ---------------------------------------*/
            const from = location.state?.from?.pathname || "/";
            navigate(from, { replace: true });
            window.location.reload();
        } catch (error) {
            alert("아이디 또는 비밀번호 오류");
            console.error("로그인 실패:", error);
        }
    };

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
                    <Link to={"/signUp"} style={{ textDecoration: "none" }}>
                        <div className="login_until_btn">회원가입</div>
                    </Link>
                </div>

                {/* 간편 로그인 */}
                <div className="login_sns">
                    <div className="login_sns_title">간편로그인/간편가입</div>
                    <div className="login_sns_dec">
                        <div className="login_sns_btn">
                            <div id="naverIdLogin"></div>
                            네이버
                        </div>
                        <div className="login_sns_btn">
                            <img src="/images/kakao_icon.svg" alt="" />
                            카카오
                        </div>
                    </div>
                </div>

                {/* 아이디 로그인 */}
                <div className="login_id">
                    <div className="login_id_title">아이디 로그인</div>
                    <form>
                        <div className="id_container">
                            <input
                                id="id"
                                type="text"
                                name="id"
                                value={form.id}
                                onChange={handleChange}
                                placeholder="아이디 또는 이메일"
                                className="id"
                            />
                        </div>
                        <div className="password_container">
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="비밀번호"
                                className="password"
                            />
                        </div>
                        <div className="security_container">
                            <div className="security_left">
                                <div className="security_id">
                                    <input type="checkbox" />
                                    <div>아이디 저장</div>
                                </div>
                                <div className="security_sec">
                                    <input type="checkbox" />
                                    <div>보안 접속</div>
                                </div>
                            </div>
                            <div className="security_right">
                                <div>아이디 찾기</div>
                                <div>비밀번호 찾기</div>
                            </div>
                        </div>
                        <button type="submit" onClick={handleSignIn}>
                            로그인
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
