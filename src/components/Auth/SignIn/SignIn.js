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

    // 회원가입 버튼 클릭 시 실행되는 함수
    const handleSignIn = async (e) => {
        e.preventDefault();

        try {
            const response = await signIn(form).then((res) => {
                /**-------------------------------
                 * JWT에서 사용자 정보 전역변수에 저장
                 * 라우팅을 저렇게해서 전역변수 작동 안 함
                 * 수정해야 함
                 -------------------------------*/
                setUser(res.payload.name);

                /**-------------------------------
                 * state로 받은 이전 path를 후처리 하여 리디렉트 시킨다.
                 -------------------------------*/
                const from = location.state?.location.pathname || "/";
                window.location.href = `http://localhost:3000${from}`;
            });
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
